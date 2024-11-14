import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';


const LoginPage = () => {
  const [userType, setUserType] = useState('customer');
  const [showPassword, setShowPassword] = useState(false);
  const [isHovered, setIsHovered] = useState('');
  const [focusedInput, setFocusedInput] = useState('');



  const containerStyle = {
    minHeight: '100vh',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 50%, #d946ef 100%)',
    backgroundSize: '200% 200%',
    animation: 'gradientBG 15s ease infinite',
    padding: '20px',
  };

  const cardStyle = {
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(10px)',
    borderRadius: '24px',
    padding: '40px',
    width: '100%',
    maxWidth: '440px',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.1)',
    transition: 'transform 0.3s ease',
    transform: 'translateY(0)',
  };

  const headerStyle = {
    textAlign: 'center',
    marginBottom: '40px',
  };

  const titleStyle = {
    fontSize: '32px',
    background: 'linear-gradient(135deg, #4f46e5, #d946ef)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    marginBottom: '12px',
    fontWeight: '700',
  };

  const inputGroupStyle = (focused) => ({
    position: 'relative',
    marginBottom: '24px',
    transition: 'transform 0.2s ease',
    transform: focused ? 'scale(1.02)' : 'scale(1)',
  });

  const inputStyle = (focused) => ({
    width: '85%',
    padding: '16px 16px 16px 48px',
    border: `2px solid ${focused ? '#4f46e5' : 'rgba(0, 0, 0, 0.1)'}`,
    borderRadius: '12px',
    fontSize: '15px',
    outline: 'none',
    transition: 'all 0.3s ease',
    backgroundColor: focused ? 'white' : 'rgba(255, 255, 255, 0.9)',
    boxShadow: focused ? '0 4px 12px rgba(79, 70, 229, 0.1)' : 'none',
  });

  const radioContainerStyle = {
    display: 'flex',
    gap: '16px',
    marginBottom: '32px',
    padding: '4px',
    background: 'rgba(0, 0, 0, 0.03)',
    borderRadius: '12px',
  };

  const radioLabelStyle = (isSelected) => ({
    flex: 1,
    padding: '12px',
    textAlign: 'center',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    background: isSelected ? 'white' : 'transparent',
    boxShadow: isSelected ? '0 2px 8px rgba(0, 0, 0, 0.1)' : 'none',
    color: isSelected ? '#4f46e5' : '#666',
    fontWeight: isSelected ? '600' : '400',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
  });

  const buttonStyle = (isHovered) => ({
    width: '100%',
    padding: '16px',
    background: `linear-gradient(135deg, #4f46e5 0%, ${isHovered ? '#7c3aed' : '#6366f1'} 100%)`,
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
    boxShadow: isHovered 
      ? '0 8px 20px rgba(79, 70, 229, 0.3)'
      : '0 4px 12px rgba(79, 70, 229, 0.2)',
  });

  const linkStyle = (isHovered) => ({
    color: isHovered ? '#4f46e5' : '#6b7280',
    textDecoration: 'none',
    transition: 'all 0.2s ease',
    fontWeight: isHovered ? '500' : '400',
  });

  const iconStyle = {
    position: 'absolute',
    left: '16px',
    top: '50%',
    transform: 'translateY(-50%)',
    width: '20px',
    height: '20px',
    color: '#4f46e5',
  };
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [role, setRole] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();
      if(!email || !password){
        console.log("not");
      }
      try {
        
        const res = await axios.post('http://localhost:8000/login', {email, password}, {withCredentials: true });
        // console.log(email, password);
          console.log(res);
          console.log(userType);
          
          if(res.status === 200){
            console.log("Success");
            if(userType === 'customer')
              navigate('/customer')
            else 
              navigate('/organisation');
          }
          else {
            navigate('/') ;
          }
        } catch (error) {
          if (error.response) {
            console.log("Error Data:", error.response.data); // More details
            console.log("Status Code:", error.response.status);
          } else {
            console.log("Error:", error.message);
          }
          alert("Wrong email or password")
      }
    };

  return (
    <div style={containerStyle}>
      <style>
        {`
          @keyframes gradientBG {
            0% { background-position: 0% 50% }
            50% { background-position: 100% 50% }
            100% { background-position: 0% 50% }
          }
          input[type="radio"] { display: none; }
          ::placeholder { color: #a0aec0; }
        `}
      </style>
      
      <div style={cardStyle}>
        <div style={headerStyle}>
          <h1 style={titleStyle}>Welcome Back</h1>
          <p style={{ color: '#6b7280', fontSize: '16px' }}>
            Sign in to your account
          </p>
        </div>

        <form method='POST' onSubmit={handleSubmit}>
          <div style={radioContainerStyle}>
            <label 
              style={radioLabelStyle(userType === 'customer')}
              onMouseEnter={() => setIsHovered('customer')}
              onMouseLeave={() => setIsHovered('')}
            >
              <input
                type="radio"
                name="userType"
                value="customer"
                checked={userType === 'customer'}
                onChange={(e) => setUserType(e.target.value)}
              />
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              Customer
            </label>
            
            <label 
              style={radioLabelStyle(userType === 'organization')}
              onMouseEnter={() => setIsHovered('organization')}
              onMouseLeave={() => setIsHovered('')}
            >
              <input
                type="radio"
                name="userType"
                value="organization"
                checked={userType === 'organization'}
                onChange={(e) => setUserType(e.target.value)}
              />
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
              Organization
            </label>
          </div>

          <div style={inputGroupStyle(focusedInput === 'email')}>
            <svg style={iconStyle} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
            </svg>
            <input
              type="email"
              name='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              style={inputStyle(focusedInput === 'email')}
              onFocus={() => setFocusedInput('email')}
              onBlur={() => setFocusedInput('')}
            />
          </div>

          <div style={inputGroupStyle(focusedInput === 'password')}>
            <svg style={iconStyle} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
              <path d="M7 11V7a5 5 0 0110 0v4"/>
            </svg>
            <input
              name='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter password"
              style={inputStyle(focusedInput === 'password')}
              onFocus={() => setFocusedInput('password')}
              onBlur={() => setFocusedInput('')}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: 'absolute',
                right: '16px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#6b7280',
                padding: '4px',
              }}
            >
              {showPassword ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" />
                  <line x1="1" y1="1" x2="23" y2="23" />
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>  
              )}
            </button>
          </div>

          <button
            type="submit"
            style={buttonStyle(isHovered === 'submit')}
            onMouseEnter={() => setIsHovered('submit')}
            onMouseLeave={() => setIsHovered('')}
          >
            Sign In as {userType === 'customer' ? 'Customer' : 'Organization'}
          </button>

          <div style={{ 
            display: 'flex', 
            justifyContent: 'center',
            gap: '16px',
            marginTop: '24px',
            fontSize: '15px'
          }}>
            <a
              href="#"
              style={linkStyle(isHovered === 'forgot')}
              onMouseEnter={() => setIsHovered('forgot')}
              onMouseLeave={() => setIsHovered('')}
            >
              Forgot password?  
            </a>
            <span style={{ color: '#d1d5db' }}>•</span>
            <a
              href="/signup"
              style={linkStyle(isHovered === 'create')}
              onMouseEnter={() => setIsHovered('create')}
              onMouseLeave={() => setIsHovered('')}
            >
              Create account
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;       