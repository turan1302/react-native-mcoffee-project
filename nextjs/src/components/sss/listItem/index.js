import React from 'react'
import {date} from "@/config/date";
import Link from "next/link";

const ListItem = (props) => {
    const {items,changeStatus,removeItem} = props;

    const itemRender = (items) => {
        return items.data.map((item, index) => {
            return (
                <tr key={item.sss_id}>
                    <td>{item.sss_id}</td>
                    <td>{item.sss_title}</td>
                    <td>
                        <label className="switch">
                            <input defaultChecked={item.sss_status} onChange={() => changeStatus(item.sss_id)}
                                   type="checkbox"/>
                            <span className="slider round"></span>
                        </label>
                    </td>
                    <td>{date(item.sss_created_at)}</td>
                    <td>
                        <button onClick={() => removeItem(item.sss_id)} className={"btn btn-danger btn-sm"}><i
                            className={"fa fa-times"}></i> Sil
                        </button>
                        <Link href={`/sss/edit/${item.sss_id}`} className={"btn btn-primary btn-sm ml-2"}><i
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
                <th>SSS Başlık</th>
                <th>SSS Durum</th>
                <th>Eklenme Tarihi</th>
                <th>İşlemler</th>
            </tr>
            </thead>
            <tfoot>
            <tr>
                <th>ID</th>
                <th>SSS Başlık</th>
                <th>SSS Durum</th>
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
