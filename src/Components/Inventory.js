import React, { useState } from 'react';
import './Inventory.css'

const Inventory = ({edit}) => {
    var inventoryMedicines = localStorage.getItem("medicines")
    inventoryMedicines = JSON.parse(inventoryMedicines)
    console.log(inventoryMedicines)
    const [medicines, setMedicines] = useState(inventoryMedicines)
    
    const handleDelete = (data) =>{
        setMedicines(medicines.filter(item => item.name !== data.name))
        var a = JSON.parse(localStorage.getItem("medicines"))
        a = a.filter(item => item.name !== data.name)
        localStorage.setItem("medicines", JSON.stringify(a))
    }



    return (  
        <div className  = "inventory">
            <table className = "list-table">
                <tr>
                    <th>Name</th>
                    <th>Manufacturer Name</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Discount</th>
                </tr>
                {medicines?.map(item => <InventoryItem item={item} onDelete = {handleDelete} edit={edit}/>)}
            </table>
        </div>
    );
}
 
export default Inventory;

const InventoryItem = ({item,onDelete,edit}) => {
    const {name,manufacturer_name,price,stock,discount} = item
    return ( 
        <tr className="table-row">
            <td>{name}</td>
            <td className="cell-primary">{manufacturer_name}</td>
            <td className="cell-secondary">{price}</td>
            <td className="cell-primary">{stock}</td>
            <td className="cell-secondary">{discount}</td>
            <button className="edit-btn" onClick={() => edit("inventory",name)}>{`Edit `}</button>
            <button className="delete-btn" onClick={() => onDelete(item)}>{`Delete`}</button>
        </tr>
    );
}