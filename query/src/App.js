import React, { useEffect } from 'react';
import { RegisterScreen } from './screens/RegisterScreen'
import { SignInScreen } from './screens/SignInScreen'
import { ForgotPasswordScreen } from './screens/ForgotPasswordScreen'
import { HomeScreen } from './screens/HomeScreen'
import { AboutScreen } from './screens/AboutScreen'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { auth } from './firebase';
import { login, logout } from './features/userSlice';
import { useDispatch } from 'react-redux';
import './App.css';

function App() {

  const dispatch = useDispatch()

  useEffect(()=>{
    auth.onAuthStateChanged((userAuth) => {
      if(userAuth){
        dispatch(login({
          email:userAuth.email,
          uid:userAuth.uid,
          displayName:userAuth.displayName,
          photoUrl:userAuth.profileURL,
          userDescription:userAuth.userDescription
        }))
      }
      else{
        dispatch(logout())
      }
    })
  },[dispatch])

  return (
    <Router>
      <main className="App">
        <Route path='/register' component={RegisterScreen} exact/>
        <Route path='/signin' component={SignInScreen} exact/>
        <Route path='/resetpassword' component={ForgotPasswordScreen} exact/>
        <Route path='/about' component={AboutScreen} exact/>
        <Route path='/' component={HomeScreen} exact/>
      </main>
    </Router>
  );
}

export default App;
