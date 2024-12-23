import './app.css';
import Sidebar from '../sidebar';

function App() {
  return (
    <div id="app">
      <div id="main" className="panel scrollable">
        Main
      </div>
      <Sidebar />
    </div>
  );
}

export default App;