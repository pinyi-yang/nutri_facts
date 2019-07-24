import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom';

const LandingPage = props => {
  return (
    <div id="landingPageMain">
      <div id="landingPage">
        <div id="landing">
          <h1 id="landingTitle">WE ARE NUTRI FACTS</h1>
          <p id="landingMessage">Nutri Facts is a daily food tracker designed to help users meet their
          nutritional goals!</p>
            <div id="landingButton">
              <Link className="landingLogin" to='/login' >Login</Link>
              <Link className="landingSignup" to='/signup'>Sign Up!</Link>
            </div>
        </div>
      </div>
      <div id="landingPageTeam">
        <h1 id="teamTitle">App Developers</h1>
        <div id="landingTeam">
          <div className="dev">
            <img id='profilePic' src="/profilePic.png" alt=""/>
            <h3>Pinyi Yang</h3>
            <p>Web Developer</p>
          </div>
          <div className="dev">
            <img id='profilePic' src="/profilePic.png" alt=""/>
            <h3>Reid Miller</h3>
            <p>CSS Champ</p>
          </div>
          <div className="dev">
            <img id='profilePic' src="/profilePic.png" alt=""/>
            <h3>River Droz</h3>
            <p>Web Developer</p>
          </div>
          <div className="dev">
            <img id='profilePic' src="/profilePic.png" alt=""/>
            <h3>Joseph Beech</h3>
            <p>Web Developer</p>
          </div>
        </div>
        </div>
    </div>
  )
}

export default LandingPage;