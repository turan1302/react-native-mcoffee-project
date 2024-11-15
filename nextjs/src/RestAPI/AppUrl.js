class AppUrl {
    static imageUrl = "http://127.0.0.1:8000/storage/";
    static baseURL = "http://127.0.0.1:8000/api/web";

    // home
    static home = this.baseURL + "/home";

    // auth
    static register = this.baseURL + "/admin/register";
    static login = this.baseURL + "/admin/login";
    static logout = this.baseURL + "/admin/logout";
    static check = this.baseURL + "/admin/check";
    static profile = this.baseURL + "/admin/profile";
    static update = this.baseURL + "/admin/update-profile";

    // categories
    static categories = this.baseURL + "/categories";
    static categories_store = this.baseURL + "/categories/store";
    static categories_edit = this.baseURL + "/categories/edit";
    static categories_update = this.baseURL + "/categories/update";
    static categories_search = this.baseURL + "/categories/search";
    static categories_status = this.baseURL + "/categories/setStatus";
    static categories_delete = this.baseURL + "/categories/delete";

    // coffees
    static coffees = this.baseURL + "/coffees";
    static coffees_create = this.baseURL + "/coffees/create";
    static coffees_store = this.baseURL + "/coffees/store";
    static coffees_edit = this.baseURL + "/coffees/edit";
    static coffees_update = this.baseURL + "/coffees/update";
    static coffees_search = this.baseURL + "/coffees/search";
    static coffees_status = this.baseURL + "/coffees/setStatus";
    static coffees_campaign = this.baseURL + "/coffees/setCampaign";
    static coffees_delete = this.baseURL + "/coffees/delete";

    // variations
    static variations = this.baseURL + "/variations";
    static variations_search = this.baseURL + "/variations/search";
    static variations_create = this.baseURL + "/variations/create";
    static variations_store = this.baseURL + "/variations/store";
    static variations_edit = this.baseURL + "/variations/edit";
    static variations_update = this.baseURL + "/variations/update";
    static variations_status = this.baseURL + "/variations/setStatus";
    static variations_delete = this.baseURL + "/variations/delete";

    // rates
    static rates = this.baseURL + "/rates";
    static rates_search = this.baseURL + "/rates/search";
    static rates_delete = this.baseURL + "/rates/delete";

    // favourites
    static favourites = this.baseURL + "/favourites";
    static favourites_search = this.baseURL + "/favourites/search";
    static favourites_delete = this.baseURL + "/favourites/delete";

    // carts
    static carts = this.baseURL + "/carts";
    static carts_search = this.baseURL + "/carts/search";
    static carts_delete = this.baseURL + "/carts/delete";

    // client settings
    static client_settings = this.baseURL + "/client-settings";
    static client_settings_search = this.baseURL + "/client-settings/search";
    static client_settings_notify_status = this.baseURL + "/client-settings/setNotifyStatus";
    static client_settings_email_status = this.baseURL + "/client-settings/setEmailStatus";
    static client_settings_sms_status = this.baseURL + "/client-settings/setSmsStatus";
    static client_settings_delete = this.baseURL + "/client-settings/delete";

    // clients
    static clients = this.baseURL + "/clients";
    static clients_search = this.baseURL + "/clients/search";
    static clients_store = this.baseURL + "/clients/store";
    static clients_edit = this.baseURL + "/clients/edit";
    static clients_update = this.baseURL + "/clients/update";
    static clients_status = this.baseURL + "/clients/setStatus";
    static clients_delete = this.baseURL + "/clients/delete";


    // address
    static address = this.baseURL + "/address";
    static address_search = this.baseURL + "/address/search";
    static address_default = this.baseURL + "/address/setDefaultStatus";
    static address_corporate = this.baseURL + "/address/setCorporateStatus";
    static address_delete = this.baseURL + "/address/delete";

    // prices
    static prices = this.baseURL + "/prices";
    static prices_search = this.baseURL + "/prices/search";
    static prices_create = this.baseURL + "/prices/create";
    static prices_store = this.baseURL + "/prices/store";
    static prices_edit = this.baseURL + "/prices/edit";
    static prices_update = this.baseURL + "/prices/update";
    static prices_status = this.baseURL + "/prices/setStatus";
    static prices_default = this.baseURL + "/prices/setDefaultStatus";
    static prices_delete = this.baseURL + "/prices/delete";

    // orders
    static orders = this.baseURL + "/orders";
    static orders_search = this.baseURL + "/orders/search";
    static orders_bills = this.baseURL + "/orders/bills";
    static orders_update = this.baseURL + "/orders/update";


    // sss
    static sss = this.baseURL + "/sss";
    static sss_store = this.baseURL + "/sss/store";
    static sss_edit = this.baseURL + "/sss/edit";
    static sss_update = this.baseURL + "/sss/update";
    static sss_search = this.baseURL + "/sss/search";
    static sss_status = this.baseURL + "/sss/setStatus";
    static sss_delete = this.baseURL + "/sss/delete";

    // settings
    static settings = this.baseURL + "/settings";
    static settings_update = this.baseURL + "/settings/update";

    // logs
    static logs = this.baseURL + "/logs";
    static logs_search = this.baseURL + "/logs/search";
}

export default AppUrl;
