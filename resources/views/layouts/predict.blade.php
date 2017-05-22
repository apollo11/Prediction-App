<!DOCTYPE html>
<!--[if IE 8]> <html class="no-js lt-ie10 lt-ie9" lang="en"> <![endif]-->
<!--[if IE 9]> <html class="no-js lt-ie10" lang="en"> <![endif]-->
<!--[if !IE]>-->
<html class="no-js" lang="{{ config('app.locale') }}" xmlns="http://www.w3.org/1999/html"> <!--<![endif]-->
<head>
    <meta charset="utf-8">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <title> 橙市88的冠军联赛竞猜游戏 </title>
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="apple-mobile-web-app-capable" content="yes"/>

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <link rel="icon" type="image/png" href="favicon.png" />

    <!-- Styles -->
    <link href="{{ asset('assets/css/style.min.css') }}" rel="stylesheet">

    <!-- Scripts -->
    <script src="{{ asset('assets/js/vendor/modernizr-2.8.3.min.js') }}" type="text/javascript"></script>
    <script>
        window.Laravel = {!! json_encode([
            'csrfToken' => csrf_token(),
        ]) !!};
    </script>
</head>
<body>

<div class="page">
    <div class="page__wrapper">
        @yield('content')
    </div>
</div>

<script src="{{ asset('assets/js/vendor/jquery.min.js') }}" type="text/javascript"></script>
<script src="{{ asset('assets/js/vendor/jquery-ui.min.js') }}" type="text/javascript"></script>
<script src="{{ asset('assets/js/vendor/jquery.ui.touch-punch.min.js') }}" type="text/javascript"></script>
<script src="{{ asset('assets/js/main.min.js') }}" type="text/javascript"> </script>
<!-- Piwik -->
<script type="text/javascript">
    var _paq = _paq || [];
    _paq.push(["setDomains", ["*.www.orange88game.com"]]);
    _paq.push(['trackPageView']);
    _paq.push(['enableLinkTracking']);
    (function() {
        var u="//bhsi.piwikpro.com/";
        _paq.push(['setTrackerUrl', u+'piwik.php']);
        _paq.push(['setSiteId', 7]);
        var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
        g.type='text/javascript'; g.async=true; g.defer=true; g.src=u+'piwik.js'; s.parentNode.insertBefore(g,s);
    })();
</script>
<noscript><p><img src="//bhsi.piwikpro.com/piwik.php?idsite=7" style="border:0;" alt="" /></p></noscript>
<!-- End Piwik Code -->

</body>
</html>
