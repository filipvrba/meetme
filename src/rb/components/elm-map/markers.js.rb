import 'maplibregl', 'maplibre-gl'

export default class CMarkers
  attr_reader :markers

  def initialize(map)
    @map = map
    @markers = {}
  end

  def add(options)
    marker = maplibregl.Marker.new
    .setLngLat([options.position.x, options.position.y])
    .addTo(@map)

    marker.get_element().innerHTML = """
    <elm-marker-avater id-avatar='#{options.id}' src='#{options.src}'></elm-marker-avater>
    """

    @markers[options.id] = marker
  end
end