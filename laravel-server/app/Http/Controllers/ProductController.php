<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function getProducts() {
        $products = Product::with('category', 'inventory')->get();
        return response()->json([
            "status" => "Success",
            "products" => $products
        ], 200);
    }
}
