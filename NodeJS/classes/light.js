module.exports = class Light {
  constructor(five, title, pin) {
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

  get(callback) {
    this.pin.query(state => {
      this.value = state.value;
      callback(this.value);
    });
  };
};
