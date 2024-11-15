import React from 'react'
import {date} from "@/config/date";
import Link from "next/link";

const ListItem = (props) => {
    const {items,changeStatus,changeDefaultStatus,removeItem} = props;

    const itemRender = (items) => {
        return items.data.map((item, index) => {
            return (
                <tr key={item.cfp_id}>
                    <td>{item.cfp_id}</td>
                    <td>{item.cf_name}</td>
                    <td>{item.cf_code}</td>
                    <td>{item.cfp_size}</td>
                    <td>{item.cfp_price} ₺</td>
                    <td>
                        <label className="switch">
                            <input defaultChecked={item.cfp_status} onChange={() => changeStatus(item.cfp_id)}
                                   type="checkbox"/>
                            <span className="slider round"></span>
                        </label>
                    </td>
                    <td>
                        <label className="switch">
                            <input defaultChecked={item.cfp_default}
                                   onChange={() => changeDefaultStatus(item.cfp_id, item.cfp_coffee)}
                                   type="checkbox"/>
                            <span className="slider round"></span>
                        </label>
                    </td>
                    <td>{date(item.cfp_created_at)}</td>
                    <td>
                        <button onClick={() => removeItem(item.cfp_id)} className={"btn btn-danger btn-sm"}><i
                            className={"fa fa-times"}></i> Sil
                        </button>
                        <Link href={`/prices/edit/${item.cfp_id}`} className={"btn btn-primary btn-sm ml-2"}><i
                            className={"fa fa-edit"}></i> Güncelle
                        </Link>
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
                <th>Kahve Boyut</th>
                <th>Kahve Fiyat</th>
                <th>Fiyat Durum</th>
                <th>Fiyat Varsayılan</th>
                <th>Eklenme Tarihi</th>
                <th>İşlemler</th>
            </tr>
            </thead>
            <tfoot>
            <tr>
                <th>ID</th>
                <th>Kahve Adı</th>
                <th>Kahve Kodu</th>
                <th>Kahve Boyut</th>
                <th>Kahve Fiyat</th>
                <th>Fiyat Durum</th>
                <th>Fiyat Varsayılan</th>
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
