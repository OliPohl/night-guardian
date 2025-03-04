// #region Imports
// Importing necessary react libraries
import { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';

// Importing styles, types, components and utils
import './form-modal.css';
import { Guardian } from '../../../shared/types/guardian.cts';
import { displayDisplayItem } from '../display/display-item.tsx';
import { repeatImage, parseRepeatWeekday, parseWarningNumber, parseSnoozeNumber, parseExtensionNumber, parseEquationNumber, parseWarningText, parseSnoozeText, parseExtensionText, parseEquationText } from '../../shared/utils/guardian/guardian-parser';
import { warningOptions, snoozeOptions, extensionOptions, equationOptions } from '../../shared/utils/guardian/guardian-options';

// Importing resources for alarm
import imgAlarmColon from './resources/img-alarm-colon.svg';
import imgAlarmUp from './resources/img-alarm-up.svg';
import imgAlarmDown from './resources/img-alarm-down.svg';

// Importing resources for dropdown
import imgDropdownBtn from './resources/img-dropdown-btn.svg';

// Importing resources for buttons
import imgSaveBtn from './resources/img-save-btn.svg';
import imgCancelBtn from './resources/img-cancel-btn.svg';
// #endregion Imports


// #region Exports
// Opens the form modal window with the given guardian item
export const openFormModal = (item : Guardian) => {
  const fmElement = document.getElementById('fm-container') as HTMLElement;
  const root = createRoot(fmElement);
  const closeFormModal = () => root.unmount();

  root.render(<FormModal item={item} closeFormModal={closeFormModal} />);
}
// #endregion Exports


// #region FormModal
function FormModal({ item, closeFormModal }: { item: Guardian, closeFormModal: () => void }) {
  // #region States
  // Save a copy of the current item to only save the changes internally
  const [currentItem, setCurrentItemState] = useState({ ...item });
  const setCurrentItem = (newItem : Guardian) => {
    // Disable snooze if warning is set to none
    if (newItem.warning === 0) newItem.snooze = 0;

    // Disable extension and equation if snooze or warning is set to none
    if (newItem.warning === 0 || newItem.snooze === 0) {
      newItem.extension = 0;
      newItem.equation = 0;
    } else if (newItem.extension === 0) {
      // Set the first extension if it is set to none and not disabled
      newItem.extension = parseExtensionText(extensionOptions[0]);
    }

    // Set the new item
    setCurrentItemState(newItem);
  };
  // #endregion States


  // #region Save/Close
  // Saves the guardian and closes the form modal window
  const saveItem = () => {
    // TODO: Add error handling for invalid inputs
    // Create a new id for the guardian
    let countId = 0;
    const alarmId = currentItem.alarm.replace(':', '').padStart(4, '0');
    const warningId = currentItem.warning.toString().padStart(2, '0');
    while (currentItem.id === -1) {
      const newId = parseInt(alarmId + warningId + countId.toString().padStart(4, '0'));
      if (document.getElementById('dh#' + newId.toString()) === null) {
        currentItem.id = newId;
      }
      countId++;
    }

    // Delete the old guardian if it is not a new guardian
    const displayHolder = document.getElementById('dh#' + currentItem.id.toString()) as HTMLElement;
    if (displayHolder) {
      displayHolder.remove();
      window.api.deleteGuardian(currentItem.id);
    }

    // Save the new guardian
    window.api.saveGuardian(currentItem);
    displayDisplayItem(currentItem);
    closeFormModal();
  }

  // Closes the form modal window when the background is clicked
  const handleBackgroundClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      closeFormModal();
    }
  };
  // #endregion Save/Close


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
    const day = parseRepeatWeekday(event.currentTarget.alt);
    if (day === '') return;

    if (isActive) {
      const newRepeats = currentItem.repeats.filter((repeat) => repeat !== day);
      setCurrentItem({ ...currentItem, repeats: newRepeats });
    } else {
      const newRepeats = [...currentItem.repeats, day];
      setCurrentItem({ ...currentItem, repeats: newRepeats });
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
    switch (event.currentTarget.parentElement?.parentElement?.id) {
      case 'fm-warning-dropdown':
        setCurrentItem({ ...currentItem, warning: parseWarningText(newSelection) });
        break;
      case 'fm-snooze-dropdown':
        setCurrentItem({ ...currentItem, snooze: parseSnoozeText(newSelection) });
        break;
      case 'fm-extension-dropdown':
        setCurrentItem({ ...currentItem, extension: parseExtensionText(newSelection) });
        break;
      case 'fm-equation-dropdown':
        setCurrentItem({ ...currentItem, equation: parseEquationText(newSelection) });
        break;
      default:
        break;
    }
  }
  // #endregion Dropdown


  // #region HTML
  return (
    <div id="fm-background" className="form-modal" onClick={handleBackgroundClick}>
      <div id="fm-window" className="panel scrollable">
        {/* Heading */}
        <h2>{currentItem.id.toString() !== "-1" ? 'Edit Guardian' : 'Create Guardian'}</h2>

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
          {/* Monday */}
          <img onClick={selectRepeatDay} src={repeatImage["MON"]} alt="Monday" className={currentItem.repeats.includes("MON") ? "fm-repeats-active" : " "} title="Repeats every Monday if active" />
          {/* Tuesday */}
          <img onClick={selectRepeatDay} src={repeatImage["TUE"]} alt="Tuesday" className={currentItem.repeats.includes("TUE") ? "fm-repeats-active" : " "} title="Repeats every Tuesday if active" />
          {/* Wednesday */}
          <img onClick={selectRepeatDay} src={repeatImage["WED"]} alt="Wednesday" className={currentItem.repeats.includes("WED") ? "fm-repeats-active" : " "} title="Repeats every Wednesday if active" />
          {/* Thursday */}
          <img onClick={selectRepeatDay} src={repeatImage["THU"]} alt="Thursday" className={currentItem.repeats.includes("THU") ? "fm-repeats-active" : " "} title="Repeats every Thursday if active" />
          {/* Friday */}
          <img onClick={selectRepeatDay} src={repeatImage["FRI"]} alt="Friday" className={currentItem.repeats.includes("FRI") ? "fm-repeats-active" : " "} title="Repeats every Friday if active" />
          {/* Saturday */}
          <img onClick={selectRepeatDay} src={repeatImage["SAT"]} alt="Saturday" className={currentItem.repeats.includes("SAT") ? "fm-repeats-active" : " "} title="Repeats every Saturday if active" />
          {/* Sunday */}
          <img onClick={selectRepeatDay} src={repeatImage["SUN"]} alt="Sunday" className={currentItem.repeats.includes("SUN") ? "fm-repeats-active" : " "} title="Repeats every Sunday if active" />
        </div>

        {/* Warning */}
        <div id="fm-warning" className="dropdown-wrapper" title="Time before the alarm when the guardian will prompt to snooze or acknowledge">
          <h2>Warning:</h2>
          <div id="fm-warning-dropdown" className="dropdown" onClick={openDropdownContent}>
            <p>{parseWarningNumber(currentItem.warning)}</p>
            <div className="dropdown-flag">
              <img src={imgDropdownBtn} alt="Open" />
            </div>
            <div className="dropdown-content scrollable hidden">
              {warningOptions.map((option) => (
              <p key={option} onClick={selectDropdownContent}>{option}</p>
              ))}
            </div>
          </div>
        </div>

        {/* Snooze */}
        <div id="fm-snooze" className="dropdown-wrapper" title="Number of times the guardian can be delayed before forcing shutdown- requires warning time">
          <h2>Snooze:</h2>
          <div id="fm-snooze-dropdown" className={`dropdown ${!currentItem.warning ? "dropdown-disabled" : ""}`} onClick={openDropdownContent}>
            <p>{parseSnoozeNumber(currentItem.snooze)}</p>
            <div className="dropdown-flag">
              <img src={imgDropdownBtn} alt="Open" />
            </div>
            <div className="dropdown-content scrollable hidden">
              {snoozeOptions.map((option) => (
              <p key={option} onClick={selectDropdownContent}>{option}</p>
              ))}
            </div>
          </div>
        </div>

        {/* Extension */}
        <div id="fm-extension" className="dropdown-wrapper" title="Time added when snooze is selected - requires at least one snooze or warning time">
          <h2>Extension:</h2>
          <div id="fm-extension-dropdown" className={`dropdown ${!currentItem.warning || !currentItem.snooze ? "dropdown-disabled" : ""}`} onClick={openDropdownContent}>
            <p>{parseExtensionNumber(currentItem.extension)}</p>
            <div className="dropdown-flag">
              <img src={imgDropdownBtn} alt="Open" />
            </div>
            <div className="dropdown-content scrollable hidden">
              {extensionOptions.map((option) => (
              <p key={option} onClick={selectDropdownContent}>{option}</p>
              ))}
            </div>
          </div>
        </div>

        {/* Equation */}
        <div id="fm-equation" className="dropdown-wrapper" title="Difficulty of the equation to extend time - requires at least one snooze or warning time">
          <h2>Equation:</h2>
          <div id="fm-equation-dropdown" className={`dropdown ${!currentItem.warning || !currentItem.snooze ? "dropdown-disabled" : ""}`} onClick={openDropdownContent}>
            <p>{parseEquationNumber(currentItem.equation)}</p>
            <div className="dropdown-flag">
              <img src={imgDropdownBtn} alt="Open" />
            </div>
            <div className="dropdown-content scrollable dropdown-content-top hidden">
              {equationOptions.map((option) => (
              <p key={option} onClick={selectDropdownContent}>{option}</p>
              ))}
            </div>
          </div>
        </div>

        {/* Save / Close Buttons */}
        <div className="row fm-button-wrapper">
          <div className="button fm-button" onClick={saveItem}>
            <img src={imgSaveBtn} alt="github" />
            <p>Save</p>
          </div>
          <div className="button button-side-color fm-button" onClick={closeFormModal}>
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