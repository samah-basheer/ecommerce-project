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
    login = document.querySelector(".login-link");

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
signUp.addEventListener("click", () => {
    container.classList.add("active");
});
login.addEventListener("click", () => {
    container.classList.remove("active");
});

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
                    console.log(response.data.access_token);
                }
            }).catch((error)=>error?.response?.data?.error);
    });
}