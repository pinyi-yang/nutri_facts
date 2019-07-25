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
            <div>
              <a className="teamIcons" href="https://github.com/shadownova65" target="_blank"><i class="fa fa-github" aria-hidden="true"></i></a>
              <a className="teamIcons" href="https://www.linkedin.com/in/pinyi-yang/" target="_blank"><i class="fa fa-linkedin-square" aria-hidden="true"></i></a>
            </div>
          </div>
          <div className="dev">
            <img id='profilePic' src="/profilePic.png" alt=""/>
            <h3>Reid Miller</h3>
            <p>CSS Champ</p>
            <div>
              <a className="teamIcons" href="https://github.com/rmiller999" target="_blank"><i class="fa fa-github" aria-hidden="true"></i></a>
              <a className="teamIcons" href="https://www.linkedin.com/in/reidmiller1/" target="_blank"><i class="fa fa-linkedin-square" aria-hidden="true"></i></a>
            </div>
          </div>
          <div className="dev">
            <img id='profilePic' src="/profilePic.png" alt=""/>
            <h3>River Droz</h3>
            <p>Web Developer</p>
            <div>
              <a className="teamIcons" href="https://github.com/rivedroz23" target="_blank"><i class="fa fa-github" aria-hidden="true"></i></a>
              <a className="teamIcons" href="https://www.linkedin.com/in/river-droz-100/" target="_blank"><i class="fa fa-linkedin-square" aria-hidden="true"></i></a>
            </div>
          </div>
          <div className="dev">
            <img id='profilePic' src="/profilePic.png" alt=""/>
            <h3>Joseph Beech</h3>
            <p>Web Developer</p>
            <div>
              <a className="teamIcons" href="https://github.com/Mothergoose31" target="_blank"><i class="fa fa-github" aria-hidden="true"></i></a>
              <a className="teamIcons" href="https://www.linkedin.com/in/joseph-beech/" target="_blank"><i class="fa fa-linkedin-square" aria-hidden="true"></i></a>
            </div>
          </div>
        </div>
        </div>
    </div>
  )
}

export default LandingPage;