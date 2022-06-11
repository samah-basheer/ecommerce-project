const navToggle = document.querySelector(".navbar_toggle");
const links = document.querySelector(".main_nav");
const laravel_ip = 'http://127.0.0.1:8000/';

navToggle.addEventListener('click', function(){
    links.classList.toggle("show_nav");
})

const container = document.querySelector(".container"),
    pwShowHide = document.querySelectorAll(".showHidePw"),
    pwFields = document.querySelectorAll(".password"),
    signUp = document.querySelector(".signup-link"),
    login = document.querySelector(".login-link"),
    logout = document.querySelector("#logout");

//   js code to show/hide password and change icon
pwShowHide.forEach((eyeIcon) => {
    eyeIcon.addEventListener("click", () => {
        pwFields.forEach((pwField) => {
            if (pwField.type === "password") {
                pwField.type = "text";

                pwShowHide.forEach((icon) => {
                    icon.classList.replace("uil-eye-slash", "uil-eye");
                });
            } else {
                pwField.type = "password";

                pwShowHide.forEach((icon) => {
                    icon.classList.replace("uil-eye", "uil-eye-slash");
                });
            }
        });
    });
});

// js code to appear signup and login form
if(signUp) {
    signUp.addEventListener("click", () => {
        container.classList.add("active");
    });
}
if(login) {
    login.addEventListener("click", () => {
        container.classList.remove("active");
    });
}

// login api
let login_button = document.getElementById("login-btn");
if(login_button) {
    login_button.addEventListener("click", async function(event)  {
        event.preventDefault();
        let email = document.getElementById("email").value;
        let password = document.getElementById("password").value;

        let data = new FormData();
        data.append('email', email);
        data.append('password', password);

        let url = laravel_ip + 'api/v1/auth/login';

        await axios({
            method: 'POST',
            url: url,
            data: data,
        })
            .then(function (response) {
                if(response.data.error == "Unauthorized") {
                    console.log('ghalattt');
                } else {
                    localStorage.setItem('access_token', response.data.access_token);
                    window.location.href = "http://electronjs-laravel/pages/profile.php";
                }
            }).catch((error)=>error?.response?.data?.error);
    });
}

// Register
let signup_button = document.getElementById("signup_button");
if(signup_button) {
    signup_button.addEventListener("click", function(event){
        event.preventDefault();
        let first_name = document.getElementById("first_name").value;
        let last_name = document.getElementById("last_name").value;
        let email = document.getElementById("user_email").value;
        let password = document.getElementById("user_password").value;

        let data = new FormData();
        data.append('first_name', first_name);
        data.append('last_name', last_name);
        data.append('email', email);
        data.append('password', password);

        let url = laravel_ip + 'api/v1/auth/register';

        axios({
            method: 'POST',
            url: url,
            data: data
        })
            .then(function (response) {
                if(response.data.status == "Success") {

                    let data = new FormData();
                    data.append('email', email);
                    data.append('password', password);

                    let url = laravel_ip + 'api/v1/auth/login';
                    axios({
                        method: 'POST',
                        url: url,
                        data: data,
                    })
                        .then(function (response) {
                            localStorage.setItem('access_token', response.data.access_token);
                            window.location.href = "http://electronjs-laravel";
                        }).catch((error)=>error?.response?.data?.error);
                }
            });

    });
}

// logout
if(logout) {
    logout.addEventListener("click", async function(event)  {
        event.preventDefault();

        let url = laravel_ip + 'api/v1/auth/logout';
        await axios({
            method: 'POST',
            url: url,
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('access_token')
            }
        })
            .then(function (response) {
                if(response.data.status == "Success") {
                    localStorage.removeItem('access_token');
                    window.location.href = "http://electronjs-laravel/pages/account.php";
                }
            }).catch((error)=>error?.response?.data?.error);
    });
}
// access links
if(localStorage.getItem('access_token')) {
    if(window.location.href == 'http://electronjs-laravel/pages/account.php') {
        window.location.href = "http://electronjs-laravel/pages/profile.php";
    }
} else {
    if(window.location.href == 'http://electronjs-laravel/pages/profile.php') {
        window.location.href = "http://electronjs-laravel/pages/account.php";
    }
}

// profile
if(window.location.href == 'http://electronjs-laravel/pages/profile.php') {
    let user_name = document.getElementById('user-name');
    let not_user = document.getElementById('not-user');
    let url = laravel_ip + 'api/v1/auth/profile';
    axios({
        method: 'GET',
        url: url,
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('access_token')
        }
    })
        .then(function (response) {
            if(response.data.status == "token_expired") {
                window.location.href == 'http://electronjs-laravel/pages/account.php';
                localStorage.removeItem('access_token');
            } else {
                user_name.innerHTML = response.data.status.first_name + ' ' + response.data.status.last_name;
                not_user.innerHTML = response.data.status.first_name + ' ' + response.data.status.last_name;
            }
        }).catch((error)=>error?.response?.data?.error);
}

function createElementWithClass(type, className) {
    const element = document.createElement(type);
    element.className = className
    return element;
}
function insertAfter(referenceNode, newNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

// product loop
let home_products = document.getElementById("home-product-loop");
if(home_products) {
    let element = '';
    let a, product_img, img, product_title, product_price;
    let url = laravel_ip + 'api/v1/product';
    axios({
        method: 'GET',
        url: url,
    })
        .then(function (response) {
            for (let i = 0; i < response.data.products.length; i++) {
                if(i == 4) {
                    break;
                }
                element = createElementWithClass('div', 'single-product');
                a = document.createElement('a');
                a.href = "/";
                element.appendChild(a);
                product_img = a.appendChild(createElementWithClass('div', 'product-img'));
                img = document.createElement('img');
                img.src = "/assets/img/" + response.data.products[i]['pic_url'];
                product_img.appendChild(img);
                product_title = a.appendChild(createElementWithClass('div', 'product-title'));
                product_title.textContent = response.data.products[i]['name'];
                product_price = a.appendChild(createElementWithClass('div', 'product-price'));
                product_price.textContent = 'LBP ' + response.data.products[i]['price'];
                var x = document.getElementById('hidden');
                insertAfter(x,element);
            }
        }).catch((error)=>error?.response?.data?.error);
}

//product loop page
if(window.location.href == 'http://electronjs-laravel/pages/product.php') {
    let home_products = document.getElementById("product-loop");
    let element = '';
    let a, product_img, img, product_title, product_price;
    let url = laravel_ip + 'api/v1/product';
    axios({
        method: 'GET',
        url: url,
    })
        .then(function (response) {
            for (let i = 0; i < response.data.products.length; i++) {
                element = createElementWithClass('div', 'single-product');
                a = document.createElement('a');
                a.href = "/pages/single-product.php?id="+response.data.products[i]['id'];
                element.appendChild(a);
                product_img = a.appendChild(createElementWithClass('div', 'product-img'));
                img = document.createElement('img');
                img.src = "/assets/img/" + response.data.products[i]['pic_url'];
                product_img.appendChild(img);
                product_title = a.appendChild(createElementWithClass('div', 'product-title'));
                product_title.textContent = response.data.products[i]['name'];
                product_price = a.appendChild(createElementWithClass('div', 'product-price'));
                product_price.textContent = 'LBP ' + response.data.products[i]['price'];
                var x = document.getElementById('product-hidden');
                insertAfter(x,element);
            }
        }).catch((error)=>error?.response?.data?.error);
}