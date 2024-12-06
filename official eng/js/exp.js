
function checkDeviceType() {
    var width = window.screen.width;
    var height = window.screen.height;
    var diagonal = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2));
    if (diagonal < 16) { 
        return "Ноутбук";
    } else {
        return "ПК";
    }
}
var deviceType = checkDeviceType();
console.log("Тип устройства: " + deviceType);