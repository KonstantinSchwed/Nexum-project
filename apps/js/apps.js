
document.addEventListener("DOMContentLoaded", function() {
    var appItems = document.querySelectorAll('.app-item');

    appItems.forEach(function(item) {
        var img = item.querySelector('.app-block1');
        var tooltip = item.querySelector('.tooltip');

        img.addEventListener('mouseover', function() {
            tooltip.style.display = 'block';
        });

        img.addEventListener('mouseout', function() {
            tooltip.style.display = 'none';
        });
    });
});