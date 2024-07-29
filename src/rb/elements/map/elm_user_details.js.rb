import 'CDatabase', '../../components/elm-user-details/database'

export default class ElmMapUserDetails < HTMLElement
  def initialize
    super
    
    @l_popstate   = lambda { |e| popstate(e) }
    @h_avatar_click = lambda { |e| update_element(e.detail.value) }

    init_elm()

    @img       = self.query_selector('#userDetailImg')
    @full_name = self.query_selector('#userDetailName')
    @bio       = self.query_selector('#userDetailBio')

    @c_database = CDatabase.new
  end

  def connected_callback()
    window.add_event_listener('popstate', @l_popstate)
    Events.connect('#app', 'avatarClick', @h_avatar_click)
  end

  def disconnected_callback()
    window.remove_event_listener('popstate', @l_popstate)
    Events.disconnect('#app', 'avatarClick', @h_avatar_click)
  end

  def popstate(event)
    Events.emit('#userDetailModal', 'modal.hide')
  end

  def update_element(user_id)
    @img.src             = 'https://via.placeholder.com/150'
    @full_name.innerHTML = ''
    @bio.innerHTML       = ''

    @c_database.get_details(user_id) do |row|
      @img.src             = row['image_base64']
      @full_name.innerHTML = row['full_name'].decode_base64()
      @bio.innerHTML       = row['bio'].decode_base64()
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