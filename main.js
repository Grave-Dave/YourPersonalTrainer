const heroHeader = document.querySelector('.header__img--desktop');
const allSections = document.querySelectorAll('section');
const headerSection = document.querySelector('header');
const navSection = document.querySelector('nav');
const priceSection = document.querySelector('.price');

const navBtns = document.querySelectorAll('.nav-btn');
const navMobile = document.querySelector('.nav__menu-items-mobile');
const hamburger = document.querySelector('.hamburger')

const offerShadow = document.querySelector('.offer__shadow');
const offerBtns = document.querySelectorAll('.offer__accordion-btn');
const offerBoxes = document.querySelectorAll('.offer__accordion-box');

const teamCards = document.querySelectorAll('.team__card');
const counterItems = document.querySelectorAll('.counter');
const counterBox = document.querySelector('.team__icon-box');

const inspirationalText = document.querySelectorAll('.inspirational-text');
const inspirationalTextAuthor = document.querySelectorAll('.inspirational-text-author');

// header-gif----------------------------------------

const handleGif = e => {
	const heightRatio = Math.floor(
		100 * ((e.clientY - navSection.offsetHeight) / (heroHeader.offsetHeight - navSection.offsetHeight))
	);

	// console.log(heightRatio);

	for (let i = 1; i <= 7; i++) {
		const j = 14;

		if (heightRatio >= j * i) {
			heroHeader.style.backgroundImage = `url(../img/hero1-img/frame_1.1.${i + 1}.webp)`;
		} else if (heightRatio < j) {
			heroHeader.style.backgroundImage = '';
		}
	}
};

// inspirational-texts----------------------------------
let index = 1;
let index2 = 1;
let timeout;
let timeout2;
let textSpeed = 60;
let quote = [];
let quoteAuthor = [];
let randomNumber = [];

const getRandomNumbers = () => {
	let numbers = 2;
	while (randomNumber.length < numbers) {
		let num = Math.floor(Math.random() * 20);
		if (randomNumber.indexOf(num) == -1) randomNumber.push(num);
	}
};

const API_LINK = 'https://api.quotable.io/';
const API_TAG = 'quotes?tags=success';
const API_LENGTH = '&minLength=50&maxLength=80';

const getQuote = () => {
	const URL = API_LINK + API_TAG + API_LENGTH;
	axios
		.get(URL)
		.then(res => {
			let k = 0;
			inspirationalText.forEach(text => {
				quote.push(res.data.results[randomNumber[k]].content);
				quoteAuthor.push(res.data.results[randomNumber[k]].author);
				k++;
			});
			setTimeout(writtingAnimation, 500);
			setTimeout(writtingAnimation2, 1500);
		})
		.catch(err => console.error(err));
};

const writtingAnimation = () => {
	clearTimeout(timeout);
	inspirationalText[0].innerHTML = quote[0].slice(0, index);
	inspirationalTextAuthor[0].innerHTML = `<i class="fa-solid fa-quote-right"></i> ${quoteAuthor[0].slice(0, index)}`;

	index++;

	if (index > quote[0].length) return;

	timeout = setTimeout(writtingAnimation, textSpeed);
};
const writtingAnimation2 = () => {
	clearTimeout(timeout2);
	inspirationalText[1].innerHTML = quote[1].slice(0, index2);
	inspirationalTextAuthor[1].innerHTML = `<i class="fa-solid fa-quote-right"></i> ${quoteAuthor[1].slice(0, index2)}`;

	index2++;

	if (index2 > quote[1].length) return;

	timeout2 = setTimeout(writtingAnimation2, textSpeed);
};

// offer-cards-----------------------------------------

const showOfferInfo = e => {
	offerBtns.forEach(btn => {
		const allOfferInfo = btn.nextElementSibling;
		allOfferInfo.classList.remove('show');
		allOfferInfo.nextElementSibling.classList.remove('hide');
	});
	const offerInfo = e.target.nextElementSibling;

	if (!offerInfo.classList.contains('show')) {
		offerInfo.nextElementSibling.classList.add('hide');
		offerInfo.classList.add('show');
	}
	changeSectionImage(e.target);
};

