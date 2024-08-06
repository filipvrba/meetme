export default class ElmMapGeolocationAlert < HTMLElement
  ENVS = {
    show: 'geolocationAlerShow',
    hide: 'geolocationAlerHide'
  }

  def initialize
    super
    @l_popstate = lambda { |e| popstate(e) }
    @l_geolocation_aler_show = lambda { |e| show(e.detail.value) if !@is_shown }
    @l_geolocation_aler_hide = lambda { popstate(nil) }
    @l_moda_hide = lambda { hide() }

    @is_shown = false 

    init_elm()

    @none_btn = self.query_selector('#geolocationAlertBtn')
    @modal_message = self.query_selector('#mapGeoAlertModalMessage')
  end

  def connected_callback()
    window.add_event_listener('popstate', @l_popstate)
    Events.connect('#app', ElmMapGeolocationAlert::ENVS.show, @l_geolocation_aler_show)
    Events.connect('#app', ElmMapGeolocationAlert::ENVS.hide, @l_geolocation_aler_hide)
    Events.connect('#geolocationAlertModal', 'hide.bs.modal', @l_moda_hide)
  end

  def disconnected_callback()
    window.remove_event_listener('popstate', @l_popstate)
    Events.disconnect('#app', ElmMapGeolocationAlert::ENVS.show, @l_geolocation_aler_show)
    Events.disconnect('#app', ElmMapGeolocationAlert::ENVS.hide, @l_geolocation_aler_hide)
    Events.disconnect('#geolocationAlertModal', 'hide.bs.modal', @l_moda_hide)
  end

  def popstate(event)
    Events.emit('#geolocationAlertModal', 'modal.hide')
  end

  def show(code)
    @is_shown = true
    
    if code == 1
      @modal_message.innerHTML = "Prosím, zapněte GPS pro získání vaší polohy."
    else
      @modal_message.innerHTML = "Unable to retrieve your location (code #{message.code})."
    end

    @none_btn.click()
  end

  def hide()
    @is_shown = false
  end

  def init_elm()
    template = """
<input id='geolocationAlertBtn' type='button' data-bs-toggle='modal' data-bs-target='#geolocationAlertModal' style='display: none;'>
<div class='modal fade' id='geolocationAlertModal' tabindex='-1' aria-labelledby='geolocationAlertModalLabel' aria-hidden='true'>
  <div class='modal-dialog'>
    <div class='modal-content'>
      <div class='modal-header'>
        <h5 class='modal-title' id='geolocationAlertModalLabel'>
          <i class='bi bi-exclamation-triangle'></i>
          Geolokace
        </h5>
        <button type='button' class='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
      </div>
      <div class='modal-body text-center'>
        <i class='bi bi-geo-fill h1'></i>
        <p id='mapGeoAlertModalMessage' class='lead mt-3'></p>
      </div>
    </div>
  </div>
</div>
    """

    self.innerHTML = template
  end
end