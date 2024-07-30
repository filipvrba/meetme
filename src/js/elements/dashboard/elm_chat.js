export default class ElmDashboardChat extends HTMLElement {
  constructor() {
    super();
    this.initElm()
  };

  connectedCallback() {
    return null
  };

  disconnectedCallback() {
    return null
  };

  initElm() {
    let template = `${`\n    lol\n    `}`;
    return this.innerHTML = template
  }
}