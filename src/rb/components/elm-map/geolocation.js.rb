export default class CGeolocation
  def initialize
    @h_success = lambda { |p| success(p) }
    @callback_position = nil

    @geo_id = nil
  end

  def get_position(&callback)
    if navigator.geolocation
      @callback_position = callback

      options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
      @geo_id = navigator.geolocation.watch_position(@h_success, error, options)
    else
      alert("Geolocation is not supported by this browser.")
    end
  end

  def success(position)
    lng = position.coords.longitude
    lat = position.coords.latitude
    position = Vector.new(lng, lat)

    @callback_position.call(position) if @callback_position
  end

  def error(message)
    alert("Unable to retrieve your location (#{message.code}).")
  end

  def stop_watch()
    navigator.geolocation.clear_watch(@geo_id)
  end
end