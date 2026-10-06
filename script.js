/* ==========================================================================
           Classic Wall Clock
           ========================================================================== */

(function () {
  "use strict";

  const clock = document.getElementById("clock");
  const hourHand = document.getElementById("hourHand");
  const minuteHand = document.getElementById("minuteHand");
  const secondHand = document.getElementById("secondHand");

  // Get the computed size of the clock to calculate positioning
  const getSize = () => clock.clientWidth || 400;
  let CLOCK_SIZE = getSize();

  /* ------------------------------------------------------------------
               Build the Numbers and Minute Dots
               ------------------------------------------------------------------ */
  function buildFace() {
    // Remove existing elements to prevent duplicates on resize
    clock.querySelectorAll(".number, .dot").forEach((el) => el.remove());

    CLOCK_SIZE = getSize();
    const radius = CLOCK_SIZE / 2;

    // 12 Numbers
    for (let i = 1; i <= 12; i++) {
      const num = document.createElement("div");
      num.className = "number";
      num.textContent = i;

      const angle = i * 30; // 360 / 12
      // We push the element out from the center, then counter-rotate it
      num.style.transform = `rotate(${angle}deg) translateY(-${radius * 0.8}px) rotate(-${angle}deg)`;

      clock.appendChild(num);
    }

    // 60 Minute Dots
    for (let i = 0; i < 60; i++) {
      const dot = document.createElement("div");
      dot.className = "dot";

      // Skip dots where the numbers are (every 5th dot)
      if (i % 5 === 0) continue;

      const angle = i * 6; // 360 / 60
      dot.style.transform = `rotate(${angle}deg) translateY(-${radius * 0.92}px)`;

      clock.appendChild(dot);
    }
  }

  /* ------------------------------------------------------------------
               Update Clock Hands
               ------------------------------------------------------------------ */
  function updateClock() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const ms = now.getMilliseconds();

    // Smooth second hand (includes ms for silky motion)
    const smoothSeconds = seconds + ms / 1000;

    const secondAngle = smoothSeconds * 6;
    const minuteAngle = (minutes + smoothSeconds / 60) * 6;
    const hourAngle = ((hours % 12) + minutes / 60) * 30;

    hourHand.style.transform = `rotate(${hourAngle}deg)`;
    minuteHand.style.transform = `rotate(${minuteAngle}deg)`;
    secondHand.style.transform = `rotate(${secondAngle}deg)`;

    requestAnimationFrame(updateClock);
  }

  /* ------------------------------------------------------------------
               Init & Resize Handling
               ------------------------------------------------------------------ */
  buildFace();
  updateClock();

  // Rebuild face on resize to adjust spacing
  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(buildFace, 200);
  });
})();
