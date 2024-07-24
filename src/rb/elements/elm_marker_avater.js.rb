export default class ElmMarkerAvater < HTMLElement
  def initialize
    super
    
    @id_avatar = self.get_attribute('id-avatar')
    @src       = self.get_attribute('src')

    init_elm()

    window.marker_avatar_click = marker_avatar_click
  end

  def connected_callback()
  end

  def disconnected_callback()
  end

  def marker_avatar_click(id_avatar)
    puts id_avatar
  end

  def init_elm()
    template = """
    <img id='avatar-#{@id_avatar}' class='rounded-circle' onclick='markerAvatarClick(#{@id_avatar})' alt='Marker avatar' width='64' height='64' src='#{@src}'></img>
    """

    self.innerHTML = template
  end
end