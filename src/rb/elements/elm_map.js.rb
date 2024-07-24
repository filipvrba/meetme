import 'maplibregl', 'maplibre-gl'
import ['ENV'], '../env'

import 'CGeolocation', '../components/elm-map/geolocation'
import 'CAnimations', '../components/elm-map/animations'
import 'CMarkers', '../components/elm-map/markers'

export default class ElmMap < HTMLElement
  def initialize
    super

    @h_load_map = lambda { loaded_map() }

    @c_geolocation = CGeolocation.new
    @c_animations = CAnimations.new
    
    init_elm()
  end

  def connected_callback()
    @c_animations.connected_callback()
    
    @map = maplibregl.Map.new({
      container: 'map',
      style: "https://api.maptiler.com/maps/streets-v2/style.json?key=#{ENV::VITE_API_KEY_MAPTILER}",
      center: [0, 0],
      zoom: 15
    })
    @map.on('load', @h_load_map)

    @c_markers = CMarkers.new(@map)
  end

  def disconnected_callback()
    @c_animations.disconnected_callback()
  end

  def loaded_map()
    @c_geolocation.get_position() do |position|
      @map.set_center([position.x, position.y])

      @c_markers.add({
        position: position,
        id: 0,
        src: 'https://avatars.githubusercontent.com/u/49731748?v=4'
      })
    end
  end

  def init_elm()
    template = """
<div id='map'></div>
    """

    self.innerHTML = template
  end
end