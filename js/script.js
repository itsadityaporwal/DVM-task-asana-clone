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

  let isDragging = false;
  let startX = 0;
  let startScroll = 0;

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

  // Pointer events (mouse + touch)
  rail.addEventListener("pointerdown", (e) => {
    isDragging = true;
    rail.classList.add("is-dragging");
    rail.setPointerCapture(e.pointerId);
    startX = e.clientX;
    startScroll = rail.scrollLeft;
  });

  rail.addEventListener("pointermove", (e) => {
    if (!isDragging) return;
    e.preventDefault();
    rail.scrollLeft = startScroll - (e.clientX - startX);
    syncButtons();
  });

  function endDrag(e) {
    if (!isDragging) return;
    isDragging = false;
    rail.classList.remove("is-dragging");
    try { rail.releasePointerCapture(e.pointerId); } catch {}
    snap();
  }

  rail.addEventListener("pointerup", endDrag);
  rail.addEventListener("pointercancel", endDrag);
  rail.addEventListener("pointerleave", endDrag);

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