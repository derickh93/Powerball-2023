const EMPTY_SET = ['','','','','',''];

export class HistoryPowerballSet extends HTMLElement {

    static observedAttributes = ['numbers'];

    shadowRoot = this.attachShadow({ mode: 'open' });
    

    /**
     * @type {Iterable<SVGTextElement>}
     */
    textNodes = [];

    constructor() {
        super();
        this.shadowRoot.adoptedStyleSheets = [css];
        const balls = renderMyBalls(EMPTY_SET);
        this.textNodes = balls.querySelectorAll('text');
        this.shadowRoot.replaceChildren(balls);
    }

    #numbers = EMPTY_SET;
    get numbers() {
        return this.#numbers;
    }

    set numbers(value) {
        this.#setNumbers(value, true);
    }   

    /**
     * 
     * @param {Array<string>} value 
     * @param {boolean} [reflect]
     */
    #setNumbers(value, reflect) {
        if (Array.isArray(value) && value.length === 6) {
            this.#numbers = value;
            let i = 0;
            for (const text of this.textNodes) {
                const number = this.#numbers[i++];
                if (text.textContent !== number) {
                    text.textContent = number;
                }
            }

            if (reflect) {
                this.setAttribute('numbers', value.join(' '));
            }
        }
    }

    /**
     * 
     * @param {string} name 
     * @param {string | null} oldValue 
     * @param {string | null} newValue 
     */
    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'numbers') {
            if (newValue) {
                this.#setNumbers(newValue.split(' '))
            }
            else {
                this.#setNumbers(EMPTY_SET);
            }
        }
    }
}

export const css = new CSSStyleSheet();
css.replaceSync(/*css*/`
    :host {
        display: flex;
        gap: 4px;
    }

    svg {
        filter: drop-shadow(0 4px 8px rgba(0,0,0,.15));
    }

    svg:last-child circle {
        fill: url(#red-ball-gradient);
    }

    svg:last-child text {
        fill: url(#white-text-gradient);
    }

`);

/**
 *
 * @param {string} number
 * @returns {SVGSVGElement}
 */
export function renderMyBall(number) {
    /**
     * @type {SVGSVGElement}
     */
    let ball = /**@type {any}*/ (template.content.querySelector("svg")).cloneNode(
      true
    );
    /**@type {SVGTextElement}*/ (ball.querySelector("text")).textContent = number;
  
    return ball;
  }

/**
 *
 * @param {Iterable<string>} numbers
 * @returns
 */
export function renderMyBalls(numbers) {
    let ballDiv = document.createDocumentFragment();
    for (const number of numbers) {
      ballDiv.append(renderMyBall(number));
    }
    return ballDiv;
}

export const template = document.createElement('template');
template.innerHTML = /*html*/`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="-10 -10 20 20">
        <defs>
            <!-- white ball -->
            <linearGradient id="text-gradient" gradientTransform="rotate(120)">
                <stop offset="0" stop-color="#555" />
                <stop offset="1" stop-color="#111" />
            </linearGradient>
            <radialGradient id="ball-gradient" cx="0.55" cy="0.4">
                <stop offset="0" stop-color="white"/>
                <stop offset="0.2" stop-color="white"/>
                <stop offset="0.8" stop-color="#ddd"/>
                <stop offset="1" stop-color="#ccc"/>
            </radialGradient>

            <!-- red ball -->
            <linearGradient id="white-text-gradient" gradientTransform="rotate(120)">
                <stop offset="0" stop-color="#fff" />
                <stop offset="1" stop-color="#aaa" />
            </linearGradient>
            <radialGradient id="red-ball-gradient" cx="0.55" cy="0.4">
                <stop offset="0" stop-color="hsl(355, 80%, 80%)"/>
                <stop offset="0.2" stop-color="hsl(355, 80%, 80%)"/>
                <stop offset="0.8" stop-color="hsl(345, 60%, 50%)"/>
                <stop offset="1" stop-color="hsl(350, 50%, 50%)"/>
            </radialGradient>
        </defs>
        <circle r="9" fill="url(#ball-gradient)" />
        <text text-anchor="middle" alignment-baseline="central" fill="url(#text-gradient)"
            font-size="10" font-weight="bold">1</text>
    </svg>
`

customElements.define('history-powerball-set', HistoryPowerballSet);