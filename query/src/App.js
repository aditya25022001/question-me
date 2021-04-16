import React from 'react';
import { RegisterScreen } from './screens/RegisterScreen'
import { SignInScreen } from './screens/SignInScreen'
import { ForgotPasswordScreen } from './screens/ForgotPasswordScreen'
import { HomeScreen } from './screens/HomeScreen'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './App.css';

function App() {
  return (
    <Router>
      <main className="App">
        <Route path='/register' component={RegisterScreen} exact/>
        <Route path='/signin' component={SignInScreen} exact/>
        <Route path='/resetpassword' component={ForgotPasswordScreen} exact/>
        <Route path='/' component={HomeScreen} exact/>
      </main>
    </Router>
  );
}

export default App;
