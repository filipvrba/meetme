export default class CGeolocation {
  constructor() {
    this._hSuccess = p => this.success(p);
    this._callbackPosition = null;
    this._geoId = null
  };

  getPosition(callback) {
    let options;

    if (navigator.geolocation) {
      this._callbackPosition = callback;
      options = {enableHighAccuracy: true, timeout: 5_000, maximumAge: 0};

      this._geoId = navigator.geolocation.watchPosition(
        this._hSuccess,
        this.error.bind(this),
        options
      );

      return this._geoId
    } else {
      return alert("Geolocation is not supported by this browser.")
    }
  };

  success(position) {
    let lng = position.coords.longitude;
    let lat = position.coords.latitude;
    position = new Vector(lng, lat);
    if (this._callbackPosition) return this._callbackPosition(position)
  };

  error(message) {
    return alert(`Unable to retrieve your location (${message.code}).`)
  };

  stopWatch() {
    return navigator.geolocation.clearWatch(this._geoId)
  }
}