import AProtectionElement from "./abstracts/protection_element";
import CBody from "../components/elm-dashboard/body";

export default class ElmDashboard extends AProtectionElement {
  constructor() {
    super()
  };

  initializeProtected() {
    this._cBody = new CBody(this._userId);
    this._cBody.connectedCallback();
    this.initElm();
    return window.dashboardUpdate()
  };

  connectedCallback() {
    return super.connectedCallback()
  };

  disconnectedCallback() {
    super.disconnectedCallback();
    return this._cBody.disconnectedCallback()
  };

  initElm() {
    let template = `${`
    <elm-dashboard-header user-id='${this._userId}'></elm-dashboard-header>
    <div id='dashboardBody' class='nav-padding footer-padding'></div>
    <elm-dashboard-footer user-id='${this._userId}'></elm-dashboard-footer>
    `}`;
    return this.innerHTML = template
  }
}