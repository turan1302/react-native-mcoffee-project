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
    Route::group(['prefix' => 'home', 'middleware' => 'auth:api_client', 'as' => 'home.'], function () {
        Route::get('', [\App\Http\Controllers\api\mobile\home\indexController::class, 'index'])->name('index');
    });

    // SEARCH KISMI
    Route::group(['prefix' => 'search', 'middleware' => 'auth:api_client', 'as' => 'search.'], function () {
        Route::post('', [\App\Http\Controllers\api\mobile\search\indexController::class, 'index'])->name('index');
    });

    // FAVOURITE KISMI
    Route::group(['prefix' => 'favourites', 'middleware' => 'auth:api_client', 'as' => 'favourites.'], function () {
        Route::get('', [\App\Http\Controllers\api\mobile\favourite\indexController::class, 'index'])->name('index');
        Route::post('set-favourite', [\App\Http\Controllers\api\mobile\favourite\indexController::class, 'set_favourite'])->name('set_favourite');
    });

    // PRODUCT KISMI (DETAY SAYFASI)
    Route::group(['prefix' => 'coffee', 'middleware' => 'auth:api_client', 'as' => 'coffee.'], function () {
        Route::get('{coffeeCode}', [\App\Http\Controllers\api\mobile\coffee\indexController::class, 'get_coffee'])->name('get_coffee');
        Route::post('set-rate/{coffeeCode}', [\App\Http\Controllers\api\mobile\coffee\indexController::class, 'set_rate'])->name('set_rate');
    });

    // PROFILE KISMI
    Route::group(['prefix' => 'profile', 'middleware' => 'auth:api_client', 'as' => 'profile.'], function () {
        Route::get('', [\App\Http\Controllers\api\mobile\profile\indexController::class, 'index'])->name('index');
    });

    // SEPET KISMI
    Route::group(['prefix' => 'cart', 'middleware' => 'auth:api_client', 'as' => 'cart.'], function () {
        Route::get('', [\App\Http\Controllers\api\mobile\cart\indexController::class, 'index'])->name('index');
        Route::post('setcart', [\App\Http\Controllers\api\mobile\cart\indexController::class, 'setCart'])->name('setCart');
        Route::post('decrementQty', [\App\Http\Controllers\api\mobile\cart\indexController::class, 'decrementQty'])->name('decrementQty');
        Route::post('incrementQty', [\App\Http\Controllers\api\mobile\cart\indexController::class, 'incrementQty'])->name('incrementQty');
        Route::get('removeCart', [\App\Http\Controllers\api\mobile\cart\indexController::class, 'removeCart'])->name('removeCart');
    });

    // SİPARİŞLER KISMI
    Route::group(['prefix' => 'orders', 'middleware' => 'auth:api_client', 'as' => 'orders.'], function () {

        // GEL AL
        Route::group(['prefix' => 'comeget', 'middleware' => 'auth:api_client', 'as' => 'comeget.'], function () {
            Route::post('', [\App\Http\Controllers\api\mobile\order\comeget\indexController::class, 'index'])->name('index');
        });

        // SANA GELSİN
        Route::group(['prefix' => 'cometoyou', 'middleware' => 'auth:api_client', 'as' => 'cometoyou.'], function () {
            Route::post('', [\App\Http\Controllers\api\mobile\order\cometoyou\indexController::class, 'index'])->name('index');
        });
    });


    // ADRESLER KISMI
    Route::group(['prefix' => 'address', 'middleware' => 'auth:api_client', 'as' => 'address.'], function () {
        Route::get('', [\App\Http\Controllers\api\mobile\address\indexController::class, 'index'])->name('index');
        Route::post('store', [\App\Http\Controllers\api\mobile\address\indexController::class, 'store'])->name('store');
        Route::post('default', [\App\Http\Controllers\api\mobile\address\indexController::class, 'default'])->name('default');
        Route::get('edit/{id}', [\App\Http\Controllers\api\mobile\address\indexController::class, 'edit'])->name('edit');
        Route::post('update/{id}', [\App\Http\Controllers\api\mobile\address\indexController::class, 'update'])->name('update');
        Route::get('delete/{id}', [\App\Http\Controllers\api\mobile\address\indexController::class, 'delete'])->name('delete');
    });

    // SON SİPARİŞLER KISMI
    Route::group(['prefix' => 'last-orders', 'middleware' => 'auth:api_client', 'as' => 'last_orders.'], function () {
        Route::get('', [\App\Http\Controllers\api\mobile\lastOrders\indexController::class, 'index'])->name('index');
    });

    // SSS KISMI
    Route::group(['prefix' => 'sss', 'middleware' => 'auth:api_client', 'as' => 'sss.'], function () {
        Route::get('', [\App\Http\Controllers\api\mobile\sss\indexController::class, 'index'])->name('index');
    });

    // KULLANICI AYARLARI KISMI
    Route::group(['prefix' => 'client-settings', 'middleware' => 'auth:api_client', 'as' => 'client_settings.'], function () {
        Route::get('', [\App\Http\Controllers\api\mobile\clientSettings\indexController::class, 'index'])->name('index');
        Route::post('change', [\App\Http\Controllers\api\mobile\clientSettings\indexController::class, 'change'])->name('change');
    });
});


