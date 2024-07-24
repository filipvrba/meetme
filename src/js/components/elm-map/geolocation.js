export default class CGeolocation {
  constructor() {
    this._hSuccess = p => this.success(p);
    this._callbackPosition = null
  };

  getPosition(callback) {
    if (navigator.geolocation) {
      this._callbackPosition = callback;

      return navigator.geolocation.getCurrentPosition(
        this._hSuccess,
        this.error.bind(this)
      )
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

  error() {
    return alert("Unable to retrieve your location.")
  }
}