module.exports = class Light {
  constructor(five, title, pin) {
    this.value = 0;
    this.title = title;
    this.pin = pin;
  };

  off() {
    pinObject = new five.Pin(this.pin);
    inObject.low();
    this.get(value => this.value = value);
  };

  on() {
    pinObject = new five.Pin(this.pin);
    inObject.high();
    this.get(value => this.value = value);
  };

  get(callback) {
    this.pin.query(state => {
      this.value = state.value;
      callback(this.value);
    });
  };
};
