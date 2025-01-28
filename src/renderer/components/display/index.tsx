import { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import './display.css';

import { Guardian } from '../../types/guardian';
import DisplayItem from './display-item';
import FormModal from '../form-modal';

import searchButton from './resources/search-button.svg';
import addButton from './resources/add-button.svg';

function Display() {
  const [isSpinning, setIsSpinning] = useState(false);

  const newGuardian: Guardian = {
    name: 'NewGuardian',
    alarm: '23:00',
    repeats: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    warning: 15,
    snooze: -1,
    extension: 30,
    equation: 2,
    active: true,
  };

  const handleUpdateClick = () => {
    setIsSpinning(true);
    const displayElement = document.getElementById('display-items');
    if (displayElement) {
      displayElement.innerHTML = '';
    }

    const addButton = document.getElementById('add-button');
    if (addButton) {
      addButton.classList.add('disabled');
    }
  };

  const addGuardian = () => {
    const fmElement = document.getElementById('form-modal-container');
    if (fmElement) {
      const root = createRoot(fmElement);
      root.render(<FormModal {...newGuardian} />);
    }
  };

  useEffect(() => {
    if (isSpinning) {
      const timer = setTimeout(() => {
        setIsSpinning(false);
        const addButton = document.getElementById('add-button');
        if (addButton) {
          addButton.classList.remove('disabled');
        }
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isSpinning]);

    // Sample Guardian object
    const sampleGuardian: Guardian = {
      name: 'Guardian',
      alarm: '21:00',
      repeats: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      warning: 5,
      snooze: -1,
      extension: 30,
      equation: 2,
      active: true,
    };

  return (
    <div id="display" className="panel scrollable">
      <img id="search-button" className={`img-button ${isSpinning ? 'spin' : ''}`} src={searchButton} alt="search button" title="Search for Guardians" onClick={handleUpdateClick} />
      <div id="heading">
        <h1 title="Time the Guardian will shut down your PC if not snoozed">Alarm</h1>
        <h1 title="Weekdays the Guardian repeats">Repeats</h1>
        <h1 title="Time before the alarm when the guardian will prompt to snooze or acknowledge">Warning</h1>
        <h1 title="Number of times the guardian can be delayed before forcing shutdown">Snooze</h1>
        <h1 title="Time added when snooze is selected">Extension</h1>
        <h1 title="Difficulty of the equation to extend time">Equation</h1>
      </div>
      <div className="big-divider"></div>

      <div id="display-items">
        <DisplayItem {...sampleGuardian} />
        <DisplayItem {...sampleGuardian} />
        <DisplayItem {...sampleGuardian} />
        <DisplayItem {...sampleGuardian} />
      </div>

      <div id="add-button" className="button center" onClick={addGuardian}>
        <img src={addButton} alt="add button" />
        <p>Add Guardian</p>
      </div>
    </div>
  );
}

export default Display;