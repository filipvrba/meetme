export default class ElmDashboardJumbotronAvatar < HTMLElement
  def initialize
    super

    init_elm()

    window.dash_jumb_avatar_btn_click = dash_jumb_avatar_btn_click
  end

  def connected_callback()
  end

  def disconnected_callback()
  end

  def dash_jumb_avatar_btn_click()
    document.get_element_by_id('dashboard-header-settings-link').click()
  end

  def init_elm()
    template = """
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
    """

    self.innerHTML = template
  end
end