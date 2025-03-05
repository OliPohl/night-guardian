// #region Imports
// Importing necessary react libraries
import { useEffect } from 'react';

// Importing styles, types and components
import './display.css';
import { displayDisplayItem } from './display-item.tsx';
import { openFormModal } from '../form-modal';

// Importing resources
import imgFetchGuardians from './resources/img-fetch-guardians.svg';
import imgCreateGuardians from './resources/img-create-guardians.svg';
import { newGuardian } from '../../shared/utils/guardian/guardians';
// #endregion Imports


// #region Display
function Display() {
  // #region Fetch
  // Fetch guardians from the backend
  const fetchGuardians = async () => {
    fetchAnimation(true);
    removeDisplayItems();

    let guardians = await window.api.fetchGuardians();

    // Display guardians
    for (const guardian of guardians) {
      // Check if the guardian is already displayed and overwrite it
      let displayItem = document.getElementById("dh#" + guardian.id);
      if (displayItem){
        displayItem.remove();
      }
      displayDisplayItem(guardian);
    }
    fetchAnimation(false);
  };

  // Remove existing displayed guardians
  const removeDisplayItems = () => {
    // Remove current DisplayItems
    const displayItemsContainer = document.getElementById('display-items-container');
    if (displayItemsContainer) displayItemsContainer.innerHTML = '';
  };

  // Fetch the animation of the buttons
  const fetchAnimation = (value: boolean) => {
    // Toggles the Create Guardian button
    const btnCreateGuardians = document.getElementById('btn-create-guardians');
    if (btnCreateGuardians && value) btnCreateGuardians.classList.add('disabled');
    if (btnCreateGuardians && !value) btnCreateGuardians.classList.remove('disabled');

    // Toggles the Fetch Guardians button
    const btnFetchGuardians = document.getElementById('btn-fetch-guardians');
    if (btnFetchGuardians && value) btnFetchGuardians.classList.add('spin');
    if (btnFetchGuardians && !value) btnFetchGuardians.classList.remove('spin');
  };

  // Fetch guardians when the component is mounted
  useEffect(() => {
    fetchGuardians();
  }, []);
  // #endregion Fetch


  // #region HTML
  return (
    <div id="display" className="panel scrollable">
      {/* Fetch Guardians */}
      <img id="btn-fetch-guardians" className="img-button" src={imgFetchGuardians} alt="search button" title="Fetch Guardians" onClick={fetchGuardians} />

      {/* Display Headings */}
      <div id="display-heading-container">
        <h1 title="Time the Guardian will shut down your PC if not snoozed">Alarm</h1>
        <h1 title="Weekdays the Guardian repeats">Repeats</h1>
        <h1 title="Time before the alarm when the guardian will prompt to snooze or acknowledge">Warning</h1>
        <h1 title="Number of times the guardian can be delayed before forcing shutdown">Snooze</h1>
        <h1 title="Time added when snooze is selected">Extension</h1>
        <h1 title="Difficulty of the equation to extend time">Equation</h1>
      </div>
      <div className="big-divider"></div>

      {/* Display Items */}
      <div id="display-items-container">
      </div>

      {/* Create Guardian */}
      <div id="btn-create-guardians" className="button center" onClick={openFormModal.bind(null, newGuardian)}>
        <img src={imgCreateGuardians} />
        <p>Create Guardian</p>
      </div>

    </div>
  );
  // #endregion HTML
}

export default Display;
// #endregion Display