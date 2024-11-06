<?php

use Illuminate\Support\Facades\Route;

/** MOBILE KISMI ICIN **/
Route::group(["prefix" => "mobile"], function () {
    // AUTH ISLEMLERI
    Route::group(['prefix' => 'client', 'as' => 'client.'], function () {
        Route::post('login', [\App\Http\Controllers\api\mobile\auth\client\indexController::class, 'login'])->name('login');
        Route::post('register', [\App\Http\Controllers\api\mobile\auth\client\indexController::class, 'register'])->name('register');

        Route::group(['middleware' => 'auth:api_client'], function () {
            Route::get('profile', [\App\Http\Controllers\api\mobile\auth\client\indexController::class, 'profile'])->name('profile');
            Route::get('logout', [\App\Http\Controllers\api\mobile\auth\client\indexController::class, 'logout'])->name('logout');
            Route::post('update-profile', [\App\Http\Controllers\api\mobile\auth\client\indexController::class, 'update_profile'])->name('update_profile');
            Route::get('check', [\App\Http\Controllers\api\mobile\auth\client\indexController::class, 'check'])->name('check');
        });
    });

    // HOME KISMI
    Route::group(['prefix'=>'home','middleware' => 'auth:api_client','as'=>'home.'], function () {
        Route::get('', [\App\Http\Controllers\api\mobile\home\indexController::class, 'index'])->name('index');
    });

    // SEARCH KISMI
    Route::group(['prefix'=>'search','middleware' => 'auth:api_client','as'=>'search.'], function () {
        Route::post('', [\App\Http\Controllers\api\mobile\search\indexController::class, 'index'])->name('index');
    });

    // FAVOURITE KISMI
    Route::group(['prefix'=>'favourites','middleware' => 'auth:api_client','as'=>'favourites.'], function () {
        Route::get('', [\App\Http\Controllers\api\mobile\favourite\indexController::class, 'index'])->name('index');
        Route::post('set-favourite', [\App\Http\Controllers\api\mobile\favourite\indexController::class, 'set_favourite'])->name('set_favourite');
    });

    // PRODUCT KISMI (DETAY SAYFASI)
    Route::group(['prefix'=>'coffee','middleware' => 'auth:api_client','as'=>'coffee.'], function () {
        Route::get('{coffeeCode}',[\App\Http\Controllers\api\mobile\coffee\indexController::class,'get_coffee'])->name('get_coffee');
        Route::post('set-rate/{coffeeCode}',[\App\Http\Controllers\api\mobile\coffee\indexController::class,'set_rate'])->name('set_rate');
    });

    // PROFILE KISMI
    Route::group(['prefix'=>'profile','middleware' => 'auth:api_client','as'=>'profile.'], function () {
        Route::get('',[\App\Http\Controllers\api\mobile\profile\indexController::class,'index'])->name('index');
    });

    // SEPET KISMI
    Route::group(['prefix'=>'cart','middleware' => 'auth:api_client','as'=>'cart.'], function () {
        Route::get('',[\App\Http\Controllers\api\mobile\cart\indexController::class,'index'])->name('index');
        Route::post('setcart',[\App\Http\Controllers\api\mobile\cart\indexController::class,'setCart'])->name('setCart');
        Route::post('decrementQty',[\App\Http\Controllers\api\mobile\cart\indexController::class,'decrementQty'])->name('decrementQty');
        Route::post('incrementQty',[\App\Http\Controllers\api\mobile\cart\indexController::class,'incrementQty'])->name('incrementQty');
        Route::get('removeCart',[\App\Http\Controllers\api\mobile\cart\indexController::class,'removeCart'])->name('removeCart');
    });

    // SİPARİŞLER KISMI
    Route::group(['prefix'=>'orders','middleware' => 'auth:api_client','as'=>'orders.'], function () {

       // GEL AL
        Route::group(['prefix'=>'comeget','middleware' => 'auth:api_client','as'=>'comeget.'], function () {
            Route::post('',[\App\Http\Controllers\api\mobile\order\comeget\indexController::class,'index'])->name('index');
        });

        // SANA GELSİN
        Route::group(['prefix'=>'cometoyou','middleware' => 'auth:api_client','as'=>'cometoyou.'], function () {
            Route::post('',[\App\Http\Controllers\api\mobile\order\cometoyou\indexController::class,'index'])->name('index');
        });
    });


    // ADRESLER KISMI
    Route::group(['prefix'=>'address','middleware' => 'auth:api_client','as'=>'address.'], function () {
        Route::get('',[\App\Http\Controllers\api\mobile\address\indexController::class,'index'])->name('index');
        Route::post('store',[\App\Http\Controllers\api\mobile\address\indexController::class,'store'])->name('store');
        Route::post('default',[\App\Http\Controllers\api\mobile\address\indexController::class,'default'])->name('default');
        Route::get('edit/{id}',[\App\Http\Controllers\api\mobile\address\indexController::class,'edit'])->name('edit');
        Route::post('update/{id}',[\App\Http\Controllers\api\mobile\address\indexController::class,'update'])->name('update');
        Route::get('delete/{id}',[\App\Http\Controllers\api\mobile\address\indexController::class,'delete'])->name('delete');
    });

    // SON SİPARİŞLER KISMI
    Route::group(['prefix'=>'last-orders','middleware' => 'auth:api_client','as'=>'last_orders.'], function () {
        Route::get('',[\App\Http\Controllers\api\mobile\lastOrders\indexController::class,'index'])->name('index');
    });

    // SSS KISMI
    Route::group(['prefix'=>'sss','middleware' => 'auth:api_client','as'=>'sss.'], function () {
        Route::get('',[\App\Http\Controllers\api\mobile\sss\indexController::class,'index'])->name('index');
    });

    // KULLANICI AYARLARI KISMI
    Route::group(['prefix'=>'client-settings','middleware' => 'auth:api_client','as'=>'client_settings.'], function () {
        Route::get('',[\App\Http\Controllers\api\mobile\clientSettings\indexController::class,'index'])->name('index');
        Route::post('change',[\App\Http\Controllers\api\mobile\clientSettings\indexController::class,'change'])->name('change');
    });
});
