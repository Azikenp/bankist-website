'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const nav = document.querySelector('.nav');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabContent = document.querySelectorAll('.operations__content');


const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal))

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

//smooth scroll for learn more button
const btnScrollTo  = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
btnScrollTo.addEventListener('click', function(e){
  // const s1coords = section1.getBoundingClientRect();

  //scrolling
  // window.scrollTo(s1coords.left + window.pageXOffset , s1coords.top + window.pageYOffset)

  // smooth scroling
  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // })


  //modern way
  section1.scrollIntoView({behavior: 'smooth'});
})

//page navigation
// document.querySelectorAll('.nav__link').forEach(function(el){
//   el.addEventListener('click', function(e){
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     document.querySelector(id).scrollIntoView({behavior: 'smooth'})
//   })
// })

//using event delegation for the page navigation function
document.querySelector('.nav__links').addEventListener('click', function(e){
  e.preventDefault();
  //matching strategy
  if(e.target.classList.contains('nav__link')){
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({behavior: 'smooth'})
  }
});



//Tabbed components

tabsContainer.addEventListener('click', function(e){
  const clicked = e.target.closest('.operations__tab');
  //Guard clause
  if(!clicked) return;

  //Active tab
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  clicked.classList.add('operations__tab--active');

  //Activate content area
  tabContent.forEach(c => c.classList.remove('operations__content--active'));

  document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active')
});



//Menu fade animation
const handleHover = function(e , opacity){
  if(e.target.classList.contains('nav__link')){
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach( el => {
      if(el !== link){
        el.style.opacity = opacity;
      }
      logo.style.opacity = opacity;
    })
  }
}

nav.addEventListener('mouseover', function(e){
  handleHover(e, 0.5)
});

nav.addEventListener('mouseout', function(e){
  handleHover(e, 1)
});


//Sticky navigation
// const initialCoords = section1.getBoundingClientRect();
// window.addEventListener('scroll', function(){
//   if(this.window.scrollY > initialCoords.top){
//     nav.classList.add('sticky');
//   } else {
//     nav.classList.remove('sticky')
//   }
// })




// Sticky navigation: Intersection Observer Api

// const  obsCallback = function(entries, observer){
//   entries.forEach(function(entry){
//     console.log(entry);
//   })
// } 

// const obsOptions = {
//   root: null,
//   threshold: [0, 0.2],
// };

// const observer = new IntersectionObserver(obsCallback, obsOptions);

// observer.observe(section1);

const header = document.querySelector('.header');
const navHeight  = nav.getBoundingClientRect().height;

const stickyNav = function(entries){
  const [entry] = entries;
  if (entry.isIntersecting === false ){
    nav.classList.add('sticky');
  } else{
    nav.classList.remove('sticky');
  }
}

const headerObserver = new IntersectionObserver(stickyNav,  {root: null, threshold: 0, rootMargin: `-${navHeight}px`,});

headerObserver.observe(header);


//Reveal sections
const allSections = document.querySelectorAll('.section');


const revealSection = function(entries, observer) {
  const [entry] = entries;
  
  if(entry.isIntersecting === false) {
    return
  }
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObsever = new IntersectionObserver(revealSection, {root: null, threshold:0.15,})
allSections.forEach(function(section){
  sectionObsever.observe(section)
  section.classList.add('section--hidden')
});


//Lazy Loading images
const imgTargets = document.querySelectorAll('img[data-src]');

const loading = function(entries, observer){
  const [entry] = entries;

  if (!entry.isIntersecting){
    return
  }

  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', function(){
    entry.target.classList.remove('lazy-img');
  })

  observer.unobserve(entry.target);
}

const imageObserver = new IntersectionObserver(loading, {root: null, threshold: 0, rootMargin: '200px'});

imgTargets.forEach(function(img){
  imageObserver.observe(img)
});



//Image slider
const slides = document.querySelectorAll('.slide');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');

console.log(btnLeft, btnRight);









////////////////////////////////////////////////
////////////////////////////////////////////////////
////////////////////////////////////////////////
/////////////////////////////////////////////////////////
//////////////////////////////////////////////////

//Practise











