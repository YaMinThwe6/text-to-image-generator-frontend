import React from "react";
import { useState } from "react";
import PrivateRouter from "./PrivateRouter";
import PublicRouter from "./PublicRouter";
function Routee() {
    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        
        if (parts.length === 2) {
          return parts.pop().split(';').shift();
        }
      }
    const [state,setState]=useState({authToken:getCookie('authToken')})


return (
    <>
    {state.authToken ? <PrivateRouter/> : <PublicRouter/>}
    </>
)
}
export default Routee;