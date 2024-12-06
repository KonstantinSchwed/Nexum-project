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


    const storedUser = localStorage.getItem('loggedInUser');
    if (storedUser) {
        const user = JSON.parse(storedUser);
        loadUserData(user); 
        

            document.querySelector('input[name="first_name"]').value = user.name || '';
            document.querySelector('input[name="last_name"]').value = user.surname || '';
            document.querySelector('input[name="phone"]').value = user.phone || '';
            document.querySelector('input[name="email"]').value = user.email || '';
    }
});


document.getElementById("loginForm").addEventListener('submit', function(event) {
    event.preventDefault(); 

    const phone = document.getElementById('phone2').value.trim(); 
    const password = document.getElementById('password').value.trim();

    fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ phone, password }) 
    })
    .then(response => response.json())
    .then(data => {
        if (data.message === 'Успешный вход') {
            const { name, surname, phone, email, plan, balance, tariff } = data.user; 
            localStorage.setItem('loggedInUser', JSON.stringify({ name, surname, phone, email, plan, balance, tariff })); 

            document.getElementById('myModal2').style.display = 'none';

            loadUserData({ name, surname, phone, email, plan, balance, tariff }); 

            document.querySelector('input[name="first_name"]').value = name || '';
            document.querySelector('input[name="last_name"]').value = surname || '';
            document.querySelector('input[name="phone"]').value = phone || '';
            document.querySelector('input[name="email"]').value = email || '';
        } else {
            alert(data.error);
        }
    })
    .catch(error => {
        console.error('Ошибка:', error);
    });
});

function loadUserData(user) {
    var entryButton = document.querySelector('.b3b');

    if (entryButton) {
        var guestText = document.createElement("span");
        guestText.className = "guestText"
        guestText.innerText = `Hello, ${user.name}`; 
        guestText.style.color = "#433185"; 
        guestText.style.fontFamily = '"Century Gothic", sans-serif'; 
        guestText.style.fontWeight = "bold"; 
        guestText.style.fontSize = "14px"; 
        guestText.style.marginRight = "20px";

        var toolButton = document.createElement("button");
        toolButton.innerText = "🛠";
        toolButton.className = "toolButton";
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

        toolButton.addEventListener('click', function() {
            document.getElementById('userModal').style.display = 'block';

            const userInfo = document.getElementById('userInfo');
            userInfo.innerHTML = ''; 

            const userAttributes = [
                { label: 'First name:', value: user.name },
                { label: 'Last name:', value: user.surname },
                { label: 'Phone:', value: user.phone },
                { label: 'Email:', value: user.email },
                { label: 'Account type:', value: user.plan },
                { label: 'Tariff:', value: user.tariff }, 
                { label: 'Balance:', value: `${user.balance} rub.` }
            ];

            userAttributes.forEach(attr => {
                const p = document.createElement('p');
                p.innerHTML = `<strong>${attr.label}</strong> ${attr.value}`; 
                userInfo.appendChild(p); 
            });
        });

        document.querySelector('.closeUserModal').addEventListener('click', function() {
            document.getElementById('userModal').style.display = 'none';
        });

      window.addEventListener('click', function(event) {
        var modal = document.getElementById('userModal');
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

        document.getElementById('logoutButton').addEventListener('click', function() {
            localStorage.removeItem('loggedInUser'); 
            container.parentNode.replaceChild(entryButton, container); 
            document.getElementById('userModal').style.display = 'none'; 

            document.querySelector('input[name="first_name"]').value = '';
            document.querySelector('input[name="last_name"]').value = '';
            document.querySelector('input[name="phone"]').value = '';
            document.querySelector('input[name="email"]').value = '';

            const userInfo = document.getElementById('userInfo');
            userInfo.innerHTML = ''; 
        });
    }
}