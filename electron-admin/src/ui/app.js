let add_prod = document.getElementById('add_prod');
let add_cat = document.getElementById('add_cat');

let category_section = document.getElementById('category_section');
let prod_section = document.getElementById('product_section');
let laravel_ip = "http://127.0.0.1:8000/";

add_prod.addEventListener("click",function(event){
    event.preventDefault();
    category_section.style.display = "none";
    prod_section.style.display = "block";
});

add_cat.addEventListener('click',function(e){
    e.preventDefault();
    category_section.style.display = "block";
    prod_section.style.display = "none";
});

let add_category_btn = document.getElementById('add_category');
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
