export default class ElmMarkerAvater < HTMLElement
  def initialize
    super
    
    @user_id = self.get_attribute('user-id')
    @src     = self.get_attribute('src')

    init_elm()

    window.marker_avatar_click = marker_avatar_click
  end

  def connected_callback()
  end

  def disconnected_callback()
  end

  def marker_avatar_click(id_avatar)
    Events.emit('#app', 'avatarClick', id_avatar)
  end

  def init_elm()
    template = """
    <img id='avatar-#{@user_id}' class='rounded-circle' onclick='markerAvatarClick(#{@user_id})' alt='Marker avatar' width='64' height='64' src='#{@src}'></img>
    """

    self.innerHTML = template
  end
end