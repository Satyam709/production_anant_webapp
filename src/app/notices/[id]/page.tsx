"use client";

import React from 'react';
import { useState, useEffect} from 'react';
import {useParams} from "next/navigation";
import axios from 'axios';

export default function Notice_id() {
    const { id }  = useParams();
    const [notice, setNotice] = useState({});

    useEffect(() => {
        async function fetchData(){
            const response = await axios.get(`/api/notices/${id}`);
            const data = await response.data;
            console.log(data.notice);
            setNotice(data.notice);
        }

        fetchData();
    }, [id]);

    return <>Hello</>;
}