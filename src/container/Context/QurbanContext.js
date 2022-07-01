import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

export const QurbanContext = createContext();

export const QurbanProvider = (props) => {

    let [dataQurban, setDataQurban] = useState([]);
    
    const [loading, setLoading] = useState(true);
    // const [currentId, setCurrentId] = useState(-1);
    // const navigate = useNavigate();

    useEffect(() => {
        setLoading(true)
        axios.get(`http://localhost:3000/qurban`)
        .then(response => response.data)
        .then(data => {
            setDataQurban(data)

            // console.log("Data = ", data);
        }).catch(err => {
            console.log(err)
        }).finally (() => {
            setLoading(false)
        })
    }, [])

    return (
        <QurbanContext.Provider value={props} >
            {props.children}
        </QurbanContext.Provider>
  )
}