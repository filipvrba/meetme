import maplibregl from "maplibre-gl";

export default class CMarkers {
  get markers() {
    return this._markers
  };

  constructor(element) {
    this._element = element;
    this._markers = {}
  };

  serverAddFromDb(position) {
    return this._element.cDatabase.getAllUsers((rows) => {
      for (let row of rows) {
        if (parseInt(row.is_logged) === 1) {
          let mPos = null;
          let idEquals = this._element.userId === parseInt(row.user_id);

          if (idEquals) {
            // Client
            mPos = position;
            this._element.cDatabase.updatePosition(mPos)
          } else {
            // Server
            mPos = row.position.split("-");
            mPos = new Vector(mPos[0], mPos[1])
          };

          if (mPos) {
            this.serverAdd({
              position: mPos,
              userId: row.user_id,
              src: row.image_base64
            })
          }
        }
      }
    })
  };

  serverAdd(options) {
    let marker = (new maplibregl.Marker).setLngLat([
      options.position.x,
      options.position.y
    ]).addTo(this._element.map);

    marker.getElement().innerHTML = `${`\n    <elm-marker-avater user-id='${options.userId}' src='${options.src}'></elm-marker-avater>\n    `}`;
    return this._markers[options.userId] = marker
  };

  allRemove() {
    for (let k of Object.keys(this._markers)) {
      this._markers[k].remove();
      if (this._markers.hasOwnProperty(k)) delete this._markers[k]
    }
  }
}