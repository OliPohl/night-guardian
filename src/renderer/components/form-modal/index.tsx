// #region Imports
// Importing styles and types
import './form-modal.css';
import { Guardian } from '../../types/guardian';

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


// #region FormModal
function FormModal(item: Guardian) {
  // #region Close/Save
  // Closes the form modal window
  const closeWindow = () => {
      const fmElement = document.getElementById('form-modal-container');
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


  // #region Dropdown
  // TODO: Implement dropdown functionality
  // TODO: Disable unrelevant dropdowns
  // #endregion Dropdown


  // #region HTML
  return (
    <div id="fm-background" className="form-modal" onClick={handleBackgroundClick}>
      <div id="fm-window" className="panel scrollable">
        {/* Heading */}
        <h2>{item.name !== "NewGuardian" ? 'Edit Guardian' : 'Create Guardian'}</h2>

        {/* Alarm */}
        <div id="fm-alarm" title="Time the Guardian will shut down your PC if not snoozed">
          <div id="fm-alarm-hours" className="fm-alarm-wrapper">
            <div className="fm-alarm-up fm-alarm-arrow">
              <img src={imgAlarmUp} alt="Up" />
            </div>
            <div className="fm-alarm-value">{item.alarm.split(':')[0]}</div>
            <div className="fm-alarm-down fm-alarm-arrow">
              <img src={imgAlarmDown} alt="Down" />
            </div>
          </div>
          <img id="fm-alarm-colon" src={imgAlarmColon} alt=":" />
          <div id="fm-alarm-minutes" className="fm-alarm-wrapper">
            <div className="fm-alarm-up fm-alarm-arrow">
              <img src={imgAlarmUp} alt="Up" />
            </div>
            <div className="fm-alarm-value">{item.alarm.split(':')[1]}</div>
            <div className="fm-alarm-down fm-alarm-arrow">
              <img src={imgAlarmDown} alt="Down" />
            </div>
          </div>
        </div>

        {/* Repeats */}
        <div id="fm-repeats">
          <img src={imgRepeatMondays} alt="Monday" className=" " title="Repeats every Monday if active" />
          <img src={imgRepeatTuesdays} alt="Tuesday" className="fm-repeats-active" title="Repeats every Tuesday if active" />
          <img src={imgRepeatsWednesdays} alt="Wednesday" className="fm-repeats-active" title="Repeats every Wednesday if active" />
          <img src={imgRepeatsThursdays} alt="Thursday" className="fm-repeats-active" title="Repeats every Thursday if active" />
          <img src={imgRepeatsFridays} alt="Friday" className="fm-repeats-active" title="Repeats every Friday if active" />
          <img src={imgRepeatsSaturdays} alt="Saturday" className="fm-repeats-active" title="Repeats every Saturday if active" />
          <img src={imgRepeatsSundays} alt="Sunday" className="fm-repeats-active" title="Repeats every Sunday if active" />
        </div>

        {/* Warning */}
        <div id="fm-warning" className="dropdown-wrapper" title="Time before the alarm when the guardian will prompt to snooze or acknowledge">
          <h2>Warning:</h2>
          <div className="dropdown">
            <p>15 min</p>
            <div className="dropdown-flag">
              <img src={imgDropdownBtn} alt="Open" />
            </div>
            <div className="dropdown-content scrollable hidden">
              <p>None</p>
              <p>5 min</p>
              <p>10 min</p>
              <p>15 min</p>
              <p>20 min</p>
              <p>25 min</p>
              <p>30 min</p>
              <p>35 min</p>
              <p>40 min</p>
              <p>45 min</p>
              <p>50 min</p>
              <p>55 min</p>
              <p>60 min</p>
            </div>
          </div>
        </div>

        {/* Snooze */}
        <div id="fm-snooze" className="dropdown-wrapper" title="Number of times the guardian can be delayed before forcing shutdown">
          <h2>Snooze:</h2>
          <div className="dropdown">
            <p>Unlimited</p>
            <div className="dropdown-flag">
              <img src={imgDropdownBtn} alt="Open" />
            </div>
            <div className="dropdown-content scrollable hidden">
              <p>None</p>
              <p>Once</p>
              <p>Twice</p>
              <p>3 Times</p>
              <p>4 Times</p>
              <p>5 Times</p>
              <p>Unlimited</p>
            </div>
          </div>
        </div>

        {/* Extension */}
        <div id="fm-extension" className="dropdown-wrapper" title="Time added when snooze is selected - requires at least one snooze">
          <h2>Extension:</h2>
          <div className="dropdown fm-disabled">
            <p>None</p>
            <div className="dropdown-flag">
              <img src={imgDropdownBtn} alt="Open" />
            </div>
            <div className="dropdown-content scrollable hidden">
              <p>5 min</p>
              <p>10 min</p>
              <p>15 min</p>
              <p>20 min</p>
              <p>25 min</p>
              <p>30 min</p>
              <p>35 min</p>
              <p>40 min</p>
              <p>45 min</p>
              <p>50 min</p>
              <p>55 min</p>
              <p>60 min</p>
            </div>
          </div>
        </div>

        {/* Equation */}
        <div id="fm-equation" className="dropdown-wrapper" title="Difficulty of the equation to extend time - requires at least one snooze">
          <h2>Equation:</h2>
          <div className="dropdown">
            <p>Easy</p>
            <div className="dropdown-flag">
              <img src={imgDropdownBtn} alt="Open" />
            </div>
            <div className="dropdown-content scrollable dropdown-content-top hidden">
              <p>None</p>
              <p>Easy</p>
              <p>Medium</p>
              <p>Hard</p>
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