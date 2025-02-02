// #region Imports
// Importing styles
import './sidebar.css';

// Importing resources
import imgLogo from './resources/img-logo.png';
import imgGithubIcon from './resources/img-github-icon.svg';
// #endregion Imports


// #region Sidebar
function Sidebar() {
  // #region HTML
  return (
    <div id="sidebar">
      {/* Logo */}
      <img id="logo" src={imgLogo} alt="logo" />

      {/* Description */}
      <div id="description" className="panel scrollable">
        <p>Night Guardian is your personal sleep asistant that helps promote healthy sleep habits.</p>
        <div className="small-divider"></div>

        {/* Version / Github */}
        <div className="row">
          <p className="info-text">v-2.0</p>
          <div className="button" onClick={() => window.api.openGitHub()}>
            <img src={imgGithubIcon} />
            <p>GitHub Repository</p>
          </div>
        </div>
        <div className="small-divider"></div>

        {/* Tutorial */}
        {/* TODO: tutorial button with video popup and new tooltip system */}

        {/* Credits */}
        <p className="info-text">made by OliPohl</p>
      </div>
    </div>
  );
  // #endregion HTML
}

export default Sidebar;
// #endregion Sidebar