function downloadContract() {
    var select = document.getElementById("dropdown");
    var selectedValue = select.options[select.selectedIndex].value;
    var filename;
    switch (selectedValue) {
        case "option1":
            filename = "contract2024.txt";
            break;
        case "option2":
            filename = "contract2023.txt";
            break;
        case "option3":
            filename = "contract1914.txt";
            break;
        default:
            filename = "";
    }
    if (filename !== "") {
        var downloadLink = document.createElement('a');
        downloadLink.href = "/client/resource/" + filename;
        downloadLink.download = filename;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    }
}
function downloadRules() {
    var select = document.getElementById("dropdown2");
    var selectedValue = select.options[select.selectedIndex].value;
    var filename;
    switch (selectedValue) {
        case "option12":
            filename = "rules2024.txt";
            break;
        case "option22":
            filename = "rules2023.txt";
            break;
        case "option32":
            filename = "rules1914.txt";
            break;
        default:
            filename = "";
    }
    if (filename !== "") {
        var downloadLink = document.createElement('a');
        downloadLink.href = "/client/resource/" + filename; 
        downloadLink.download = filename;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    }
}
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
            if (priceElement.innerText.includes("Contract-based")) {
                priceInfo = "Subscription fee: contract-based";
            } else {
                var priceValue = priceElement.querySelector('b') ? priceElement.querySelector('b').innerText.trim() : "Нет информации";
                priceInfo = "Subsc. fee: " + priceValue + " BYN/month";
            }

            document.querySelector('#myModal .based').innerHTML = `
                Tariff Plan: ${planName}<br>
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
