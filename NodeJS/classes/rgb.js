module.exports = class Rgb {
  constructor(title, pin) {
    this.value = 0;
    this.title = title;
    this.led = new five.Led.RGB(pin);
  };

  off() {
    this.led.off();
  };

  on() {
    this.led.on();
  };
};
