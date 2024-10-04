import { useState } from 'react';
import './SignInSignup.css';
import { apiCall } from './Api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

function SignInSignUp() {
  const navigate = useNavigate();
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const notify = (mesage) => toast(mesage);

  const handleToggle = () => {
    setIsSignup(!isSignup); 
  };

  const handleSignIn = async (e) => {
    e.preventDefault(); // Prevent default form submission

    try {
      const data = await apiCall('auth/user/sign-in', 'POST', { email, password });
      console.log(data, typeof data);
      notify(data.message);
      document.cookie = `authToken=${data.data.token}; path=/; max-age=36000`;
      navigate("/home");
      window.location.reload();
    } catch (error) {
      console.error('Sign-in failed:', error.response.data);
      if (error.response.data) {
        notify(error.response.data.message);
      } else {
        notify(error.message);
      }
      // Handle sign-in error (e.g., show error message)
    }
  }

  const handleSignUp = async (e) => {
    e.preventDefault(); // Prevent default form submission

    try {
      const data = await apiCall('auth/user/sign-up', 'POST', { name, email, password });
      console.log('Sign-up successful:', data);
      notify(data.message);
    } catch (error) {
      console.error('Sign-up failed:', error.response.data);
      if (error.response.data) {
        notify(error.response.data.message);
      } else {
        notify(error.message);
      }
    }
  };

  return (
      <div className={`cont ${isSignup ? 's--signup' : ''}`}>
        <ToastContainer />
        <div className="form sign-in">
            <h2>Welcome</h2>
            <label>
                <span>Email</span>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
            </label>
            <label>
                <span>Password</span>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
            </label>
            <button type="button" className="submit" onClick={handleSignIn}>Sign In</button>
         
        </div>
        <div className="sub-cont">
            <div className="img">
                <div className="img__text m--up">
                    <h3>Don't have an account? Please Sign up!</h3>
                </div>
                <div className="img__text m--in">
                    <h3>If you already has an account, just sign in.</h3>
                </div>
                <div className="img__btn" onClick={handleToggle}>
                    <span className="m--up">Sign Up</span>
                    <span className="m--in">Sign In</span>
                </div>
            </div>
            <div className="form sign-up">
                <h2>Create your Account</h2>
                <label>
                    <span>Name</span>
                    <input type="text" value={name} onChange={(e)=> setName(e.target.value)}/>
                </label>
                <label>
                    <span>Email</span>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                </label>
                <label>
                    <span>Password</span>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
            </label>
                <button type="button" className="submit" onClick={handleSignUp}>Sign Up</button>
                
            </div>
        </div>
    </div>
  )
}

export default SignInSignUp;
