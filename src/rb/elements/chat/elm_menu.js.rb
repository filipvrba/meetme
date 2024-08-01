import 'CDatabase', '../../components/elm-chat-menu/database'

export default class ElmChatMenu < HTMLElement
  attr_reader :user_id

  def initialize
    super
    @h_chat_update = lambda { chat_update() }
    
    @user_id = self.get_attribute('user-id')

    init_elm()

    @menu_list = self.query_selector('#chatMenuList')
    @container_notification = self.query_selector('#chatMenuContainerNotification')

    @c_database = CDatabase.new(self)
    chat_update()

    window.chat_menu_li_click = chat_menu_li_click
  end

  def connected_callback()
    Events.connect('#app', 'chatUpdate', @h_chat_update)
  end

  def disconnected_callback()
    Events.disconnect('#app', 'chatUpdate', @h_chat_update)
  end

  def chat_menu_li_click(id)
    Events.emit('#offcanvasChatMenu', 'offcanvas.hide')
    Events.emit('#app', 'chatMenuLiClick', id)
  end

  def chat_update()
    @c_database.get_all_relevant_users() do |rows|
      subinit_elm(rows) if rows
      
      @c_database.get_notifications() do |rows|
        update_notifications_subinit_elm(rows)
        Events.emit('#app', 'chatNotifications', rows)
      end
    end
  end

  def init_elm()
    template = """
<div class='offcanvas offcanvas-start' data-bs-scroll='true' tabindex='-1' id='offcanvasChatMenu' aria-labelledby='offcanvasChatMenuLabel'>
  <div class='offcanvas-header'>
    <button type='button' class='btn-close' data-bs-dismiss='offcanvas' aria-label='Close'></button>
  </div>
  <div class='offcanvas-body'>
    <h5>Uživatelé</h5>
    <ul id='chatMenuList' class='list-group list-group-flush'></ul>
  </div>
</div>
    """

    self.innerHTML = template
  end

  def subinit_elm(rows)
    result = []

    rows.each do |row|
      id        = row['id'] 
      full_name = row['full_name'].decode_base64()
      img       = row['image_base64']
      is_logged = row['is_logged'].to_i == 1 ?
      '<small class="text-success">Online</small>' :
      '<small class="text-danger">Offline</small>'

      template = """
      <li class='list-group-item d-flex align-items-center' onclick='chatMenuLiClick(#{id})'>
        <div id='chatMenuContainerNotification#{id}' class='notification-display'>
          <span class='position-absolute top-0 start-100 translate-middle p-2 bg-danger border border-light rounded-circle'>
            <span class='visually-hidden'>New alerts</span>
          </span>
        </div>

        <img src='#{img}' class='rounded-circle' width='40' height='40' alt='Avatar #{full_name}'>
        <div style='margin-left: 12px;'>
          <h6 class='mb-0'>#{full_name}</h6>
          <small class='text-muted'>#{is_logged}</small>
        </div>
      </li>
      """
      result.push(template)
    end

    @menu_list.innerHTML = result.join('')
  end

  def update_notifications_subinit_elm(rows)
    rows.each do |notification|
      id = notification['user_id']
      notification_elm = self.query_selector("#chatMenuContainerNotification#{id}")
      notification_elm.class_list.remove('notification-display') if notification_elm
    end
  end
end