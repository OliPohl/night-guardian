import './form-modal.css';
import alarmColon from './resources/alarm-colon.svg';
import alarmUp from './resources/alarm-up.svg';
import alarmDown from './resources/alarm-down.svg';

import repeatsMonday from './resources/repeats-monday.svg';
import repeatsTuesday from './resources/repeats-tuesday.svg';
import repeatsWednesday from './resources/repeats-wednesday.svg';
import repeatsThursday from './resources/repeats-thursday.svg';
import repeatsFriday from './resources/repeats-friday.svg';
import repeatsSaturday from './resources/repeats-saturday.svg';
import repeatsSunday from './resources/repeats-sunday.svg';

import dropdownArrow from './resources/dropdown-arrow.svg';

import saveButton from './resources/save-button.svg';
import cancelButton from './resources/cancel-button.svg';

import { Guardian } from '../../types/guardian';

function FormModal(item: Guardian) {
  return (
    <div id="fm-background">
      <div id="fm-window" className="panel scrollable">
        <h2>{item.name !== "NewGuardian" ? 'Edit Guardian' : 'Create Guardian'}</h2>

        <div id="fm-alarm">
          <div id="fm-alarm-hours" className="fm-alarm-wrapper">
            <div className="fm-alarm-up fm-alarm-arrow">
              <img src={alarmUp} alt="Up" />
            </div>
            <div className="fm-alarm-value">{item.alarm.split(':')[0]}</div>
            <div className="fm-alarm-down fm-alarm-arrow">
              <img src={alarmDown} alt="Down" />
            </div>
          </div>
          <img id="fm-alarm-colon" src={alarmColon} alt=":" title="Time the Guardian will shut down your PC if not snoozed" />
          <div id="fm-alarm-minutes" className="fm-alarm-wrapper">
            <div className="fm-alarm-up fm-alarm-arrow">
              <img src={alarmUp} alt="Up" />
            </div>
            <div className="fm-alarm-value">{item.alarm.split(':')[1]}</div>
            <div className="fm-alarm-down fm-alarm-arrow">
              <img src={alarmDown} alt="Down" />
            </div>
          </div>
        </div>

        <div id="fm-repeats">
          <img src={repeatsMonday} alt="Monday" className=" " title="Repeats every Monday if active" />
          <img src={repeatsTuesday} alt="Tuesday" className="fm-repeats-active" title="Repeats every Tuesday if active" />
          <img src={repeatsWednesday} alt="Wednesday" className="fm-repeats-active" title="Repeats every Wednesday if active" />
          <img src={repeatsThursday} alt="Thursday" className="fm-repeats-active" title="Repeats every Thursday if active" />
          <img src={repeatsFriday} alt="Friday" className="fm-repeats-active" title="Repeats every Friday if active" />
          <img src={repeatsSaturday} alt="Saturday" className="fm-repeats-active" title="Repeats every Saturday if active" />
          <img src={repeatsSunday} alt="Sunday" className="fm-repeats-active" title="Repeats every Sunday if active" />
        </div>

        <div id="fm-warning" className="fm-dropdown-wrapper">
          <h2 title="Time before the alarm when the guardian will prompt to snooze or acknowledge">Warning:</h2>
          <div className="fm-dropdown">
            <p>15 min</p>
            <div className="fm-dropdown-flag">
              <img src={dropdownArrow} alt="Open" />
            </div>
            <div className="fm-dropdown-content scrollable hidden">
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

        <div id="fm-snooze" className="fm-dropdown-wrapper">
          <h2 title="Number of times the guardian can be delayed before forcing shutdown">Snooze:</h2>
          <div className="fm-dropdown">
            <p>Unlimited</p>
            <div className="fm-dropdown-flag">
              <img src={dropdownArrow} alt="Open" />
            </div>
            <div className="fm-dropdown-content scrollable hidden">
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

        <div id="fm-extension" className="fm-dropdown-wrapper">
          <h2 title="Time added when snooze is selected - requires at least one snooze">Extension:</h2>
          <div className="fm-dropdown fm-disabled">
            <p>None</p>
            <div className="fm-dropdown-flag">
              <img src={dropdownArrow} alt="Open" />
            </div>
            <div className="fm-dropdown-content scrollable hidden">
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

        <div id="fm-equation" className="fm-dropdown-wrapper">
          <h2 title="Difficulty of the equation to extend time - requires at least one snooze">Equation:</h2>
          <div className="fm-dropdown">
            <p>Easy</p>
            <div className="fm-dropdown-flag">
              <img src={dropdownArrow} alt="Open" />
            </div>
            <div className="fm-dropdown-content scrollable fm-dropdown-content-top hidden">
              <p>None</p>
              <p>Easy</p>
              <p>Medium</p>
              <p>Hard</p>
            </div>
          </div>
        </div>


        <div className="row fm-button-wrapper">
          <div className="button fm-button" >
            <img src={saveButton} alt="github" />
            <p>Save</p>
          </div>
          <div className="button button-side-color fm-button" >
            <img src={cancelButton} alt="github" />
            <p>Cancel</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FormModal;