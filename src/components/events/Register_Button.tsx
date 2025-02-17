"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Register_Button({event_id, isRegistrationOpen, isLoggedin}:{event_id: string, isRegistrationOpen: boolean, isLoggedin: boolean}){

    const [isRegistered, setIsRegistered] = useState(false);
    const router = useRouter();

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
        if(isLoggedin)
            checkRegistration(event_id);
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
                setIsRegistered(true);
                router.refresh();
                return {success:true, message:"Successfully registered!"};
            }
        }
        registerForEvent(event_id);
    }

    if(isLoggedin){
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
                { isRegistered? 'Registered!' : isRegistrationOpen ? 'Register Now' : 'Registration Closed'}
            </button>
        )
    }
    else{
        return <></>
    }
}