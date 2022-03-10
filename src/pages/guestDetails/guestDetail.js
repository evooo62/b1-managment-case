import React, { useEffect, useState } from "react";
import "./guestDetail.css";
import {AiFillPhone,AiFillMail} from 'react-icons/ai';
import {GiLovers} from 'react-icons/gi';
import {GoPrimitiveDot} from 'react-icons/go';
import {BiLogOut} from 'react-icons/bi'
import{FiLogOut} from 'react-icons/fi'
import {BsFillCalendarDateFill} from 'react-icons/bs'
import { Link } from "react-router-dom";


function GuestDetail() {
  const [data, setData] = useState([null]);

  useEffect(() => {
    let token = localStorage.getItem("access_token");
    console.log("token", token);

    if (token != null && token != undefined) {
      fetch("https://icibot.net/v2/api/app_me", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          console.log("data", data);
          setData(data);
        });
    }
  }, []);

  return (
    <div className="guest-all">
    <div className='guest-card'>
    <div className='guest-info'>
       <img src='https://upload.wikimedia.org/wikipedia/commons/4/4e/A_profile.jpg'/>
        <div className='profile'>
           
            <h2><GoPrimitiveDot/>{data.first_name} {data.last_name}</h2>
            <p><AiFillPhone/> <span>{data.phone_no}</span></p>
            <p><AiFillMail/> <span>{data.e_mail}</span></p>
            <p><GiLovers/> <span>{data.wedding_anniversary}</span></p>
            <p>Guest Id: <span>{data.id}</span></p>
        </div>
    </div>
    <div className='hotel-info'>
      <div className='hotel-profile'>
        <h2>Room No : <span>{data.room_no}</span></h2>
        <p><FiLogOut/> <span>{data.entry_date}</span></p>
        <p><BiLogOut/> <span>{data.release_date}</span></p>
        <p><BsFillCalendarDateFill/> <span>{data.booking_date}</span></p>
        <p><BsFillCalendarDateFill/> <span>{data.date_of_birth}</span></p>
        <p>Pillow Type :<span>{data.pillow_type}</span></p>
        <p>Bed Type :<span>{data.bed_type}</span></p>
        <p>Hotel Id :<span>{data.hotel_id}</span></p>
      </div>
    </div>
    <div className="surveyLink">
      <p> Lutfen Anketi Doldurunuz! </p>
    </div>
    <div className="surveyLink">
       <Link to='/survey'><button>Anket</button> </Link>
    </div>
    </div>
    
    </div>
  );
}

export default GuestDetail;
