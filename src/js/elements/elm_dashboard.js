import AProtectionElement from "./abstracts/protection_element";

export default class ElmDashboard extends AProtectionElement {
  constructor() {
    super()
  };

  initializeProtected() {
    return this.initElm()
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