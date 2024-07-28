import maplibregl from "maplibre-gl";

export default class CMarkers {
  get markers() {
    return this._markers
  };

  constructor(map) {
    this._map = map;
    this._markers = {}
  };

  add(options) {
    let marker = (new maplibregl.Marker).setLngLat([
      options.position.x,
      options.position.y
    ]).addTo(this._map);

    marker.getElement().innerHTML = `${`\n    <elm-marker-avater user-id='${options.userId}' src='${options.src}'></elm-marker-avater>\n    `}`;
    return this._markers[options.id] = marker
  }
}