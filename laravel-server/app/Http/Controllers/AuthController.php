<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Auth;
use Validator;
use App\Models\User;

class AuthController extends Controller
{
    public function _construct() {
        $this->middleware('auth:api', ['except' => ['login', 'regiser']]);
    }
    public function register(Request $request) {
        $validator = Validator::make($request->all(), [
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|string|email|unique:users',
            'password' => 'required|string|min:6'
        ]);
        if($validator->fails()) {
            return response()->json(
                $validator->errors()->toJson(), 400
            );
        }
        $user = User::create(array_merge(
            $validator->validated(),
            [
                'password' => bcrypt($request->password)
            ]
        ));
        return response()->json([
            "status" => "Success",
            "user" => $user
        ], 200);
    }
    public function login(Request $request) {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|string'
        ]);
        if($validator->fails()) {
            return response()->json([
                "status" => "Unauthorized",
//                "error" => $validator->errors(),
            ], 422);
        }
        if(!$token = auth()->attempt($validator->validated())) {
            return response()->json(
                [
                    "error" => "Unauthorized"
                ], 200
            );
        }
        return $this->createNewToken($token);
    }
    public function createNewToken($token) {
        return response()->json([
            "access_token" => $token,
            "token_type" => "bearer",
            "expires_in" => auth()->factory()->getTTL()*60,
            "user" => auth()->user()
        ]);
    }
    public function profile() {
        $auth_user = auth()->user();
        if($auth_user) {
            $response = $auth_user;
        } else {
            $response = "token_expired";
        }
        return response()->json([
            "status" => $response
        ]);
    }
    public function logout() {
        auth()->logout();
        return response()->json([
            "status" => "Success"
        ], 200);
    }
}
