// Section 15 exercise: a counter — final version (stage 4).
// Run it:  npm run web   → open http://localhost:5500/web/counter.html
import { useState } from "../src/s15-state.js";

const countEl = document.querySelector("#count");
const parityEl = document.querySelector("#parity");
const inc = document.querySelector("#inc");
const dec = document.querySelector("#dec");
const reset = document.querySelector("#reset");
const stepInput = document.querySelector("#step");

// The view is a function of the state.
function render() {
  const count = getCount();
  const step = getStep();
  countEl.textContent = count;
  parityEl.textContent = count % 2 === 0 ? "even" : "odd";
  dec.disabled = count - step < 0;
  document.title = `Count: ${count}`;
}

const [getCount, setCount] = useState(0, render);
const [getStep, setStep] = useState(1, render);

// Handlers only say what the new state is — they never touch the page.
inc.addEventListener("click", () => setCount((c) => c + getStep()));
dec.addEventListener("click", () => setCount((c) => c - getStep()));
reset.addEventListener("click", () => setCount(0));
stepInput.addEventListener("input", () => {
  const n = Number(stepInput.value);
  setStep(Number.isInteger(n) && n >= 1 ? n : 1);
});

render(); // draw the first screen
