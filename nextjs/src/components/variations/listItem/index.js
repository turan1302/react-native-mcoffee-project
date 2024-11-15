import React from 'react'
import {date} from "@/config/date";
import Link from "next/link";

const ListItem = (props) => {
    const {items,changeStatus,removeItem} = props;

    const itemRender = (items) => {
        return items.data.map((item, index) => {
            return (
                <tr key={item.vy_id}>
                    <td>{item.vy_id}</td>
                    <td>{item.cf_name}</td>
                    <td>{item.cf_code}</td>
                    <td>{item.vy_ingredients}</td>
                    <td>
                        <label className="switch">
                            <input defaultChecked={item.vy_status} onChange={() => changeStatus(item.vy_id)}
                                   type="checkbox"/>
                            <span className="slider round"></span>
                        </label>
                    </td>
                    <td>{date(item.vy_created_at)}</td>
                    <td>
                        <button onClick={() => removeItem(item.vy_id)} className={"btn btn-danger btn-sm"}><i
                            className={"fa fa-times"}></i> Sil
                        </button>
                        <Link href={`/variations/edit/${item.vy_id}`} className={"btn btn-primary btn-sm ml-2"}><i
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
                <th>Varyasyon</th>
                <th>Varyasyon Durum</th>
                <th>Eklenme Tarihi</th>
                <th>İşlemler</th>
            </tr>
            </thead>
            <tfoot>
            <tr>
                <th>ID</th>
                <th>Kahve Adı</th>
                <th>Kahve Kodu</th>
                <th>Varyasyon</th>
                <th>Varyasyon Durum</th>
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

export default ListItem;
