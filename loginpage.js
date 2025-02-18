 const togglePassword = document.getElementById('toggle-password');
const passwordField = document.getElementById('password');

// Toggle password visibility
togglePassword.addEventListener('click', () => {
    if (passwordField.type === 'password') {
        passwordField.type = 'text';
        togglePassword.textContent = '🙈'; // Change to hide icon
    } else {
        passwordField.type = 'password';
        togglePassword.textContent = '👁'; // Change to show icon
    }
});

const formContent = document.getElementById('form-content');
const panelTitle = document.getElementById('panel-title');
const forgotPasswordLink = document.getElementById('forgot-password');
const registerLink = document.getElementById('register-link');

forgotPasswordLink.addEventListener('click', () => {
    panelTitle.textContent = 'Reset Password';
    formContent.innerHTML = `
        <div class="input-group">
            <label for="reset-email">Enter Registered Email</label>
            <input type="email" id="reset-email" placeholder="Enter your registered email">
        </div>
        <button class="btn-login" type="button" id="reset-button">Submit</button>
    `;

    document.getElementById('reset-button').addEventListener('click', async () => {
        const email = document.getElementById('reset-email').value;

        loadingSpinner.style.display = 'flex';

        if (!email) {
            alert("Please enter your email.");
            return;
        }

        const apiUrl = "https://script.google.com/macros/s/AKfycbwJGtorxSEbM5ApVIgJBDQOJ0NdOXs2mq-LftJHt56FG4lfKz8OmJBWe4dsGJAtrmS6/exec";

        // Verify the email and request a temporary code
        try {
            const response = await fetch(`${apiUrl}?action=verifyEmail&email=${email}`);
            const result = await response.json();

            loadingSpinner.style.display = 'none';

            if (result.status === "success") {
                alert(result.message);
                showTemporaryCodeForm(email);
            } else {
                alert(result.message);
            }
        } catch (error) {
            console.error('Error during password reset request:', error);
            loadingSpinner.style.display = 'none';
        }
    });
});

