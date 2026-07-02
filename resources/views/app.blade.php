<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" class="h-full">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
        <meta name="csrf-token" content="{{ csrf_token() }}">

        {{-- PWA / Hybrid --}}
        <link rel="manifest" href="/manifest.json">
        <meta name="mobile-web-app-capable" content="yes">
        <meta name="apple-mobile-web-app-capable" content="yes">
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
        <meta name="apple-mobile-web-app-title" content="{{ config('app.name', 'Hybrid App') }}">
        <meta name="theme-color" content="#0f0f0f">

        {{-- Apple Touch Icons --}}
        <link rel="apple-touch-icon" sizes="152x152" href="/icons/icon-152.png">
        <link rel="apple-touch-icon" sizes="180x180" href="/icons/icon-180.png">
        <link rel="apple-touch-icon" sizes="192x192" href="/icons/icon-192.png">

        {{-- Favicon --}}
        <link rel="icon" type="image/png" sizes="96x96" href="/icons/icon-96.png">

        <title>{{ config('app.name', 'Laravel') }}</title>

        @fonts

        @viteReactRefresh
        @vite(['resources/css/app.css', 'resources/js/app.tsx'])
    </head>
    <body class="h-full antialiased">
        <div id="root"></div>
    </body>
</html>
