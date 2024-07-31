import 'CDatabse', '../../components/elm-chat-messenger/database'
import 'CContent', '../../components/elm-chat-messenger/content'

export default class ElmChatMessenger < HTMLElement
  attr_reader :user_id

  def initialize
    super
    @h_chat_update = lambda { chat_update() }

    @h_chat_menu_li_click = lambda { |e| update_init_elm(e.detail.value) }
    @h_btn_click = lambda { btn_click() }
    
    @user_id    = self.get_attribute('user-id')
    @id         = nil
    @c_database = CDatabse.new(self)

    init_elm()

    @container_messages = self.query_selector('#chatMessengerContainerMessages')
    @input = self.query_selector('#chatMessengerInput')
    @btn = self.query_selector('#chatMessengerBtn')
  end

  def connected_callback()
    Events.connect('#app', 'chatMenuLiClick', @h_chat_menu_li_click)
    @btn.add_event_listener('click', @h_btn_click)
    Events.connect('#app', 'chatUpdate', @h_chat_update)
  end

  def disconnected_callback()
    Events.disconnect('#app', 'chatMenuLiClick', @h_chat_menu_li_click)
    @btn.remove_event_listener('click', @h_btn_click)
    Events.disconnect('#app', 'chatUpdate', @h_chat_update)
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

  def update_init_elm(id)
    @id = id

    @c_database.get_avatars_with_messages(@id) do |data|
      @c_content = CContent.new(data)
      @container_messages.innerHTML = @c_content.subinit_elm(@id)
      scroll_down()
    end
  end

  def init_elm()
    template = """
<div class='container-messenger'>
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

  def scroll_down()
    @container_messages.scroll_to({
      top: @container_messages.scroll_height,
      behavior: 'smooth'
    });
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