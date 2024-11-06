class AppUrl {
  static baseURL = "http://127.0.0.1:8000";
  static storageURL = "http://127.0.0.1:8000/storage/";
  static apiURL = this.baseURL + "/api/mobile";

  // client
  static register = this.apiURL + "/client/register";
  static login = this.apiURL + "/client/login";
  static check = this.apiURL + "/client/check";
  static profile = this.apiURL + "/client/profile";
  static update_profile = this.apiURL + "/client/update-profile";
  static logout = this.apiURL + "/client/logout";

  // home
  static home = this.apiURL + "/home";

  // search
  static search = this.apiURL + "/search";

  // favorite
  static favourites = this.apiURL+"/favourites";
  static set_favourite = this.apiURL+"/favourites/set-favourite";

  // profile page
  static profile_page = this.apiURL+"/profile";

  // sss
  static sss = this.apiURL+"/sss";

  // cart
  static cart = this.apiURL+"/cart";
  static set_cart = this.apiURL+"/cart/setcart";
  static decrement_qty = this.apiURL+"/cart/decrementQty";
  static increment_qty = this.apiURL+"/cart/incrementQty";
  static remove_cart = this.apiURL+"/cart/removeCart";

  // order
  static order_cometoyou = this.apiURL+"/orders/cometoyou";
  static order_comeget = this.apiURL+"/orders/comeget";

  // last order lsit
  static last_orders = this.apiURL+"/last-orders";

  // address
  static address_list = this.apiURL+"/address";
  static address_create = this.apiURL+"/address/store";
  static address_default = this.apiURL+"/address/default";
  static address_edit = this.apiURL+"/address/edit";
  static address_update = this.apiURL+"/address/update";
  static address_delete = this.apiURL+"/address/delete";

  // coffee
  static get_coffee = this.apiURL+"/coffee";
  static set_coffee_rate = this.apiURL+"/coffee/set-rate";

  // client settings
  static client_settings = this.apiURL+"/client-settings";
  static change_client_settings = this.apiURL+"/client-settings/change";

}

export default AppUrl;
