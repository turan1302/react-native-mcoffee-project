import React from 'react'

const Clients = (props) => {
    const {clients} = props;

    const clientRender = (items) => {
        return items.map((item, index) => {
            return (
                <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.c_name}</td>
                    <td>{item.c_surname}</td>
                    <td>{item.email}</td>
                </tr>
            );
        });
    };

    return (
        <div className={"col-md-6 mb-4"}>
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary">Son 5 Kullanıcı</h6>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-bordered" width="100%" cellSpacing="0">
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>Müşteri Ad</th>
                                <th>Müşteri Soyad</th>
                                <th>E-Mail</th>
                            </tr>
                            </thead>
                            <tfoot>
                            <tr>
                                <th>ID</th>
                                <th>Müşteri Ad</th>
                                <th>Müşteri Soyad</th>
                                <th>E-Mail</th>
                            </tr>
                            </tfoot>
                            <tbody>
                            {clients?.length > 0 ? clientRender(clients) : (
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

export default Clients
