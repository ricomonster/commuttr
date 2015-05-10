<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Commuttr - Travel with no worries</title>
    <link href="{{ asset('/vendor/css/bootstrap.css') }}" rel="stylesheet">
    <link href="{{ asset('/vendor/css/font-awesome.css') }}" rel="stylesheet">
    <link href="{{ asset('/assets/css/screen.css') }}" rel="stylesheet">
    @yield('css')
</head>
<body class="auth-page">
<main class="container">
    <nav class="navbar navbar-fixed-top">
        <div class="container-fluid">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
            </div>
            <div id="navbar" class="collapse navbar-collapse pull-right">
                <ul class="nav navbar-nav">
                    @if(Auth::user())
                        <li class="dropdown">
                            <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">{{ Auth::user()->name }} <span class="caret"></span></a>
                            <ul class="dropdown-menu pull-right" role="menu">
                                <li><a href="/routes/my">My Routes</a></li>
                                <li><a href="/routes/create">Create Route</a></li>
                                <li class="divider"></li>
                                <li><a href="#">Log out</a></li>
                            </ul>
                        </li>
                    @else
                        <li><a href="{{ url('/auth/register') }}">Sign up</a></li>
                        <li><a href="{{ url('/auth/login') }}">Log in</a></li>
                    @endif
                </ul>
            </div><!--/.nav-collapse -->
        </div>
    </nav>
    <section class="wrapper">
        <div class="inner">
            @yield('content')

            <div class="social-login">
                <p>or</p>

                <a href="#" class="btn btn-primary btn-block btn-lg">
                    <i class="fa fa-facebook fa-fw"></i> Connect via Facebook
                </a>

                <a href="#" class="btn btn-info btn-block btn-lg">
                    <i class="fa fa-twitter fa-fw"></i> Connect via Twitter
                </a>
            </div>
        </div>
    </section>
</main>
<script src="{{ asset('/vendor/js/jquery.js') }}"></script>
@yield('footer.js')
</body>
</html>
