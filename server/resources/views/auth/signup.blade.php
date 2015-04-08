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
        @import url(http://fonts.googleapis.com/css?family=Lato:400,700);

        html { height: 100%; }
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

        .auth-signup-page {
            background: rgba(255, 255, 255, .7);
            display: table-cell;
            vertical-align: middle;
        }

        .auth-signup-page .wrapper { display: block; margin: auto; width: 40%; }
        .auth-signup-page .wrapper .alert { display: none; }
        .auth-signup-page .wrapper .page-title { font-weight: bold; text-align: center; text-transform: uppercase; }
        .auth-signup-page .wrapper .signup-form-wrapper {
            float: left;
            padding: 15px 20px;
            width: 50%;
        }

        .auth-signup-page .wrapper .signup-form-wrapper .control-label { font-weight: normal; }

        .auth-signup-page .wrapper .social-auth-wrapper {
            float: right;
            padding: 15px 20px;
            width: 50%;
        }

        .auth-signup-page .wrapper .social-auth-wrapper .social-buttons .connect-with { text-align: center; margin-bottom: 6px; }
        .auth-signup-page .wrapper .social-auth-wrapper .social-buttons a { margin-bottom: 20px; }
    </style>
</head>
<body>
    <main class="container auth-signup-page">
        <div class="wrapper clearfix">
            <nav class="navbar navbar-fixed-top">
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
                            <li><a href="/auth/login">Log in</a></li>
                        </ul>
                    </div>
                </div>
            </nav>

            <header class="page-title">Sign up to Commuttr</header>
            <div class="alert" id="message_wrapper"></div>
            <section class="signup-form-wrapper">
                <form method="post" id="signup_form">
                    <div class="form-group">
                        <label class="control-label">Name</label>
                        <input type="text" name="name" class="form-control"/>
                    </div>
                    <div class="form-group">
                        <label class="control-label">Email</label>
                        <input type="email" name="email" class="form-control"/>
                    </div>
                    <div class="form-group">
                        <label class="control-label">Password</label>
                        <input type="password" name="password" class="form-control"/>
                    </div>
                    <div class="form-group">
                        <label class="control-label">Username</label>
                        <input type="text" name="username" class="form-control"/>
                    </div>

                    <button type="submit" class="btn btn-primary">Sign up</button>
                </form>
            </section>
            <section class="social-auth-wrapper">
                <div class="social-buttons">
                    <p class="connect-with">Sign up with</p>

                    <a href="#" class="btn btn-primary btn-block"><i class="fa fa-facebook"></i></a>
                    <a href="#" class="btn btn-info btn-block"><i class="fa fa-twitter"></i></a>
                </div>
            </section>
        </div>
    </main>

    <script src="{{ asset('/vendor/javascript/jquery.js') }}"></script>
    <script type="text/javascript">
        (function($) {
            $('#signup_form').on('submit', function(e) {
                e.preventDefault();

                // remove contents and hide
                $('#message_wrapper').empty().hide();

                $.ajax({
                    type        : 'post',
                    url         : '/api/v1.0/users/create',
                    data        : $(this).serialize(),
                    dataType    : 'json'
                }).done(function(response) {

                }).error(function(response) {
                    var errors = response.responseJSON.errors, html = '';

                    $.each(errors, function(i, error) {
                        $.each(error, function(k, message) {
                            html += '<p>'+message+'</p>';
                        });
                    });

                    $('#message_wrapper').append(html)
                        .addClass('alert-danger')
                        .show();
                });
            });
        })(jQuery);
    </script>
</body>
</html>
