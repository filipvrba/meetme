import maplibregl from "maplibre-gl";
import CAnimations from "./animations";

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

          let sUserId = parseInt(row.user_id);

          if (this._markers.hasOwnProperty(sUserId)) {
            this.serverChangePositions(sUserId, mPos)
          } else if (mPos) {
            this.serverAdd({
              position: mPos,
              userId: sUserId,
              src: row.image_base64
            })
          }
        } else if (this._markers.hasOwnProperty(parseInt(row.user_id))) {
          this.remove(parseInt(row.user_id))
        }
      }
    })
  };

  serverAdd(options) {
    let marker = (new maplibregl.Marker).setLngLat([
      options.position.x,
      options.position.y
    ]).addTo(this._element.map);

    marker.getElement().innerHTML = `${`\n    <elm-marker-avater user-id='${options.userId}' src='${options.src}' data-bs-toggle='modal' data-bs-target='#userDetailModal'></elm-marker-avater>\n    `}`;
    return this._markers[options.userId] = marker
  };

  serverChangePositions(idMarker, position) {
    let mOldPosition = this._markers[idMarker].getLngLat();
    mOldPosition = new Vector(mOldPosition.lng, mOldPosition.lat);

    return this._element.cAnimations.movePosition(
      position,
      mOldPosition,

      updatePosition => (
        this._markers[idMarker].setLngLat([
          updatePosition.x,
          updatePosition.y
        ])
      )
    )
  };

  remove(idMarker) {
    this._markers[idMarker].remove();
    delete this._markers[idMarker]
  }
}