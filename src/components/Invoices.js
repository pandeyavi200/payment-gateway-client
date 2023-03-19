import React, { useEffect, useState } from 'react';
import '../App.css';
import axios from 'axios';
import PaymentNew from './Payment';


const Invoices = () => {
    const [invoices, setInvoices] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [data, setData] = useState({
        _id: '',
        name: '',
        status: '',
        amount: '',
        toggle: false
    })

    useEffect(() => {
        // To fetch invoices on page loading
        axios.get(`${process.env.REACT_APP_IP}/invoices`)
            .then(response => {
                setInvoices(response.data.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    // Set data on button click
    const handleClick = (invoice, toggle) => {
        setIsModalVisible(toggle)
        setData({
            _id: invoice._id,
            name: invoice.name,
            status: invoice.status,
            amount: invoice.amount,
            toggle: toggle
        })
    }

    return (
        <div className="invoices">
            <h2>List of Invoices</h2>
            <table>
                <thead>
                    <tr>
                        <th>S.no.</th>
                        <th>Name</th>

                        <th>Status</th>
                        <th>Amount</th>
                        <th>Details</th>
                    </tr>
                </thead >
                <tbody style={{ textAlign: "center" }}>
                    {invoices.map((invoice, i) => (
                        <tr key={i}>
                            <td width="20px">{i + 1}</td>
                            <td>{invoice.name}</td>
                            {invoice.status === 'Paid' ?
                                <td style={{ background: "green" }}>{invoice.status}</td> :
                                <td style={{ background: "orange" }}>{invoice.status}</td>}
                            <td>{invoice.amount}</td>
                            <td><button onClick={() => handleClick(invoice, true)}>View</button></td>
                        </tr>
                    ))}

                </tbody>
            </table>
            {isModalVisible && <PaymentNew onClose={() => setIsModalVisible(false)} props={data} />}
        </div>
    );
};

export default Invoices