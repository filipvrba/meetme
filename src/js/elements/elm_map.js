import maplibregl from "maplibre-gl";
import { ENV } from "../env";
import CGeolocation from "../components/elm-map/geolocation";
import CAnimations from "../components/elm-map/animations";

export default class ElmMap extends HTMLElement {
  constructor() {
    super();
    this._cAnimations = new CAnimations;
    this.initElm()
  };

  // @map.on('load', lambda do
  //   c_geolocation.get_position() do |position|
  //     m_old_position = @map.get_center()
  //     m_old_position = Vector.new(m_old_position.lng, m_old_position.lat)
  //     # @map.set_zoom(15)
  //     @c_animations.move_position(position, m_old_position) do |lerp_position|
  //       @map.set_center([lerp_position.x, lerp_position.y])
  //     end
  //   end
  // end)
  connectedCallback() {
    this._cAnimations.connectedCallback();
    let cGeolocation = new CGeolocation;

    this._map = new maplibregl.Map({
      container: "map",
      style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${ENV.VITE_API_KEY_MAPTILER}`,
      center: [0, 0],
      zoom: 15
    });

    return cGeolocation.getPosition(position => (
      this._map.setCenter([position.x, position.y])
    ))
  };

  disconnectedCallback() {
    return this._cAnimations.disconnectedCallback()
  };

  initElm() {
    let template = `${`\n<div id='map'></div>\n    `}`;
    return this.innerHTML = template
  }
}