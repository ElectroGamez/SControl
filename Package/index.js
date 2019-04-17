const sc = require('./scontrol.js');

sc.addLight("newtest", 5, callback => {
  console.log(callback);
});
