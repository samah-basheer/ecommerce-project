<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function index() {
        $categories = Category::all();
        return response()->json([
            "status" => "Success",
            "categories" => $categories
        ], 200);
    }
    public function create(Request $request) {
        $category = new Category;
        $category->name = $request->name;
        $category->description = $request->description;
        $category->save();
        return response()->json([
            "status" => "Success"
        ], 200);
    }
    public function edit($id) {
        $category = Category::findOrFail($id);
        return response()->json([
            "status" => "Success",
            "category" => $category
        ]);
    }
    public function update(Request $request, $id) {
        $category = Category::findOrFail($id);
        $category->name = $request->name;
        $category->description = $request->description;
        $category->update();
        return response()->json([
            "status" => "Success"
        ]);
    }
    public function destroy($id) {
        $category = Category::findOrFail($id);
        $category->delete();
        return response()->json([
            "status" => "Success"
        ], 200);
    }
}
