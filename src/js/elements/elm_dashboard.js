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
  <elm-dashboard-jumbotron-avatar user-id='${this._userId}'></elm-dashboard-jumbotron-avatar>
</div>
    `}`;
    return this.innerHTML = template
  }
}