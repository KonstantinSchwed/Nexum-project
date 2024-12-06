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

document.addEventListener("DOMContentLoaded", function() {
    var modalButtons = document.getElementsByClassName('b3b'); 
    var modal = document.getElementById("myModal2");
    var closeBtn = document.getElementsByClassName("close2")[0];
    for (var i = 0; i < modalButtons.length; i++) { 
        modalButtons[i].addEventListener('click', function() {
            modal.style.display = "block";
        });
    }
    closeBtn.addEventListener('click', function() {
        modal.style.display = "none";
    });
    window.addEventListener('click', function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    });
    
document.getElementById("loginForm").addEventListener('submit', function(event) {
    event.preventDefault(); 
    var entryButton = document.querySelector('.b3b');
    if (entryButton) {
        var guestText = document.createElement("span");
        guestText.innerText = "Привет, Гость "; 
        guestText.style.color = "#433185"; 
        guestText.style.fontFamily = '"Century Gothic", sans-serif'; 
        guestText.style.fontWeight = "bold"; 
        guestText.style.fontSize = "14px"; 
        guestText.style.marginRight = "20px";

        var toolButton = document.createElement("button");
        toolButton.innerText = "🛠"; 
        toolButton.style.marginRight = "40px"; 
        toolButton.style.borderRadius = "30px"; 
        toolButton.style.borderColor = "transparent"; 
        toolButton.style.color = "#433185"; 
        toolButton.style.fontFamily = '"Century Gothic", sans-serif'; 
        toolButton.style.fontWeight = "bold"; 
        toolButton.style.fontSize = "14px"; 
        toolButton.style.textAlign = "center"; 

        var container = document.createElement("div");
        container.style.display = "inline-flex";
        container.style.alignItems = "center"; 
        container.appendChild(guestText); 
        container.appendChild(toolButton); 
        entryButton.parentNode.replaceChild(container, entryButton);
    }

    modal.style.display = "none";
});
});
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