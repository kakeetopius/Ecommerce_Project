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
	domElements.signupForm.addEventListener('submit', (e) => {
	    e.preventDefault();
	    const firstName = domElements.signupNameInput.value.trim();
	    const lastName = domElements.signupSurnameInput.value.trim();
	    const email = domElements.signupEmailInput.value.trim();
	    const password = domElements.signupPasswordInput.value;

	    if (!firstName || !lastName || !password) {
	       domElements.authMessage.textContent = "Please fill in all fields.";
		domElements.authMessage.className = 'auth-feedback error';
		domElements.authMessage.classList.remove('hidden');
		return;
	    }
	    signUp(firstName, lastName,email,password);

	});
    
	domElements.loginForm.addEventListener('submit', (e) => {
	    e.preventDefault();
	    const email = domElements.loginEmailInput.value;
	    const password = domElements.loginPasswordInput.value;
	    
	    if (!email|| !password) {
		domElements.authMessage.textContent = "Please fill in all fields.";
		domElements.authMessage.className = 'auth-feedback error';
		domElements.authMessage.classList.remove('hidden');
		return;
	    }
	    login(email, password);
	});

	domElements.backToAuthInitialFromLoginBtn.addEventListener('click', (e) => { 
		e.preventDefault(); 
		goBackToAuthInitial(); 
	});

	domElements.backToAuthInitialFromSignupBtn.addEventListener('click', (e) => { 
		e.preventDefault(); 
		goBackToAuthInitial(); 
	});

	getUserInfo();
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

async function login(email, password) {
    try{
	const response = await fetch("/index.php/user/login", {
	    method: "POST",
	    headers: {
		"Accept": "application/json",
		"Content-Type": "application/json",
	    },
	    body: JSON.stringify(
		{
		    "email" : email, 
		    "password" : password
		})
	});

	const data = await response.json();
	if (data.success === true) {
	    window.alert("Successful login!");
            domElements.authMessage.textContent = "Successful login!";
            domElements.authMessage.className = 'auth-feedback success';
	    window.location.href = "/";
	}
	else {
            domElements.authMessage.textContent = "User not found or incorrect password. Please create an account.";
            domElements.authMessage.className = 'auth-feedback error';
	}
	domElements.authMessage.classList.remove('hidden');
    }
    catch(e) {
	console.error("Fetch: ", e);
    }
}


async function signUp(firstName, lastName,email, password) {
    
    try{
	const response = await fetch("/index.php/user/signup", {
	    method: 'POST',
	    headers: {
		"Accept"    : "application/json",
		'Content-Type': 'application/json'
	    },
	    body: JSON.stringify({
		"fname" : firstName, 
		"lname": lastName, 
		"email": email, 
		"pass" : password,
	    })
	});

	const data = await response.json();

	if (data.success === true) {
	    window.alert("Sign Up Successfull");
            domElements.authMessage.textContent = "Sign Up Successfull";
	    domElements.authMessage.className = 'auth-feedback success';
	    window.location.href = "/"
	}
	else {
            domElements.authMessage.textContent = "User not found or incorrect password. Please create an account.";
            domElements.authMessage.className = 'auth-feedback error';
	}
	domElements.authMessage.classList.remove('hidden');
    }
    catch(e) {
	console.error("Fetch: ", e);
    }

}


function renderUserInfo({ fname, lname, email }) {
  const overlay = document.getElementById('auth-overlay');

  overlay.innerHTML = `
    <div class="overlay-content auth-panel">
      <div class="auth-header">
        <h2>My Account</h2>
        <button id="close-auth-btn" class="close-btn" aria-label="Close">×</button>
      </div>

      <div class="auth-section">
        <h3>Welcome Back!</h3>
        <p><strong>First Name:</strong> ${fname}</p>
        <p><strong>Last Name:</strong> ${lname}</p>
        <p><strong>Email:</strong> ${email}</p>
        <div style="text-align:center; margin-top: 20px;">
          <button id="logout-btn" class="auth-button-secondary">Logout</button>
        </div>
      </div>
    </div>
  `;

    document.getElementById("close-auth-btn").addEventListener('click', () => closeOverlay(domElements.authOverlay));

    document.getElementById("logout-btn").addEventListener('click', () => logout());
}


async function getUserInfo() {
    const response = await fetch("/index.php/user/userinfo");
    const data = await response.json();

    if (data.success === false) {
	return;
    }
    
    renderUserInfo({fname:data.fname, lname:data.lname, email:data.email});

}

async function logout() {
    window.location.href = "/index.php/user/logout"; 
}
