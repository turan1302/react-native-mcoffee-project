import React from 'react'
import {date} from "@/config/date";

const ListItem = (props) => {
    const {items,removeItem} = props;

    const itemRender = (items) => {
        return items.data.map((item, index) => {
            return (
                <tr key={item.rt_id}>
                    <td>{item.rt_id}</td>
                    <td>{item.cf_name}</td>
                    <td>{item.cf_code}</td>
                    <td>{item.rt_star} / 5</td>
                    <td>{item.c_name + " " + item.c_surname}</td>
                    <td>{date(item.rt_created_at)}</td>
                    <td>
                        <button onClick={() => removeItem(item.rt_id)} className={"btn btn-danger btn-sm"}><i
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
                <th>Kahve Puan</th>
                <th>Müşteri Adı</th>
                <th>Oy Tarih</th>
                <th>İşlemler</th>
            </tr>
            </thead>
            <tfoot>
            <tr>
                <th>ID</th>
                <th>Kahve Adı</th>
                <th>Kahve Kodu</th>
                <th>Kahve Puan</th>
                <th>Müşteri Adı</th>
                <th>Oy Tarih</th>
                <th>İşlemler</th>
            </tr>
            </tfoot>
            <tbody>
            {items.data?.length > 0 ? itemRender(items) : (
                <tr>
                    <td colSpan="7" className="text-center alert alert-danger">
                        Herhangi bir kayıt bulunamadı
                    </td>
                </tr>
            )}
            </tbody>
        </table>
    )
}

export default ListItem
