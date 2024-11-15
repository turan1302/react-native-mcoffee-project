"use client";

import Store from "@/store";
import {Provider} from "mobx-react";

export default function RootLayout({children}) {
    return (
        <html lang="en">
        <head>
            <meta charSet="utf-8"/>
            <meta httpEquiv="X-UA-Compatible" content="IE=edge"/>
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
            <meta name="description" content=""/>
            <meta name="author" content=""/>

            <title>mCoffeee Admin</title>

            <link href="/assets/vendor/fontawesome-free/css/all.min.css" rel="stylesheet" type="text/css"/>
            <link
                href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i"
                rel="stylesheet"/>

            <link href="/assets/css/sb-admin-2.min.css" rel="stylesheet"/>

        </head>

        <body>
        <Provider {...Store}>
                {children}
        </Provider>

        <script src="/assets/vendor/jquery/jquery.min.js"></script>
        <script src="/assets/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
        <script src="/assets/vendor/jquery-easing/jquery.easing.min.js"></script>
        <script src="/assets/js/sb-admin-2.min.js"></script>
        </body>
        </html>
    );
}
