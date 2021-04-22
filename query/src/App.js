import React, { useEffect } from 'react';
import { RegisterScreen } from './screens/RegisterScreen'
import { SignInScreen } from './screens/SignInScreen'
import { ForgotPasswordScreen } from './screens/ForgotPasswordScreen'
import { HomeScreen } from './screens/HomeScreen'
import { AboutScreen } from './screens/AboutScreen'
import { ProfileScreen } from './screens/ProfileScreen'
import { ProfileEditScreen } from './screens/ProfileEditScreen'
import { AskQuestionScreen } from './screens/AskQuestionScreen'
import { QuestionScreen } from './screens/QuestionScreen'
import { SearchScreen } from './screens/SearchScreen'
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
        }))
      }
      else{
        dispatch(logout())
      }
    })
  },[dispatch])

  return (
      <main className="App">
        <Router>
            <Route path='/register' component={RegisterScreen} exact/>
            <Route path='/signin' component={SignInScreen} exact/>
            <Route path='/resetpassword' component={ForgotPasswordScreen} exact/>
            <Route path='/about' component={AboutScreen} exact/>
            <Route path='/profile' component={ProfileScreen} exact/>
            <Route path='/profile/edit' component={ProfileEditScreen} exact/>
            <Route path='/ask' component={AskQuestionScreen} exact/>
            <Route path='/question/:id' component={QuestionScreen} exact/>
            <Route path='/search/:keyword' component={SearchScreen} exact/>
            <Route path='/' component={HomeScreen} exact/>
        </Router>
      </main>
  );
}

export default App;
