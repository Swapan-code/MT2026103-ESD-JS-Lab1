// Sections 12–13 exercise: the "Add a course" form, built by hand with the DOM.
// Run it:  npm run web   → open http://localhost:5500/web/
import { courses } from "../data/courses.js";
import { departments } from "../src/s11-catalog.js";
import { isComplete, toCourse } from "../src/s13-forms.js";

// Step 1 — select the elements you need.
const form = document.querySelector("#add-course");
const fields = Array.from(form.querySelectorAll("input, select"));
const submit = form.querySelector('button[type="submit"]');
const departmentSelect = form.querySelector('select[name="department"]');
const list = document.querySelector("#course-list");
const count = document.querySelector("#count");
const status = document.querySelector("#status");

// A closure that hands out ids after the catalogue's last one (20).
const nextId = (() => {
  let last = 20;
  return () => ++last;
})();

// Step 2 — fill the department dropdown from the data.
departments(courses).forEach((name) =>
  departmentSelect.append(new Option(name, name)),
);

// Step 3 — read every field into one object.
function readForm() {
  return fields.reduce(
    (values, field) => ({ ...values, [field.name]: field.value }),
    {},
  );
}

// Step 4 — enable the button only when the form is complete.
form.addEventListener("input", () => {
  submit.disabled = !isComplete(readForm());
});
// a <select> fires "change" (and "input" in modern browsers); cover both
form.addEventListener("change", () => {
  submit.disabled = !isComplete(readForm());
});

// Step 5 — on submit.
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const values = readForm();
  if (!isComplete(values)) return;
  const course = toCourse(values, nextId);
  list.append(renderItem(course));
  count.textContent = list.children.length;
  status.textContent = `Added ${course.code}.`;
  form.reset();
  submit.disabled = true;
});

// Step 6 — one list item per course.
function renderItem(course) {
  const item = document.createElement("li");
  item.className = "item";
  item.dataset.id = course.id;

  const label = document.createElement("span");
  label.textContent = `${course.code} · ${course.title} · ${course.credits} cr`;

  const remove = document.createElement("button");
  remove.type = "button";
  remove.textContent = "Remove";

  item.addEventListener("click", () => item.classList.toggle("selected"));
  remove.addEventListener("click", (event) => {
    event.stopPropagation(); // don't let the click bubble up and select the item
    item.remove();
    count.textContent = list.children.length;
  });

  item.append(label, remove);
  return item;
}
