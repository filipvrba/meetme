import maplibregl from "maplibre-gl";
import { ENV } from "../env";

export default class ElmMap extends HTMLElement {
  constructor() {
    super();
    this.initElm()
  };

  connectedCallback() {
    this._map = new maplibregl.Map({
      container: "map",
      style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${ENV.VITE_API_KEY_MAPTILER}`,
      center: [0, 0],
      zoom: 1
    });

    return this.updateGeolocation()
  };

  disconnectedCallback() {
    return null
  };

  initElm() {
    let template = `${`\n<div id='map'></div>\n    `}`;
    return this.innerHTML = template
  };

  updateGeolocation() {
    return navigator.geolocation ? navigator.geolocation.getCurrentPosition(
      this.geolocationSuccess.bind(this),
      this.geolocationError.bind(this)
    ) : alert("Geolocation is not supported by this browser.")
  };

  geolocationSuccess(position) {
    let lng = position.coords.longitude;
    let lat = position.coords.latitude;
    this._map.setCenter([lng, lat]);
    return this._map.setZoom(20)
  };

  geolocationError() {
    return alert("Unable to retrieve your location.")
  }
}