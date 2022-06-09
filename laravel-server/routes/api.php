<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\WishlistController;
use App\Http\Controllers\AuthController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::prefix('v1')->group(function () {

    //  product apis
    Route::prefix('product')->group(function () {
        Route::get('/', [ProductController::class, 'index']);
        Route::post('/create', [ProductController::class, 'create']);
        Route::get('/edit/{id}', [ProductController::class, 'edit']);
        Route::post('/update/{id}', [ProductController::class, 'update']);
        Route::delete('/delete/{id}', [ProductController::class, 'destroy']);
    });

    //  category apis
    Route::prefix('category')->group(function () {
        Route::get('/', [CategoryController::class, 'index']);
        Route::post('/create', [CategoryController::class, 'create']);
        Route::get('/edit/{id}', [CategoryController::class, 'edit']);
        Route::post('/update/{id}', [CategoryController::class, 'update']);
        Route::delete('/delete/{id}', [CategoryController::class, 'destroy']);
    });

    //  wishlist apis
    Route::prefix('wishlist')->group(function () {
        Route::get('/', [WishlistController::class, 'index']);
        Route::post('/create', [WishlistController::class, 'create']);
        Route::get('/edit/{id}', [WishlistController::class, 'edit']);
        Route::post('/update/{id}', [WishlistController::class, 'update']);
        Route::delete('/delete/{id}', [WishlistController::class, 'destroy']);
    });

    // auth
    Route::group(['middleware' => 'api', 'prefix' => 'auth'], function ($router) {
        Route::post('/register', [AuthController::class, 'register']);
        Route::post('/login', [AuthController::class, 'login']);
        Route::get('/profile', [AuthController::class, 'profile']);
        Route::post('/logout', [AuthController::class, 'logout']);
    });
});
