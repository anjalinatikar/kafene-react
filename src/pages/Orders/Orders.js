import React, { useState, useEffect } from 'react';
import { ORDERS_ENDPOINT } from '../../utils/APIEndpoints';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Orders.css';

function Orders() {

    const [orders, setOrders] = useState([]);
    const [displayOrders, setDisplayOrders] = useState([]);
    const [activeFilters, setActiveFilters] = useState({
        "New":true,
        "Packed":true,
        "InTransit": true,
        "Delivered": true
    });
    const [count, setCount] = useState(0);

    const _getOrders = async () => {
        const { data } = await axios.get(ORDERS_ENDPOINT);
        setOrders(data);
        setDisplayOrders(data);
        setCount(data.length);
        console.log(data);
    }

    useEffect(() => {
        _getOrders();
    },[])


    const handleFilterCheck = e => {
        const filters=activeFilters;
        filters[e.target.name] = e.target.checked;
        setActiveFilters(filters);
        console.log(activeFilters);
        _updateDisplayOrders();
    }


    const _updateDisplayOrders = () => {
        const displayOrds = orders.filter(order => activeFilters[order.orderStatus]);
        setDisplayOrders(displayOrds);
        setCount(displayOrds.length);
    }

    return (
        <main>
            <div className="PageWrapper">
                <h1 className="MainHeading">Orders</h1>
                <div className="OrdersWrapper">
                    <div className="FilterWrapper">
                        <h3>Filters</h3>
                        <div className="FilterOptions">
                            <p>Count: 
                                <span id="count-elt">{count}</span> 
                            </p>
                            <label className="FilterCheckbox">
                                <input type="checkbox" 
                                    name="New" 
                                    checked={activeFilters['New']}
                                    onChange={handleFilterCheck}/>
                                New
                            </label>
                            <label className="FilterCheckbox">
                                <input type="checkbox" 
                                    name="Packed" 
                                    checked={activeFilters['Packed']}
                                    onChange={handleFilterCheck} />
                                Packed
                            </label>
                            <label className="FilterCheckbox">
                                <input type="checkbox" 
                                    name="InTransit" 
                                    checked={activeFilters['InTransit']}
                                    onChange={handleFilterCheck} />
                                InTransit
                            </label>
                            <label className="FilterCheckbox">
                                <input type="checkbox" 
                                    name="Delivered" 
                                    checked={activeFilters['Delivered']}
                                    onChange={handleFilterCheck} />
                                Delivered
                            </label>
                        </div>
                    </div>
                    <div style={{width: '100%'}}>
                        <table className="OrderTable">
                            <tbody id="orders-table">
                            <tr className="TableRow">    
                                <th>ID</th>
                                <th>Customer</th>
                                <th>Date</th>
                                <th>Amount</th>
                                <th>Status</th>
                            </tr>
                            {displayOrders.map(({id, customerName, orderDate, orderTime, amount, orderStatus}, index) => 
                                <tr className="TableRow" key={id+''+index}>
                                    
                                    <td className="SecondaryText">
                                    <Link to={`/order/${id}`} style={{textDecoration:'none', color:'inherit'}}>
                                        {id}
                                    </Link>
                                    </td>
                                   
                                    
                                    <td className="PrimaryText">{customerName}</td>
                                    <td className="PrimaryText">
                                        {orderDate}
                                        <br/> 
                                        <span className="SecondaryText">{orderTime}</span>
                                    </td>
                                    <td className="SecondaryText">{amount}</td>
                                    <td className="PrimaryText">{orderStatus}</td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Orders;
