import React, { useState } from 'react';
import {Routes, Route, Navigate} from "react-router-dom";
import SignInSignup from "../Router/SignInSignup";
function Public(){
return (
    <Routes>
        <Route path='/' element={<Navigate to="/sign-in" />} />
        <Route path='/home' element={<Navigate to="/sign-in" />} />
        <Route path='/sign-in' element={<SignInSignup/>}/>
    </Routes>
)
}
export default Public