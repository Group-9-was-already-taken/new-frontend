import React, {useState} from 'react';
import { useNavigate } from "react-router-dom";

export default function YogaExercise() {

    return(
        <div className='office-exercise-info-container'>
            <div className='office-exercise-info-content'>
                <h1> Yoga Exercises</h1>
                <div className='office-exercise-info-box'>
                    <h2> Morning Yoga </h2>
                <div className='office-exercise-info-box-img'>
                    <img src='https://darebee.com/images/workouts/morning-mobility-workout.jpg'></img>
                </div>
                <div className='office-exercise-info-box-text-container'>
                <div className='office-exercise-info-box-text'>
                    <h3> Move 1 </h3>
                    <t>1. Stand in a sturdy stance, your legs apart</t>
                    <t>2. Slowly bend your other knee while keeping your other leg straight</t>
                    <t>3. Place your hands together and raise your arms towards the ceiling in this position</t>
                    <t>4. Hold for a few seconds and then repeat the motion changing the position of your legs</t>
                </div>
                <div className='office-exercise-info-box-text'>
                    <h3> Move 2 </h3>
                    <t>1. Stand in a sturdy stance, your legs apart</t>
                    <t>2. Slowly bend your other knee while keeping your other leg straight</t>
                    <t>3. Reach towards the ankle of your straightened leg while moving your other hand towards the ceiling. Move until you feel light resistance</t>
                    <t>4. Hold for a few seconds ant then repeat the motion changing the position of your legs</t>
                </div>
                <div className='office-exercise-info-box-text'>
                    <h3> Move 3 </h3>
                    <t>1. Stand with your legs about the width of your shoulders</t>
                    <t>2. Slowly squat down with your hands together. Keep your heels on the ground</t>
                    <t>3. When in the squat, use your elbows to carefully push your legs apart until you feel slight resistance</t>
                    <t>4. Hold for a few seconds and repeat the motion</t>
                </div>
                <div className='office-exercise-info-box-text'>
                    <h3> Move 4 </h3>
                    <t>1. Kneel down on the floor on all fours</t>
                    <t>2. Slowly raise your left arm and right leg and straighten them</t>
                    <t>3. Hold for a few seconds and then do the same on the other side</t>
                    <t>4. Repeat the move a few times</t>
                </div>
                <div className='office-exercise-info-box-text'>
                    <h3> Move 5 </h3>
                    <t>1. Lay on the floor on your stomach</t>
                    <t>2. Place your hands on the ground in front of you</t>
                    <t>3. Push your upper body upwards until you feel stretching in your abs and back muscles</t>
                    <t>4. Hold for a few seconds and repeat the motion</t>
                </div>
                <div className='office-exercise-info-box-text'>
                    <h3> Move 6 </h3>
                    <t>1. Kneel down on the floor on all fours</t>
                    <t>2. Reach your arms forwards and move your body back</t>
                    <t>3. Move until you feel a stretching in your arms and back</t>
                    <t>4. Hold for a few seconds and repeat the motion</t>
                </div>
                <div className='office-exercise-info-box-text'>
                    <h3> Move 7 </h3>
                    <t>1. Lay on the ground on your back, your arms under your upper body</t>
                    <t>2. Put your legs in an angle, slowly push your waist towards the sky</t>
                    <t>3. Form a "bridge" until you meet resistance</t>
                    <t>4. Hold for a few seconds and then repeat the motion</t>
                </div>
                <div className='office-exercise-info-box-text'>
                    <h3> Move 8 </h3>
                    <t>1. Lay on your back on the ground</t>
                    <t>2. Curl your lower body until you can hold your knees between your arms</t>
                    <t>3. Gently pull your knees towards you with your arms until you feel resistance</t>
                    <t>4. Hold for a few seconds and repeat the motion</t>
                </div>
                <div className='office-exercise-info-box-text'>
                    <h3> Move 9 </h3>
                    <t>1. Lay on the ground on your back, legs raised up in a 90 degree angle</t>
                    <t>2. Slowly lower your legs on one side of your body, keep your back against the ground</t>
                    <t>3. With the opposing arm balance the move by stretching it out</t>
                    <t>4. Hold for a few seconds and then repeat on the other side</t>
                </div>
                </div>
                </div>
                <div className='office-exercise-info-box'>
                    <h2> Pilates Yoga </h2>
                <div className='office-exercise-info-box-img'>
                    <img src='https://darebee.com/images/workouts/early-bird-workout.jpg'></img>
                </div>
                <div className='office-exercise-info-box-text-container'>
                <div className='office-exercise-info-box-text'>
                    <h3> Leg Swings </h3>
                    <t>1. Kneel on the ground on all fours</t>
                    <t>2. Keep your back straight, kick out with your left leg in a slow controlled manner</t>
                    <t>3. Return your left leg down, now kick out with your right leg</t>
                    <t>4. Repeat the motion</t>
                </div>
                <div className='office-exercise-info-box-text'>
                    <h3> Upward Downward Dog</h3>
                    <t>1. Lay on the ground, support your upper body up with your arms</t>
                    <t>2. Stretch for a bit, then raise your waist towards the ceiling</t>
                    <t>3. Hold for a bit and then return to the first position</t>
                    <t>4. Repeat the motion</t>
                </div>
                <div className='office-exercise-info-box-text'>
                    <h3> Bridges </h3>
                    <t>1. Lay on the ground with your legs in a 90 degree angle</t>
                    <t>2. Supporting with your arms, slowly raise your waist towards the ceiling</t>
                    <t>3. Move until you form a "bridge", then return to the starting position</t>
                    <t>4. Repeat the motion</t>
                </div>
                <div className='office-exercise-info-box-text'>
                    <h3> Flutter Kicks </h3>
                    <t>1. Lay on the ground on your back, your hands under your glutes</t>
                    <t>2. Raise your legs slightly in the air</t>
                    <t>3. While keeping your legs in the air, kick your left leg upwards, then kick your right leg</t>
                    <t>4. Repeat the motion</t>
                </div>
                <div className='office-exercise-info-box-text'>
                    <h3> Sitting Twists </h3>
                    <t>1. Sit on the ground</t>
                    <t>2. Tilt your body backwards until only your glutes touch the ground</t>
                    <t>3. Hold your hands together and twist your upper body from side to side. Keeps your legs in the air</t>
                    <t>4. Repeat the motion</t>
                </div>
                <div className='office-exercise-info-box-text'>
                    <h3> Side leg raises </h3>
                    <t>1. Lay on the ground on your side</t>
                    <t>2. Rest your head against your hand</t>
                    <t>3. Slowly raise up your leg in a controlled manner</t>
                    <t>4. Repeat the motion on one side for a few times and then change sides</t>
                </div> 

                </div>
                </div>
            </div>
        </div>
    )    

}