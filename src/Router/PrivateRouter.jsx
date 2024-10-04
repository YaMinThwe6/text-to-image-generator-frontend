import Home from "../Components/Home";
import {Routes, Route, Navigate} from "react-router-dom";
function PrivateRouter(){
return (
    <Routes>
        <Route path='/' element={<Navigate to="/home" />} />
        <Route path='/sign-in' element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home/>}/>
    </Routes>
)
}
export default PrivateRouter;