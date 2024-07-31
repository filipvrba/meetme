export default class ElmDashboardFooter < HTMLElement
  def initialize
    super
    
    @user_id = self.get_attribute('user-id')

    init_elm()

    @icon_map  = self.query_selector('#dashboardFooterIconMap')
    @icon_chat = self.query_selector('#dashboardFooterIconChat')
    
    query = "SELECT id FROM image_avatars WHERE user_id = #{@user_id};"
    __bef_db.get(query) do |rows|
      if rows.length > 0
        @icon_map.class_list.remove('disabled-link')
        @icon_chat.class_list.remove('disabled-link')
      end
    end
  end

  def connected_callback()
  end

  def disconnected_callback()
  end

  def init_elm()
    template = """
<footer class='footer navbar-light bg-light'>
  <div class='container-fluid'>
    <div class='row text-center icons-padding'>
      <div class='col'>
        <a href='#dashboard' class='text-dark'>
          <i class='bi bi-speedometer2 icon-large'></i>
        </a>
      </div>
      <div class='col'>
        <a href='#chat' id='dashboardFooterIconChat' class='text-dark disabled-link'>
          <i class='bi bi-chat icon-large'></i>
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
end