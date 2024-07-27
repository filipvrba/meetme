export default class ElmDashboardAccountSettings < HTMLElement
  def initialize
    super

    @user_id = self.get_attribute('user-id')

    init_elm()

    @full_name       = self.query_selector('#dashAccSettingsFullName')
    @email           = self.query_selector('#dashAccSettingsEmail')
    @bio             = self.query_selector('#dashAccSettingsBio')
    @profile_picture = self.query_selector('#dashAccSettingsProfilePicture')

    window.dash_acc_settings_save_changes_click = dash_acc_settings_save_changes_click
  end

  def connected_callback()
  end

  def disconnected_callback()
  end

  def dash_acc_settings_save_changes_click()
    
  end

  def init_elm()
    template = """
<elm-dashboard-header user-id='#{@user_id}'></elm-dashboard-header>
<div class='card'>
  <div class='card-body'>
    <h1 class='card-title text-center'>Nastavení účtu</h1>
    <div class='mb-3'>
      <label for='dashAccSettingsFullName' class='form-label'>Celé jméno</label>
      <input type='text' class='form-control' id='dashAccSettingsFullName' required>
    </div>
    <div class='mb-3'>
      <label for='dashAccSettingsEmail' class='form-label'>Email</label>
      <input type='email' class='form-control' id='dashAccSettingsEmail' required>
    </div>
    <div class='mb-3'>
      <label for='dashAccSettingsBio' class='form-label'>Bio</label>
      <textarea class='form-control' id='dashAccSettingsBio' rows='3'></textarea>
    </div>
    <div class='mb-3'>
      <label for='dashAccSettingsProfilePicture' class='form-label'>Profilová fotka</label>
      <input type='file' class='form-control' id='dashAccSettingsProfilePicture' accept='image/*'>
    </div>
    <button class='btn btn-primary w-100' onclick='dashAccSettingsSaveChangesClick()'>Uložit změny</button>
  </div>
</div>
    """

    self.innerHTML = template
  end

  def update_init_elm(options)
    
  end
end