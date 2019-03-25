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
    text += `<button onclick="sensorValue(${i}, 1)">On</button>`
    text += `<button onclick="sensorValue(${i}, 0)">Off</button>`
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

function sensorValue(id, value) {
  var sensor2 = {
  "token": "kTTNb53LREmAGY5z03FOKqx4f",
  "value": value
}
  var json2 = JSON.stringify(sensor2);

  $.ajax({
    type: 'PUT',
    url: `${remoteServer}api/devices/${id}`,
    data: json2,
    success: function (data) {
      Swal.fire('Added!', `Added ${title} to the Sensors!`, 'success');
    },
    error: function (data) {
      Swal.fire('Error!', `No contact with server.`, 'error');
    },
    contentType: "application/json",
    dataType: 'json'
  });
}
