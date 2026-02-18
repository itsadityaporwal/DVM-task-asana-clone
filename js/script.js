// this code makes sure that nav container always stays below header 

const num = document.querySelector("header");
const menu = document.querySelector('#respMenu');

function placeNavContainer() {
    if (!num || !menu) return;
    const h = num.offsetHeight;

    menu.style.setProperty('--header-h', `${h}px`);
}

window.addEventListener('load', placeNavContainer);
window.addEventListener('resize', placeNavContainer);

new 
ResizeObserver(placeNavContainer).observe(num);


//for opening & closing navbar in mobile view

const menuToggle = document.getElementById('menuToggle');
const respMenu = document.getElementById('respMenu');

function toggleMenu() {
  const isOpen = respMenu.classList.toggle('open');
  menuToggle.classList.toggle('fa-bars', !isOpen);
  menuToggle.classList.toggle('fa-xmark', isOpen);
}

if (window.PointerEvent) {
  menuToggle.addEventListener('pointerup', toggleMenu);
} else {
  menuToggle.addEventListener('click', toggleMenu);
}
