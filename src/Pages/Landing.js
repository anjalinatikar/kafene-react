import React from 'react';
import {useHistory} from 'react-router'
import './Landing.css'
import AdminLanding from '../Components/AdminLanding'
import SalesLanding from '../Components/SalesLanding'


const Landing = (props) => {
    const  history = useHistory()
    const user = props.match.params.user
    console.log(user)

    return ( 
        <div className  =  "landing-page">
            {user === "admin" && <AdminLanding  />}
            {user === "sales" && <SalesLanding  />}
        </div>
    );
}
 
export default Landing;