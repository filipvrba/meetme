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
        <h5 class='card-title mb-1'>Vítejte, <span id='fullName'>${fullName}</span>!</h5>
        <p class='card-text mb-2'>
          Jste nyní připojeni online. To znamená, že máte přístup ke všem dostupným funkcím naší aplikace. 
          Můžete například používat mapy s GPS, které vám umožní snadno se seznamovat s lidmi ve vašem okolí.
        </p>
        <p class='mb-3'>
          <i class='bi bi-geo-alt-fill'></i> 
          Prozkoumejte své blízké okolí a využijte příležitosti k navazování nových přátelství! 
          Naše funkce vám pomohou objevovat zajímavá místa a spojovat se s lidmi, kteří mají podobné zájmy.
        </p>
        <a class='btn btn-primary w-75' href='#mapa'>Přejít na mapu</a>
      </div>
    </div>
  </div>
</div>
    `}`;
    return this.innerHTML = template
  }
}