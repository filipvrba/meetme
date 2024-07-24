import 'maplibregl', 'maplibre-gl'
import ['ENV'], '../env'

export default class ElmMap < HTMLElement
  def initialize
    super
    
    init_elm()
  end

  def connected_callback()
    @map = maplibregl.Map.new({
      container: 'map',
      style: "https://api.maptiler.com/maps/streets-v2/style.json?key=#{ENV::VITE_API_KEY_MAPTILER}",
      center: [0, 0],  # starting position [lng, lat]
      zoom: 1
    })
    # map.set_zoom(10)

    update_geolocation()
  end

  def disconnected_callback()
  end

  def init_elm()
    template = """
<div id='map'></div>
    """

    self.innerHTML = template
  end

  def update_geolocation()
    if navigator.geolocation
      navigator.geolocation.get_current_position(geolocation_success, geolocation_error)
    else
      alert("Geolocation is not supported by this browser.")
    end
  end

  def geolocation_success(position)
    lng = position.coords.longitude
    lat = position.coords.latitude

    @map.set_center([lng, lat])
    @map.set_zoom(20);
  end

  def geolocation_error()
    alert("Unable to retrieve your location.")
  end
end