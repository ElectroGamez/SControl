function addSensorHTML() {
    const sensorTitle = document.getElementById('newSensorTitle').value;
    const sensorSimpel = document.getElementById('newSensorSimple').value;
    const sensorValue = document.getElementById('newsensorValue').value;
    const sensorPin = document.getElementById('newSensorPin').value;

    if (!sensorTitle || !sensorSimpel || !sensorValue) return Swal.fire('Error', 'Please fill in all the fields.', 'error');
    if (sensorTitle.length < 3 || sensorTitle.length > 25) return Swal.fire('Error', 'Title should be a title with 3 to 25 characters.', 'error');

    if(isNaN(sensorValue)) return Swal.fire('Error', 'Status must be a number!', 'error');
    if (sensorSimpel == "true") {
        if (sensorValue > 1) return Swal.fire('Error', 'Sensor is simple so Status can not be higher than 1', 'error');
    } else {
        if (sensorValue > 255) return Swal.fire('Error', 'Status can not be higher than 255', 'error');
    }
    addSensor(sensorTitle, sensorSimpel, sensorValue, sensorPin);
}
