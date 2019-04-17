module.exports = class Light {
  constructor(title, pin) {
    this.value = 0;
    this.title = title;
    this.pin = pin;
  };

  send(server, sendData, callback) {
    server.method = 'post';
    let data = {
      title: this.title,
      pin: this.pin
    };
    sendData(server, data, c => {
      console.log("Callback", c);
    });
  };
};
