@extends('auth.layout')
@section('content')
    <h1 class="hero-title">Commuttr</h1>

    <form method="post" id="register_form">
        <div class="form-group email">
            <input type="email" name="email" class="form-control input-lg"
            placeholder="Email"/>
        </div>
        <div class="form-group password">
            <input type="password" name="password" class="form-control input-lg"
            placeholder="Password"/>
        </div>
        <div class="form-group name">
            <input type="text" name="name" class="form-control input-lg"
            placeholder="Name"/>
        </div>

        <div class="alert" id="message_handler" style="display: none;"></div>

        <button type="submit" class="btn btn-success btn-block btn-lg">
            Sign up
        </button>
    </form>
@stop
@section('footer.js')
    <script type="text/javascript">
        (function($) {
            var messageHandler = $('#message_handler');

            $('#register_form').on('submit', function(e) {
                e.preventDefault();

                messageHandler.hide().empty().removeClass('alert-danger');

                $.ajax({
                    type : 'post',
                    url : '/api/v0.2/users/create',
                    data : $(this).serialize(),
                    dataType : 'json'
                }).done(function(response) {
                    if (response.results) {
                        messageHandler.addClass('alert-success')
                            .text('You can now login.')
                            .slideDown();

                        $(this).find('input[type="text"], input[type="password"]').val('');
                    }
                }).error(function(response) {
                    var errors = response.responseJSON.errors,
                        messages = '<strong>Oops, errors.</strong>';

                    $.each(errors, function(i, data) {
                        $.each(data, function(k, message) {
                            messages += '<p>' + message + '</p>';
                        });
                    });

                    // append to the message handle
                    messageHandler.addClass('alert-danger').append(messages).slideDown();
                })
            });
        })(jQuery);
    </script>
@stop
