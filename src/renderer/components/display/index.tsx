import { useState, useEffect } from 'react';
import './display.css';

import { Guardian } from '../../types/guardian';
import DisplayItem from './display-item';

import searchButton from './resources/search-button.svg';
import addButton from './resources/add-button.svg';

function Display() {
  const [isSpinning, setIsSpinning] = useState(false);

  const handleSearchButtonClick = () => {
    setIsSpinning(true);
  };

  useEffect(() => {
    if (isSpinning) {
      const timer = setTimeout(() => {
        setIsSpinning(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isSpinning]);

    // Sample Guardian object
    const sampleGuardian: Guardian = {
      name: 'Guardian',
      alarm: '23:00',
      repeats: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      warning: 5,
      snooze: -1,
      delay: 30,
      difficulty: 2,
      active: true,
    };

  return (
    <div id="display" className="panel scrollable">
      <img id="search-button" className={`img-button ${isSpinning ? 'spin' : ''}`} src={searchButton} alt="search button" title="Search for Guardians" onClick={handleSearchButtonClick} />
      <div id="heading">
        <h1>Alarm</h1>
        <h1>Repeats</h1>
        <h1>Warning</h1>
        <h1>Snooze</h1>
        <h1>Delay</h1>
        <h1>Difficulty</h1>
      </div>
      <div className="big-divider"></div>
      <DisplayItem {...sampleGuardian} />
      <DisplayItem {...sampleGuardian} />
      <DisplayItem {...sampleGuardian} />
      <DisplayItem {...sampleGuardian} />

      <div className="button center">
        <img src={addButton} alt="add button" />
        <p>Add Guardian</p>
      </div>
    </div>
  );
}

export default Display;