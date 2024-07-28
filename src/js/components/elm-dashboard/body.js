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
    this._dashboardIndex = URLParams.getIndex("d-index");
    let dashboardBody = document.getElementById("dashboardBody");
    return dashboardBody.innerHTML = this._subinitElm()
  };

  _subinitElm() {
    switch (this._dashboardIndex) {
    case 1:
      return `${`
      <div class='col-lg-8 mx-auto'>
        <elm-alert></elm-alert>
        <elm-dashboard-account-settings user-id='${this._userId}'></elm-dashboard-account-settings>
      </div>
      `}`;

    default:
      return `${`\n      <elm-dashboard-jumbotron-avatar user-id='${this._userId}'></elm-dashboard-jumbotron-avatar>\n      `}`
    }
  }
}