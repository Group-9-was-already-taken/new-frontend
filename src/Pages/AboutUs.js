import React, {useState} from 'react';
import Placeholder from './Placeholder.jpg'
import { useNavigate } from "react-router-dom";

export default function AboutUs() {

    const navigate = useNavigate();

    const navTo = (path) => {
        navigate(path);
      };

    return(
        <div className='aboutus-container'>
            <div className='aboutus-content'>
                <div className='aboutus-text'>
                    <h1>Who are we?</h1>
                    <p>We are a Group 9 "was already taken". We are a student group formed in oamk tasked to create a product for a product development course.
                        Our product is a mental health website aimed at people wanting to keep track of their mental state. It is a non-professional help and mostly there
                        to possibly assist those in need of one. We aim to provide things like exercises and mood logs for the user, with links to proper professionals and 
                        their websites in case the user may need them.
                    </p>
                </div>
                <div className='return-button' onClick={() => navTo('/')}>
                    <h2>Return to Frontpage</h2>
                </div>
            </div>
        </div>
    )

}