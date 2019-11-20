import React from 'react';
import logo from './logo-w.svg';
import Posts from './components/posts/Posts';

import './App.scss';

function App() {
  function async(){
    return(
      <Posts/>
    );
  }
    return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo noUserSelect" alt="logo" />
        <div className="btns">
          <div className="btn undefault noUserSelect"><span>Login</span></div>
          <div className="btn noUserSelect"><span>Sign Up</span></div>
        </div>
        <div className="paraph noUserSelect">
          <p className="noUserSelect">Swipe down to see all public posts. 
            If you are interested in seeing the 
            private ones, you must <span>Login</span> or <span>Sign Up.</span></p>
        </div>
      </header>
    </div>
  );
}

export default App;