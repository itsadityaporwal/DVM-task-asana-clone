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


//for carousel section 
 const rail = document.getElementById("usecaseRail");
  const btnPrev = document.querySelector(".btnWrapper .prev");
  const btnNext = document.querySelector(".btnWrapper .next");
  const cards = [...rail.children];

  let isDown = false;
  let startX;
  let scrollStart;

  function step() {
    const gap = parseFloat(getComputedStyle(rail).gap) || 0;
    return cards[0].offsetWidth + gap;
  }

  function syncButtons() {
    const max = rail.scrollWidth - rail.clientWidth - 1;
    btnPrev.disabled = rail.scrollLeft <= 0;
    btnNext.disabled = rail.scrollLeft >= max;
  }

  function snap() {
    const idx = Math.round(rail.scrollLeft / step());
    rail.scrollTo({ left: idx * step(), behavior: "smooth" });
  }

  // Mouse drag (desktop only)
  rail.addEventListener("mousedown", (e) => {
    isDown = true;
    startX = e.pageX - rail.offsetLeft;
    scrollStart = rail.scrollLeft;
  });

  window.addEventListener("mouseup", () => {
    if (isDown) snap();
    isDown = false;
  });

  rail.addEventListener("mouseleave", () => {
    if (isDown) snap();
    isDown = false;
  });

  rail.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();
    rail.scrollLeft = scrollStart - (e.pageX - rail.offsetLeft - startX);
    syncButtons();
  });

  // Touch (mobile): let browser handle scrolling, JS only snaps after
  rail.addEventListener("touchstart", (e) => {
    startX = e.touches[0].pageX - rail.offsetLeft;
    scrollStart = rail.scrollLeft;
  }, { passive: true });

  rail.addEventListener("touchend", snap);

  // Buttons
  btnPrev.addEventListener("click", () => {
    rail.scrollBy({ left: -step(), behavior: "smooth" });
    setTimeout(syncButtons, 250);
  });

  btnNext.addEventListener("click", () => {
    rail.scrollBy({ left: step(), behavior: "smooth" });
    setTimeout(syncButtons, 250);
  });

  window.addEventListener("load", syncButtons);
  window.addEventListener("resize", syncButtons);
  rail.addEventListener("scroll", syncButtons);