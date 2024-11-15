import React from 'react'
import {date} from "@/config/date";

const ListItem = (props) => {
    const {items,removeItem} = props;

    const itemRender = (items) => {
        return items.data.map((item, index) => {
            return (
                <tr key={item.c_id}>
                    <td>{item.c_id}</td>
                    <td>{item.cf_name}</td>
                    <td>{item.cf_code}</td>
                    <td>{item.c_name + " " + item.c_surname}</td>
                    <td>{item.sugar}</td>
                    <td>{item.c_size}</td>
                    <td>{item.c_qty}</td>
                    <td>{item.c_price} ₺</td>
                    <td>{item.c_total_price} ₺</td>
                    <td>{date(item.c_created_at)}</td>
                    <td>
                        <button onClick={() => removeItem(item.c_id)} className={"btn btn-danger btn-sm"}><i
                            className={"fa fa-times"}></i> Sil
                        </button>
                    </td>
                </tr>
            );
        });
    };

    return (
        <table className="table table-bordered" width="100%" cellSpacing="0">
            <thead>
            <tr>
                <th>ID</th>
                <th>Kahve Adı</th>
                <th>Kahve Kodu</th>
                <th>Müşteri Adı</th>
                <th>Şeker Oranı</th>
                <th>Kahve Boyut</th>
                <th>Kahve Adet</th>
                <th>Kahve Fiyat</th>
                <th>Toplam Fiyat</th>
                <th>Eklenme Tarihi</th>
                <th>İşlemler</th>
            </tr>
            </thead>
            <tfoot>
            <tr>
                <th>ID</th>
                <th>Kahve Adı</th>
                <th>Kahve Kodu</th>
                <th>Müşteri Adı</th>
                <th>Şeker Oranı</th>
                <th>Kahve Boyut</th>
                <th>Kahve Adet</th>
                <th>Kahve Fiyat</th>
                <th>Toplam Fiyat</th>
                <th>Eklenme Tarihi</th>
                <th>İşlemler</th>
            </tr>
            </tfoot>
            <tbody>
            {items.data?.length > 0 ? itemRender(items) : (
                <tr>
                    <td colSpan="12" className="text-center alert alert-danger">
                        Herhangi bir kayıt bulunamadı
                    </td>
                </tr>
            )}
            </tbody>
        </table>
    )
}

export default ListItem
