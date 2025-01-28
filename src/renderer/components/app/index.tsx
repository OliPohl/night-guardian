import './app.css';
import Sidebar from '../sidebar';
import Display from '../display';

function App() {
  return (
    <div id="app">
      <Display />
      <Sidebar />
      <div id="form-modal-container" />
    </div>
  );
}

export default App;
