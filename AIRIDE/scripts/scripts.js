// Object to store user and business data
let userData = [];
let businessData = [];

// Function to show the registration or login form
function showForm(formId) {
    const forms = document.querySelectorAll('main section');
    forms.forEach(form => {
        if (form.id === formId) {
            form.classList.remove('hidden');
        } else {
            form.classList.add('hidden');
        }
    });
}

// Handle User Registration
document.querySelector('#userRegistrationForm form').addEventListener('submit', function (event) {
    event.preventDefault();
    const name = this.name.value;
    const email = this.email.value;
    const phone = this.phone.value;
    const password = this.password.value;

    const newUser = { name, email, phone, password };
    userData.push(newUser);
    showDashboard('user', newUser);
});

// Handle User Login
document.querySelector('#userLoginForm form').addEventListener('submit', function (event) {
    event.preventDefault();
    const email = this.email.value;
    const password = this.password.value;

    const user = userData.find(user => user.email === email && user.password === password);
    if (user) {
        showDashboard('user', user);
    } else {
        alert('Invalid login credentials');
    }
});

// Handle Business Registration Step 1 to Step 2 Transition
document.getElementById('toStep2').addEventListener('click', function () {
    const businessName = document.querySelector('#businessRegistrationFormStep1 [name="businessName"]').value;
    const ownerName = document.querySelector('#businessRegistrationFormStep1 [name="ownerName"]').value;
    const ownerContact = document.querySelector('#businessRegistrationFormStep1 [name="ownerContact"]').value;
    const ownerEmail = document.querySelector('#businessRegistrationFormStep1 [name="ownerEmail"]').value;
    const password = document.querySelector('#businessRegistrationFormStep1 [name="password"]').value;

    // Temporarily store business data
    sessionStorage.setItem('tempBusiness', JSON.stringify({ businessName, ownerName, ownerContact, ownerEmail, password }));
    showForm('businessRegistrationFormStep2');
});

// Handle Business Registration Final Step
document.querySelector('#businessRegistrationFormStep2 form').addEventListener('submit', function (event) {
    event.preventDefault();
    const tempBusiness = JSON.parse(sessionStorage.getItem('tempBusiness'));
    const serviceName = this.serviceName.value;
    const offer = this.offer.value;

    const newBusiness = { ...tempBusiness, serviceName, offer };
    businessData.push(newBusiness);
    showDashboard('business', newBusiness);
    sessionStorage.removeItem('tempBusiness');
});

// Function to show the user or business dashboard
function showDashboard(type, data) {
    if (type === 'user') {
        document.getElementById('userDashboard').classList.remove('hidden');
        document.getElementById('userDashboard').querySelector('p').textContent = `Welcome, ${data.name}!`;
        // Populate offers for user
        let offersList = '';
        businessData.forEach(business => {
            offersList += `<div>${business.serviceName} - ${business.offer}</div>`;
        });
        document.getElementById('offersList').innerHTML = offersList;
    } else if (type === 'business') {
        document.getElementById('businessDashboard').classList.remove('hidden');
        document.getElementById('businessDashboard').querySelector('p').textContent = `Welcome, ${data.businessName}!`;
    }
    // Hide other sections
    document.querySelector('header').classList.add('hidden');
    document.querySelector('main').childNodes.forEach(child => {
        if (child.id !== `${type}Dashboard`) {
            child.classList.add('hidden');
        }
    });
}

// Event listeners for the navigation buttons
document.getElementById('userLoginBtn').addEventListener('click', () => showForm('userLoginForm'));
document.getElementById('userRegisterBtn').addEventListener('click', () => showForm('userRegistrationForm'));
document.getElementById('businessLoginBtn').addEventListener('click', () => showForm('businessLoginForm'));
document.getElementById('businessRegisterBtn').addEventListener('click', () => showForm('businessRegistrationFormStep1'));

// Logout functionality
document.getElementById('userLogout').addEventListener('click', () => window.location.reload());
document.getElementById('businessLogout').addEventListener('click', () => window.location.reload());

