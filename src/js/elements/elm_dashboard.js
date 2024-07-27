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
    let template = `${`
<elm-dashboard-header user-id='${this._userId}'></elm-dashboard-header>
<div class='nav-padding'>
  
</div>
    `}`;
    return this.innerHTML = template
  }
}