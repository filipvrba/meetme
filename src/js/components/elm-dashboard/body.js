export default class CBody {
  constructor(userId) {
    this._userId = userId;
    window.dashboardUpdate = this.dashboardUpdate.bind(this)
  };

  dashboardUpdate(index=null) {
    if (index !== null) URLParams.set("d-index", index);
    return this.updateSubinitElm()
  };

  updateSubinitElm() {
    let dashboardIndex;
    let dashboardBody = document.getElementById("dashboardBody");

    if (dashboardBody) {
      dashboardIndex = URLParams.getIndex("d-index");
      return dashboardBody.innerHTML = this.subinitElm(dashboardIndex)
    }
  };

  subinitElm(dashboardIndex) {
    switch (dashboardIndex) {
    case 1:
      return `${`
      <div class='col-lg-8 mx-auto'>
        <elm-alert></elm-alert>
        <elm-dashboard-account-settings user-id='${this._userId}'></elm-dashboard-account-settings>
      </div>
      `}`;

    default:
      return `${`\n      <elm-dashboard-greeting user-id='${this._userId}'></elm-dashboard-greeting>\n      `}`
    }
  }
}