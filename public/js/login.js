document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const nameError = document.getElementById('name_error');
    const emailError = document.getElementById('email_error');
    const passwordError = document.getElementById('password_error');

    form.addEventListener('submit', function(event) {
        let valid = true;

        // Clear previous errors
        nameError.textContent = '';
        emailError.textContent = '';
        passwordError.textContent = '';

        // Validate name
        if (nameInput.value.trim() === '') {
            nameError.textContent = 'Name is required';
            valid = false;
        }

        // Validate email
        if (emailInput.value.trim() === '') {
            emailError.textContent = 'Email is required';
            valid = false;
        } else if (!validateEmail(emailInput.value)) {
            emailError.textContent = 'Invalid email format';
            valid = false;
        }

        // Validate password
        if (passwordInput.value.trim() === '') {
            passwordError.textContent = 'Password is required';
            valid = false;
        }

        // Prevent form submission if validation fails
        if (!valid) {
            event.preventDefault();
        }
    });

    function validateEmail(email) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    }
});

    if(password.value.length >= 20 ){
        e.preventDefault();
        password_error.innerHTML = "Password can be more than 20 characters";
    }
    else
    {
        password_error.innerHTML = "";  
    }
