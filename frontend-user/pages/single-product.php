<?php include_once '../includes/header.php' ?>
    <div class="page-title">
        <h1>Lips</h1>
    </div>
    <div class="wrapper min-height">
        <div class="single-product-detail wrapper-content">
            <div class="product-img">
                <img id="product-img">
            </div>
            <div>
                <div class="product-title">
                    <h2 class="title" id="title"></h2>
                    <ul>
                        <li>SKU: <span id="sku"></span></li>
                        <li>Category: <span id="category"></span></li>
                        <li>Stock: <span id="stock"></span></li>
                    </ul>
                    <p class="price">LBP <span id="price"></span></p>
                    <p class="wishlist">
                        <i class="far fa-heart" aria-hidden="true"></i>
                        <span>Add to wishlist</span>
                    </p>
                </div>
            </div>
        </div>
        <div class="description">
            <h2>Description</h2>
            <p id="description"></p>
        </div>
    </div>
<?php include_once '../includes/footer.php' ?>