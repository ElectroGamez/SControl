function addSensor(title, simple, status) {
    //if (!title || !simple || !status) return console.log("Provide Title, Simple and status", title, simple, status);
    var sensor = {"title": title, "simple": simple, "status": status, "token": token}
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

  function test() {
    let foo  = {
      token: "kTTNb53LREmAGY5z03FOKqx4f",
      value: 1
    }
    var foo2 = JSON.stringify(foo);

      $.ajax({
        type: 'PUT',
        url: `${remoteServer}api/devices/0`,
        data: foo2,
        success: function (data) {
          Swal.fire('Added!', `Added ok to the Sensors!`, 'success');
        },
        error: function (data) {
          Swal.fire('Error!', `No contact with server.`, 'error');
        },
        contentType: "application/json",
        dataType: 'json'
      });
    }