function showTemporaryCodeForm(email) {
    panelTitle.textContent = 'Set New Password';
    formContent.innerHTML = `
        <div class="input-group">
            <label for="view-email">Email Address</label>
            <input type="email" id="view-email" value="${email}" readonly>
        </div>
        <div class="input-group">
            <label for="temp-code">Temporary Code</label>
            <input type="text" id="temp-code" placeholder="Enter temporary code">
        </div>
        <div class="input-group">
            <label for="new-password">New Password</label>
            <input type="password" id="new-password" placeholder="Enter new password">
            <span class="toggle-password" id="toggle-new-password">👁</span>
        </div>
        <div class="input-group">
            <label for="confirm-password">Re-enter Password</label>
            <input type="password" id="confirm-password" placeholder="Re-enter new password">
            <span class="toggle-password" id="toggle-confirm-password">👁</span>
        </div>
        <button class="btn-login" type="button" id="set-password-button">Submit</button>
    `;

    // Toggle password visibility logic
    function togglePasswordVisibility(passwordFieldId, toggleIconId) {
        const passwordField = document.getElementById(passwordFieldId);
        const toggleIcon = document.getElementById(toggleIconId);

        toggleIcon.addEventListener('click', () => {
            if (passwordField.type === 'password') {
                passwordField.type = 'text';
                toggleIcon.textContent = '🙈';
            } else {
                passwordField.type = 'password';
                toggleIcon.textContent = '👁';
            }
        });
    }

    // Attach toggle functionality to password fields
    togglePasswordVisibility('new-password', 'toggle-new-password');
    togglePasswordVisibility('confirm-password', 'toggle-confirm-password');

    document.getElementById('set-password-button').addEventListener('click', async () => {
        const tempCode = document.getElementById('temp-code').value;
        const newPassword = document.getElementById('new-password').value;
        const confirmPassword = document.getElementById('confirm-password').value;

        if (!tempCode || !newPassword || !confirmPassword) {
            alert('Please fill out all fields.');
            return;
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
        if (!passwordRegex.test(newPassword)) {
            alert('Password must be at least 8 characters long and include uppercase, lowercase, numbers, and special characters.');
            return;
        }

        if (newPassword !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }
        loadingSpinner.style.display = 'flex';

        try {
            const apiUrl = "https://script.google.com/macros/s/AKfycbwJGtorxSEbM5ApVIgJBDQOJ0NdOXs2mq-LftJHt56FG4lfKz8OmJBWe4dsGJAtrmS6/exec";
            const encodedPassword = encodeURIComponent(newPassword);
            const response = await fetch(`${apiUrl}?action=resetPassword&email=${encodeURIComponent(email)}&tempCode=${encodeURIComponent(tempCode)}&newPassword=${encodedPassword}`);
            const result = await response.json();

            loadingSpinner.style.display = 'none';

            if (result.status === "success") {
                alert(result.message);
                window.location.href = 'index.html'; // Redirect to login page
            } else {
                alert(result.message);
            }
        } catch (error) {
            console.error('Error during password reset:', error);
            loadingSpinner.style.display = 'none';
        }
    });
}



// Register form logic
registerLink.addEventListener('click', (event) => {
    event.preventDefault();
    panelTitle.textContent = 'Register';
    formContent.innerHTML = `
        <div class="input-group">
            <label for="register-email">Email Address</label>
            <input type="email" id="register-email" placeholder="Enter your email">
        </div>
        <div class="input-group">
            <label for="register-username">Username</label>
            <input type="text" id="register-username" placeholder="Enter your username">
        </div>
        <div class="input-group">
            <label for="register-password">Password</label>
            <input type="password" id="register-password" placeholder="Enter your password">
            <span class="toggle-password" id="toggle-register-password">👁</span>
        </div>
        <div class="input-group">
            <label for="register-confirm-password">Re-enter Password</label>
            <input type="password" id="register-confirm-password" placeholder="Re-enter your password">
        </div>
        <button class="btn-login" type="button" id="register-button">Register</button>
    `;

    const toggleRegisterPassword = document.getElementById('toggle-register-password');
    const registerPasswordField = document.getElementById('register-password');
    toggleRegisterPassword.addEventListener('click', () => {
        if (registerPasswordField.type === 'password') {
            registerPasswordField.type = 'text';
            toggleRegisterPassword.textContent = '🙈';
        } else {
            registerPasswordField.type = 'password';
            toggleRegisterPassword.textContent = '👁';
        }
    });

    const registerButton = document.getElementById('register-button');
    const loadingSpinner = document.getElementById('loading');

registerButton.addEventListener('click', async () => {
    
    const email = document.getElementById('register-email').value;
    const username = document.getElementById('register-username').value;
    const password = document.getElementById('register-password').value;
    const confirmPassword = document.getElementById('register-confirm-password').value;

    // Ensure all fields are filled
    if (!email || !username || !password) {
        alert('Please fill out all fields.');
        loadingSpinner.style.display = 'none';
        return;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
                    if (!passwordRegex.test(password)) {
                        alert(
                            'Password must be at least 8 characters long and include uppercase, lowercase, numbers, and special characters.'
                        );
                        // loadingSpinner.style.display = 'none';
                        return;
                    }


    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        loadingSpinner.style.display = 'none';
        return;
    }

    
    // Replace with your Google Apps Script web app URL
    const apiUrl = 'https://script.google.com/macros/s/AKfycbzI82Hnv1RAZ_KZswW6gIxGrYGMg0CUZHgD2vsbqi_JlC9GhzsM-_ERYXJjZBp09iOD/exec';

    const params = new URLSearchParams();
    params.append('email', email);
    params.append('username', username);
    params.append('password', encodeURIComponent(password));

    loadingSpinner.style.display = 'flex';

    try {

        
        const response = await fetch(apiUrl + `?email=${email}&username=${username}&password=${password}`, {
            method: 'GET', // Make sure to use the correct method (GET or POST)
        });

        const data = await response.text();

        // if (email === (`${email}`)) {
        //     alert('Email already exists');
        //     loadingSpinner.style.display = 'none';
        //     return;
        // }

        // Check the response from Google Apps Script
        if (data === 'Email already exists') {
            alert('Email already exists');
            loadingSpinner.style.display = 'none';
            return;
        }


        if (data === 'Registration successful') {
            // loadingSpinner.style.display = 'none';
            alert('Registration successful!');
            // Optionally clear form or redirect to login page
            window.location.href = 'index.html';  // Redirect to login page after successful registration
        } else {
            alert('Registration failed! Try again.');
            loadingSpinner.style.display = 'none';
        }
    } catch (error) {
        console.error('Error during registration:', error);
        alert('An error occurred. Please try again later.');
        loadingSpinner.style.display = 'none';
    }
});
});


// Login button logic

const loginButton = document.getElementById('login-button');
const loadingSpinner = document.getElementById('loading');
const errorMessage = document.getElementById('error-message');

loginButton.addEventListener('click', async () => {
    loadingSpinner.style.display = 'flex';
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (!email || !password) {
        alert("Please enter both email and password.");
        loadingSpinner.style.display = 'none';
        return;
    }

    // Replace with your Google Apps Script URL
    const apiUrl = 'https://script.google.com/macros/s/AKfycby-320-nexQXhVF9rr3K8AgNQQW1RDsRUoaWA2ffua8qAZ2Ha6hicKaenUs-J7RSzFc/exec';
    
    try {
        // Encode the password to safely send special characters
        const encodedPassword = encodeURIComponent(password);

        const response = await fetch(`${apiUrl}?email=${encodeURIComponent(email)}&password=${encodedPassword}`);
        const data = await response.text();

        console.log(`Email: ${email}`);
        console.log(`Password: ${password}`);
        console.log(`Response: ${data}`);

        if (data === "Login successful") {
            loadingSpinner.style.display = 'none';
            localStorage.setItem("email", email);
            localStorage.setItem("password", password);
            window.location.href = 'Main page.html'; // Redirect to the main page
        } else {
            loadingSpinner.style.display = 'none';
            alert('Invalid credentials!');
        }
    } catch (error) {
        console.error('Error during login:', error);
        loadingSpinner.style.display = 'none';
    }
});





//