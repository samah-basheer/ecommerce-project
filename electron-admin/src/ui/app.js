let add_prod = document.getElementById('add_prod');
let add_cat = document.getElementById('add_cat');

let category_section = document.getElementById('category_section');
let prod_section = document.getElementById('product_section');

add_prod.addEventListener("click",function(event){
    event.preventDefault();
    category_section.style.display = "block";
    prod_section.style.display = "none";
});

add_cat.addEventListener('click',function(e){
    e.preventDefault();
    category_section.style.display = "none";
    prod_section.style.display = "block";
});