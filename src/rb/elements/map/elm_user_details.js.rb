import 'CDatabase', '../../components/elm-user-details/database'

export default class ElmMapUserDetails < HTMLElement
  attr_reader :user_id

  def initialize
    super
    
    @l_popstate     = lambda { |e| popstate(e) }
    @h_avatar_click = lambda { |e| update_element(e.detail.value) }

    @user_id = self.get_attribute('user-id').to_i

    init_elm()

    @img       = self.query_selector('#userDetailImg')
    @full_name = self.query_selector('#userDetailName')
    @bio       = self.query_selector('#userDetailBio')
    @button    = self.query_selector('#userDetailsBtn')

    @c_database = CDatabase.new(self)
  end

  def connected_callback()
    window.add_event_listener('popstate', @l_popstate)
    Events.connect('#app', 'avatarClick', @h_avatar_click)
  end

  def disconnected_callback()
    window.remove_event_listener('popstate', @l_popstate)
    Events.disconnect('#app', 'avatarClick', @h_avatar_click)
    @button.remove_event_listener('click', @h_button_click)
  end

  def popstate(event)
    Events.emit('#userDetailModal', 'modal.hide')
  end

  def update_element(user_id)
    @img.src             = 'https://via.placeholder.com/150'
    @full_name.innerHTML = ''
    @bio.innerHTML       = ''

    unless @user_id == user_id
      @button.onclick = lambda { button_click(user_id) }
      @button.class_list.remove('disabled')
    else
      @button.class_list.add('disabled')
    end

    @c_database.get_details(user_id) do |row|
      @img.src             = row['image_base64']
      @full_name.innerHTML = row['full_name'].decode_base64()
      @bio.innerHTML       = row['bio'].decode_base64()
    end
  end

  def button_click(user_id)
    @c_database.start_conversation(user_id, "HELLO") do
      
    end
  end

  def init_elm()
    template = """
<div class='modal fade' id='userDetailModal' tabindex='-1' aria-labelledby='profileModalLabel' aria-hidden='true'>
  <div class='modal-dialog'>
    <div class='modal-content'>
      <div class='modal-header'>
        <h5 class='modal-title' id='profileModalLabel'>Profilová karta</h5>
        <button type='button' class='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
      </div>
      <div class='modal-body'>
        <div class='card' style='border: none;'>
          <img id='userDetailImg' src='https://via.placeholder.com/150' class='mx-auto rounded-circle' width='256' height='256' alt='Profilová fotka'>
          <div class='card-body'>
            <h5 id='userDetailName' class='card-title'></h5>
            <p id='userDetailBio' class='card-text'></p>
            <div class='text-center mt-3'>
              <button id='userDetailsBtn' type='button' class='btn btn-primary'>
                <i class='bi bi-chat'></i> Zahájit konverzaci
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
    """

    self.innerHTML = template
  end
end