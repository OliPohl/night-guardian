// #region Imports
// Importing styles and components
import './app.css';
import Sidebar from '../sidebar';
import Display from '../display';
// #endregion Imports


// #region App
function App() {
  // #region HTML
  return (
    <div id="app">
      <Display />
      <Sidebar />
      {/* TODO: Remove the fm container */}
      <div id="form-modal-container" />
    </div>
  );
  // #endregion HTML
}

export default App;
// #endregion App