/**
 * @type {HTMLButtonElement}
 */
const button = /**@type {any}*/ (document.querySelector("#generate"));
button.addEventListener("click", printButtonText);

/**
 * @type {HTMLDivElement}
 */
let ballStorage = /**@type {any}*/ (document.querySelector("#ball-storage"));

function printButtonText() {
    ballStorage.replaceChildren(renderMyBalls(numberSet()))
}

/**
 *
 * @param {number} min
 * @param {number} max
 * @returns {() => number}
 */
function rng(min, max) {
  return () => Math.floor(Math.random() * (max - min + 1)) + min;
}

const generate1To69 = rng(1, 69);
const generate1To26 = rng(1, 26);

function numberSet() {
  const set = new Set();
  while (set.size < 5) {
    set.add(generate1To69());
  }
  return [...set, generate1To26()];
}

/**
 *
 * @param {number} number
 * @returns {SVGSVGElement}
 */
function renderMyBall(number) {
  /**
   * @type {HTMLTemplateElement}
   */
  const template = /**@type {any}*/ (document.querySelector("template"));
  /**
   * @type {SVGSVGElement}
   */
  let ball = /**@type {any}*/ (template.content.querySelector("svg")).cloneNode(
    true
  );
  /**@type {SVGTextElement}*/ (ball.querySelector("text")).textContent =
    String(number);

  return ball;
}

/**
 *
 * @param {Iterable<number>} numbers
 * @returns
 */
function renderMyBalls(numbers) {
  let ballDiv = document.createElement("div");
  ballDiv.classList.add("my-balls");
  for (const number of numbers) {
    ballDiv.append(renderMyBall(number));
  }
  return ballDiv;
}
