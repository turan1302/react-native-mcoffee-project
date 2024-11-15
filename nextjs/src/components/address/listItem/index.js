import React from 'react'
import {date} from "@/config/date";

const ListItem = (props) => {
    const {items,changeDefaultStatus,changeCorporateStatus,removeItem} = props;

    const itemRender = (items) => {
        return items.data.map((item, index) => {
            return (
                <tr key={item.add_id}>
                    <td>{item.add_id}</td>
                    <td>{item.c_name + " " + item.c_surname}</td>
                    <td>{item.add_city}</td>
                    <td>{item.add_district}</td>
                    <td>{item.add_desc}</td>
                    <td>{item.add_tax_office}</td>
                    <td>{item.add_tax_no}</td>
                    <td>
                        <label className="switch">
                            <input defaultChecked={item.add_default}
                                   onChange={() => changeDefaultStatus(item.add_id, item.id)}
                                   type="checkbox"/>
                            <span className="slider round"></span>
                        </label>
                    </td>
                    <td>
                        <label className="switch">
                            <input defaultChecked={item.add_type} onChange={() => changeCorporateStatus(item.add_id)}
                                   type="checkbox"/>
                            <span className="slider round"></span>
                        </label>
                    </td>
                    <td>{date(item.add_created_at)}</td>
                    <td>
                        <button onClick={() => removeItem(item.add_id)} className={"btn btn-danger btn-sm"}><i
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
                <th>Müşteri Adı</th>
                <th>Şehir</th>
                <th>İlçe</th>
                <th>Açıklama</th>
                <th>Vergi Dairesi</th>
                <th>Vergi No</th>
                <th>Varsayılan Adres</th>
                <th>Kurumsal Durum</th>
                <th>Eklenme Tarihi</th>
                <th>İşlemler</th>
            </tr>
            </thead>
            <tfoot>
            <tr>
                <th>ID</th>
                <th>Müşteri Adı</th>
                <th>Şehir</th>
                <th>İlçe</th>
                <th>Açıklama</th>
                <th>Vergi Dairesi</th>
                <th>Vergi No</th>
                <th>Varsayılan Adres</th>
                <th>Adres Tipi</th>
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
