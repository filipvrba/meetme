import maplibregl from "maplibre-gl";
import { ENV } from "../env";
import AProtectionElement from "./abstracts/protection_element";
import CGeolocation from "../components/elm-map/geolocation";
import CAnimations from "../components/elm-map/animations";
import CMarkers from "../components/elm-map/markers";

export default class ElmMap extends AProtectionElement {
  constructor() {
    super();

    this._hLoadMap = () => {
      return this.loadedMap()
    };

    this._cGeolocation = new CGeolocation;
    this._cAnimations = new CAnimations;
    this.initElm()
  };

  connectedCallback() {
    this._cAnimations.connectedCallback();

    this._map = new maplibregl.Map({
      container: "map",
      style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${ENV.VITE_API_KEY_MAPTILER}`,
      center: [0, 0],
      zoom: 15
    });

    this._map.on("load", this._hLoadMap);
    this._cMarkers = new CMarkers(this._map);
    return this._cMarkers
  };

  disconnectedCallback() {
    return this._cAnimations.disconnectedCallback()
  };

  loadedMap() {
    return this._cGeolocation.getPosition((position) => {
      this._map.setCenter([position.x, position.y]);

      return _BefDb.get(
        "SELECT user_id, image_base64 FROM image_avatars;",

        (rows) => {
          for (let row of rows) {
            this._cMarkers.add({
              position,
              userId: row.user_id,
              src: row.image_base64
            })
          }
        }
      )
    })
  };

  initElm() {
    let template = `${`\n<div id='map'></div>\n    `}`;
    return this.innerHTML = template
  }
}