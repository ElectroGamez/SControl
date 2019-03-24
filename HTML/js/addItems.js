function addSensor(title, simple, status) {
    //if (!title || !simple || !status) return console.log("Provide Title, Simple and status", title, simple, status);
    var sensor = {"title": title, "simple": simple, "status": status}
    var json = JSON.stringify(sensor);

    $.ajax({
      type: 'POST',
      url: `${remoteServer}api/devices`,
      data: json,
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
