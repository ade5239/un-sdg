import { LitElement, html, css } from 'lit';
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";

export class UnSdg extends LitElement {
  static get properties() {
    return {  //defines the properties for the component
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
        width: var(--un-sdg-width, 254px);
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
        --un-sdg-goal-circle: #f1f0f0c4;
        --un-sdg-goal-all: #ffffff;
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

  constructor() { //initialize the default property values
    super();
    this.goal = '1';
    this.label = '';
    this.alt = null;
    this.colorOnly = false;
    this._currentSrc = null;
  }

  connectedCallback() { //used when an element is added to the DOM
    super.connectedCallback();
    this.updateGoalImage(); //calls for the image source when the component is connected
  }

  updated(changedProperties) { //changes goal's properties and updates the image source when the component is updated
    if (changedProperties.has('goal')) {
      this.updateGoalImage();
    }
  }

  /*         In order to work on vercel the svgs would need to be referenced on a non local location such as this
getImgSrc() {
    let baseUrl =
      'https://raw.githubusercontent.com/ade5239/un-sdg/1a213afa92f3f50abafd47cad6b2c2eb3d4bf673/lib/svgs';

    if (this.goal === 'all' || this.goal === 'circle') {
      return `${baseUrl}/goal-${this.goal}.svg`;
    } else {
      const goalNumber = parseInt(this.goal);
      if (goalNumber >= 1 && goalNumber <= 17) {
        return `${baseUrl}/goal-${goalNumber}.svg`;
      }
    }
  } */

  updateGoalImage() {
    this._currentSrc = this.getImgSrc();

    if (this.goal === 'all' || this.goal === 'circle') { //sets the alt text for accessibility
      this.alt =
        this.goal === 'all'
          ? 'All Sustainable Development Goals'
          : 'Sustainable Development Goals Circle';
    } else {
      const goalNumber = parseInt(this.goal); //for goals 1-17 sets the alt text to goal #
      if (goalNumber >= 1 && goalNumber <= 17) {
        this.alt = `Goal ${goalNumber}`;
      }
    }
  }

  getLabel() {
    const labels = [  //labels corresponding to each goal, returns the label for the current goal
      "No Poverty",
      "Zero Hunger",
      "Good Health and Well-being",
      "Quality Education",
      "Gender Equality",
      "Clean Water and Sanitation",
      "Affordable and Clean Energy",
      "Decent Work and Economic Growth",
      "Industry, Innovation, and Infrastructure",
      "Reduced Inequalities",
      "Sustainable Cities and Communities",
      "Responsible Consumption and Production",
      "Climate Action",
      "Life Below Water",
      "Life on Land",
      "Peace, Justice, and Strong Institutions",
      "Partnerships for the Goals"
    ];

    //returns the label based on the goal number or special case
    if (Number.isInteger(Number(this.goal))) {
      return labels[this.goal - 1];
    } else if (this.goal === 'all') {
      return 'All Sustainable Development Goals';
    } else if (this.goal === 'circle') {
      return 'Sustainable Development Goals Circle';
    }
    return '';
  }

  getImgSrc() { //gets the image source for the svgs from github library based on the current goal
    const baseUrl =
      'https://raw.githubusercontent.com/ade5239/un-sdg/main/lib/svgs';

    if (this.goal === 'all' || this.goal === 'circle') { //builds the url for special cases
      return `${baseUrl}/goal-${this.goal}.svg`;
    } else {
      const goalNumber = parseInt(this.goal); //builds the url for goals 1-17
      if (goalNumber >= 1 && goalNumber <= 17) {
        return `${baseUrl}/goal-${goalNumber}.svg`;
      }
    }
  }
  

  render() {
    if (this.colorOnly) {  
      // Handle 'circle' and 'all' goals
      if (this.goal === 'circle' || this.goal === 'all') {
        const colorVar = `--un-sdg-goal-${this.goal}`; //sets the background color for the square based on the corresponding css variable
        return html`<div class="color-only" style="background-color: var(${colorVar});"></div>`;
      }
  
      const goalNumber = parseInt(this.goal); //Handles the normal 1-17 goals
      if (goalNumber >= 1 && goalNumber <= 17) {
        const colorVar = `--un-sdg-goal-${goalNumber}`; //sets the background color for the square based on the corresponding css variable
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