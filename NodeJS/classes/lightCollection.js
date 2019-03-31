module.exports = class Light {
  constructor(fs, ligh) {
    this.fs = fs;
    this.collection = new Array();
    this.directory = "./storage/"

    this.load();
  };

  load() {
    this.fs.readFile(`${this.directory}lightCollection.json`, (err, data) => {
      if (err === null) {
        this.collection = JSON.parse(data);
        report.log("lightCollection has been loaded.");
      } else report.error(err);
    });
  }

  save() {
    let tempJSON = JSON.stringify(this.collection);
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
