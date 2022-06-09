<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index() {
        $products = Product::with('category', 'inventory')->get();
        return response()->json([
            "status" => "Success",
            "products" => $products
        ], 200);
    }
    public function create(Request $request) {
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
    public function edit($id) {
        $product = Product::with('category', 'inventory')->findOrFail($id);
        return response()->json([
            "status" => "Success",
            "product" => $product
        ]);
    }
    public function update(Request $request, $id) {
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
    public function destroy($id) {
        $product = Product::findOrFail($id);
        $product->delete();
        return response()->json([
            "status" => "Success"
        ], 200);
    }
}
