import './app.css';
import Sidebar from '../sidebar';
import Display from '../display';
import FormModal from '../form-modal';

import { Guardian } from '../../types/guardian';

function App() {
  const newGuardian: Guardian = {
    name: 'NewGuardian',
    alarm: '23:00',
    repeats: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    warning: 15,
    snooze: -1,
    extension: 30,
    difficulty: 2,
    active: true,
  };

  return (
    <div id="app">
      <Display />
      <Sidebar />
      <FormModal {...newGuardian} />
    </div>
  );
}

export default App;
