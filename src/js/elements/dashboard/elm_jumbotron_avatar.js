export default class ElmDashboardJumbotronAvatar extends HTMLElement {
  constructor() {
    super();
    this.initElm();
    window.dashJumbAvatarBtnClick = this.dashJumbAvatarBtnClick.bind(this)
  };

  connectedCallback() {
    return null
  };

  disconnectedCallback() {
    return null
  };

  dashJumbAvatarBtnClick() {
    return document.getElementById("dashboard-header-settings-link").click()
  };

  initElm() {
    let template = `${`
<div class='position-relative p-5 text-center text-muted bg-body border border-dashed rounded-5'>
  <i class='bi bi-person' style='font-size: 48px;'></i>
  <h2 class='text-body-emphasis'>Profilová fotografie</h2>
  <p class='col-lg-6 mx-auto mb-4'>
    Pro plnou funkčnost aplikace MeetMe je nutné nahrát profilovou fotografii na váš účet.
    Prosím, přejděte do nastavení účtu.
  </p>
  <button class='btn btn-primary px-5 mb-5' type='button' onclick='dashJumbAvatarBtnClick()'>
    <i class='bi bi-gear'></i>  Přejít do nastavení
  </button>
</div>
    `}`;
    return this.innerHTML = template
  }
}