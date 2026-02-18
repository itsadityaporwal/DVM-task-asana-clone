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

const menuBtn = document.getElementById('menuToggleBtn');
const menuIcon = document.getElementById('menuIcon');
const respMenu = document.getElementById('respMenu');

function toggleMenu(e) {
    e.preventDefault(); // stops ghost click on some browsers
    const isOpen = respMenu.classList.toggle('open');
    menuIcon.classList.toggle('fa-bars', !isOpen);
    menuIcon.classList.toggle('fa-xmark', isOpen);

}

menuBtn.addEventListener('pointerup', toggleMenu);


