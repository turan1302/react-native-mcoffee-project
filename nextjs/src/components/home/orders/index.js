import React from 'react'
import Link from "next/link";
import {date} from "@/config/date";

const Order = (props) => {
    const {orders} = props;

    const orderRender = (items) => {
        return items.map((item, index) => {
            return (
                <tr key={item.ord_id}>
                    <td>{item.ord_id}</td>
                    <td>
                        <Link href={`/orders/bills/${item.ord_no}`}>
                            {item.ord_no}
                        </Link>
                    </td>
                    <td>{item.c_name+" "+item.c_surname}</td>
                    <td>{item.ord_company}</td>
                    <td>{item.ord_company_vd}</td>
                    <td>{item.ord_company_vd_no}</td>
                    <td>{item.ord_name+" "+item.ord_surname}</td>
                    <td>{item.ord_email}</td>
                    <td>{item.payment_type}</td>
                    <td>{item.payment_status}</td>
                    <td>{item.delivery_status}</td>
                    <td>{date(item.ord_z_date)}</td>
                    <td>{item.ord_ip}</td>
                    <td colSpan={2}>
                        <Link href={`/orders/bills/${item.ord_no}`} className={"btn btn-warning btn-sm"}><i
                            className={"fa fa-list"}></i> Detay
                        </Link>
                    </td>
                </tr>
            );
        });
    };

    return (
        <div className="col-lg-12 mb-2">
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary">Son 10 Sipariş</h6>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-bordered" width="100%" cellSpacing="0">
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>Sipariş Kodu</th>
                                <th>Müşteri</th>
                                <th>Şirket</th>
                                <th>Vergi Daire</th>
                                <th>Vergi No</th>
                                <th>Ad Soyad</th>
                                <th>E-Mail</th>
                                <th>Sipariş Tipi</th>
                                <th>Ödeme Durum</th>
                                <th>Sipariş Durum</th>
                                <th>Sipariş Tarih</th>
                                <th>Sipariş IP</th>
                                <th>İşlemler</th>
                            </tr>
                            </thead>
                            <tfoot>
                            <tr>
                                <th>ID</th>
                                <th>Sipariş Kodu</th>
                                <th>Müşteri</th>
                                <th>Şirket</th>
                                <th>Vergi Daire</th>
                                <th>Vergi No</th>
                                <th>Ad Soyad</th>
                                <th>E-Mail</th>
                                <th>Sipariş Tipi</th>
                                <th>Ödeme Durum</th>
                                <th>Sipariş Durum</th>
                                <th>Sipariş Tarih</th>
                                <th>Sipariş IP</th>
                                <th>İşlemler</th>
                            </tr>
                            </tfoot>
                            <tbody>
                            {orders?.length > 0 ? orderRender(orders) : (
                                <tr>
                                    <td colSpan="15" className="text-center alert alert-danger">
                                        Herhangi bir kayıt bulunamadı
                                    </td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Order
