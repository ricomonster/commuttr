@extends('auth.layout')
@section('content')
    <h1 class="hero-title">Commuttr</h1>

    <form id="login_form" method="post">
        <div class="form-group email">
            <input type="text" name="email" class="form-control input-lg"
            placeholder="Email"/>
        </div>
        <div class="form-group password">
            <input type="password" name="password" class="form-control input-lg"
            placeholder="Password"/>
        </div>

        <div class="alert" id="message_handler" style="display: none;"></div>

        <button type="submit" class="btn btn-success btn-block btn-lg">
            Login
        </button>
    </form>
@stop
@section('footer.js')
    <script type="text/javascript">
        (function($) {
            var messageHandler = $('#message_handler');

            $('#login_form').on('submit', function(e) {
                e.preventDefault();

                messageHandler.hide().empty().removeClass('alert-danger');

                $.ajax({
                    type : 'post',
                    url : '/api/v0.2/auth/login?request=web',
                    data : $(this).serialize(),
                    dataType : 'json'
                }).done(function(response) {
                    if (response.results) {
                        // redirect
                        window.location.href = response.results.redirect_url;
                    }
                }).error(function(response) {
                    var errors = response.responseJSON.errors,
                        messages = '<strong>Oops, errors.</strong>';

                    messages += '<p>'+errors.message+'</p>';

                    // append to the message handle
                    messageHandler.addClass('alert-danger').append(messages).slideDown();
                })
            });
        })(jQuery);
    </script>
@stop
