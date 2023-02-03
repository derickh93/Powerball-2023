import { PowerballSet } from "./powerball-set.js";

/**
 * @type {HTMLButtonElement}
 */
const button = /**@type {any}*/ (document.querySelector("#generate"));
button.addEventListener("click", () => {

});

/**
 * @type {HTMLDivElement}
 */
let ballStorage = /**@type {any}*/ (document.querySelector("#ball-storage"));



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
 * @type {HTMLButtonElement}
 */
const winningButton = /**@type {any} */(document.querySelector('#current'));
winningButton.addEventListener('click', async () => {
  const data = await getData()
  for (const idk of data) {
    printWinningNumbers(idk.winning_numbers)
  }

});
/** 
 * @param {Array<string>} historyNumberSet
*/
function printWinningNumbers(historyNumberSet) {
  const powerball = new PowerballSet();
  powerball.numbers = historyNumberSet;
  ballStorage.append(powerball)
}


/**
 * @typedef {{
 *  draw_date: string
 *  multiplier: number
 *  winning_numbers: string
 * }} PowerballHistoryAPI
 */

/**
 * @typedef {{
 *  draw_date: Date;
 *  multiplier: number;
 *  winning_numbers: Array<string>;
 * }} PowerballHistory
 */

/**
 *
 */
async function getData() {
  const url = new URL('https://data.ny.gov/resource/dhwa-m6y4.json');
  url.searchParams.set('$limit','5');

  const request = await fetch(url);
  /**
   * @type {Array<PowerballHistoryAPI>}
   */
  const response = await request.json();
  
  return response.map(data => ({
    ...data,
    draw_date: new Date(data.draw_date),
    winning_numbers: data.winning_numbers.split(' ')
  }))
}
