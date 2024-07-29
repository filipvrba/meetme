import AProtectionElement from "./abstracts/protection_element";
import CBody from "../components/elm-dashboard/body";

export default class ElmDashboard extends AProtectionElement {
  constructor() {
    super()
  };

  initializeProtected() {
    this._cBody = new CBody(this._userId);
    this.initElm();
    return this._cBody.dashboardUpdate()
  };

  connectedCallback() {
    return super.connectedCallback()
  };

  disconnectedCallback() {
    return super.disconnectedCallback()
  };

  initElm() {
    let template = `${`\n    <elm-dashboard-header user-id='${this._userId}'></elm-dashboard-header>\n    <div id='dashboardBody' class='nav-padding'></div>\n    `}`;
    return this.innerHTML = template
  }
}