<?php //-->
namespace Commuttr\Http\Controllers;

class AuthController extends Controller {
    public function login()
    {
        return view('auth.login');
    }

    public function signup()
    {
        return view('auth.signup');
    }
}
