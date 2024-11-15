import React from 'react'
import AppUrl from "@/RestAPI/AppUrl";
import {date} from "@/config/date";
import Link from "next/link";

const ListItem = (props) => {
    const {items,removeItem,changeStatus,changeCampaign} = props;

    const itemRender = (items) => {
        return items.data.map((item, index) => {
            return (
                <tr key={item.cf_id}>
                    <td>{item.cf_id}</td>
                    <td>
                        <img src={AppUrl.imageUrl+item.cf_image} style={{width: '100px', height: '100px'}}/>
                    </td>
                    <td>{item.cf_name}</td>
                    <td>{item.cf_code}</td>
                    <td>{item.cfc_name}</td>
                    <td>
                        <label className="switch">
                            <input defaultChecked={item.cf_status} onChange={() => changeStatus(item.cf_id)}
                                   type="checkbox"/>
                            <span className="slider round"></span>
                        </label>
                    </td>
                    <td>
                        <label className="switch">
                            <input defaultChecked={item.cf_campaign} onChange={() => changeCampaign(item.cf_id)}
                                   type="checkbox"/>
                            <span className="slider round"></span>
                        </label>
                    </td>
                    <td>{date(item.cf_created_at)}</td>
                    <td>
                        <button onClick={() => removeItem(item.cf_id)} className={"btn btn-danger btn-sm"}><i
                            className={"fa fa-times"}></i> Sil
                        </button>
                        <Link href={`/coffees/edit/${item.cf_code}`} className={"btn btn-primary btn-sm ml-2"}><i
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
                <th>Kahve Foto</th>
                <th>Kahve Adı</th>
                <th>Kahve Kodu</th>
                <th>Kahve Kategori</th>
                <th>Kahve Durum</th>
                <th>Kahve Kampanya</th>
                <th>Eklenme Tarihi</th>
                <th>İşlemler</th>
            </tr>
            </thead>
            <tfoot>
            <tr>
                <th>ID</th>
                <th>Kahve Foto</th>
                <th>Kahve Adı</th>
                <th>Kahve Kodu</th>
                <th>Kahve Kategori</th>
                <th>Kahve Durum</th>
                <th>Kahve Kampanya</th>
                <th>Eklenme Tarihi</th>
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
