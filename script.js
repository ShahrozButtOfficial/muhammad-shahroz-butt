// script.js

document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('header');
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelectorAll('header nav ul li');

    // Toggle navigation menu
    navToggle.addEventListener('click', () => {
        header.classList.toggle('nav-active');
        navToggle.classList.toggle('active');
    });

    // Close navigation menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            header.classList.remove('nav-active');
            navToggle.classList.remove('active');
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const target = document.querySelector(this.getAttribute('href'));
            const offsetTop = target.offsetTop;

            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        });
    });

    // Add hover effect to navigation links
    navLinks.forEach(link => {
        link.addEventListener('mouseover', () => {
            link.style.color = '#f1c40f'; // Change link color on hover
        });
        link.addEventListener('mouseout', () => {
            link.style.color = ''; // Restore default link color
        });
    });

    // Add animation to header on page load
    setTimeout(() => {
        header.style.transform = 'translateY(0)';
        header.style.opacity = '1';
    }, 500); // Adjust delay as needed
});

document.addEventListener('DOMContentLoaded', () => {
    const typingText = document.querySelector('.typing-text');
    const words = ['Web Developer', 'Designer', 'Problem Solver']; // Words to animate
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    // Function to simulate typing animation for a word
    function typeWord() {
        const currentWord = words[wordIndex];
        if (!isDeleting && charIndex < currentWord.length) {
            typingText.textContent += currentWord[charIndex];
            charIndex++;
        } else if (isDeleting && charIndex > 0) {
            typingText.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            isDeleting = !isDeleting;
            wordIndex = (wordIndex + 1) % words.length;
        }

        const typingSpeed = isDeleting ? 50 : 100; // Adjust typing and deleting speed as needed
        const delay = isDeleting ? 1000 : 200; // Adjust delay between typing and deleting as needed

        setTimeout(typeWord, charIndex === currentWord.length && !isDeleting ? delay : typingSpeed);
    }

    // Start the typing animation
    setTimeout(typeWord, 500); // Adjust start delay as needed
});

// JavaScript code to handle form submission
document.querySelector('form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const formObject = {};
    formData.forEach((value, key) => { formObject[key] = value });

    try {
        const response = await fetch('/send-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formObject)
        });

        if (response.ok) {
            // Email sent successfully, provide feedback to the user
            alert('Your message has been sent successfully!');
        } else {
            // Error occurred while sending email, display error message using custom error dialog
            openErrorDialog('There was an error sending your message. Please try again later.');
        }
    } catch (error) {
        console.error('Error:', error);
        // An unexpected error occurred, display error message using custom error dialog
        openErrorDialog('An unexpected error occurred. Please try again later.');
    }
});

// Function to open the custom error dialog with a specified error message
function openErrorDialog(message) {
    const errorDialog = document.getElementById('error-dialog');
    const errorMessage = document.getElementById('error-message');
    errorMessage.textContent = message;
    errorDialog.style.display = 'block';
}

// Function to close the custom error dialog
function closeErrorDialog() {
    const errorDialog = document.getElementById('error-dialog');
    errorDialog.style.display = 'none';
}


function openErrorDialog(message) {
    const errorDialog = document.getElementById('error-dialog');
    const errorMessage = document.getElementById('error-message');
    errorMessage.textContent = message;
    errorDialog.style.display = 'block';
}

function closeErrorDialog() {
    const errorDialog = document.getElementById('error-dialog');
    errorDialog.style.display = 'none';
}
