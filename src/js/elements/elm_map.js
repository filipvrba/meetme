import maplibregl from "maplibre-gl";
import { ENV } from "../env";
import AProtectionElement from "./abstracts/protection_element";
import CGeolocation from "../components/elm-map/geolocation";
import CAnimations from "../components/elm-map/animations";
import CMarkers from "../components/elm-map/markers";
import CDatabase from "../components/elm-map/database";

export default class ElmMap extends AProtectionElement {
  get cDatabase() {
    return this._cDatabase
  };

  get userId() {
    return this._userId
  };

  get map() {
    return this._map
  };

  constructor() {
    super();

    this._hLoadMap = () => {
      return this.loadedMap()
    };

    this._cGeolocation = new CGeolocation;
    this._cAnimations = new CAnimations;
    this._timeoutId = null
  };

  initializeProtected() {
    this.initElm();

    this._map = new maplibregl.Map({
      container: "map",
      style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${ENV.VITE_API_KEY_MAPTILER}`,
      center: [0, 0],
      zoom: 15
    });

    this._map.on("load", this._hLoadMap);
    this._cDatabase = new CDatabase(this._userId);
    this._cMarkers = new CMarkers(this);
    return this._cMarkers
  };

  connectedCallback() {
    super.connectedCallback();
    return this._cAnimations.connectedCallback()
  };

  disconnectedCallback() {
    super.disconnectedCallback();
    this._cAnimations.disconnectedCallback();
    return clearTimeout(this._timeoutId)
  };

  loadedMap() {
    let lUpdateMarkers = () => {
      this._cGeolocation.getPosition((position) => {
        this._map.setCenter([position.x, position.y]);
        return this._cMarkers.serverAddFromDb(position)
      });

      this._timeoutId = setTimeout(lUpdateMarkers, 10_000);
      return this._timeoutId
    };

    return lUpdateMarkers.call()
  };

  initElm() {
    let template = `${`
<elm-map-user-details></elm-map-user-details>
<div id='map'></div>
<elm-dashboard-footer user-id='${this._userId}'></elm-dashboard-footer>
    `}`;
    return this.innerHTML = template
  }
}