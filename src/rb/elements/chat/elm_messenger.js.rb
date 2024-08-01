import 'CDatabse', '../../components/elm-chat-messenger/database'
import 'CContent', '../../components/elm-chat-messenger/content'

export default class ElmChatMessenger < HTMLElement
  attr_reader :user_id

  def initialize
    super
    @h_chat_update = lambda { chat_update() }
    @h_chat_notifications = lambda { |e| chat_notifications(e.detail.value) }

    @h_chat_menu_li_click = lambda { update_init_elm(URLParams.get_index('m-index'), true) }
    @h_btn_click = lambda { btn_click() }
    @h_input_keypress = lambda { |e| input_keypress(e) }
    
    @user_id    = self.get_attribute('user-id')
    @id         = nil
    @c_database = CDatabse.new(self)

    init_elm()

    @container_messages = self.query_selector('#chatMessengerContainerMessages')
    @input = self.query_selector('#chatMessengerInput')
    @btn = self.query_selector('#chatMessengerBtn')
    @container_messenger = self.query_selector('.container-messenger')

    id_parameter = URLParams.get_index('m-index')
    if id_parameter
      @h_chat_menu_li_click.call()
    end
  end

  def connected_callback()
    Events.connect('#app', 'chatMenuLiClick', @h_chat_menu_li_click)
    @btn.add_event_listener('click', @h_btn_click)
    Events.connect('#app', 'chatUpdate', @h_chat_update)
    Events.connect('#app', 'chatNotifications', @h_chat_notifications)
    @input.add_event_listener('keypress', @h_input_keypress)
  end

  def disconnected_callback()
    Events.disconnect('#app', 'chatMenuLiClick', @h_chat_menu_li_click)
    @btn.remove_event_listener('click', @h_btn_click)
    Events.disconnect('#app', 'chatUpdate', @h_chat_update)
    Events.disconnect('#app', 'chatNotifications', @h_chat_notifications)
    @input.remove_event_listener('keypress', @h_input_keypress)
  end

  def input_keypress(event)
    if event.key == 'Enter'
      @btn.click()
    end
  end

  def chat_notifications(rows)
    unless @id
      return
    end

    result = []
    rows.each do |row|
      if @id == row['user_id'].to_i
        result.push(row['notification_id'])
      end
    end

    unless result.length > 0
      return
    end

    @c_database.delete_notifications(result)
  end

  def chat_update()
    unless @id
      return
    end

    update_init_elm(@id)
  end

  def btn_click()
    unless @id && @input.value != '' 
      return
    end

    date = Date.new.toISO_string()

    offline_send_message(date)
    scroll_down()

    message_elm = document.get_element_by_id("message-#{date}")

    @c_database.send_message(@id, @input.value) do |is_sent|
      message_elm.class_list.remove('inactive') if is_sent
    end
    
    @input.value = ''
    message_elm.class_list.add('inactive')
  end

  def update_init_elm(id, sudo = false)
    @id = id

    @c_database.get_avatars_with_messages(@id) do |data|
      @container_messenger.class_list.remove('messenger-display')

      @c_content = CContent.new(data)
      @container_messages.innerHTML = @c_content.subinit_elm(@id)
      scroll_down(sudo)
    end
  end

  def init_elm()
    template = """
<div class='container-messenger messenger-display'>
  <div class='col-md-9 p-3 mx-auto d-flex flex-column' style='height: 100%;'>
    <div id='chatMessengerContainerMessages' class='border rounded p-3 mb-3 flex-grow-1' style='overflow-y: auto;'>
    </div>

    <div class='input-group mt-auto'>
      <input id='chatMessengerInput' type='text' class='form-control' placeholder='Napiš zprávu...'>
      <div class='input-group-append'>
        <button id='chatMessengerBtn' class='btn btn-primary' type='button'><i class='bi bi-send'></i></button>
      </div>
    </div>

  </div>
</div>
    """

    self.innerHTML = template
  end

  def scroll_down(sudo = false)
    current_scroll = @container_messages.scroll_top + @container_messages.client_height
    max_scroll = @container_messages.scroll_height

    if max_scroll - current_scroll <= 100 || sudo
      @container_messages.scroll_to({
        top: @container_messages.scroll_height
      })
    end
  end

  def offline_send_message(date)
    m_new_data = Object.assign({}, @c_content.data)
    m_new_data.messages = [{
      'user_id' => @user_id,
      'message' => @input.value.encode_base64(),
    }]
    @c_content = CContent.new(m_new_data)
    @container_messages.innerHTML += @c_content.subinit_elm(@id, date)
  end
end