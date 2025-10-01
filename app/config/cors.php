<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Laravel CORS Configuration
    |--------------------------------------------------------------------------
    */

    // Only apply CORS to API routes
    'paths' => ['api/*'],

    // Allow all HTTP verbs (GET, POST, PUT, DELETE, etc.)
    'allowed_methods' => ['*'],

    // Allow requests from your React dev server
    'allowed_origins' => [
        'http://localhost:3000',
        'http://127.0.0.1:3000',
    ],

    'allowed_origins_patterns' => [],

    // Allow all headers
    'allowed_headers' => ['*'],

    'exposed_headers' => [],

    'max_age' => 0,

    'supports_credentials' => false,

];
