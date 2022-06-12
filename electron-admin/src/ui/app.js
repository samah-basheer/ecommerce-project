let add_prod = document.getElementById('add_prod');
let add_cat = document.getElementById('add_cat');

let category_section = document.getElementById('category_section');
let prod_section = document.getElementById('product_section');
let laravel_ip = "http://127.0.0.1:8000/";

const container = document.querySelector(".container"),
    pwShowHide = document.querySelectorAll(".showHidePw"),
    pwFields = document.querySelectorAll(".password"),
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

// if(localStorage.getItem('user_id')) {
//     window.location.replace('admin.html');
// }

if(add_prod) {
    add_prod.addEventListener("click",function(event){
        event.preventDefault();
        category_section.style.display = "none";
        prod_section.style.display = "block";
    });
}

if(add_cat) {
    add_cat.addEventListener('click',function(e){
        e.preventDefault();
        category_section.style.display = "block";
        prod_section.style.display = "none";
    });
}

let add_category_btn = document.getElementById('add_category');
if(add_category_btn) {
    add_category_btn.addEventListener("click", function(event){
        event.preventDefault();

        let status = document.getElementById("cat_status");

        let cat_name = document.getElementById("cat_name").value;
        let cat_desc = document.getElementById("cat_desc").value;

        let data = new FormData();
        data.append('name', cat_name);
        data.append('description', cat_desc);

        let url = laravel_ip + 'api/v1/category/create';

        axios({
            method: 'POST',
            url: url,
            data: data
        })
            .then(function (response) {
                if(response.data.status == "Success") {
                    document.getElementById("cat_name").value = '';
                    document.getElementById("cat_desc").value = '';
                    status.innerHTML = response.data.status;
                    status.style.color = "green";
                }
            }).catch((error)=>error?.response?.data?.error);
    });
}

function insertAfter(referenceNode, newNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

if(add_prod) {
    add_prod.addEventListener("click", function(event){
        event.preventDefault();

        let option = '';
        let select = document.getElementById('select_category')

        let url = laravel_ip + 'api/v1/category';

        axios({
            method: 'GET',
            url: url
        })
            .then(function (response) {
                if(response.data.status == "Success") {
                    for(let i = 0; i < response.data.categories.length; i++) {
                        option = document.createElement('option');
                        option.value = response.data.categories[i].id;
                        option.textContent = response.data.categories[i].name;
                        select.add(option);
                    }
                }
            }).catch((error)=>error?.response?.data?.error);
    });
}

let add_product = document.getElementById('add_product');
if(add_product) {
    add_product.addEventListener("click", function(event){
        event.preventDefault();

        let status = document.getElementById("prod_status");

        let prod_name = document.getElementById("prod_name").value;
        let prod_desc = document.getElementById("prod_desc").value;
        let sku = document.getElementById("prod_sku").value;
        let price = document.getElementById("prod_price").value;
        let category = document.getElementById("select_category").value;
        let inventory = document.getElementById("prod_inventory").value;
        let pic_url = document.getElementById("prod_img").files[0];

        let data = new FormData();
        data.append('name', prod_name);
        data.append('description', prod_desc);
        data.append('sku', sku);
        data.append('pic_url', pic_url);
        data.append('price', price);
        data.append('category_id', category);
        data.append('inventory', inventory);

        let url = laravel_ip + 'api/v1/product/create';

        axios({
            method: 'POST',
            url: url,
            data: data
        })
            .then(function (response) {
                if(response.data.status == "Success") {
                    document.getElementById("prod_name").value = '';
                    prod_desc = document.getElementById("prod_desc").value = '';
                    document.getElementById("prod_sku").value = '';
                    document.getElementById("prod_price").value = '';
                    document.getElementById("select_category").value = '';
                    document.getElementById("prod_inventory").value = '';
                    document.getElementById("prod_img").value = '';
                    status.innerHTML = response.data.status;
                    status.style.color = "green";
                }
            }).catch((error)=>error?.response?.data?.error);

    });
}

let login_btn = document.getElementById('login-btn');
if(login_btn) {
    login_btn.addEventListener("click", function(event) {
        event.preventDefault();
        let email = document.getElementById("email").value;
        let password = document.getElementById("password").value;

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
                if(response.data.error == "Unauthorized") {
                    console.log('ghalattt');
                } else {
                    localStorage.setItem('user_id', response.data.user.id);
                    localStorage.setItem('access_token', response.data.access_token);
                    window.location.href = 'admin.html';
                }
            }).catch((error)=>error?.response?.data?.error);
    });
}
