import 'maplibregl', 'maplibre-gl'
import ['ENV'], '../env'

import 'CGeolocation', '../components/elm-map/geolocation'
import 'CAnimations', '../components/elm-map/animations'

export default class ElmMap < HTMLElement
  def initialize
    super

    @c_animations = CAnimations.new
    
    init_elm()
  end

  def connected_callback()
    @c_animations.connected_callback()
    
    c_geolocation = CGeolocation.new
    
    @map = maplibregl.Map.new({
      container: 'map',
      style: "https://api.maptiler.com/maps/streets-v2/style.json?key=#{ENV::VITE_API_KEY_MAPTILER}",
      center: [0, 0],
      zoom: 15
    })

    c_geolocation.get_position() do |position|
      @map.set_center([position.x, position.y])
    end

    # @map.on('load', lambda do
    
    #   c_geolocation.get_position() do |position|
    #     m_old_position = @map.get_center()
    #     m_old_position = Vector.new(m_old_position.lng, m_old_position.lat)
  
    #     # @map.set_zoom(15)
    #     @c_animations.move_position(position, m_old_position) do |lerp_position|
    #       @map.set_center([lerp_position.x, lerp_position.y])
    #     end
    #   end

    # end)
  end

  def disconnected_callback()
    @c_animations.disconnected_callback()
  end

  def init_elm()
    template = """
<div id='map'></div>
    """

    self.innerHTML = template
  end
end