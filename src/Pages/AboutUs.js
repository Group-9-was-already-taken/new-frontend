import React, {useState} from 'react';
import Placeholder from './Placeholder.jpg'
import { useNavigate } from "react-router-dom";

export default function AboutUs() {

    return(
        <div className='aboutus-container'>
            <div className='aboutus-content'>
                <div className='aboutus-text'>
                    <h1>In this page we will write things about ourselves and maybe include a picture or something I don't know</h1>
                </div>
            </div>
        </div>
    )

}