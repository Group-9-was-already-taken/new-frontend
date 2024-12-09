import React, {useState} from 'react';
import Placeholder from './Placeholder.jpg'
import { useNavigate } from "react-router-dom";

export default function Frontpage() {

    const navigate = useNavigate();

    const navTo = (path) => {
        navigate(path);
      };

    return(
        <div className='frontpage-container'>
        
            <div className='frontpage-content'>
            <div className='frontpage-content-box'>
                    <div className='frontpage-content-box-text'>
                        <h1>Exercises</h1>
                        <t>These exercises are meant to clear your mind and help you build up muscle and help you relax and clear your mind.</t>
                    </div>
                    <div className='frontpage-content-box-image'>
                        <img src={'https://as1.ftcdn.net/v2/jpg/01/41/86/02/1000_F_141860204_UWGjTQLGs0feOoBojJ5NLVpeJUL8TFMn.jpg'} ></img>
                        <h2 onClick={() => navTo('/exercises')}> Click here to find out more!</h2>
                    </div>  
                </div>
                <div className='frontpage-content-box'>
                    <div className='frontpage-content-box-text'>
                        <h1>Exercises</h1>
                        <t>These exercises....</t>
                    </div>
                    <div className='frontpage-content-box-image'>
                        <img src={'https://images.pexels.com/photos/40568/medical-appointment-doctor-healthcare-40568.jpeg'} ></img>
                        <h2 onClick={() => navTo('/exercises')}> Click here to find out more!</h2>
                    </div>
                </div>
                <div className='frontpage-content-box'>
                    <div className='frontpage-content-box-text'>
                        <h1>About Us</h1>
                        <t>These exercises....</t>
                    </div>
                    <div className='frontpage-content-box-image'>
                        <img src={Placeholder} ></img>
                        <h2 onClick={() => navTo('/aboutus')}> Click here to find out more!</h2>
                    </div>
                </div>
                <div className='frontpage-content-box'>
                    <div className='frontpage-content-box-text'>
                        <h1>Go to your profile</h1>
                        <t>These exercises....</t>
                    </div>
                    <div className='frontpage-content-box-image'>
                        <img src={'https://media.istockphoto.com/id/1352519860/fi/valokuva/verkonk%C3%A4ytt%C3%A4jien-henkil%C3%B6tietojen-turvallinen-k%C3%A4ytt%C3%B6-tietosuoja-ja-suojattu-internetyhteys.jpg?s=2048x2048&w=is&k=20&c=uR7TVsieN3pAkukJ2SViGTQB7gqeBmQrM5HpePHYMZo='} ></img>
                        <h2 onClick={() => navTo('/profile')}> Click here to find out more!</h2>
                    </div>
                </div>
            </div>

        </div>
    )

}