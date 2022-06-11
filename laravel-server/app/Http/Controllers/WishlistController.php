<?php

namespace App\Http\Controllers;

use App\Models\Wishlist;
use Illuminate\Http\Request;

class WishlistController extends Controller
{
    public function index() {
        $wishlists = Wishlist::with('user', 'product')->get();
        return response()->json([
            "status" => "Success",
            "wishlist" => $wishlists
        ], 200);
    }
    public function create(Request $request) {
        $wishlist = new Wishlist;
        $wishlist->user_id = $request->user_id;
        $wishlist->product_id = $request->product_id;
        $wishlist->save();
        return response()->json([
            "status" => "Success"
        ], 200);
    }
    public function edit($id) {
        $wishlist = Wishlist::findOrFail($id);
        return response()->json([
            "status" => "Success",
            "wishlist" => $wishlist
        ]);
    }
    public function update(Request $request, $id) {
        $wishlist = Wishlist::with('user', 'product')->findOrFail($id);
        $wishlist->user_id = $request->user_id;
        $wishlist->product_id = $request->product_id;
        $wishlist->update();
        return response()->json([
            "status" => "Success"
        ]);
    }
    public function destroy($id) {
        $product = Wishlist::findOrFail($id);
        $product->delete();
        return response()->json([
            "status" => "Success"
        ], 200);
    }
    public function requestID($user_id, $product_id) {
        $wishlist = Wishlist::where('user_id', $user_id)->where('product_id', $product_id)->get();
        return response()->json([
            "status" => "Success",
            "wishlist" => $wishlist
        ], 200);
    }
}
