module.exports = class LightCollection {
  constructor(fs, Light) {
    this.fs = fs;
    this.Light = Light;
    this.collection = new Array();
    this.directory = "./storage/"

    this.load();
  };

  load() {
    this.fs.readFile(`${this.directory}lightCollection.json`, (err, data) => {
      if (err === null) {
        let tempArray = JSON.parse(data);
        this.collection = new Array();

        for (let i = 0; i < tempArray.length; i++) {
          let tmpLight = new this.Light(tempArray[i].title, tempArray[i].pinId);
          this.collection.push(tmpLight);
        }

        report.log("lightCollection has been loaded.");
      } else report.error(err);
    });
  }

  save() {
    let tempArray = new Array();

    for (let i = 0; i < this.collection.length; i++) {
      let tempObject = {
        title: this.collection[i].title,
        value: this.collection[i].value,
        pinId: this.collection[i].pin.pin
      }
      tempArray.push(tempObject);
    }

    let tempJSON = JSON.stringify(tempArray);
    this.fs.writeFile(`${this.directory}lightCollection.json`, tempJSON, (err) => {
      if (err === null) report.log("lightCollection has been saved.");
      else report.error(err);
    });
  }

  add(light) {
    this.collection.push(light);
    this.save();
  }

  remove(light) {
    let index = this.collection.indexOf(light);
    if (index !== 1) this.collection.splice(index, 1);
    this.save();
  }
}
