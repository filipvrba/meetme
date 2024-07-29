export default class ElmDashboardHeader extends HTMLElement {
  constructor() {
    super();
    this._userId = this.getAttribute("user-id");
    this.initElm();

    _BefDb.get(
      `SELECT email FROM users WHERE id = ${this._userId}`,

      (rows) => {
        if (rows.length > 0) return this.initEmail(rows[0].email)
      }
    );

    window.dropdownItemSignoutClick = this.dropdownItemSignoutClick.bind(this)
  };

  connectedCallback() {
    return null
  };

  disconnectedCallback() {
    return null
  };

  dropdownItemSignoutClick() {
    Cookie.erase("l-token");
    return Events.emit("#app", "signout")
  };

  initElm() {
    let template = `${`
<nav class='navbar navbar-light bg-light'>
  <div class='container-fluid'>
    <a class='navbar-brand' onclick='window.dashboardUpdate(0)' href='#dashboard'>Dashboard</a>
    <div class='ms-auto'>
      <ul class='navbar-nav d-flex flex-row'>
        <li class='nav-item dropdown'>
          <a class='nav-link dropdown-toggle' href='#' id='accountDropdown' role='button' data-bs-toggle='dropdown' aria-expanded='false'>
            <i class='bi bi-person-circle'></i> Účet
          </a>
          <ul class='dropdown-menu text-small shadow' aria-labelledby='accountDropdown' style='position: absolute; inset: 0px 0px auto auto; margin: 0px; transform: translate(0px, 34px);' data-popper-placement='bottom-end'>
            <li class='dropdown-header'>
              Přihlášen jako<br><strong id='dropdownHeaderEmail'></strong>
            </li>
            <li><hr class='dropdown-divider'></li>
            <li><a id='dashboard-header-settings-link' class='dropdown-item' onclick='dashboardUpdate(1)' href='#dashboard'>Nastavení</a></li>
            <li><a class='dropdown-item'onclick='dropdownItemSignoutClick()' href='#'>Odhlásit se</a></li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</nav>
    `}`;
    return this.innerHTML = template
  };

  initEmail(email) {
    return this.querySelector("#dropdownHeaderEmail").innerHTML = email
  }
}