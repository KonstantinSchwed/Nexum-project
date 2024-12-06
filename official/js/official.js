let slideIndex = 0;
showSlides(slideIndex);
function showSlides(index) {
    const slides = document.getElementsByClassName("slides")[0].children;
    const dots = document.getElementsByClassName("dot");

    if (index >= slides.length) {
        slideIndex = 0;
    } else if (index < 0) {
        slideIndex = slides.length - 1;
    }

    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    for (let i = 0; i < dots.length; i++) {
        dots[i].classList.remove("active");
    }

    slides[slideIndex].style.display = "block";
    dots[slideIndex].classList.add("active");
}

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

document.querySelector('.prev-slide').addEventListener('click', () => plusSlides(-1));
document.querySelector('.next-slide').addEventListener('click', () => plusSlides(1));

const dots = document.querySelectorAll('.dot');
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => currentSlide(index));
});

setInterval(() => {
    plusSlides(1);
}, 5000);


  var contractLink = document.getElementById('contractLink');
  var termsLink = document.getElementById('termsLink');
  contractLink.addEventListener('click', function(event) {
      event.preventDefault();
      var contractUrl = contractLink.getAttribute('href');
      var contractFilename = contractUrl.split('/').pop();
      var xhr = new XMLHttpRequest();
      xhr.open('GET', contractUrl, true);
      xhr.responseType = 'blob';
      xhr.onload = function() {
          var blob = new Blob([xhr.response], { type: 'application/pdf' });
          var url = window.URL.createObjectURL(blob);
          var a = document.createElement('a');
          a.href = url;
          a.download = contractFilename;
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(url);
          document.body.removeChild(a);
      };
      xhr.send();
  });
  termsLink.addEventListener('click', function(event) {
      event.preventDefault();
      var termsUrl = termsLink.getAttribute('href');
      var termsFilename = termsUrl.split('/').pop();
      var xhr = new XMLHttpRequest();
      xhr.open('GET', termsUrl, true);
      xhr.responseType = 'blob';
      xhr.onload = function() {
          var blob = new Blob([xhr.response], { type: 'application/pdf' });
          var url = window.URL.createObjectURL(blob);
          var a = document.createElement('a');
          a.href = url;
          a.download = termsFilename;
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(url);
          document.body.removeChild(a);
      };
      xhr.send();
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
            const successModal1 = document.getElementById("successModal1");
            successModal1.style.display = "block";
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



const successModal1 = document.getElementById("successModal1");
const errorModal = document.getElementById("errorModal");

const closeSuccess = document.getElementById("closeSuccess");
const closeError = document.getElementById("closeError");


closeSuccess.onclick = function() {
    successModal1.style.display = "none";
}

closeError.onclick = function() {
    errorModal.style.display = "none";
}

//
window.onclick = function(event) {
    if (event.target == successModal1) {
        successModal1.style.display = "none";
    }
    if (event.target == errorModal) {
        errorModal.style.display = "none";
    }
}
document.addEventListener("DOMContentLoaded", function() {
    var modalButtons = document.getElementsByClassName('btn1');
    var modal = document.getElementById("myModal");
    var confirmationModal = document.getElementById("confirmationModal");
    var modalz = document.getElementById("myModal2");
    var closeBtn = document.getElementsByClassName("close")[0];
    var confirmButton = document.getElementById("confirmButton");
    var confirmYesButton = document.getElementById("confirmYesButton");
    var confirmNoButton = document.getElementById("confirmNoButton");
    var closeConfirmationBtn = document.getElementById("closeConfirmationBtn");
    var successModal = document.getElementById("successModal");

    if (localStorage.getItem('isTariffUpdated') === 'true') {
        successModal.style.display = "block";
        localStorage.setItem('isTariffUpdated', 'false');
    }

    var alreadySetTariffModal = document.getElementById("alreadySetTariffModal");
    var negativeBalanceModal = document.getElementById("negativeBalanceModal");
    var standardAccountRestrictionModal = document.getElementById("standardAccountRestrictionModal");
    var businessAccountRestrictionModal = document.getElementById("businessAccountRestrictionModal");

    document.querySelector(".closeAlreadySetTariff").onclick = function() { alreadySetTariffModal.style.display = "none"; };
    document.getElementById("closeAlreadySetTariffButton").onclick = function() { alreadySetTariffModal.style.display = "none"; };

    document.querySelector(".closeNegativeBalance").onclick = function() { negativeBalanceModal.style.display = "none"; };
    document.getElementById("closeNegativeBalanceButton").onclick = function() { negativeBalanceModal.style.display = "none"; };

    document.querySelector(".closeStandardAccountRestriction").onclick = function() { standardAccountRestrictionModal.style.display = "none"; };
    document.getElementById("closeStandardAccountRestrictionButton").onclick = function() { standardAccountRestrictionModal.style.display = "none"; };

    document.querySelector(".closeBusinessAccountRestriction").onclick = function() { businessAccountRestrictionModal.style.display = "none"; };
    document.getElementById("closeBusinessAccountRestrictionButton").onclick = function() { businessAccountRestrictionModal.style.display = "none"; };

    document.querySelector(".closeSuccessModal").onclick = function() { successModal.style.display = "none"; };
    document.getElementById("closeSuccessModalButton").onclick = function() { successModal.style.display = "none"; };

    var selectedPlanName = "";
    var selectedOfferClass = "";

    function openAlternativeModal() {
        modalz.style.display = "block";
    }

    function openModal(event) {
        const loggedInUser = localStorage.getItem('loggedInUser');
        if (!loggedInUser) {
            openAlternativeModal();
            return;
        }
        
        var userData = JSON.parse(loggedInUser);
        var offerBlock = event.target.closest('.shop-item').querySelector('[class^="offer"]');

        if (offerBlock) {
            selectedOfferClass = offerBlock.className;
            var planNameElement = offerBlock.querySelector('.t11');
            var minutesInsideNetworkElement = offerBlock.querySelector('.t2');
            var minutesOutsideNetworkElement = offerBlock.querySelector('.t3');
            var internetInfoElement = offerBlock.querySelector('.t4');
            var priceElement = offerBlock.querySelector('.t5');

            if (!planNameElement || !minutesInsideNetworkElement || !minutesOutsideNetworkElement || !internetInfoElement || !priceElement) {
                console.error("Missing elements:", {
                    planNameElement,
                    minutesInsideNetworkElement,
                    minutesOutsideNetworkElement,
                    internetInfoElement,
                    priceElement
                });
                return;
            }

            var planName = planNameElement.innerText.trim();
            selectedPlanName = planName.slice(1, -1);
            var minutesInsideNetwork = minutesInsideNetworkElement.innerText.trim();
            var minutesOutsideNetwork = minutesOutsideNetworkElement.innerText.trim();
            var internetInfo = internetInfoElement.innerText.trim();

            var priceInfo;
            if (priceElement.innerText.includes("договорная")) {
                priceInfo = "Абонентская плата: договорная";
            } else {
                var priceValue = priceElement.querySelector('b') ? priceElement.querySelector('b').innerText.trim() : "Нет информации";
                priceInfo = "Абон. плата: " + priceValue + " руб/мес";
            }

            document.querySelector('#myModal .based').innerHTML = `
                Тарифный план: ${planName}<br>
                ${minutesInsideNetwork}<br>
                ${minutesOutsideNetwork}<br>
                ${internetInfo}<br>
                ${priceInfo}
            `;

            modal.style.display = "block"; 
        } else {
            console.error("offerBlock не найден для элемента:", event.target);
        }
    }

    function closeModal() {
        modal.style.display = "none";
    }

    function openConfirmationModal() {
        confirmationModal.style.display = "block";
    }

    function closeConfirmationModal() {
        confirmationModal.style.display = "none";
    }

    function assignModalButtonEvents() {
        for (var i = 0; i < modalButtons.length; i++) {
            modalButtons[i].removeEventListener('click', openModal);
            modalButtons[i].addEventListener('click', openModal);
        }

        closeBtn.removeEventListener('click', closeModal);
        closeBtn.addEventListener('click', closeModal);

        window.removeEventListener('click', closeModal);
        window.addEventListener('click', function(event) {
            if (event.target == modal) {
                closeModal();
            }
        });

        confirmButton.addEventListener("click", function() {
            openConfirmationModal();
        });

        confirmYesButton.addEventListener("click", function() {
            const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
        
            if (!loggedInUser) {
                alert("Необходимо войти в систему");
                closeConfirmationModal();
                return;
            }

            if (selectedPlanName === loggedInUser.tariff) {
                alreadySetTariffModal.style.display = "block";
                closeModal();
                closeConfirmationModal();
                return;
            }

            if (loggedInUser.balance < 0) {
                negativeBalanceModal.style.display = "block";
                closeModal();
                closeConfirmationModal();
                return;
            }

            if (selectedOfferClass.includes('offer2') && loggedInUser.plan === 'Standard') {
                standardAccountRestrictionModal.style.display = "block";
                closeModal();
                closeConfirmationModal();
                return;
            }

            if ((selectedOfferClass.includes('offer1') || selectedOfferClass.includes('offer3')) && loggedInUser.plan === 'Business') {
                businessAccountRestrictionModal.style.display = "block";
                closeModal();
                closeConfirmationModal();
                return;
            }

            fetch('http://localhost:3000/update-tariff', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    phone: loggedInUser.phone,
                    newTariff: selectedPlanName
                })
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network error: ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                if (data.success) {
                    loggedInUser.tariff = selectedPlanName;
                    localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));
                    localStorage.setItem('isTariffUpdated', 'true');
                    closeModal(); 
                    closeConfirmationModal();
                } else {
                    alert("Ошибка при изменении тарифа: " + data.error);
                }
            })
            .catch(error => {
                console.error("Ошибка:", error);
                alert("Произошла ошибка при обновлении тарифа. Проверьте консоль для деталей.");
            });

        });
        confirmNoButton.addEventListener("click", closeConfirmationModal);
        closeConfirmationBtn.addEventListener("click", closeConfirmationModal);
    }
    
    assignModalButtonEvents();
});
