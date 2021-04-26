import React, { useState } from 'react';
import Inventory from './Inventory'
import SalesTeam from './SalesTeam';
import './AdminLanding.css'
import {useHistory} from 'react-router-dom'
import { BrowserRouter as Router,Route, Switch} from 'react-router-dom';
import Create from './Create'

const AdminLanding = () => {
    const [activeContainer, setActiveContainer] = useState('Display')
    const [id,setId] = useState("")
    const history  =  useHistory()
    const handleContainerChange = (str,id) =>{
        console.log(id)
        if(str === "inventory") {
            setActiveContainer("create-medicine")
            setId()
        }
        else{
            setActiveContainer("create-sales-executive")
        }
        setId(id)
    }

    const handleAdd  = (saleActive) =>{
        setActiveContainer("Display")
    }

    return ( 
        <div className = "admin-landing">
            <h1>USER-ADMIN-PANEL</h1>
            <div className = "container">
                {activeContainer === "Display" && <AdminContainer fn = {handleContainerChange} edit={handleContainerChange}/>}
                {activeContainer === "create-medicine" && <Create item  = {"medicine"} fn ={handleAdd} id={id}/>}
                {activeContainer === "create-sales-executive" && <Create item  = {"sales-executive"} fn ={handleAdd} id={id}/>}
            </div>
        </div>
     );
}
 
export default AdminLanding;

const AdminContainer = ({fn,edit}) =>{
    
    const [active, setActive] = useState("inventory")
    const inventoryActive = () => setActive("inventory")
    const salesActive = () => setActive("sales")
    
    const handleBtnClick  = () =>{
        active === "inventory" ? fn("inventory") : fn("sales")
    }

    const style={
        borderBottom: "5px solid #b82107cb"
    }

    return(
        <>
            <div className = "nav-bar">
                    <li onClick  = {inventoryActive} style={active === 'inventory'  ? style : {}}>Inventory</li>
                    <li onClick  = {salesActive} style={active === 'sales'  ? style : {}}>Sales Executive team</li>
                </div>
                <button className="add-btn"  onClick  = {handleBtnClick}>{`ADD  ${active === "inventory" ? "Medicine" : "Sales Executive"}`}</button>
                <div className = "content-wrapper">
                    {active  === "inventory" ? 
                        <Inventory edit={edit}/> : 
                        <SalesTeam edit={edit}/>
                    }
                </div>
        </>
    )
}