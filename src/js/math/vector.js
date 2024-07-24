class Vector {
  get x() {
    return this._x
  };

  set x(x) {
    this._x = x
  };

  get y() {
    return this._y
  };

  set y(y) {
    this._y = y
  };

  constructor(x, y) {
    this._x = x;
    this._y = y
  };

  //# Lineární interpolace
  // t - je normalizovaná hodnota mezi 0.0 až 1.0
  lerp(target, t) {
    return new Vector(this._x + t * (target.x - this._x), this._y + t * (target.y - this._y))
  }
};

window.Vector = Vector