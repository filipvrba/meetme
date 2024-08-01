import 'ElmAlert', '../elm_alert'
import 'CNotifications', '../../components/elm-dashboard-footer/notifications'

export default class ElmDashboardFooter < HTMLElement
  attr_reader :user_id, :notification

  def initialize
    super
    @h_alert_show           = lambda { |e| alert_show(e.detail.value) }
    @h_icon_dashboard_click = lambda { icon_dashboard_click() }

    @user_id    = self.get_attribute('user-id')

    init_elm()

    @icon_dashboard = self.query_selector('#dashboardFooterIconDashboard')
    @icon_map       = self.query_selector('#dashboardFooterIconMap')
    @icon_chat      = self.query_selector('#dashboardFooterIconChat')
    @notification   = self.query_selector('#dashFooterNotification')

    @c_notifications = CNotifications.new(self)

    update_subinit_elm()
  end

  def connected_callback()
    Events.connect('#app', ElmAlert::ENVS::SHOW, @h_alert_show)
    @icon_dashboard.add_event_listener('click', @h_icon_dashboard_click)
  end

  def disconnected_callback()
    Events.disconnect('#app', ElmAlert::ENVS::SHOW, @h_alert_show)
    @icon_dashboard.remove_event_listener('click', @h_icon_dashboard_click)

    @c_notifications.dispose()
  end

  def icon_dashboard_click()
    URLParams.set('m-index', 0)
  end

  def alert_show(data)
    if data.style == 'success'
      update_subinit_elm()
    end
  end

  def init_elm()
    template = """
<footer class='footer navbar-light bg-light'>
  <div class='container-fluid'>
    <div class='row text-center icons-padding'>
      <div class='col'>
        <a href='#dashboard' id='dashboardFooterIconDashboard' class='text-dark'>
          <i class='bi bi-speedometer2 icon-large'></i>
        </a>
      </div>
      <div class='col'>
        <a href='#chat' id='dashboardFooterIconChat' class='text-dark disabled-link'>
          <i class='bi bi-chat icon-large'>
            <span id='dashFooterNotification' style='top: 10px;' class='position-absolute translate-middle p-2 bg-danger border border-light rounded-circle notification-display'>
              <span class='visually-hidden'>New alerts</span>
            </span>
          </i>
        </a>
      </div>
      <div class='col'>
        <a href='#mapa' id='dashboardFooterIconMap' class='text-dark disabled-link'>
          <i class='bi bi-map icon-large'></i>
        </a>
      </div>
    </div>
  </div>
</footer>
    """

    self.innerHTML = template
  end

  def update_subinit_elm()
    query = "SELECT id FROM image_avatars WHERE user_id = #{@user_id};"
    __bef_db.get(query) do |rows|
      if rows.length > 0
        @icon_map.class_list.remove('disabled-link')
        @icon_chat.class_list.remove('disabled-link')

        @c_notifications.update()
      end
    end
  end
end