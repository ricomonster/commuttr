<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Commuttr - Travel with no worries</title>
    <link href="{{ asset('/vendor/css/bootstrap.css') }}" rel="stylesheet">
    <style type="text/css">
        .container {
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            padding: 0;
        }

        .container .wrapper {
            height: 70%;
            margin: 0 auto;
            padding: 0;
            display: table;
        }

        .container .wrapper .inner {
            display: table-cell;
            margin: auto;
            width: 500px;
            vertical-align: middle;
        }

        .container .wrapper .inner .hero-title { font-size: 80px; text-align: center; }
        .container .wrapper .inner .hero-description { font-size: 20px; text-align: center; }

        .container .wrapper .inner #search_route_form { margin-top: 15px; }
    </style>
</head>
<body>
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
                <h1 class="hero-title">Commuttr</h1>
                <p class="hero-description">Travel with no worries.</p>

                <form id="search_route_form" method="GET" action="{{ url('/route/search') }}">
                    <input type="text" name="query" class="form-control input-lg"
                    placeholder="Where are you going?"/>
                </form>
            </div>
        </section>
    </main>

    <script src="{{ asset('/vendor/js/jquery.js') }}"></script>
    <script src="{{ asset('/vendor/js/bootstrap.js') }}"></script>
</body>
</html>
