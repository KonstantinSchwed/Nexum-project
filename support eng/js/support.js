document.querySelector('.download').addEventListener('click', function() {
    var downloadLink = document.createElement('a');
    downloadLink.href = "/support/resource/файл.txt";
    downloadLink.download = 'файл.txt';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
});
// Инициализация EmailJS
(function() {
    emailjs.init("Pq2Hax5tnG9LIivA5"); // Replace with your actual EmailJS public key
})();

document.querySelector('.form1').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission
const loader = document.getElementById("loader");
            loader.style.display = "block";
    // Collect form data
    const firstName = document.querySelector('input[name="first_name"]').value;
    const lastName = document.querySelector('input[name="last_name"]').value;
    const phone = document.querySelector('input[name="phone"]').value;
    const email = document.querySelector('input[name="email"]').value;
    const message = document.querySelector('textarea[name="message"]').value;

    // Send data via EmailJS
    emailjs.send("service_1gm16tm", "template_ymc7ugr", {
        first_name: firstName,
        last_name: lastName,
        phone: phone,
        email: email,
        message: message,
        id: Date.now() // Unique identifier
    })
    .then(function(response) {
        // Clear input fields
        document.querySelector('.form1').reset();

        // Hide loader
        loader.style.display = "none";

        // Show success modal with a slight timeout
        setTimeout(() => {
            const successModal = document.getElementById("successModal");
            successModal.style.display = "block";
        }, 0); // Immediate display, but allow for UI to process

    }, function(error) {
        // Hide loader
        loader.style.display = "none";

        // Show error modal with a slight timeout
        setTimeout(() => {
            const errorModal = document.getElementById("errorModal");
            const errorMessage = document.getElementById("errorMessage");
            errorMessage.innerText = 'Ошибка при отправке сообщения: ' + JSON.stringify(error);
            errorModal.style.display = "block";
        }, 0); // Immediate display, but allow for UI to process
    });
});


// Get modals
const successModal = document.getElementById("successModal");
const errorModal = document.getElementById("errorModal");

// Get the <span> elements that close the modals
const closeSuccess = document.getElementById("closeSuccess");
const closeError = document.getElementById("closeError");

// When the user clicks on <span> (x), close the corresponding modal
closeSuccess.onclick = function() {
    successModal.style.display = "none";
}

closeError.onclick = function() {
    errorModal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == successModal) {
        successModal.style.display = "none";
    }
    if (event.target == errorModal) {
        errorModal.style.display = "none";
    }
}