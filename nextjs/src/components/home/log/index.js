import React from 'react'
import {date} from "@/config/date";

const Log = (props) => {
    const {logs} = props;

    const clientLogs = (items) => {
        return items.map((item, index) => {
            return (
                <tr key={item.lg_id}>
                    <td>{item.lg_id}</td>
                    <td>{item.lg_title}</td>
                    <td>{item.lg_desc}</td>
                    <td>{item.c_name + " " + item.c_surname}</td>
                    <td>{date(item.lg_created_at)}</td>
                </tr>
            );
        });
    };

    return (
        <div className={"col-md-6 mb-4"}>
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary">Son 5 Log</h6>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-bordered" width="100%" cellSpacing="0">
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>Log Başlık</th>
                                <th>Log Açıklama</th>
                                <th>Log Kullanıcı</th>
                                <th>Log Tarih</th>
                            </tr>
                            </thead>
                            <tfoot>
                            <tr>
                                <th>ID</th>
                                <th>Log Başlık</th>
                                <th>Log Açıklama</th>
                                <th>Log Kullanıcı</th>
                                <th>Log Tarih</th>
                            </tr>
                            </tfoot>
                            <tbody>
                            {logs?.length > 0 ? clientLogs(logs) : (
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

export default Log
