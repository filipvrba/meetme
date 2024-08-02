export default class ElmDashboardHeader extends HTMLElement {
  constructor() {
    super();
    this._userId = this.getAttribute("user-id");
    this.initElm()
  };

  connectedCallback() {
    return null
  };

  disconnectedCallback() {
    return null
  };

  initElm() {
    let template = `${`
<nav class='navbar navbar-light bg-light'>
  <div class='container-fluid'>
    <a class='navbar-brand' onclick='window.dashboardUpdate(0)' href='#dashboard'>Dashboard</a>
    <div class='ms-auto'>
      <elm-dashboard-header-account user-id='${this._userId}'></elm-dashboard-header-account>
    </div>
  </div>
</nav>
    `}`;
    return this.innerHTML = template
  }
}