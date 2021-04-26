import React, { useState } from 'react';
import './Create.css'

const Create = ({item,id,fn}) => {
    
    
    return ( 
        <div className =  "wrapper">
            { item === "medicine" && <CreateMedicine fn={fn} id={id}/> }
            { item === "sales-executive" && <CreateSalesExecutive fn={fn} id={id}/>}
            {item === "order" && <CreateOrder fn={fn}/>}
        </div>
     );
}
 
export default Create;

const CreateMedicine = ({fn, id}) =>{
    if(id){
        var a = JSON.parse(localStorage.getItem("medicines"))
        console.log(a)
        var res = a.find(item => item.name === id)
        console.log(res)
    }
    const handleSubmit = (event) =>{
        console.log(event.target)
        event.preventDefault()
        const data = new FormData(event.target)
        var formObj = {}
        data.forEach(function(value, key){
            formObj[key] = value;
        })
        //using created time's milliseconds as unique ID
        console.log(formObj)
        if(localStorage.getItem("medicines")){
            var arr = JSON.parse(localStorage.getItem("medicines"))
            var selected  = arr.filter(item => item.name !== formObj.name)
            console.log(selected)
            if(selected){
                selected.push(formObj)
                localStorage.setItem("medicines",JSON.stringify(selected))
            }
        }
        else{
            localStorage.setItem("medicines",JSON.stringify([formObj]))
        }
        fn()
    }
    return (
        <form className = "create-medicine-form" onSubmit  = {handleSubmit}>
            <p>Name:</p>
            <input type="text" name = "name" required defaultValue={res?.name}/>
            <p>Manufacturer Name</p>
            <input type="text" name="manufacturer_name" required defaultValue={res?.manufacturer_name}/>
            <p>Price</p>
            <input type="number" name = "price" required defaultValue={res?.price}/>
            <p>Stock</p>
            <input type="number" name = "stock" required defaultValue={res?.stock}/>
            <p>Discount</p>
            <input type="text" name = "discount" required defaultValue={res?.discount}/>
            <br/><br/>
            <button className="submit">Add</button>
        </form>
    )

}

const CreateSalesExecutive  = ({fn,id}) =>{
    if(id){
        var a = JSON.parse(localStorage.getItem("sales-executives"))
        var res = a.find(item => item.First_Name === id)
    }
    const handleSubmit = (event) =>{
        event.preventDefault()
        const data = new FormData(event.target)
        var formObj = {}
        data.forEach(function(value, key){
            formObj[key] = value;
        })
        //using created time's milliseconds as unique ID
        if(localStorage.getItem("sales-executives")){
            var arr = JSON.parse(localStorage.getItem("sales-executives"))
            var selected  = arr.filter(item => item.First_Name !== formObj.First_Name)
            console.log(selected)
            if(selected){
                selected.push(formObj)
                localStorage.setItem("sales-executives",JSON.stringify(selected))
            }
        }
        else{
            localStorage.setItem("sales-executives",JSON.stringify([formObj]))
        }
        fn()
    }
    
    return (
        <form className = "create-medicine-form" onSubmit ={handleSubmit}>
            <p>First Name:</p>
            <input type="text" name = "First_Name" required defaultValue={res?.First_Name}/>
            <p>Last Name:</p>
            <input type="text" name="Last_Name" required defaultValue={res?.Last_Name}/>
            <p>Date of Birth:</p>
            <input type="date" name = "Date_of_Birth" required defaultValue={res?.Date_of_Birth}/>
            <br/>
            <p>Gender</p>
            {res ? <input type="radio" id="male" name="gender" value="male" defaultChecked={ res.gender ==="male" ? true : false}></input>:
                <input type="radio" id="male" name="gender" value="male" ></input>
            }
            <label for="male">Male</label>
            {res ? <input type="radio" id="female" name="gender" value="female" defaultChecked={ res.gender ==="female" ? true : false}></input>
            : <input type="radio" id="female" name="gender" value="female" ></input>}
            <label for="male">Female</label>
            <p>Experience Years</p>
            <input type="text" name = "Experience_Years" defaultValue = {res?.Experience_Years}required/>
            <br/><br/>
            <button className="submit">Add</button>
        </form>
    )
}

const CreateOrder = ({fn}) =>{
    const handleSubmit = (event) =>{
        event.preventDefault()
        const data = new FormData(event.target)
        var formObj = {}
        data.forEach(function(value, key){
            formObj[key] = value;
        })
        if(localStorage.getItem("orders")){
            var arr = JSON.parse(localStorage.getItem("orders"))
            // var selected  = arr.filter(item => item.order_id !== formObj.order_id)
            // console.log(selected)
            // if(selected.length === arr.length){
            //     formObj.id = selected.length + 1
            //     selected.push(formObj)
            //     localStorage.setItem("orders",JSON.stringify(selected))
            // }
            // else{
            //     selected.push(formObj)
            //     localStorage.setItem("orders",JSON.stringify(selected))
            // }
            var selected   = arr.find(item => item.order_id === formObj.order_id)
            if(selected){
                alert("you can only create order")
            }
            else{
                arr.push(formObj)
                localStorage.setItem("orders",JSON.stringify(arr))
                fn()
            }
        }
        else{
            formObj.id=1
            localStorage.setItem("orders",JSON.stringify([formObj]))
            fn()
        }
        
    }


    return (
        <form className = "create-order-form" onSubmit ={handleSubmit}>
            <p>Customer Name:</p>
            <input type="text" name = "customer_name" required defaultValue={""}/>
            <p>Order Id</p>
            <input type="number" name = "order_id" required defaultValue={""}/>
            <p>Contact Number</p>
            <input type="text" name="contact_number" required defaultValue={""}/>
            <p>Products</p>
            <input type="text" name = "products" required defaultValue={""}/>
            <p>Quantity</p>
            <input type="number" name = "quantity" required defaultValue={""}/>
            
            <p>Total Amount</p>
            <input type="number" name = "total_amount" defaultValue = {""}required/>
            <br/><br/>
            <button className="submit">Add</button>
        </form>
    )
}