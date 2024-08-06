export default class CGeolocation
  def initialize
    @h_success = lambda { |p| success(p) }
    @callback_position = nil
  end

  def get_position(&callback)
    if navigator.geolocation
      @callback_position = callback

      options = {
        enable_high_accuracy: true,
        maximum_age: 0,
      }
      navigator.geolocation.get_current_position(@h_success, error, options)
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
    case message.code
    when 1
      alert("Prosím, zapněte GPS pro získání vaší polohy.");
      return
    else
      alert("Unable to retrieve your location (#{message.code}).")
      return
    end
  end
end