<html>
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <title>Commuttr</title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link href="{{ asset('/vendor/stylesheets/bootstrap.css') }}" rel="stylesheet"/>
        <link href="{{ asset('/vendor/stylesheets/font-awesome.css') }}" rel="stylesheet"/>
		<style>
            @import url(http://fonts.googleapis.com/css?family=Lato:400,700);
			body {
                background: url('http://www.localnewsmanhattan.com/wp-content/uploads/2014/09/new-york-city.jpg') no-repeat center center fixed;
                -webkit-background-size: cover;
                -moz-background-size: cover;
                -o-background-size: cover;
                background-size: cover;
				margin: 0;
				padding: 0;
				width: 100%;
				height: 100%;
				color: #555555;
				display: table;
				font-weight: 400;
				font-family: 'Lato';
			}

			.welcome-container {
                background: rgba(255, 255, 255, .7);
				text-align: center;
				display: table-cell;
				vertical-align: middle;
			}

			.content {
				text-align: center;
				display: inline-block;
			}

			.title {
				font-size: 96px;
				margin-bottom: 40px;
			}

			.quote {
				font-size: 24px;
			}

            #query_form {width: 80%; margin: 20px auto 0; }
		</style>
	</head>
	<body>
		<main class="welcome-container">
			<section class="content">
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
                                <li><a href="/auth/signup">Sign up</a></li>
                                <li><a href="/auth/login">Log in</a></li>
                                @endif
                            </ul>
                        </div><!--/.nav-collapse -->
                    </div>
                </nav>

				<div class="title">Commuttr</div>
				<div class="quote">
                    Are you lost? Don't know how to get there? We will tell you.
                </div>
                <form method="get" id="query_form" action="/routes/search">
                    <input type="text" name="query" class="form-control input-lg"
                    placeholder="Where are you going?"/>
                </form>
			</section>
		</main>

        <script src="{{ asset('/vendor/javascript/jquery.js') }}"></script>
        <script src="{{ asset('/vendor/javascript/bootstrap.js') }}"></script>
	</body>
</html>
