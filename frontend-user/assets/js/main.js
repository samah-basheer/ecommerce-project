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
                console.log(response);
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
            user_name.innerHTML = response.data[0].first_name + ' ' + response.data[0].last_name;
            not_user.innerHTML = response.data[0].first_name + ' ' + response.data[0].last_name;
        }).catch((error)=>error?.response?.data?.error);
}