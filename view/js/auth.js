import { domElements } from "./domElements.js"
import { openOverlay, closeOverlay  } from "./script.js";

export function setUpAuth() {
    // --- Authentication Logic ---
    if (domElements.loginIcon && domElements.authOverlay && domElements.closeAuthBtn) {
	domElements.loginIcon.addEventListener('click', () => openOverlay(domElements.authOverlay));
	domElements.closeAuthBtn.addEventListener('click', () => closeOverlay(domElements.authOverlay));
	domElements.authOverlay.addEventListener('click', (event) => { // Close on backdrop click
	    if (event.target === domElements.authOverlay) {
		closeOverlay(domElements.authOverlay);
	    }
	});
	// Show Login Form
	domElements.showLoginFormBtn.addEventListener('click', () => {
	    domElements.authInitialSection.classList.add('hidden');
	    domElements.loginFormSection.classList.remove('hidden');
	    domElements.signupFormSection.classList.add('hidden');
	    domElements.authMessage.classList.add('hidden');
	});
	// Show Signup Form
	domElements.showSignupFormBtn.addEventListener('click', () => {
	    domElements.authInitialSection.classList.add('hidden');
	    domElements.signupFormSection.classList.remove('hidden');
	    domElements.loginFormSection.classList.add('hidden');
	    domElements.authMessage.classList.add('hidden');
	});
	
	// Handle Signup Submission
	domElements.signupSubmitBtn.addEventListener('click', () => {
	    const firstName = domElements.signupNameInput.value.trim();
	    const lastName = domElements.signupSurnameInput.value.trim();
	    const password = domElements.signupPasswordInput.value;

	    if (!firstName || !lastName || !password) {
	       domElements.authMessage.textContent = "Please fill in all fields.";
		domElements.authMessage.className = 'auth-feedback error';
		domElements.authMessage.classList.remove('hidden');
		return;
	    }
	    
	    signUp(firstName, lastName, password);

	});

	domElements.loginSubmitBtn.addEventListener('click', () => {
	    const firstName = domElements.loginNameInput.value.trim();
	    const lastName = domElements.loginSurnameInput.value.trim();
	    const password = domElements.loginPasswordInput.value;
	    
	    if (!firstName || !lastName || !password) {
		domElements.authMessage.textContent = "Please fill in all fields.";
		domElements.authMessage.className = 'auth-feedback error';
		domElements.authMessage.classList.remove('hidden');
		return;
	    }
	    login(firstName, lastName, password);
	});

	domElements.backToAuthInitialFromLoginBtn.addEventListener('click', (e) => { 
		e.preventDefault(); 
		goBackToAuthInitial(); 
	});

	domElements.backToAuthInitialFromSignupBtn.addEventListener('click', (e) => { 
		e.preventDefault(); 
		goBackToAuthInitial(); 
	});
    }
    else {
	console.error("Authentication UI elements not found. Check IDs in HTML.");
    }
}

// Back to Initial Auth View
function goBackToAuthInitial() {
    domElements.loginFormSection.classList.add('hidden');
    domElements.signupFormSection.classList.add('hidden');
    domElements.authInitialSection.classList.remove('hidden');
    domElements.authMessage.classList.add('hidden');
}

function login(firstName, lastName, password) {
    const foundUser = simulatedUsers.find(u => 
	u.firstName.toLowerCase() === firstName.toLowerCase() &&
	u.lastName.toLowerCase() === lastName.toLowerCase() &&
	u.password === password
    );

    if (foundUser) {
	domElements.authMessage.textContent = "Successful login!";
	domElements.authMessage.className = 'auth-feedback success';
    } else {
	domElements.authMessage.textContent = "User not found or incorrect password. Please create an account.";
	domElements.authMessage.className = 'auth-feedback error';
    }
    domElements.authMessage.classList.remove('hidden');
}

function signUp(firstName, lastName, password) {
    
    const userExists = simulatedUsers.some(u => 
	u.firstName.toLowerCase() === firstName.toLowerCase() &&
	u.lastName.toLowerCase() === lastName.toLowerCase()
    );

    if (userExists) {
	domElements.authMessage.textContent = "A User with this name and surname was found. Please login.";
	domElements.authMessage.className = 'auth-feedback error';
    } else {
	simulatedUsers.push({ firstName, lastName, password });
	domElements.authMessage.textContent = "Successful sign up! You can now login.";
	domElements.authMessage.className = 'auth-feedback success';
	// console.log("Current users:", simulatedUsers); // For debugging
    }
    domElements.authMessage.classList.remove('hidden');

}
