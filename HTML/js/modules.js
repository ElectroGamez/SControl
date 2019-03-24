function getSensors( callback ) {
  var foo;
  $.getJSON( `${remoteServer}api/devices`, data => {
    callback(data);
  }).fail(function() {
    alert("Error while collecting sensors.");
  });;
}

function displaySensors(sensors) {
  const sensorsElement = document.getElementById('sensors');
  let text = '';
  for (i = 0; i < sensors.length; i++) {
    text += '<div class="module sensor">';
    text += `<p class="moduleTitle">${sensors[i].title}</p>`
    text += `<div class="led" id="sensorLed${i}"></div>`
    text += '</div>'
  }
  sensorsElement.innerHTML = text;
}

function updateSensor() {
  getSensors(sensors => {
    displaySensors(sensors);
    for (i= 0; i < sensors.length; i++) {
      if (sensors[i].simple == 1) {
        foo = document.getElementById(`sensorLed${i}`);
        if (sensors[i].value == 1) {
          foo.style.backgroundColor = "chartreuse";
      } else {
        foo.style.backgroundColor = "red";
      }
    }
  }
  });
}
