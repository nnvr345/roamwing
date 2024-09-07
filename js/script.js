// Select DOM elements
const navbar = document.querySelector('.header .navbar');
const searchForm = document.querySelector('.search-form');
const menuBtn = document.querySelector('#menu-btn');
const navClose = document.querySelector('#nav-close');
const searchBtn = document.querySelector('#search-btn');
const closeSearch = document.querySelector('#close-search');
const bookingForm = document.querySelector('#booking-form');

// Toggle navbar visibility
menuBtn.addEventListener('click', () => {
    navbar.classList.add('active');
});

navClose.addEventListener('click', () => {
    navbar.classList.remove('active');
});

// Toggle search form visibility
searchBtn.addEventListener('click', () => {
    searchForm.classList.add('active');
});

closeSearch.addEventListener('click', () => {
    searchForm.classList.remove('active');
});

// Adjust header style on scroll
const updateHeaderStyle = () => {
    document.querySelector('.header').classList.toggle('active', window.scrollY > 0);
    navbar.classList.remove('active');
};

window.addEventListener('scroll', updateHeaderStyle);
window.addEventListener('load', updateHeaderStyle);

// Handle form submission
function handleFormSubmission(formId) {
    const form = document.querySelector(`#${formId}`);
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevent default form submission

            const fromLocation = form.querySelector('[name="from-location"]').value;
            const toLocation = form.querySelector('[name="to-location"]').value;
            const travelDate = form.querySelector('[name="travel-date"]').value;

            // Store form data in sessionStorage
            sessionStorage.setItem('fromLocation', fromLocation);
            sessionStorage.setItem('toLocation', toLocation);
            sessionStorage.setItem('travelDate', travelDate);

            console.log('Form data stored. Redirecting to details.html...');
            // Redirect to details.html
            window.location.href = 'details.html';
        });
    } else {
        console.error(`Form with ID ${formId} not found.`);
    }
}

// Initialize form handlers for default booking form
handleFormSubmission('booking-form');

// Optional: Handle search form submission (if needed)
document.querySelector('.search-form form')?.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent default form submission
    const query = document.querySelector('#search-box').value;
    console.log(`Search query: ${query}`);
    // Implement search functionality here
});
document.getElementById('contactForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form from submitting the traditional way

    // Show success message
    document.getElementById('successMessage').style.display = 'block';

    // Reset form fields
    document.getElementById('contactForm').reset();

    // Hide the success message after a few seconds (optional)
    setTimeout(function () {
        document.getElementById('successMessage').style.display = 'none';
    }, 5000); // Hide after 5 seconds
});
// Show booking form based on type
function showForm(type) {
    let formHTML = '';

    const options = `
        <option value="" disabled selected>location</option>
        <option value="Tirupati">Tirupati</option>
        <option value="Ooty">Ooty</option>
        <option value="Mysore">Mysore</option>
        <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
        <option value="Hyderabad">Hyderabad</option>
        <option value="Pondicherry">Pondicherry</option>
    `;

    switch (type) {
        case 'flight':
            formHTML = `
                <h3>Book a Flight</h3>
                <form id="flight-form">
                    <div class="form-group">
                        <label for="flight-from">From:</label>
                        <select id="flight-from" name="from-location" required>${options}</select>
                    </div>
                    <div class="form-group">
                        <label for="flight-to">To:</label>
                        <select id="flight-to" name="to-location" required>${options}</select>
                    </div>
                    <div class="form-group">
                        <label for="flight-date">Date:</label>
                        <input type="date" id="flight-date" name="travel-date" required>
                    </div>
                    <button type="submit" class="btn1">Submit</button>
                </form>
            `;
            break;
        case 'train':
            formHTML = `
                <h3>Book a Train</h3>
                <form id="train-form">
                    <div class="form-group">
                        <label for="train-from">From:</label>
                        <select id="train-from" name="from-location" required>${options}</select>
                    </div>
                    <div class="form-group">
                        <label for="train-to">To:</label>
                        <select id="train-to" name="to-location" required>${options}</select>
                    </div>
                    <div class="form-group">
                        <label for="train-date">Date:</label>
                        <input type="date" id="train-date" name="travel-date" required>
                    </div>
                    <button type="submit" class="btn1">Submit</button>
                </form>
            `;
            break;
        case 'bus':
            formHTML = `
                <h3>Book a Bus</h3>
                <form id="bus-form">
                    <div class="form-group">
                        <label for="bus-from">From:</label>
                        <select id="bus-from" name="from-location" required>${options}</select>
                    </div>
                    <div class="form-group">
                        <label for="bus-to">To:</label>
                        <select id="bus-to" name="to-location" required>${options}</select>
                    </div>
                    <div class="form-group">
                        <label for="bus-date">Date:</label>
                        <input type="date" id="bus-date" name="travel-date" required>
                    </div>
                    <button type="submit" class="btn1">Submit</button>
                </form>
            `;
            break;
    }

    bookingForm.innerHTML = formHTML;
    handleFormSubmission(`${type}-form`); // Add submission handler for dynamically added form
}
function handleFormSubmit(event) {
    event.preventDefault(); // Prevent the default form submission

    // Show success message
    const successMessage = document.getElementById('successMessage');
    successMessage.style.display = 'block';

    // Clear form fields
    document.getElementById('contactForm').reset();

    // Optionally hide the success message after a few seconds
    setTimeout(() => {
        successMessage.style.display = 'none';
    }, 5000); // Hide after 5 seconds

    return false; // Prevent traditional form submission
}
document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.contact-us-container form');
    const successMessage = document.getElementById('successMessage');

    if (form) {
        form.addEventListener('submit', (event) => {
            event.preventDefault(); // Prevents the form from actually submitting

            // Display the success message
            successMessage.style.display = 'block';

            // Clear the form fields
            form.reset();

            // Hide the success message after a few seconds
            setTimeout(() => {
                successMessage.style.display = 'none';
            }, 3000); // Hide after 3 seconds
        });
    }
});

