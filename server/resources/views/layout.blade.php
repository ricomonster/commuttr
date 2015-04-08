<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <title>Commuttr</title>
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="{{ asset('/vendor/stylesheets/bootstrap.css') }}" rel="stylesheet"/>
    <link href="{{ asset('/vendor/stylesheets/font-awesome.css') }}" rel="stylesheet"/>
    <style type="text/css">
        html, body, .container-fluid, .row, div[class^="col-md-"], div[class*="col-md-"] { height: 100%; }
        body { padding-top: 50px; }
        #map_canvas {
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
        }
    </style>
</head>
<body>
    <nav class="navbar navbar-default navbar-fixed-top">
        <div class="container-fluid">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand" href="#">Commuttr</a>
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
                        <li><a href="/auth/signup">Sign up</a></li>
                        <li><a href="/auth/login">Log in</a></li>
                    @endif
                </ul>
            </div><!--/.nav-collapse -->
        </div>
    </nav>


    @yield('content')

    <script src="{{ asset('/vendor/javascript/jquery.js') }}"></script>
    <script src="{{ asset('/vendor/javascript/bootstrap.js') }}"></script>
    @yield('footer.js')
</body>
</html>
