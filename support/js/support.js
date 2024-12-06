document.querySelector('.download').addEventListener('click', function() {
    var downloadLink = document.createElement('a');
    downloadLink.href = "/support/resource/файл.txt";
    downloadLink.download = 'файл.txt';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
});

(function() {
    emailjs.init("Pq2Hax5tnG9LIivA5"); 
})();

document.querySelector('.form1').addEventListener('submit', function(event) {
    event.preventDefault(); 
const loader = document.getElementById("loader");
            loader.style.display = "block";

    const firstName = document.querySelector('input[name="first_name"]').value;
    const lastName = document.querySelector('input[name="last_name"]').value;
    const phone = document.querySelector('input[name="phone"]').value;
    const email = document.querySelector('input[name="email"]').value;
    const message = document.querySelector('textarea[name="message"]').value;
    emailjs.send("service_1gm16tm", "template_ymc7ugr", {
        first_name: firstName,
        last_name: lastName,
        phone: phone,
        email: email,
        message: message,
        id: Date.now() 
    })
    .then(function(response) {

        document.querySelector('.form1').reset();
        loader.style.display = "none";

        setTimeout(() => {
            const successModal = document.getElementById("successModal");
            successModal.style.display = "block";
        }, 0); 

    }, function(error) {
        loader.style.display = "none";
        setTimeout(() => {
            const errorModal = document.getElementById("errorModal");
            const errorMessage = document.getElementById("errorMessage");
            errorMessage.innerText = 'Ошибка при отправке сообщения: ' + JSON.stringify(error);
            errorModal.style.display = "block";
        }, 0); 
    });
});


const successModal = document.getElementById("successModal");
const errorModal = document.getElementById("errorModal");

const closeSuccess = document.getElementById("closeSuccess");
const closeError = document.getElementById("closeError");

closeSuccess.onclick = function() {
    successModal.style.display = "none";
}

closeError.onclick = function() {
    errorModal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == successModal) {
        successModal.style.display = "none";
    }
    if (event.target == errorModal) {
        errorModal.style.display = "none";
    }
}