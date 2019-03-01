const remoteServer = "http://localhost:3000/"

function getSensors() {
  $.getJSON( "http://localhost:3000/api/sensors", function(data) {
    //Sould be able to return data but does not seem to work.
    displaySensors(data)
  }).fail(function() {
    alert("Error while collecting sensors.");
  });
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

function addSensor(title, simple, status) {
  //if (!title || !simple || !status) return console.log("Provide Title, Simple and status", title, simple, status);
  var sensor = {"title": title, "simple": simple, "status": status}
  var json = JSON.stringify(sensor);

  $.ajax({
    type: 'POST',
    url: 'http://localhost:3000/api/sensors',
    data: json,
    success: function (data) { alert('data: ' + data); },
    contentType: "application/json",
    dataType: 'json'
  });
}
