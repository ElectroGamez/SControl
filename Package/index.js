const https = require('https');
const config = require('./config.json');
const fs = require('fs');

const options = {
  hostname: 'https://scontrol.hedium.nl/',
  port: 3000,
  path: '/api/light',
  method: 'GET',
  key: fs.readFileSync('./ssl/privkey.pem'),
  cert: fs.readFileSync('./ssl/cert.pem')
};

options.agent = new https.Agent(options);

const req = https.request(options, (res) => {
  // ...
});

https.get(`${config.apiAddress}api/light/`, (res) => {
  reports.log(`StatusCode: ${res.statuscode}`);

  res.on('data', (d) => {
    reports.log(`Data!`);
  })

  res.on('error', (e) => {
    reports.error(e);
  })
})
