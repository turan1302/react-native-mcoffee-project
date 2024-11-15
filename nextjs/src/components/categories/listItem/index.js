import React from 'react'
import {date} from "@/config/date";
import Link from "next/link";

const ListItem = (props) => {
    const {items,removeItem,changeStatus} = props;

    const itemRender = (items) => {
        return items.data.map((item, index) => {
            return (
                <tr key={item.cfc_id}>
                    <td>{item.cfc_id}</td>
                    <td>{item.cfc_name}</td>
                    <td>{item.cfc_code}</td>
                    <td>
                        <label className="switch">
                            <input defaultChecked={item.cfc_status} onChange={() => changeStatus(item.cfc_id)}
                                   type="checkbox"/>
                            <span className="slider round"></span>
                        </label>
                    </td>
                    <td>{date(item.cfc_created_at)}</td>
                    <td>
                        <button onClick={() => removeItem(item.cfc_id)} className={"btn btn-danger btn-sm"}><i
                            className={"fa fa-times"}></i> Sil
                        </button>
                        <Link href={`/categories/edit/${item.cfc_code}`} className={"btn btn-primary btn-sm ml-2"}><i
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
                <th>Kategori Adı</th>
                <th>Kategori Kodu</th>
                <th>Kategori Durum</th>
                <th>Eklenme Tarihi</th>
                <th>İşlemler</th>
            </tr>
            </thead>
            <tfoot>
            <tr>
                <th>ID</th>
                <th>Kategori Adı</th>
                <th>Kategori Kodu</th>
                <th>Kategori Durum</th>
                <th>Eklenme Tarihi</th>
                <th>İşlemler</th>
            </tr>
            </tfoot>
            <tbody>
            {items.data?.length > 0 ? itemRender(items) : (
                <tr>
                    <td colSpan="6" className="text-center alert alert-danger">
                        Herhangi bir kayıt bulunamadı
                    </td>
                </tr>
            )}
            </tbody>
        </table>
    )
}

export default ListItem
