import 'maplibregl', 'maplibre-gl'
import ['ENV'], '../env'

import 'AProtectionElement', './abstracts/protection_element'
import 'CGeolocation', '../components/elm-map/geolocation'
import 'CAnimations', '../components/elm-map/animations'
import 'CMarkers', '../components/elm-map/markers'
import 'CDatabase', '../components/elm-map/database'

export default class ElmMap < AProtectionElement
  attr_reader :c_database, :user_id, :map

  def initialize
    super

    @h_load_map = lambda { loaded_map() }

    @c_geolocation = CGeolocation.new
    @c_animations = CAnimations.new
    
    init_elm()
  end

  def initialize_protected()
    @map = maplibregl.Map.new({
      container: 'map',
      style: "https://api.maptiler.com/maps/streets-v2/style.json?key=#{ENV::VITE_API_KEY_MAPTILER}",
      center: [0, 0],
      zoom: 15
    })
    @map.on('load', @h_load_map)

    @c_database = CDatabase.new(@user_id)
    @c_markers  = CMarkers.new(self)
  end

  # def dispose()
  #   @c_markers.remove(@user_id)
  #   @c_geolocation.stop_watch()
  # end

  def connected_callback()
    super
    @c_animations.connected_callback()
  end

  def disconnected_callback()
    super
    @c_animations.disconnected_callback()
  end

  def loaded_map()
    @c_geolocation.get_position() do |position|
      @map.set_center([position.x, position.y])

      @c_markers.server_add_from_db(position)
    end
  end

  def init_elm()
    template = """
<div id='map'></div>
    """

    self.innerHTML = template
  end
end