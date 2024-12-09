import React, {useState} from 'react'
import Placeholder from './Placeholder.jpg'
import { useNavigate } from "react-router-dom";

export default function Header() {


    const navigate = useNavigate();

    const navTo = (path) => {
        navigate(path);
      };

    //useState hook to decide wheter dropdown menu is open or not
    const [open, setOpen] = useState(false);


    //Function for the items inside the dropdown menu
    function DropDownItem ({text, path}) {
        return(
            <li className="dropdown-item" onClick={() => navTo(path)}>
                <a>{text}</a>
            </li>
        )
    } 

    //The header block containing the emergency button and the navigation dropdown
    return(
        <header className='header-container'>
            <div className='header-content'>
            <button className='emergency-button' onClick={() => navTo('/signlogin')}> ! </button>
            <h1 className='header-title' onClick={() => navTo('/')}>Mental Health Page</h1>
            <div className='dropdown-container'>
                <div className='dropdown-trigger' onClick={()=>{setOpen(!open)}}>
                    <img src={Placeholder} alt="placeholder"></img>
                    <text></text>
                </div>
                    <div className={`dropdown-menu ${open? 'active' : 'inactive'}`}>
                    <h3 className='dropdown-h3'>Where would you like to go next?</h3>
                    <ul>
                        <DropDownItem text = {"My Profile"} path= {"/profile"}/>
                        <DropDownItem text = {"Front Page"} path= {"/"}/>
                        <DropDownItem text = {"Exercises"} path= {"/exercises"}/>
                        <DropDownItem text = {"About Us"} path= {"/aboutus"}/>
                    </ul>
                    </div>
            </div>
            </div>
        </header>
    )
}