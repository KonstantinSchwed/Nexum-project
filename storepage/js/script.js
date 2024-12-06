
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
    const serviceAll = document.getElementById("service");
    const serviceBusiness = document.getElementById("service2");
    const serviceSpecial = document.getElementById("service3");
    const ww = document.querySelector(".mainclass");
    const sortButton = document.getElementById("sortButton");
    const serviceSelect = document.getElementById("serviceSelect");

    const footerOffset = 500;


    const originalOrderAll = Array.from(serviceAll.children).map(item => item.cloneNode(true));
    const originalOrderBusiness = Array.from(serviceBusiness.children).map(item => item.cloneNode(true));
    const originalOrderSpecial = Array.from(serviceSpecial.children).map(item => item.cloneNode(true));

    function getPrice(offer) {
        const priceElement = offer.querySelector('.t5 b'); 
        if (priceElement) {
            const priceText = priceElement.textContent; 
            return parseFloat(priceText.replace(',', '.')); 
        }
        return Infinity; 
    }


    function getInternet(offer) {
        const internetElement = offer.querySelector('.t4'); 
        if (internetElement) {
            const internetText = internetElement.textContent; 
            const regex = /(\d+)\s*г\/б/; 
            const match = internetText.match(regex);
            if (match) {
                return parseInt(match[1], 10); 
            }
            if (internetText.includes("безлимитный")) {
                return Infinity; 
            }
        }
        return 0; 
    }

    function getMinutesInside(offer) {
        const minutesElement = offer.querySelector('.t2'); 
        if (minutesElement) {
            const minutesText = minutesElement.textContent; 
            const regex = /(\d+)\s*минут/; 
            const match = minutesText.match(regex);
            if (match) {
                return parseInt(match[1], 10); 
            }

            if (minutesText.includes("безлимит")) {
                return Infinity; 
            }
        }
        return 0; 
    }


    function getMinutesOther(offer) {
        const minutesElement = offer.querySelector('.t3'); 
        if (minutesElement) {
            const minutesText = minutesElement.textContent; 
            const regex = /(\d+)\s*минут/; 
            const match = minutesText.match(regex);
            if (match) {
                return parseInt(match[1], 10); 
            }

            if (minutesText.includes("безлимит")) {
                return Infinity; 
            }
        }
        return 0; 
    }


    function sortOffers(offers, ascending = true, criteria = 'price') {
        return offers.sort((a, b) => {
            let valueA, valueB;
            if (criteria === 'internet') {
                valueA = getInternet(a);
                valueB = getInternet(b);
            } else if (criteria === 'minutesInside') {
                valueA = getMinutesInside(a);
                valueB = getMinutesInside(b);
            } else if (criteria === 'minutesOther') {
                valueA = getMinutesOther(a);
                valueB = getMinutesOther(b);
            } else {
                valueA = getPrice(a);
                valueB = getPrice(b);
            }
            return ascending ? valueA - valueB : valueB - valueA;
        });
    }


    function sortAndDisplayService(serviceContainer, ascending, criteria = 'price') {
        const shopItems = Array.from(serviceContainer.querySelectorAll(".shop-item")); 


        const offer1 = shopItems.filter(item => item.querySelector('.offer1') !== null);
        const offer2 = shopItems.filter(item => item.querySelector('.offer2') !== null);
        const offer3 = shopItems.filter(item => item.querySelector('.offer3') !== null);


        const sortedOffer1 = sortOffers(offer1, ascending, criteria);
        const sortedOffer2 = sortOffers(offer2, ascending, criteria);
        const sortedOffer3 = sortOffers(offer3, ascending, criteria);


        serviceContainer.innerHTML = '';
        sortedOffer3.forEach(item => serviceContainer.appendChild(item)); 
        sortedOffer1.forEach(item => serviceContainer.appendChild(item)); 
        sortedOffer2.forEach(item => serviceContainer.appendChild(item)); 
    }

    function resetOrder(serviceContainer, originalOrder) {
        serviceContainer.innerHTML = ''; 
        originalOrder.forEach(item => serviceContainer.appendChild(item.cloneNode(true))); 
        assignModalButtonEvents(); 
    }

    function sortServices() {
        const ascending = sortButton.value.includes("⬆"); 
        const selectedService = serviceSelect.value; 
        if (selectedService === "all") {

            if (sortButton.value === "Обычно") {
                resetOrder(serviceAll, originalOrderAll);
                resetOrder(serviceBusiness, originalOrderBusiness);
                resetOrder(serviceSpecial, originalOrderSpecial);
            } else if (sortButton.value.includes("интернет")) {
                sortAndDisplayService(serviceAll, ascending, 'internet');
                sortAndDisplayService(serviceBusiness, ascending, 'internet');
                sortAndDisplayService(serviceSpecial, ascending, 'internet');
            } else if (sortButton.value.includes("минутам внутри сети")) {
                sortAndDisplayService(serviceAll, ascending, 'minutesInside');
                sortAndDisplayService(serviceBusiness, ascending, 'minutesInside');
                sortAndDisplayService(serviceSpecial, ascending, 'minutesInside');
            } else if (sortButton.value.includes("минутам в другие сети")) {
                sortAndDisplayService(serviceAll, ascending, 'minutesOther');
                sortAndDisplayService(serviceBusiness, ascending, 'minutesOther');
                sortAndDisplayService(serviceSpecial, ascending, 'minutesOther');
            } else {
                sortAndDisplayService(serviceAll, ascending);
                sortAndDisplayService(serviceBusiness, ascending);
                sortAndDisplayService(serviceSpecial, ascending);
            }
        } else if (selectedService === "business") {

            if (sortButton.value === "Обычно") {
                resetOrder(serviceBusiness, originalOrderBusiness);
            } else if (sortButton.value.includes("интернет")) {
                sortAndDisplayService(serviceBusiness, ascending, 'internet');
            } else if (sortButton.value.includes("минутам внутри сети")) {
                sortAndDisplayService(serviceBusiness, ascending, 'minutesInside');
            } else if (sortButton.value.includes("минутам в другие сети")) {
                sortAndDisplayService(serviceBusiness, ascending, 'minutesOther');
            } else {
                sortAndDisplayService(serviceBusiness, ascending);
            }
        } else if (selectedService === "special") {

            if (sortButton.value === "Обычно") {
                resetOrder(serviceSpecial, originalOrderSpecial);
            } else if (sortButton.value.includes("интернет")) {
                sortAndDisplayService(serviceSpecial, ascending, 'internet');
            } else if (sortButton.value.includes("минутам внутри сети")) {
                sortAndDisplayService(serviceSpecial, ascending, 'minutesInside');
            } else if (sortButton.value.includes("минутам в другие сети")) {
                sortAndDisplayService(serviceSpecial, ascending, 'minutesOther');
            } else {
                sortAndDisplayService(serviceSpecial, ascending);
            }
        }
    }

    function toggleServiceBlocks(selectedOption) {
        serviceAll.style.display = "none";
        serviceBusiness.style.display = "none";
        serviceSpecial.style.display = "none";
        if (selectedOption === "all") {
            serviceAll.style.display = "grid";
        } else if (selectedOption === "business") {
            serviceBusiness.style.display = "grid";
        } else if (selectedOption === "special") {
            serviceSpecial.style.display = "grid";
        }
        adjustMainClassHeight(); 
    }


    function adjustMainClassHeight() {
        const visibleService = document.querySelector("#service:not([style*='display: none']), #service2:not([style*='display: none']), #service3:not([style*='display: none'])");
        const serviceHeight = visibleService ? visibleService.offsetHeight : 0;
        ww.style.height = `${serviceHeight + footerOffset}px`;
    }

    serviceSelect.addEventListener("change", function() {
        toggleServiceBlocks(this.value);
        sortServices(); 
    });


    sortButton.addEventListener("change", function() {
        sortServices(); 
    });


    toggleServiceBlocks("all");
    window.addEventListener("resize", adjustMainClassHeight);
});