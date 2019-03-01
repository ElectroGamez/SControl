function addSensorHTML() {
    const sensorTitle = document.getElementById('newSensorTitle').value;
    const sensorSimpel = document.getElementById('newSensorSimple').value.toLowerCase();
    const sensorStatus = document.getElementById('newSensorStatus').value;

    if (!sensorTitle || !sensorSimpel || !sensorStatus) return Swal.fire('Error', 'Please fill in all the fields.', 'error');
    if (sensorTitle.length < 3 || sensorTitle.length > 25) return Swal.fire('Error', 'Title should be a title with 3 to 25 characters.', 'error');
    const valid = ["true", "false"];
    if (!valid.includes(sensorSimpel)) return Swal.fire('Error', 'Simple should be false or true', 'error');

    if(isNaN(sensorStatus)) return Swal.fire('Error', 'Status must be a number!', 'error');
    if (sensorSimpel == "true") {
        if (sensorStatus > 1) return Swal.fire('Error', 'Sensor is simple so Status can not be higher than 1', 'error');
    } else {
        if (sensorStatus > 255) return Swal.fire('Error', 'Status can not be higher than 255', 'error');
    }
    addSensor(sensorTitle, sensorSimpel, sensorStatus);
}