document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    loginUser();
});

function loginUser() {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const loginMessage = document.getElementById('loginMessage');

    // Basic email validation
    if (!validateEmail(email)) {
        loginMessage.textContent = 'Invalid email format.';
        loginMessage.style.color = 'red';
        return;
    }

   
    if (email === '' || password === '') {
        loginMessage.textContent = 'Both fields are required.';
        loginMessage.style.color = 'red';
        return;
    }

    
    const storedUser = localStorage.getItem(email);
    if (storedUser) {
        const userData = JSON.parse(storedUser);
        if (userData.password === password) {
            loginMessage.textContent = 'Login successful!';
            loginMessage.style.color = 'green';
        } else {
            loginMessage.textContent = 'Incorrect password.';
            loginMessage.style.color = 'red';
        }
    } else {
        loginMessage.textContent = 'User not found.';
        loginMessage.style.color = 'red';
    }
}

function validateEmail(email) {
    
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}