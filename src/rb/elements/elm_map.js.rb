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

    @timeout_id = nil
  end

  def initialize_protected()
    init_elm()

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
  
  def connected_callback()
    super
    @c_animations.connected_callback()
  end

  def disconnected_callback()
    super
    @c_animations.disconnected_callback()

    clear_timeout(@timeout_id)
  end

  def loaded_map()
    l_update_markers = lambda do
      @c_geolocation.get_position() do |position|
        @map.set_center([position.x, position.y])

        @c_markers.server_add_from_db(position)
      end

      @timeout_id = set_timeout(l_update_markers, 10_000)
    end

    l_update_markers.call()
  end

  def init_elm()
    template = """
<elm-map-user-details></elm-map-user-details>
<div id='map'></div>
<elm-dashboard-footer user-id='#{@user_id}'></elm-dashboard-footer>
    """

    self.innerHTML = template
  end
end