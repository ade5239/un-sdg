import { LitElement, html, css } from 'lit';
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";

export class UnSdg extends LitElement {
  static get properties() {
    return {
      goal: { type: String, reflect: true },
      label: { type: String },
      colorOnly: { type: Boolean, attribute: 'color-only', reflect: true },
      _currentSrc: { type: String },
      alt: { type: String },
    };
  }

  static get styles() {
    return css`
      :host {
        display: inline-block;
        width: var(--un-sdg-width, 254px); /* allows for image resizing */
        height: var(--un-sdg-height, 254px);

        /* CSS variables for goal colors */
        --un-sdg-goal-1: #e5243b;
        --un-sdg-goal-2: #dda63a;
        --un-sdg-goal-3: #4c9f38;
        --un-sdg-goal-4: #c5192d;
        --un-sdg-goal-5: #ff3a21;
        --un-sdg-goal-6: #26bde2;
        --un-sdg-goal-7: #fcc30b;
        --un-sdg-goal-8: #a21942;
        --un-sdg-goal-9: #fd6925;
        --un-sdg-goal-10: #dd1367;
        --un-sdg-goal-11: #fd9d24;
        --un-sdg-goal-12: #bf8b2e;
        --un-sdg-goal-13: #3f7e44;
        --un-sdg-goal-14: #0a97d9;
        --un-sdg-goal-15: #56c02b;
        --un-sdg-goal-16: #00689d;
        --un-sdg-goal-17: #19486a;
      }

      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }

      .color-only {
        width: 100%;
        height: 100%;
      }

    `;
  }

  constructor() {
    super();
    this.goal = '1';  /* sets default values */
    this.label = '';
    this.alt = null;
    this.colorOnly = false;
    this._currentSrc = null;
  }

  updated(changedProperties) {  /* checks if the goal has changed when the 'change goal' button is clicked*/
    if (changedProperties.has('goal')) { /* if the goal number has changed in the first element, this calls the method to update the image accordingly */
      this.updateGoalImage();
    }
  }

  updateGoalImage() { /* Ensures the image is properly updated, including special cases */
    if (this.goal === 'all' || this.goal === 'circle') { /* checks if the goal is equal to circle or all to ensure the correct svg is displayed */
      this._currentSrc = `/lib/svgs/goal-${this.goal}.svg`;
      this.alt =
        this.goal === 'all'
          ? 'All Sustainable Development Goals'
          : 'Sustainable Development Goals Circle';
    } else {
      const goalNumber = parseInt(this.goal);
      if (goalNumber >= 1 && goalNumber <= 17) { /* checks the goal number and determines which image is needed dynamically*/
        this._currentSrc = `/lib/svgs/goal-${goalNumber}.svg`;
        this.alt = `Goal ${goalNumber}`;
      }
    }
  }

  render() {
    if (this.colorOnly) { /* takes the goal number and ensures the correct color variable is displayed for the color-only square */
      const goalNumber = parseInt(this.goal);
      if (goalNumber >= 1 && goalNumber <= 17) { /* Specifically checks the goal number for the color*/
        const colorVar = `--un-sdg-goal-${goalNumber}`;  
        return html`<div class="color-only" style="background-color: var(${colorVar});"></div>`;
      }
    }

    return html`
    <img
      src="${this._currentSrc}"
      alt="${this.label || this.alt}"
      loading="lazy"
      fetchpriority="low"
    />`;
  }
}

customElements.define('un-sdg', UnSdg);