const changeSectionImage = button => {
	const image = button.getAttribute('bg-img');
	offerShadow.setAttribute('bg-img', image);
};

const observer = new IntersectionObserver(
	entries => {
		entries.forEach(entry => {
			entry.target.classList.toggle('show-slide', entry.isIntersecting);
			if (entry.isIntersecting) observer.unobserve(entry.target);
		});
	},
	{
		threshold: 1,
	}
);

// team-counter----------------------------------

const counterObserver = new IntersectionObserver(
	entry => {
		if (entry[0].isIntersecting) {
			counterItems.forEach(item => {
				const updateCounter = () => {
					const finalNumber = item.getAttribute('data-number');
					const value = parseInt(item.textContent);
					const speed = finalNumber / 200;

					if (value < finalNumber) {
						item.textContent = `${Math.floor(value + speed)}`;
						setTimeout(updateCounter, 7);
					} else {
						item.textContent = finalNumber;
					}
				};
				updateCounter();
			});
		}
	},

	{
		threshold: 0.4,
	}
);

// team-cards--------------------------------------------

function showCard() {
	teamCards.forEach(card => {
		card.classList.remove('team-active');
		this.classList.add('team-active');
	});
	// changeBackgroundColor(this);
}

// price-circle--------------------------------------------

let path = document.querySelector('path');
let pathLength = path.getTotalLength();

path.style.strokeDasharray = pathLength + ' ' + pathLength;

path.style.strokeDashoffset = pathLength;

// navbar--------------------------------------------------

const handleNav = () => {
	const navItem = navSection.childNodes[1];
	if (window.scrollY > 100) {
		navSection.classList.add('nav-scroll');
		navItem.style.display = 'none';
		navMobile.style.marginTop='50px'
	} else {
		navSection.classList.remove('nav-scroll');
		navItem.style.display = 'flex';
		navMobile.style.marginTop=''
	}
};

// scrolspy--------------------------------------------

const options = {
	threshold: [0.5],
};

const handleScrollspy = entries => {
	entries.forEach(entry => {
		if (entry.isIntersecting) {
			const activeNav = document.querySelector(`a[href='#${entry.target.id}']`);
			navBtns.forEach(btn => btn.classList.remove('nav-active'));
			activeNav.classList.add('nav-active');
		}
	});
};

const sectionObserver = new IntersectionObserver(handleScrollspy, options);

const options2 = {
	threshold: [0.5],
};

const handleScrollspy2 = entries => {
	entries.forEach(entry => {
		if (entry.isIntersecting) {
			const activeNav = document.querySelector(`a[href='#${entry.target.id}']`);
			navBtns.forEach(btn => btn.classList.remove('nav-active'));
			activeNav.classList.add('nav-active');
		}
	});
};

const headerObserver = new IntersectionObserver(handleScrollspy2, options);


// hamburger-------------------------------------------------

const handleBurgerBtn = ()=>{
	hamburger.classList.toggle('is-active')
	navMobile.classList.toggle('nav__menu-items-mobile-active')
}









// --------------------------------------------------------
// --------------------------------------------------------

heroHeader.addEventListener('mousemove', handleGif);
offerBtns.forEach(btn => btn.addEventListener('click', showOfferInfo));
teamCards.forEach(card => card.addEventListener('click', showCard));
hamburger.addEventListener('click', handleBurgerBtn)
window.addEventListener('scroll', () => {
	if (scrollY >= priceSection.offsetTop - window.innerHeight) {
		let scrollPercentage = (scrollY + window.innerHeight - priceSection.offsetTop) / priceSection.offsetHeight;

		let drawLength = pathLength * scrollPercentage;

		path.style.strokeDashoffset = pathLength - drawLength;
	}
});
window.addEventListener('scroll', handleNav);

offerBoxes.forEach(box => {
	observer.observe(box);
});
allSections.forEach(section => {
	sectionObserver.observe(section);
});
headerObserver.observe(headerSection);
counterObserver.observe(counterBox);
getRandomNumbers();
getQuote();
