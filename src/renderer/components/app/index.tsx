import './app.css';
import logo from './resources/logo.png';
import githubMark from './resources/github-mark.svg';

function App() {
  return (
    <div id="app">
      <div id="main" className="panel scrollable">
        Main
      </div>
      <div id="sidebar">
        <img id="logo" src={logo} alt="logo" />
        <div id="description" className="panel scrollable">
          <p>Night Guardian is your personal sleep asistant that helps promote healthy sleep habits.</p>
          <div className="small-divider"></div>
          <div className="row">
            <p className="info-text">v-2.0</p>
            <div className="button" onClick={() => window.api.openGitHub()}>
              <img src={githubMark} alt="github" />
              <p>GitHub Repository</p>
            </div>
          </div>
          <div className="small-divider"></div>
          <p className="info-text">made by OliPohl</p>
        </div>
      </div>
    </div>
  );
}

export default App;