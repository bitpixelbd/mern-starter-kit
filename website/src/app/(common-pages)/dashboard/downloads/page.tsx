import React from 'react';

const DownloadPage = () => {
    return (
        <>
            <h2 className="page-title">Downloads</h2>
            <div className="customer-list-order order-table">
                <table className="table table-bordered table-striped">
                    <thead>
                        <tr className="success">
                            <th>Image</th>
                            <th>Product Name</th>
                            <th>Times downloaded</th>
                            <th>Ordered at</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>#10000013</td>
                            <td>29 Dec 2023 20:04:43</td>
                            <td>$1,474.00 for 1 item(s)</td>
                            <td> Bank transfer </td>
                            <td>
                                <button
                                    className="btn btn-primary btn-sm"
                                >
                                    View
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td>#10000024</td>
                            <td>29 Dec 2023 12:04:43</td>
                            <td>$2,852.00 for 2 item(s)</td>
                            <td> Cash on delivery (COD) </td>
                            <td>
                                <button
                                    className="btn btn-primary btn-sm"
                                >
                                    View
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td>#10000038</td>
                            <td>29 Dec 2023 08:04:44</td>
                            <td>$2,332.50 for 2 item(s)</td>
                            <td> SslCommerz </td>
                            <td>
                                <button
                                    className="btn btn-primary btn-sm"
                                >
                                    View
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td>#10000011</td>
                            <td>27 Dec 2023 12:04:43</td>
                            <td>$2,328.00 for 1 item(s)</td>
                            <td> Cash on delivery (COD) </td>
                            <td>
                                <button
                                    className="btn btn-primary btn-sm"
                                >
                                    View
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td>#10000012</td>
                            <td>26 Dec 2023 08:04:43</td>
                            <td>$3,029.00 for 2 item(s)</td>
                            <td> Stripe </td>
                            <td>
                                <button
                                    className="btn btn-primary btn-sm"
                                >
                                    View
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td>#10000023</td>
                            <td>25 Dec 2023 18:04:43</td>
                            <td>$1,197.00 for 2 item(s)</td>
                            <td> Razorpay </td>
                            <td>
                                <button
                                    className="btn btn-primary btn-sm"
                                >
                                    View
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div className="text-center" />
            </div>
        </>
    );
};

export default DownloadPage;