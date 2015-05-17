@extends('layout')

@section('content')
    <main class="search-routes-page container-fluid">
        <div class="row">
            <section class="col-md-3"></section>
            <section class="col-md-9"></section>
        </div>
    </main>
@stop
@section('footer.js')
    <script src="http://maps.googleapis.com/maps/api/js?sensor=false"></script>
    <script type="text/javascript">
        var ScribbleSearch = {
            init : function() {

            },
            searchRoute : function(keyword) {
                // perform ajax call
                $.ajax({
                    type : 'get',
                    url : '/api/v0.2/routes/search?keyword=' + keyword,
                    dataType : 'json'
                }).done(function() {

                });
            }
        };
    </script>
@stop
