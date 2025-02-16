"use client";
import React, { useState, useEffect } from 'react';

export default function Register_Button({event_id, isRegistrationOpen}:{event_id: string, isRegistrationOpen: boolean,}){

    const [isRegistered, setIsRegistered] = React.useState(false);

    useEffect(() => {
        async function checkRegistration(event_id: string){
            const res = await fetch(`/api/events/${event_id}/check-registration`, {
                method: 'GET',
            });
            if(res.ok){
                const data = await res.json();
                setIsRegistered(data.isRegistered);
            }
        }
        checkRegistration(event_id);
        console.log(isRegistered);
    }, [isRegistered]);

    const handleRegister = async () => {
        async function registerForEvent(event_id: string){
            const res = await fetch(`/api/events/${event_id}/register`, {
                method: 'POST',
            });
            if(!res.ok){
                return {success:false, message:"Failed to register!"};
            }
            else{
                return {success:true, message:"Successfully registered!"};
            }
        }
        console.log(await registerForEvent(event_id));
    }

    return(
        <button
            onClick={handleRegister}
            disabled={!isRegistrationOpen}
            className={`w-full md:w-auto px-8 py-3 rounded-lg font-semibold transition-all duration-200 ${
              isRegistrationOpen
                ? 'bg-cyan-500 hover:bg-cyan-600 text-white'
                : 'bg-gray-600 cursor-not-allowed text-gray-300'
            }`}
          >
            {isRegistered? 'Already Registered!' : isRegistrationOpen ? 'Register Now' : 'Registration Closed'}
        </button>
    )
}