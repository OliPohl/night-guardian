// #region Imports
// Importing necessary react libraries
import { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';

// Importing styles and types
import './form-modal.css';
import { Guardian } from '../../shared/types/guardian';

// Importing resources for alarm
import imgAlarmColon from './resources/img-alarm-colon.svg';
import imgAlarmUp from './resources/img-alarm-up.svg';
import imgAlarmDown from './resources/img-alarm-down.svg';

// Importing resources for repeats
import imgRepeatMondays from './resources/img-repeat-mondays.svg';
import imgRepeatTuesdays from './resources/img-repeat-tuesdays.svg';
import imgRepeatsWednesdays from './resources/img-repeat-wednesdays.svg';
import imgRepeatsThursdays from './resources/img-repeat-thursdays.svg';
import imgRepeatsFridays from './resources/img-repeat-fridays.svg';
import imgRepeatsSaturdays from './resources/img-repeat-saturdays.svg';
import imgRepeatsSundays from './resources/img-repeat-sundays.svg';

// Importing resources for dropdown
import imgDropdownBtn from './resources/img-dropdown-btn.svg';

// Importing resources for buttons
import imgSaveBtn from './resources/img-save-btn.svg';
import imgCancelBtn from './resources/img-cancel-btn.svg';
// #endregion Imports


// #region Exports
export const openFormModal = (item : Guardian) => {
  const fmElement = document.getElementById('fm-container');
  if (fmElement) {
    const root = createRoot(fmElement);
    root.render(<FormModal {...item} />);
    // TODO: Fix creating root when root already exists
  }
}
// #endregion Exports


// #region FormModal
function FormModal(item: Guardian) {
  // Save a copy of the current item to only save the changes internally
  const [currentItem, setCurrentItem] = useState({ ...item });


  // #region Close/Save
  // Closes the form modal window
  const closeWindow = () => {
      const fmElement = document.getElementById('fm-container');
      if (fmElement) {
        fmElement.innerHTML = '';
      }
  };

  // Saves the guardian and closes the form modal window
  const saveGuardian = () => {
    // TODO BACKEND: Save the guardian and display it to the frontend
    closeWindow();
  }

  // Closes the form modal window when the background is clicked
  const handleBackgroundClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      closeWindow();
    }
  };
  // #endregion Close/Save


  // #region Alarm
  const changeAlarmValue = (hourChange : number, minuteChange : number) => {
    const alarmValue = document.getElementById('fm-alarm-minutes') as HTMLElement;
    if (alarmValue) {
      const [hours, minutes] = currentItem.alarm.split(':').map(Number);
      let newHours = hours + hourChange;
      let newMinutes = minutes + minuteChange;

      // Ensure hours and minutes are within valid range
      if (newMinutes >= 60) {
        newMinutes = 0;
        // newHours += 1;
      } else if (newMinutes < 0) {
        newMinutes = 59;
        // newHours -= 1;
      }

      if (newHours >= 24) {
        newHours = 0;
      } else if (newHours < 0) {
        newHours = 23;
      }

      const newAlarm = `${String(newHours).padStart(2, '0')}:${String(newMinutes).padStart(2, '0')}`;
      setCurrentItem({ ...currentItem, alarm: newAlarm });
    }
  }
  // #endregion Alarm


  // #region Repeats
  const selectRepeatDay = (event: React.MouseEvent<HTMLImageElement>) => {
    const isActive = event.currentTarget.classList.contains('fm-repeats-active');
    if (isActive) {
      event.currentTarget.classList.remove('fm-repeats-active');
    } else {
      event.currentTarget.classList.add('fm-repeats-active');
    }
  }
  // #endregion Repeats


  // #region Dropdown
  // Closes all dropdowns
  const closeAllDropdowns = () => { 
    const dropdowns = document.getElementsByClassName('dropdown-content');
    for (let i = 0; i < dropdowns.length; i++) {
      dropdowns[i].classList.add('hidden');
    }
  }

  // Opens the dropdown content when the dropdown is clicked and closes all other dropdowns
  const openDropdownContent = (event: React.MouseEvent<HTMLDivElement>) => {
    const dropdownContent = event.currentTarget.lastChild as HTMLDivElement;
    const isHidden = dropdownContent.classList.contains('hidden');
    closeAllDropdowns();
    if (isHidden) {
      dropdownContent.classList.remove('hidden');
    }
  }

  // Closes all dropdowns when the user clicks outside of them
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!(event.target as HTMLElement).closest('.dropdown')) {
        closeAllDropdowns();
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);


  // Selects the dropdown content and closes the dropdown
  const selectDropdownContent = (event: React.MouseEvent<HTMLDivElement>) => {
    const newSelection = event.currentTarget.innerText;
    const selectedItem = event.currentTarget.parentElement?.parentElement?.firstChild as HTMLElement;
    if (selectedItem) {
      selectedItem.innerText = newSelection;
    }
    disableImpossibleDropdowns();
  }

  // Disable all impossible dropdowns
  const disableImpossibleDropdowns = () => {
    const warningValue = document.getElementById('fm-warning-dropdown')?.firstChild?.textContent;

    const snooze = document.getElementById('fm-snooze-dropdown') as HTMLElement;
    const snoozeValue = document.getElementById('fm-snooze-dropdown')?.firstChild?.textContent;
    // Disable snooze if warning is set to none
    if (snooze) {
      const snoozeText = snooze.firstChild as HTMLElement;
      if (warningValue === 'None') {
        snoozeText.textContent = 'None';
        snooze.classList.add('dropdown-disabled');
      } else {
        snooze.classList.remove('dropdown-disabled');
      }
    }

    const extension = document.getElementById('fm-extension-dropdown') as HTMLElement;
    const extensionValue = extension?.firstChild?.textContent;
    // Disable extension if snooze or warning is set to none
    if (extension) {
      const extensionText = extension.firstChild as HTMLElement;
      if (snoozeValue === 'None' || warningValue === 'None') {
        extensionText.textContent = 'None';
        extension.classList.add('dropdown-disabled');
      } else {
        extension.classList.remove('dropdown-disabled');
        if (extensionValue === 'None') {
          extensionText.textContent = '5 min';
        }
      }
    }

    const equation = document.getElementById('fm-equation-dropdown') as HTMLElement;
    // Disable equation if warning or snooze is set to none
    if (equation) {
      const equationText = equation.firstChild as HTMLElement;
      if (snoozeValue === 'None' || warningValue === 'None') {
        equationText.textContent = 'None';
        equation.classList.add('dropdown-disabled');
      } else {
        equation.classList.remove('dropdown-disabled');
      }
    }
  }
  // #endregion Dropdown


  // #region HTML
  return (
    // TODO: use item to set the initial values of the form
    <div id="fm-background" className="form-modal" onClick={handleBackgroundClick}>
      <div id="fm-window" className="panel scrollable">
        {/* Heading */}
        <h2>{currentItem.name !== "NewGuardian" ? 'Edit Guardian' : 'Create Guardian'}</h2>

        {/* Alarm */}
        <div id="fm-alarm" title="Time the Guardian will shut down your PC if not snoozed - you may also use your scroll wheel to change the time">
          {/* Hours */}
          <div id="fm-alarm-hours" className="fm-alarm-wrapper" onWheel={(e) => changeAlarmValue(e.deltaY < 0 ? 1 : -1, 0)}>
            <div className="fm-alarm-up fm-alarm-arrow" onClick={() => changeAlarmValue(1, 0)}>
              <img src={imgAlarmUp} alt="Up" />
            </div>
            <div className="fm-alarm-value">{currentItem.alarm.split(':')[0]}</div>
            <div className="fm-alarm-down fm-alarm-arrow" onClick={() => changeAlarmValue(-1, 0)}>
              <img src={imgAlarmDown} alt="Down" />
            </div>
          </div>
          {/* Colon */}
          <img id="fm-alarm-colon" src={imgAlarmColon} alt=":" />
          {/* Minutes */}
          <div id="fm-alarm-minutes" className="fm-alarm-wrapper" onWheel={(e) => changeAlarmValue(0, e.deltaY < 0 ? 1 : -1)}>
            <div className="fm-alarm-up fm-alarm-arrow" onClick={() => changeAlarmValue(0, 1)}>
              <img src={imgAlarmUp} alt="Up" />
            </div>
            <div className="fm-alarm-value">{currentItem.alarm.split(':')[1]}</div>
            <div className="fm-alarm-down fm-alarm-arrow" onClick={() => changeAlarmValue(0, -1)}>
              <img src={imgAlarmDown} alt="Down" />
            </div>
          </div>
        </div>

        {/* Repeats */}
        <div id="fm-repeats">
          <img onClick={selectRepeatDay} src={imgRepeatMondays} alt="Monday" className=" " title="Repeats every Monday if active" />
          <img onClick={selectRepeatDay} src={imgRepeatTuesdays} alt="Tuesday" className="fm-repeats-active" title="Repeats every Tuesday if active" />
          <img onClick={selectRepeatDay} src={imgRepeatsWednesdays} alt="Wednesday" className="fm-repeats-active" title="Repeats every Wednesday if active" />
          <img onClick={selectRepeatDay} src={imgRepeatsThursdays} alt="Thursday" className="fm-repeats-active" title="Repeats every Thursday if active" />
          <img onClick={selectRepeatDay} src={imgRepeatsFridays} alt="Friday" className="fm-repeats-active" title="Repeats every Friday if active" />
          <img onClick={selectRepeatDay} src={imgRepeatsSaturdays} alt="Saturday" className="fm-repeats-active" title="Repeats every Saturday if active" />
          <img onClick={selectRepeatDay} src={imgRepeatsSundays} alt="Sunday" className="fm-repeats-active" title="Repeats every Sunday if active" />
        </div>

        {/* Warning */}
        <div id="fm-warning" className="dropdown-wrapper" title="Time before the alarm when the guardian will prompt to snooze or acknowledge">
          <h2>Warning:</h2>
          <div id="fm-warning-dropdown" className="dropdown" onClick={openDropdownContent}>
            <p>15 min</p>
            <div className="dropdown-flag">
              <img src={imgDropdownBtn} alt="Open" />
            </div>
            <div className="dropdown-content scrollable hidden">
              <p onClick={selectDropdownContent}>None</p>
              <p onClick={selectDropdownContent}>5 min</p>
              <p onClick={selectDropdownContent}>10 min</p>
              <p onClick={selectDropdownContent}>15 min</p>
              <p onClick={selectDropdownContent}>20 min</p>
              <p onClick={selectDropdownContent}>25 min</p>
              <p onClick={selectDropdownContent}>30 min</p>
              <p onClick={selectDropdownContent}>35 min</p>
              <p onClick={selectDropdownContent}>40 min</p>
              <p onClick={selectDropdownContent}>45 min</p>
              <p onClick={selectDropdownContent}>50 min</p>
              <p onClick={selectDropdownContent}>55 min</p>
              <p onClick={selectDropdownContent}>60 min</p>
            </div>
          </div>
        </div>

        {/* Snooze */}
        <div id="fm-snooze" className="dropdown-wrapper" title="Number of times the guardian can be delayed before forcing shutdown- requires warning time">
          <h2>Snooze:</h2>
          <div id="fm-snooze-dropdown" className="dropdown" onClick={openDropdownContent}>
            <p>Unlimited</p>
            <div className="dropdown-flag">
              <img src={imgDropdownBtn} alt="Open" />
            </div>
            <div className="dropdown-content scrollable hidden">
              <p onClick={selectDropdownContent}>None</p>
              <p onClick={selectDropdownContent}>Once</p>
              <p onClick={selectDropdownContent}>Twice</p>
              <p onClick={selectDropdownContent}>3 Times</p>
              <p onClick={selectDropdownContent}>4 Times</p>
              <p onClick={selectDropdownContent}>5 Times</p>
              <p onClick={selectDropdownContent}>Unlimited</p>
            </div>
          </div>
        </div>

        {/* Extension */}
        <div id="fm-extension" className="dropdown-wrapper" title="Time added when snooze is selected - requires at least one snooze or warning time">
          <h2>Extension:</h2>
          <div id="fm-extension-dropdown" className="dropdown" onClick={openDropdownContent}>
            <p>5 min</p>
            <div className="dropdown-flag">
              <img src={imgDropdownBtn} alt="Open" />
            </div>
            <div className="dropdown-content scrollable hidden">
              <p onClick={selectDropdownContent}>5 min</p>
              <p onClick={selectDropdownContent}>10 min</p>
              <p onClick={selectDropdownContent}>15 min</p>
              <p onClick={selectDropdownContent}>20 min</p>
              <p onClick={selectDropdownContent}>25 min</p>
              <p onClick={selectDropdownContent}>30 min</p>
              <p onClick={selectDropdownContent}>35 min</p>
              <p onClick={selectDropdownContent}>40 min</p>
              <p onClick={selectDropdownContent}>45 min</p>
              <p onClick={selectDropdownContent}>50 min</p>
              <p onClick={selectDropdownContent}>55 min</p>
              <p onClick={selectDropdownContent}>60 min</p>
            </div>
          </div>
        </div>

        {/* Equation */}
        <div id="fm-equation" className="dropdown-wrapper" title="Difficulty of the equation to extend time - requires at least one snooze or warning time">
          <h2>Equation:</h2>
          <div id="fm-equation-dropdown" className="dropdown" onClick={openDropdownContent}>
            <p>Easy</p>
            <div className="dropdown-flag">
              <img src={imgDropdownBtn} alt="Open" />
            </div>
            <div className="dropdown-content scrollable dropdown-content-top hidden">
              <p onClick={selectDropdownContent}>None</p>
              <p onClick={selectDropdownContent}>Easy</p>
              <p onClick={selectDropdownContent}>Medium</p>
              <p onClick={selectDropdownContent}>Hard</p>
            </div>
          </div>
        </div>

        {/* Save / Close Buttons */}
        <div className="row fm-button-wrapper">
          <div className="button fm-button" onClick={saveGuardian}>
            <img src={imgSaveBtn} alt="github" />
            <p>Save</p>
          </div>
          <div className="button button-side-color fm-button" onClick={closeWindow}>
            <img src={imgCancelBtn} alt="github" />
            <p>Cancel</p>
          </div>
        </div>

      </div>
    </div>
  );
  // #endregion HTML
}

export default FormModal;
// #endregion FormModal