module.exports = class Light {
  constructor(fs, ligh) {
    this.fs = fs;
    this.collection = new Array();
    this.directory = "./storage/"

    this.loadlightCollection();
  };

  loadlightCollection() {
    let tempBuffer = this.fs.readFile(`${this.directory}lightCollection.json`, (err, data) => {
      if (err === null) {
        this.listed = JSON.parse(tempBuffer);
        report.log("lightCollection has been loaded.");
      } else report.error(err);
    });
  }

  savelightCollection() {
    let tempJSON = JSON.stringify(this.listed);
    this.fs.writeFile(`${this.directory}lightCollection.json`, tempJSON, (err) => {
      if (err === null) report.log("lightCollection has been saved.");
      else report.error(err);
    });
  }
}
