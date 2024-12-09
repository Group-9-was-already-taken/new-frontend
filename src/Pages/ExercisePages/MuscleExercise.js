import React, {useState} from 'react';
import { useNavigate } from "react-router-dom";

export default function MuscleExercise() {

    return(
        <div className='office-exercise-info-container'>
            <div className='office-exercise-info-content'>
            <h1> Muscle Building Exercises</h1>
            <div className='office-exercise-info-box'>
                <h2> Upper Body </h2>
            <div className='office-exercise-info-box-img'>
                <img src='https://darebee.com/images/workouts/upperbody-workout.jpg'></img>
            </div>
            <div className='office-exercise-info-box-text-container'>
            <div className='office-exercise-info-box-text'>
                <h3> Knee Push Up </h3>
                <t>1. Lay on the ground on your stomach, legs in 90 degree angle</t>
                <t>2. Place your hands wider than your shoulders in line with your chest</t>
                <t>3. Keeping your back straight, push your upper body up using your knees as the hinge point</t>
                <t>4. Repeat the motion</t>
            </div>
            <div className='office-exercise-info-box-text'>
                <h3> Arm Extensions </h3>
                <t>1. Straighten your arms in front of you</t>
                <t>2. Slowly move your arms to your sides into a T-pose until you feel resistance</t>
                <t>3. Move your arms back in front of you</t>
                <t>4. Repeat the motion</t>
            </div>
            <div className='office-exercise-info-box-text'>
                <h3> Bicep Extensions </h3>
                <t>1. Stand up with your back straight</t>
                <t>2. Place your arms in front of you like in the image</t>
                <t>3. Extend your arms and then return them to the starting position</t>
                <t>4. Repeat the motion</t>
            </div>
            <div className='office-exercise-info-box-text'>
                <h3> Shoulder Taps </h3>
                <t>1. Move your arms to your sides, the tips of your fingers touching your shoulders</t>
                <t>2. Raise your arms towards the roof as high as you can</t>
                <t>3. Return your arms to your sides touching your shoulders</t>
                <t>4. Repeat the motion</t>
            </div>
            <div className='office-exercise-info-box-text'>
                
            </div>
            </div>
            </div>

            </div>
        </div>
    )

}