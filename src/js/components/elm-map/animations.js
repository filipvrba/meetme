export default class CAnimations {
  constructor() {
    this._hTick = e => this.update(e.detail.value);

    this._objMovingPosition = {
      isActive: false,
      position: null,
      oldPosition: null,
      speed: 0.1,
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
    if (!this._objMovingPosition.isActive) return;

    let lLerpPosition = () => (
      this._objMovingPosition.oldPosition.lerp(
        this._objMovingPosition.position,
        this._objMovingPosition.t
      )
    );

    let lCallback = () => {
      if (this._objMovingPosition.callback) {
        return this._objMovingPosition.callback(lLerpPosition())
      }
    };

    this._objMovingPosition.t += this._objMovingPosition.speed * dt;
    console.log(this._objMovingPosition.t);

    if (this._objMovingPosition.t >= 1) {
      this._objMovingPosition.t = 1;
      this._objMovingPosition.isActive = false;
      lCallback();
      this._objMovingPosition.position = null;
      this._objMovingPosition.oldPosition = null;
      return this._objMovingPosition.callback = null
    } else {
      return lCallback()
    }
  };

  movePosition(position, oldPosition, callback) {
    this._objMovingPosition.isActive = true;
    this._objMovingPosition.t = 0;
    this._objMovingPosition.position = position;
    this._objMovingPosition.oldPosition = oldPosition;
    return this._objMovingPosition.callback = callback
  }
}