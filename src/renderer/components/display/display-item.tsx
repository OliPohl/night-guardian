// #region Imports
// Importing necessary react libraries
import { useState, useEffect, useRef } from 'react';

// Importing styles, types, components and utils
import './display-item.css';
import { Guardian } from '../../shared/types/guardian.ts';
import { openFormModal } from '../form-modal';
import { parseEquationNumber, parseSnoozeNumber, parseRepeatString } from '../../shared/utils/guardian/guardian-parser.ts';

// Importing resources
import imgdots from './resources/img-dots.svg';
// #endregion Imports


// #region DisplayItem
function DisplayItem(item: Guardian) {
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

    // Open the form modal with the current guardian's information
    openFormModal(item);
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
                <img key={day} src={parseRepeatString[day]} alt={day} title={"Repeats every " + day} />
              ))) : 
              ( <p>None</p> )}
          </div>
        </div>

        {/* Warning, Snooze, Extension, Equation */}
        <p className="di-text" title="Time before the alarm when the guardian will prompt to snooze or acknowledge">{item.warning} min</p>
        <p className="di-text" title="Number of times the guardian can be delayed before forcing shutdown">{parseSnoozeNumber(item.snooze)}</p>
        <p className="di-text" title="Time added when snooze is selected">{item.extension} min</p>
        <p className="di-text" title="Difficulty of the equation to extend time">{parseEquationNumber(item.equation)}</p>

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