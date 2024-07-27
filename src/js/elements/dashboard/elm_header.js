export default class ElmDashboardHeader extends HTMLElement {
  constructor() {
    super();
    this._userId = this.getAttribute("user-id");

    _BefDb.get(
      `SELECT email FROM users WHERE id = ${this._userId}`,

      (rows) => {
        if (rows.length > 0) return this.initElm(rows[0].email)
      }
    )
  };

  connectedCallback() {
    return null
  };

  disconnectedCallback() {
    return null
  };

  initElm(email) {
    let template = `${`
<nav class='navbar navbar-light bg-light'>
  <div class='container-fluid'>
    <a class='navbar-brand' href='#dashboard'>Dashboard</a>
    <div class='ms-auto'>
      <ul class='navbar-nav d-flex flex-row'>
        <li class='nav-item dropdown'>
          <a class='nav-link dropdown-toggle' href='#' id='accountDropdown' role='button' data-bs-toggle='dropdown' aria-expanded='false'>
            <i class='bi bi-person-circle'></i> Účet
          </a>
          <ul class='dropdown-menu text-small shadow' aria-labelledby='accountDropdown' style='position: absolute; inset: 0px 0px auto auto; margin: 0px; transform: translate(0px, 34px);' data-popper-placement='bottom-end'>
            <li class='dropdown-header'>
              Přihlášen jako<br><strong>${email}</strong>
            </li>
            <li><hr class='dropdown-divider'></li>
            <li><a class='dropdown-item' href='#'>Nastavení</a></li>
            <li><a class='dropdown-item' href='#'>Odhlásit se</a></li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</nav>
    `}`;
    return this.innerHTML = template
  }
}