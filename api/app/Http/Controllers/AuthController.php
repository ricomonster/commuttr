<?php //-->
namespace Commuttr\Http\Controllers;

use Commuttr\Http\Requests;

class AuthController extends Controller {
    public function login()
    {
        return view('auth.login');
    }

    public function register()
    {
        return view('auth.register');
    }
}
