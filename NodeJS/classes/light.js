module.exports = class Light {
  constructor(title, pin) {
    this.value = 0;
    this.title = title;
    this.pin = new five.Pin(pin);
  };

  off() {
    this.pin.low();
    this.get(value => this.value = value);
  };

  on() {
    this.pin.high();
    this.get(value => this.value = value);
  };

  stringify(callback) {
    callback({
      title: this.title,
      value: this.value,
      pin: this.pin.pin
    });
  };

  get(callback) {
    this.pin.query(state => {
      this.value = state.value;
      callback(this.value);
    });
  };
};
