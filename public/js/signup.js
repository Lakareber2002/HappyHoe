document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Clear previous error messages
    document.getElementById('nameError').textContent = '';
    document.getElementById('emailError').textContent = '';
    document.getElementById('passwordError').textContent = '';
    document.getElementById('confirmPasswordError').textContent = '';
    document.getElementById('roleError').textContent = '';
    document.getElementById('contactError').textContent = '';

    let isValid = true;

    // Get form values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const role = document.getElementById('role').value;
    const contact = document.getElementById('contact').value.trim();

    // Validate name
    if (name.length < 3) {
        document.getElementById('nameError').textContent = 'Name must be at least 3 characters long.';
        isValid = false;
    }

    // Validate email
    if (!validateEmail(email)) {
        document.getElementById('emailError').textContent = 'Please enter a valid email address.';
        isValid = false;
    }

    // Validate password
    if (password.length < 6) {
        document.getElementById('passwordError').textContent = 'Password must be at least 6 characters long.';
        isValid = false;
    }

    // Confirm passwords match
    if (password !== confirmPassword) {
        document.getElementById('confirmPasswordError').textContent = 'Passwords do not match.';
        isValid = false;
    }

    // Validate role
    if (role === '') {
        document.getElementById('roleError').textContent = 'Please select a role.';
        isValid = false;
    }

    // Validate contact number
    if (!validateContact(contact)) {
        document.getElementById('contactError').textContent = 'Please enter a valid contact number.';
        isValid = false;
    }

    if (isValid) {
        document.getElementById('formMessage').textContent = 'Registration successful!';
        document.getElementById('formMessage').style.color = 'blue';
        // You can add code here to handle the form data, e.g., send it to a server
    } else {
        document.getElementById('formMessage').textContent = '';
    }
});

function validateEmail(email) {
    // Simple email validation regex
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validateContact(contact) {
    // Simple contact number validation 
    const re = /^\d{10,15}$/;
    return re.test(contact);
}
