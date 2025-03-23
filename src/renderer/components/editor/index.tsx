// #region Imports
// Importing styles and components
import './editor.css';
import Sidebar from '../sidebar';
import Display from '../display';
// #endregion Imports


// #region Editor
function Editor() {
  // #region HTML
  return (
    <div id="editor">
      <Display />
      <Sidebar />
      <div id="fm-container" />
    </div>
  );
  // #endregion HTML
}

export default Editor;
// #endregion Editor