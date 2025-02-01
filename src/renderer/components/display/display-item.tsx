// #region Imports
// Importing necessary react libraries
import { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';

// Importing styles, types and components
import './display-item.css';
import { Guardian } from '../../types/guardian.ts';
import FormModal from '../form-modal';

// Importing resources
import imgdots from './resources/img-dots.svg';
import imgRepeatMondays from './resources/img-repeat-mondays.svg';
import imgRepeatTuesdays from './resources/img-repeat-tuesdays.svg';
import imgRepeatsWednesdays from './resources/img-repeat-wednesdays.svg';
import imgRepeatsThursdays from './resources/img-repeat-thursdays.svg';
import imgRepeatsFridays from './resources/img-repeat-fridays.svg';
import imgRepeatsSaturdays from './resources/img-repeat-saturdays.svg';
import imgRepeatsSundays from './resources/img-repeat-sundays.svg';
// #endregion Imports


// #region DisplayItem
function DisplayItem(item: Guardian) {
  // #region Converters
  // Converts the equation number to the corresponding string representation
  const getEquationText = (equation: number): string => {
    switch (equation) {
      case 1:
        return 'Easy';
      case 2:
        return 'Medium';
      case 3:
        return 'Hard';
      default:
        return 'None';
    }
  };

  // Converts the snooze number to the corresponding string representation
  const getSnoozeText = (snooze: number): string => {
    if (snooze === -1) {
      return 'Unlimited';
    } else if (snooze === 0) {
      return 'None';
    } else if (snooze === 1) {
      return 'Once';
    } else if (snooze === 2) {
      return 'Twice';
    } else {
      return `${snooze} times`;
    }
  };

  // Converts the weekday string to the corresponding image
  const weekdayIcons: { [key: string]: string } = {
    Monday: imgRepeatMondays,
    Tuesday: imgRepeatTuesdays,
    Wednesday: imgRepeatsWednesdays,
    Thursday: imgRepeatsThursdays,
    Friday: imgRepeatsFridays,
    Saturday: imgRepeatsSaturdays,
    Sunday: imgRepeatsSundays,
  };
  // #endregion Textifiers


  // #region Active State
  // Changes the state of the current guardians active status
  const [active, setActive] = useState(item.active);
  const toggleActiveState = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.checked;
    setActive(newValue);
    // TODO BACKEND: Update the guardian's active status
  };
  // #endregion Active State


  // #region Dots Menu
  // Opens the dots menu to edit or remove the guardian
  const [dotsMenuVisible, setDotsMenuVisible] = useState(false);
  const [dotsMenuPos, setDotsMenuPos] = useState({ top: 0, left: 0 });
  const openDotsMenu = (event: React.MouseEvent) => {
    if (!dotsMenuVisible) {
      setDotsMenuPos({ top: event.clientY, left: event.clientX });
    }
    setDotsMenuVisible(!dotsMenuVisible);
  };

  // Closes the dots menu when clicking outside of it
  const dotsMenuRef = useRef<HTMLDivElement>(null);
  const dotsBtnRef = useRef<HTMLImageElement>(null);
  const onMousedown = (event: MouseEvent) => {
    if (dotsMenuRef.current && dotsBtnRef.current) {
      const targetElement = event.target as HTMLElement;
      if (!dotsMenuRef.current.contains(targetElement) && !dotsBtnRef.current.contains(targetElement)) {
        setDotsMenuVisible(false);
      }
    }
  };
  
  // Adds the event listener to close the dots menu when clicking outside of it
  useEffect(() => {
    document.addEventListener('mousedown', onMousedown);
    return () => {
      document.removeEventListener('mousedown', onMousedown);
    };
  }, []);

  // Opens the form-modal with the current guardian's information to edit
  const editItem = () => {
    setDotsMenuVisible(false);

    // TODO: Move this to the form-modal component
    const fmElement = document.getElementById('form-modal-container');
    if (fmElement) {
      const root = createRoot(fmElement);
      root.render(<FormModal {...item} />);
    }
  };

  // Removes the clicked guardian from the display
  const removeItem = () => {
    setDotsMenuVisible(false);

    // Remove the item from the display
    const itemElement = document.getElementById(item.name);
    if (itemElement) itemElement.remove();
    // TODO BACKEND: Remove the guardian from the backend
  };
  // #endregion Edit Dots


  // #region HTML
  return (
    <div id={item.name}>
      <div className="display-item">
        {/* Alarm Time */}
        <p className="di-text" title="Time the Guardian will shut down your PC if not snoozed">{item.alarm}</p>

        {/* Repeats */}
        <div className="di-repeats-container" title="Weekdays the Guardian repeats">
          <div id="di-repeats" className={`di-repeats-${item.repeats.length}`}>
            {item.repeats.length > 0 ? (
              item.repeats.map((day) => (
                <img key={day} src={weekdayIcons[day]} alt={day} title={"Repeats every " + day} />
              ))) : 
              ( <p>None</p> )}
          </div>
        </div>

        {/* Warning, Snooze, Extension, Equation */}
        <p className="di-text" title="Time before the alarm when the guardian will prompt to snooze or acknowledge">{item.warning} min</p>
        <p className="di-text" title="Number of times the guardian can be delayed before forcing shutdown">{getSnoozeText(item.snooze)}</p>
        <p className="di-text" title="Time added when snooze is selected">{item.extension} min</p>
        <p className="di-text" title="Difficulty of the equation to extend time">{getEquationText(item.equation)}</p>

        {/* Active State */}
        <div id="toggle-active-state">
          <label className="toggle">
            <input id="checkbox" type="checkbox" checked={active} onChange={toggleActiveState}></input>
            <span className="slider"></span>
          </label>
        </div>

        {/* Edit Dots */}
        <img id="btn-dots" ref={dotsBtnRef} src={imgdots} alt="edit" onClick={openDotsMenu} />
        <div id="dots-menu" ref={dotsMenuRef} className={dotsMenuVisible ? '' : 'opacity-hidden'} style={{ top: dotsMenuPos.top, left: dotsMenuPos.left }}>
          <p onClick={editItem}>Edit</p>
          <p id="dots-menu-remove" onClick={removeItem}>Remove</p>
        </div>

      </div>
      {/* Divider towards the next Display Item */}
      <div className="medium-divider"></div>
    </div>
  );
  // #endregion HTML
}

export default DisplayItem;
// #endregion DisplayItem