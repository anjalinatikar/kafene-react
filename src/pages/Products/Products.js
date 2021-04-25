import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import { PRODUCTS_ENDPOINT } from '../../utils/APIEndpoints';
import './Products.css';

function Products() {

    const [products, setProducts] = useState([]);
    const [displayProducts, setDisplayProducts] = useState([]);
    const [activeFilters, setActiveFilters] = useState({
        "expired":false,
        "low_stock":false,
    });
    const [count, setCount] = useState(0);

    const _getProducts = async () => {
        const { data } = await axios.get(PRODUCTS_ENDPOINT);
        setProducts(data);
        setDisplayProducts(data);
        setCount(data.length);
        console.log(data);
    }

    useEffect(() => {
        _getProducts();
    },[])


    const handleFilterCheck = e => {
        const filters=activeFilters;
        filters[e.target.name] = e.target.checked;
        setActiveFilters(filters);
        console.log(activeFilters);
        _updateDisplayOrders();
    }


    const _updateDisplayOrders = () => {
        if(!activeFilters['expired'] && !activeFilters['low_stock']) {
            setDisplayProducts(products);
            setCount(products.length);
            return;
        }
        const dispProds=[];
        for(const product of products) {
            let { expiryDate, stock } = product;
            if(activeFilters['expired']===true) {
                const now = new Date();
                expiryDate = new Date(product.expiryDate);
                if(expiryDate < now)  
                    dispProds.push(product);
            }
            if(activeFilters["low_stock"]===true) {
                if(!isNaN(Number(stock)) && (Number(stock)<100)) 
                    dispProds.push(product);
            }
        }
        setDisplayProducts(dispProds);
        setCount(dispProds.length);
    }

    return (
        <main>
        <div className="PageWrapper">
            <h1 className="MainHeading">Products</h1>
            <div className="OrdersWrapper">
                <div className="FilterWrapper">
                    <h3>Filters</h3>
                    <div className="FilterOptions">
                        <p>Count: 
                            <span id="count-elt">{count}</span>
                        </p>
                        <label className="FilterCheckbox">
                            <input type="checkbox" 
                                name="expired" 
                                checked={activeFilters['expired']}
                                onChange={handleFilterCheck}/>
                                Expired
                        </label>
                        <label className="FilterCheckbox">
                            <input type="checkbox" name="low_stock" 
                                checked={activeFilters['low_stock']}
                                onChange={handleFilterCheck}/>
                                Low Stock
                        </label>
                    </div>
                </div>
                <div style={{width: '100%'}}>
                    <table className="OrderTable">
                        <tbody id="products-table">
                        <tr className="TableRow">
                            <th>ID</th>
                            <th>Product Name</th>
                            <th>Product Brand</th>
                            <th style={{minWidth:'100px'}}>Expiry Date</th>
                            <th>Unit Price</th>
                            <th>Stock</th>
                        </tr>
                        {displayProducts.map(({ id, medicineName, medicineBrand, stock, unitPrice, expiryDate }, index) => 
                            <tr className="TableRow" key={id+''+index}>
                                
                                <td className="SecondaryText">
                                <Link to={`/product/${id}`} style={{textDecoration:'none', color:'inherit'}}>
                                    {id}
                                </Link>
                                </td>           
                                <td className="PrimaryText">{medicineName}</td>
                                <td className="SecondaryText">{medicineBrand}</td>
                                <td className="PrimaryText">{expiryDate}</td>
                                <td className="SecondaryText">{unitPrice}</td>
                                <td className="SecondaryText">{stock}</td>
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

export default Products;
