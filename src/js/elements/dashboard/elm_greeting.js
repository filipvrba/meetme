export default class ElmDashboardGreeting extends HTMLElement {
  constructor() {
    super();
    this._userId = this.getAttribute("user-id");
    let query = `
SELECT u.full_name, ia.image_base64
FROM users u
JOIN user_details ud ON u.id = ud.user_id
JOIN image_avatars ia ON ud.avatar_id = ia.id
WHERE ia.user_id = ${this._userId};
    `;

    _BefDb.get(query, rows => (
      rows.length > 0 ? this.initElm(rows[0]) : this.innerHTML = `${`\n        <elm-dashboard-jumbotron-avatar user-id='${this._userId}'></elm-dashboard-jumbotron-avatar>\n        `}`
    ))
  };

  connectedCallback() {
    return null
  };

  disconnectedCallback() {
    return null
  };

  initElm(options) {
    let fullName = options.full_name.decodeBase64();
    let avatar = options.image_base64;
    let template = `${`
<div class='row'>
  <div class='col-lg-8 mx-auto'>
    <div class='text-center'>
      <div class='card-body'>
        <img src='${avatar}' alt='Profilová fotografie' class='rounded-circle mb-3'>
        <h4 class='card-title mb-1'>Vítejte, <span id='fullName'>${fullName}</span>!</h4>
        <p class='card-text mb-2'>
          Nyní jste připojeni k MeetMe a ostatní uživatelé vás mohou vidět.
        </p>
      </div>
    </div>
  </div>
</div>
    `}`;
    return this.innerHTML = template
  }
}