export default class CAnimations {
  constructor() {
    this._hTick = e => this.update(e.detail.value);
    this._animations = {};

    this._objMovingPosition = {
      isActive: false,
      position: null,
      oldPosition: null,
      speed: 1,
      t: 0,
      callback: null
    }
  };

  connectedCallback() {
    return Events.connect("#app", "tick", this._hTick)
  };

  disconnectedCallback() {
    return Events.disconnect("#app", "tick", this._hTick)
  };

  update(dt) {
    return this.movingPosition(dt)
  };

  movingPosition(dt) {
    if (this._animations.length <= 0) return;

    for (let k of Object.keys(this._animations)) {
      let objMovingPosition = this._animations[k];
      if (!objMovingPosition.isActive) return;

      let lLerpPosition = () => (
        objMovingPosition.oldPosition.lerp(
          objMovingPosition.position,
          objMovingPosition.t
        )
      );

      let lCallback = () => {
        if (objMovingPosition.callback) {
          return objMovingPosition.callback(lLerpPosition())
        }
      };

      objMovingPosition.t += objMovingPosition.speed * dt;

      if (objMovingPosition.t >= 1) {
        objMovingPosition.t = 1;
        objMovingPosition.isActive = false;
        lCallback();
        objMovingPosition.position = null;
        objMovingPosition.oldPosition = null;
        objMovingPosition.callback = null;
        delete this._animations[k]
      } else {
        lCallback()
      }
    }
  };

  movePosition(position, oldPosition, callback) {
    let options = {
      isActive: true,
      position,
      oldPosition,
      speed: 1,
      t: 0,
      callback
    };

    return this._animations[this.generateRandomString()] = options
  };

  generateRandomString(length=10) {
    let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    let charactersLength = characters.length;

    for (let i = 0; i <= length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength))
    };

    return result
  }
}