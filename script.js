// CLOCK: update hands every second
function updateClock() {
  const now = new Date();

  const seconds = now.getSeconds();
  const minutes = now.getMinutes();
  const hours = now.getHours();

  const secDeg = seconds * 6; // 360 / 60
  const minDeg = minutes * 6 + seconds * 0.1; // smooth minute
  const hourDeg = (hours % 12) * 30 + minutes * 0.5; // hour + fraction

  // apply transforms (keep translate so hand base stays centered)
  document.querySelector(".sec").style.transform =
    `translate(-50%, 0) rotate(${secDeg}deg)`;
  document.querySelector(".min").style.transform =
    `translate(-50%, 0) rotate(${minDeg}deg)`;
  document.querySelector(".hour").style.transform =
    `translate(-50%, 0) rotate(${hourDeg}deg)`;
}

setInterval(updateClock, 1000);
updateClock(); // initial run

// DRAG: use Pointer Events so it works on mouse & touch
(function makeDraggable() {
  const clock = document.getElementById("clock");
  let dragging = false;
  let startX = 0;
  let startY = 0;
  let origLeft = 0;
  let origTop = 0;

  clock.addEventListener("pointerdown", (e) => {
    dragging = true;
    clock.setPointerCapture(e.pointerId);

    startX = e.clientX;
    startY = e.clientY;
    const rect = clock.getBoundingClientRect();
    origLeft = rect.left;
    origTop = rect.top;
  });

  document.addEventListener("pointermove", (e) => {
    if (!dragging) return;
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;
    clock.style.left = origLeft + dx + "px";
    clock.style.top = origTop + dy + "px";
  });

  document.addEventListener("pointerup", (e) => {
    if (!dragging) return;
    dragging = false;
    try { clock.releasePointerCapture(e.pointerId); }
    catch (err) {/* ignore */ }
  });

  // prevent text selection while dragging
  document.addEventListener("selectstart", (e) => {
    if (dragging) e.preventDefault();
  });
})();
