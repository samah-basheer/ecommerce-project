<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Transit;
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
    public function addProduct(Request $request) {
        $product = new Product;
        $product->name = $request->name;
        $product->description = $request->description;
        $product->sku = $request->sku;
        $product->price = $request->price;
        $product->category_id = $request->category_id;
        $product->inventory_id = $request->inventory_id;
        $product->save();
        return response()->json([
            "status" => "Success"
        ], 200);
    }
    public function editProduct($id) {
        $product = Product::with('category', 'inventory')->findOrFail($id);
        return response()->json([
            "status" => "Success",
            "product" => $product
        ]);
    }
    public function updateProduct(Request $request, $id) {
        $product = Product::with('category', 'inventory')->findOrFail($id);
        $product->name = $request->name;
        $product->description = $request->description;
        $product->sku = $request->sku;
        $product->price = $request->price;
        $product->category_id = $request->category_id;
        $product->inventory_id = $request->inventory_id;
        $product->update();
        return response()->json([
            "status" => "Success"
        ]);
    }
    public function deleteProduct($id) {
        $product = Product::findOrFail($id);
        $product->delete();
        return response()->json([
            "status" => "Success"
        ], 200);
    }
}
