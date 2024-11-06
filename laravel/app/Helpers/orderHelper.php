<?php

// müşteri siparişi ekle
function add_customer_order($data, $ord_no, $ord_payment_type, $ord_type)
{
    $ip = request()->getClientIp();  // IP ADRESINI ALALIM


    $sonuc = \App\Models\OrdersModel::create(array(
        "ord_client" => $data["ord_client"],
        "ord_no" => $ord_no,
        "ord_type" => $ord_type,
        "ord_company" => $data['ord_company'],
        "ord_company_vd" => $data['ord_company_vd'],
        "ord_company_vd_no" => $data['ord_company_vd_no'],
        "ord_name" => $data['ord_name'],
        "ord_surname" => $data['ord_surname'],
        "ord_email" => $data['ord_email'],
        "ord_city" => $data['ord_city'],
        "ord_district" => $data['ord_district'],
        "ord_address" => $data['ord_address'],
        "ord_payment_type" => $ord_payment_type, // 0 sana gelsin, 1 gel al
        "ord_status" => $data["ord_status"],
        "ord_delivery_status" => $data["ord_delivery_status"], // 0 bekliyor, 1 teslim edildi, 2 iptal edildi
        "ord_z_date" => $data["ord_z_date"],
        "ord_note" => $data["ord_note"] ?? "",
        "ord_ip" => $data["ord_ip"],
    ));

    if ($sonuc) {
        return $sonuc;
    } else {
        return false;
    }
}


// müşteri sipariş ürün ekle
function add_customer_order_product($basket, $ord_no)
{
    $products = []; // Ürünleri tutacak dizi

    foreach ($basket as $bsk) {
        // Her bir ürün için veri hazırlama
        $products[] = [
            "orp_coffee" => $bsk->c_coffee,
            "orp_size" => $bsk->c_size,
            "orp_sugar" => $bsk->c_sugar,
            "orp_qty" => $bsk->c_qty,
            "orp_price" => $bsk->c_price,
            "orp_order" => $ord_no,
            "orp_created_at" => now(),
            "orp_updated_at" => now(),
        ];
    }

    if (!empty($products)) {
        try {
            \App\Models\OrderProductsModel::insert($products);
        } catch (\Exception $e) {
            \Illuminate\Support\Facades\Log::error('Sipariş ürünleri eklenirken hata oluştu: ' . $e->getMessage());
        }
    }
}


function getCustomerCartTotal()
{
    $total = 0.00;
    $client = request()->user();

    $cartData = \App\Models\CartModel::where([
        ["c_user", "=", $client->id]
    ])->get();

    foreach ($cartData as $cart) {
        $total += $cart->c_total_price;
    }

    return $total;
}

// müşteri fatura ekle
function add_customer_bill($data, $ord_no, $bl_type, $ord_payment_type = 0, $courier_price = 0)
{
    $settings = \App\Models\SettingsModel::first();

    $total_price = getCustomerCartTotal();

    // SİPARİŞ URUNLERI EKLEDIKTEN SONRA FATURA EKLETME ISLEMINE GECELIM
    $siparis_fatura_ekle = \App\Models\BillsModel::create(array(
        "bl_order" => $ord_no,
        "bl_type" => $bl_type,
        "bl_company" => $data['ord_company'],
        "bl_company_vd" => $data['ord_company_vd'],
        "bl_company_vd_no" => $data['ord_company_vd_no'],
        "bl_name" => $data['ord_name'],
        "bl_surname" => $data['ord_surname'],
        "bl_email" => $data['ord_email'],
        "bl_city" => $data['ord_city'],
        "bl_district" => $data['ord_district'],
        "bl_address" => $data['ord_address'],
        "bl_price" => str_replace(",", "", $total_price),
        "bl_kdv" => $settings->set_kdv,
        //"bl_total_price" => str_replace(",", "", $total_price) * ((100 + $settings->set_kdv) / 100),
        "bl_total_price" => str_replace(",","",($total_price * (100 + $settings->set_kdv) / 100 + (($ord_payment_type==SANA_GELSIN) ? $courier_price : 0))),
    ));

    return $siparis_fatura_ekle;
}
