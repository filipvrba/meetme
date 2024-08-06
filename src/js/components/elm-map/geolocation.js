import ElmMapGeolocationAlert from "../../elements/map/elm_geolocation_alert";

export default class CGeolocation {
  constructor() {
    this._hSuccess = p => this.success(p);
    this._callbackPosition = null
  };

  getPosition(callback) {
    let options;

    if (navigator.geolocation) {
      this._callbackPosition = callback;
      options = {enableHighAccuracy: true, maximumAge: 0};

      return navigator.geolocation.getCurrentPosition(
        this._hSuccess,
        this.error.bind(this),
        options
      )
    } else {
      return Events.emit("#app", ElmMapGeolocationAlert.ENVS.show, -1)
    }
  };

  success(position) {
    let lng = position.coords.longitude;
    let lat = position.coords.latitude;
    position = new Vector(lng, lat);
    Events.emit("#app", ElmMapGeolocationAlert.ENVS.hide);
    if (this._callbackPosition) return this._callbackPosition(position)
  };

  error(message) {
    return Events.emit(
      "#app",
      ElmMapGeolocationAlert.ENVS.show,
      message.code
    )
  }
}