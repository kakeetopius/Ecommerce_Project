const cardFields = document.getElementById('cardFields');
const radios = document.querySelectorAll('input[name="payment"]');
const form = document.getElementById('checkoutForm');
const submitBtn = document.getElementById('submitBtn');
const loading = document.getElementById('loading');
const result = document.getElementById('result');
const quantityElement = document.getElementById("no_of_products");
const cartTotal = document.getElementById("cart_total");
const firstNameField = document.getElementById("firstName");
const lastNameField = document.getElementById("lastName");
const emailField = document.getElementById("email");


document.addEventListener("DOMContentLoaded", async () => {

    radios.forEach(radio => {
	radio.addEventListener('change', () => {
	  cardFields.style.display = radio.value === 'card' ? 'block' : 'none';
	});
    });

    submitBtn.addEventListener('click', confirmOrder);
    
    const user_info = await getUserInfo();

    if (firstNameField && user_info.fname) {
	firstNameField.value = user_info.fname;
    }
    if (lastNameField && user_info.lname) {
	lastNameField.value = user_info.lname;
    }
    if (emailField && user_info.email) {
	emailField.value = user_info.email;
    }

    const quantity = await getItemQuantity();
    const total = await getCartTotal();

    if (quantityElement) {
	quantityElement.innerHTML = `Product(s): <strong>${quantity} Item(s)</strong>`;
    }

    if (cartTotal) {
	cartTotal.innerHTML = `Total: <strong>Ksh. ${total}</strong>`;
    }
});


async function getUserInfo() {
    const response = await fetch("/index.php/user/userinfo");
    const data = await response.json();

    if(!data.success) {
	window.alert("First Sign In or Sign Up");

    }

   return data;
}

async function getItemQuantity() {
    const response = await fetch("/index.php/cart/get");
    const data = await response.json();

    if (!data.success) {
	return -1;
    }
    
    let quantity = 0;

    for (const product of data['cart']) {
	quantity += product.qty;
    }
    
    return quantity;
}

async function getCartTotal() {
    const response = await fetch("/index.php/cart/total")
    const data = await response.json();

    if(!data.success) {
	return -1;
    }

    return data.total;
}

async function confirmOrder() {

    if (!form.checkValidity()) {
	form.reportValidity();
	return;
    }


    loading.style.display = 'block';
    result.style.display = 'none';

    const resp = await fetch("/index.php/cart/confirm");
    resp.json()
	.then(data => {

	if (data.success) {
	    window.alert("Order Confirmed")
	    result.textContent = "✅ Order Placed Successfully!";
	    loading.style.display = 'none';
	    window.location.href = "/";
	}
	else {
	    result.textContent = "❌ Payment Failed. Try Again."
	    loading.style.display = 'none';
    }
    });

}
