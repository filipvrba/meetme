import 'CDatabase', '../../components/elm-account-settings/database'
import 'CFiles', '../../components/elm-account-settings/files'
import 'ElmAlert', '../elm_alert'

export default class ElmDashboardAccountSettings < HTMLElement
  attr_reader :user_id, :c_files

  def initialize
    super
    @h_bef_error = lambda { error_save_changes() }
    @h_bio_input = lambda { bio_auto_resize() }

    @user_id     = self.get_attribute('user-id')

    init_elm()

    @full_name       = self.query_selector('#dashAccSettingsFullName')
    @email           = self.query_selector('#dashAccSettingsEmail')
    @bio             = self.query_selector('#dashAccSettingsBio')
    @mirror_bio      = self.query_selector('#dashAccSettingsMirrorBio')
    @profile_picture = self.query_selector('#dashAccSettingsProfilePicture')
    @spinner_overlay = self.query_selector('#dashAccSettingsSpinner')

    window.dash_acc_settings_save_changes_click = dash_acc_settings_save_changes_click

    @c_database = CDatabase.new(self)
    @c_files    = CFiles.new(@profile_picture, @c_database)

    @c_database.get_user_details() do |options|
      update_init_elm(options)
    end
  end

  def connected_callback()
    Events.connect('#app', 'befError', @h_bef_error)
    @bio.add_event_listener('input', @h_bio_input)
  end

  def disconnected_callback()
    Events.disconnect('#app', 'befError', @h_bef_error)
    @bio.remove_event_listener('input', @h_bio_input)
  end

  def error_save_changes()
    set_spinner_display(false)
    Events.emit('#app', ElmAlert::ENVS::SHOW, {
      end_time: 15,
      message: "Uložení účtu nebylo úspěšné. Pravděpodobnou příčinou " +
               "chyby je příliš velká profilová fotografie.",
      style: "danger"
    })
  end

  def bio_auto_resize()
    styles = window.get_computed_style(@bio)
    @mirror_bio.style.font_family = styles.font_family
    @mirror_bio.style.font_size   = styles.font_size
    @mirror_bio.style.line_height = styles.line_height
    @mirror_bio.style.padding     = styles.padding
    @mirror_bio.style.border      = styles.border
    @mirror_bio.style.width       = styles.width

    @mirror_bio.textContent = "#{@bio.value}\n"
    mirror_height           = @mirror_bio.offset_height

    @bio.style.height = "#{mirror_height}px"
  end

  def dash_acc_settings_save_changes_click()
    full_name = @full_name.value.encode_base64()
    email = @email.value
    bio = @bio.value.encode_base64()

    @c_database.save_changes(full_name, email, bio) do
      Events.emit('#app', ElmAlert::ENVS::SHOW, {
        end_time: 7,
        message: "Vaše profilová data byla úspěšně uložena.",
        style: "success"
      })
    end
  end

  def init_elm()
    template = """
<elm-dashboard-header user-id='#{@user_id}'></elm-dashboard-header>
<div class='card'>
  <div class='card-body'>
    <h1 class='card-title text-center'>Nastavení účtu</h1>

    <div class='form-container'>
      <elm-spinner class='spinner-overlay' id='dashAccSettingsSpinner'></elm-spinner>
    
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
        <textarea class='form-control' id='dashAccSettingsBio' rows='1'></textarea>
        <div id='dashAccSettingsMirrorBio' class='mirror-div'></div>
      </div>
      <div class='mb-3'>
        <label for='dashAccSettingsProfilePicture' class='form-label'>Profilová fotka</label>
        <input type='file' class='form-control' id='dashAccSettingsProfilePicture' accept='image/*'>
      </div>
      <button class='btn btn-primary w-100' onclick='dashAccSettingsSaveChangesClick()'>Uložit změny</button>
    </div>
  </div>
</div>
    """

    self.innerHTML = template
  end

  def update_init_elm(options)
    @full_name.value = options['full_name'].decode_base64()
    @email.value     = options.email
    @bio.value       = options.bio.decode_base64()

    bio_auto_resize()
  end

  def set_spinner_display(is_disabled)
    @spinner_overlay.style.display = is_disabled ? '' : :none
  end
end