/** WEB KISMI ICIN **/
Route::group(["prefix" => "web"], function () {
    // AUTH ISLEMLERI
    Route::group(['prefix' => 'admin', 'as' => 'admin.'], function () {
        Route::post('login', [\App\Http\Controllers\api\web\auth\admin\indexController::class, 'login'])->name('login');
        Route::post('register', [\App\Http\Controllers\api\web\auth\admin\indexController::class, 'register'])->name('register');

        Route::group(['middleware' => 'auth:api_admin'], function () {
            Route::get('profile', [\App\Http\Controllers\api\web\auth\admin\indexController::class, 'profile'])->name('profile');
            Route::get('logout', [\App\Http\Controllers\api\web\auth\admin\indexController::class, 'logout'])->name('logout');
            Route::post('update-profile', [\App\Http\Controllers\api\web\auth\admin\indexController::class, 'update_profile'])->name('update_profile');
            Route::get('check', [\App\Http\Controllers\api\web\auth\admin\indexController::class, 'check'])->name('check');
        });
    });

    // HOME KISMI
    Route::group(['prefix' => 'home', 'as' => 'home.', 'middleware' => 'auth:api_admin'], function () {
        Route::get('', [\App\Http\Controllers\api\web\home\indexController::class, 'index'])->name('index');
    });

    // KATEGORİLER KISMI
    Route::group(['prefix' => 'categories', 'as' => 'categories.', 'middleware' => 'auth:api_admin'], function () {
        Route::get('', [\App\Http\Controllers\api\web\categories\indexController::class, 'index'])->name('index');
        Route::get('search', [\App\Http\Controllers\api\web\categories\indexController::class, 'search'])->name('search');
        Route::post('store', [\App\Http\Controllers\api\web\categories\indexController::class, 'store'])->name('store');
        Route::get('edit/{code}', [\App\Http\Controllers\api\web\categories\indexController::class, 'edit'])->name('edit');
        Route::post('update/{code}', [\App\Http\Controllers\api\web\categories\indexController::class, 'update'])->name('update');
        Route::post('setStatus/{id}', [\App\Http\Controllers\api\web\categories\indexController::class, 'setStatus'])->name('setStatus');
        Route::post('delete/{id}', [\App\Http\Controllers\api\web\categories\indexController::class, 'delete'])->name('delete');
    });

    // KAHVELER KISMI
    Route::group(['prefix' => 'coffees', 'as' => 'coffees.', 'middleware' => 'auth:api_admin'], function () {
        Route::get('', [\App\Http\Controllers\api\web\coffees\indexController::class, 'index'])->name('index');
        Route::get('search', [\App\Http\Controllers\api\web\coffees\indexController::class, 'search'])->name('search');
        Route::get('create', [\App\Http\Controllers\api\web\coffees\indexController::class, 'create'])->name('create');
        Route::post('store', [\App\Http\Controllers\api\web\coffees\indexController::class, 'store'])->name('store');
        Route::get('edit/{code}', [\App\Http\Controllers\api\web\coffees\indexController::class, 'edit'])->name('edit');
        Route::post('update/{code}', [\App\Http\Controllers\api\web\coffees\indexController::class, 'update'])->name('update');
        Route::post('setStatus/{id}', [\App\Http\Controllers\api\web\coffees\indexController::class, 'setStatus'])->name('setStatus');
        Route::post('setCampaign/{id}', [\App\Http\Controllers\api\web\coffees\indexController::class, 'setCampaign'])->name('setCampaign');
        Route::post('delete/{id}', [\App\Http\Controllers\api\web\coffees\indexController::class, 'delete'])->name('delete');
    });

    // KAHVE VARYASYONLARI
    Route::group(['prefix' => 'variations', 'as' => 'variations.', 'middleware' => 'auth:api_admin'], function () {
        Route::get('', [\App\Http\Controllers\api\web\variations\indexController::class, 'index'])->name('index');
        Route::get('search', [\App\Http\Controllers\api\web\variations\indexController::class, 'search'])->name('search');
        Route::get('create', [\App\Http\Controllers\api\web\variations\indexController::class, 'create'])->name('create');
        Route::post('store', [\App\Http\Controllers\api\web\variations\indexController::class, 'store'])->name('store');
        Route::get('edit/{id}', [\App\Http\Controllers\api\web\variations\indexController::class, 'edit'])->name('edit');
        Route::post('update/{id}', [\App\Http\Controllers\api\web\variations\indexController::class, 'update'])->name('update');
        Route::post('setStatus/{id}', [\App\Http\Controllers\api\web\variations\indexController::class, 'setStatus'])->name('setStatus');
        Route::post('delete/{id}', [\App\Http\Controllers\api\web\variations\indexController::class, 'delete'])->name('delete');
    });

    // KAHVE OYLAMALARI KISMI
    Route::group(['prefix' => 'rates', 'as' => 'rates.', 'middleware' => 'auth:api_admin'], function () {
        Route::get('', [\App\Http\Controllers\api\web\rates\indexController::class, 'index'])->name('index');
        Route::get('search', [\App\Http\Controllers\api\web\rates\indexController::class, 'search'])->name('search');
        Route::post('delete/{id}', [\App\Http\Controllers\api\web\rates\indexController::class, 'delete'])->name('delete');
    });

    // FAVORİLER KISMI
    Route::group(['prefix' => 'favourites', 'as' => 'favourites.', 'middleware' => 'auth:api_admin'], function () {
        Route::get('', [\App\Http\Controllers\api\web\favourites\indexController::class, 'index'])->name('index');
        Route::get('search', [\App\Http\Controllers\api\web\favourites\indexController::class, 'search'])->name('search');
        Route::post('delete/{id}', [\App\Http\Controllers\api\web\favourites\indexController::class, 'delete'])->name('delete');
    });

    // SEPET KISMI
    Route::group(['prefix' => 'carts', 'as' => 'carts.', 'middleware' => 'auth:api_admin'], function () {
        Route::get('', [\App\Http\Controllers\api\web\carts\indexController::class, 'index'])->name('index');
        Route::get('search', [\App\Http\Controllers\api\web\carts\indexController::class, 'search'])->name('search');
        Route::post('delete/{id}', [\App\Http\Controllers\api\web\carts\indexController::class, 'delete'])->name('delete');
    });

    // KULLANICI AYARLARI
    Route::group(['prefix' => 'client-settings', 'as' => 'client_settings.', 'middleware' => 'auth:api_admin'], function () {
        Route::get('', [\App\Http\Controllers\api\web\clientSettings\indexController::class, 'index'])->name('index');
        Route::get('search', [\App\Http\Controllers\api\web\clientSettings\indexController::class, 'search'])->name('search');
        Route::post('setNotifyStatus/{id}', [\App\Http\Controllers\api\web\clientSettings\indexController::class, 'setNotifyStatus'])->name('setNotifyStatus');
        Route::post('setEmailStatus/{id}', [\App\Http\Controllers\api\web\clientSettings\indexController::class, 'setEmailStatus'])->name('setEmailStatus');
        Route::post('setSmsStatus/{id}', [\App\Http\Controllers\api\web\clientSettings\indexController::class, 'setSmsStatus'])->name('setSmsStatus');
        Route::post('delete/{id}', [\App\Http\Controllers\api\web\clientSettings\indexController::class, 'delete'])->name('delete');
    });

    // KULLANICILAR KISMI
    Route::group(['prefix' => 'clients', 'as' => 'clients.', 'middleware' => 'auth:api_admin'], function () {
        Route::get('', [\App\Http\Controllers\api\web\clients\indexController::class, 'index'])->name('index');
        Route::get('search', [\App\Http\Controllers\api\web\clients\indexController::class, 'search'])->name('search');
        Route::post('store', [\App\Http\Controllers\api\web\clients\indexController::class, 'store'])->name('store');
        Route::get('edit/{id}', [\App\Http\Controllers\api\web\clients\indexController::class, 'edit'])->name('edit');
        Route::post('update/{id}', [\App\Http\Controllers\api\web\clients\indexController::class, 'update'])->name('update');
        Route::post('setStatus/{id}', [\App\Http\Controllers\api\web\clients\indexController::class, 'setStatus'])->name('setStatus');
        Route::post('delete/{id}', [\App\Http\Controllers\api\web\clients\indexController::class, 'delete'])->name('delete');
    });

    // ADRES KISMI
    Route::group(['prefix' => 'address', 'as' => 'address.', 'middleware' => 'auth:api_admin'], function () {
        Route::get('', [\App\Http\Controllers\api\web\address\indexController::class, 'index'])->name('index');
        Route::get('search', [\App\Http\Controllers\api\web\address\indexController::class, 'search'])->name('search');
        Route::post('setDefaultStatus/{id}', [\App\Http\Controllers\api\web\address\indexController::class, 'setDefaultStatus'])->name('setDefaultStatus');
        Route::post('setCorporateStatus/{id}', [\App\Http\Controllers\api\web\address\indexController::class, 'setCorporateStatus'])->name('setCorporateStatus');
        Route::post('delete/{id}', [\App\Http\Controllers\api\web\address\indexController::class, 'delete'])->name('delete');
    });

    // FİYATLAR KISMI
    Route::group(['prefix' => 'prices', 'as' => 'prices.', 'middleware' => 'auth:api_admin'], function () {
        Route::get('', [\App\Http\Controllers\api\web\prices\indexController::class, 'index'])->name('index');
        Route::get('search', [\App\Http\Controllers\api\web\prices\indexController::class, 'search'])->name('search');
        Route::get('create', [\App\Http\Controllers\api\web\prices\indexController::class, 'create'])->name('create');
        Route::post('store', [\App\Http\Controllers\api\web\prices\indexController::class, 'store'])->name('store');
        Route::get('edit/{id}', [\App\Http\Controllers\api\web\prices\indexController::class, 'edit'])->name('edit');
        Route::post('update/{id}', [\App\Http\Controllers\api\web\prices\indexController::class, 'update'])->name('update');
        Route::post('setStatus/{id}', [\App\Http\Controllers\api\web\prices\indexController::class, 'setStatus'])->name('setStatus');
        Route::post('setDefaultStatus/{id}', [\App\Http\Controllers\api\web\prices\indexController::class, 'setDefaultStatus'])->name('setDefaultStatus');
        Route::post('delete/{id}', [\App\Http\Controllers\api\web\prices\indexController::class, 'delete'])->name('delete');
    });

    // SİPARİŞLER KISMI
    Route::group(['prefix' => 'orders', 'as' => 'orders.', 'middleware' => 'auth:api_admin'], function () {
        Route::get('', [\App\Http\Controllers\api\web\orders\indexController::class, 'index'])->name('index');
        Route::get('search', [\App\Http\Controllers\api\web\orders\indexController::class, 'search'])->name('search');
        Route::get('bills/{code}', [\App\Http\Controllers\api\web\orders\indexController::class, 'bills'])->name('bills');
        Route::post('update/{code}', [\App\Http\Controllers\api\web\orders\indexController::class, 'update'])->name('update');
    });

    // SSS KISMI
    Route::group(['prefix' => 'sss', 'as' => 'sss.', 'middleware' => 'auth:api_admin'], function () {
        Route::get('', [\App\Http\Controllers\api\web\sss\indexController::class, 'index'])->name('index');
        Route::get('search', [\App\Http\Controllers\api\web\sss\indexController::class, 'search'])->name('search');
        Route::post('store', [\App\Http\Controllers\api\web\sss\indexController::class, 'store'])->name('store');
        Route::get('edit/{id}', [\App\Http\Controllers\api\web\sss\indexController::class, 'edit'])->name('edit');
        Route::post('update/{id}', [\App\Http\Controllers\api\web\sss\indexController::class, 'update'])->name('update');
        Route::post('setStatus/{id}', [\App\Http\Controllers\api\web\sss\indexController::class, 'setStatus'])->name('setStatus');
        Route::post('delete/{id}', [\App\Http\Controllers\api\web\sss\indexController::class, 'delete'])->name('delete');
    });

    // SETTINGS KISMI
    Route::group(['prefix' => 'settings', 'as' => 'settings.', 'middleware' => 'auth:api_admin'], function () {
        Route::get('', [\App\Http\Controllers\api\web\settings\indexController::class, 'index'])->name('index');
        Route::post('update', [\App\Http\Controllers\api\web\settings\indexController::class, 'update'])->name('update');
    });

    // LOG KAYITLARI
    Route::group(['prefix' => 'logs', 'as' => 'settings.', 'middleware' => 'auth:api_admin'], function () {
        Route::get('', [\App\Http\Controllers\api\web\logs\indexController::class, 'index'])->name('index');
        Route::get('search', [\App\Http\Controllers\api\web\logs\indexController::class, 'search'])->name('search');
    });
});
