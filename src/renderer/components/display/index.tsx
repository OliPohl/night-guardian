// #region Imports
// Importing necessary react libraries
import { useEffect } from 'react';

// Importing styles, types and components
import './display.css';
import { displayDisplayItem } from './display-item.tsx';
import { openFormModal } from '../form-modal';

// Importing resources
import imgRefreshGuardians from './resources/img-refresh-guardians.svg';
import imgCreateGuardians from './resources/img-create-guardians.svg';
import { newGuardian } from '../../shared/utils/guardian/guardians';
// #endregion Imports


// #region Display
function Display() {
  // #region Refresh
  const refreshGuardians = () => {
    // Start spinning the refresh button
    const btnRefreshGuardians = document.getElementById('btn-refresh-guardians');
    if (btnRefreshGuardians) btnRefreshGuardians.classList.add('spin');

    // Temporarily disable the create guardians button
    const btnCreateGuardians = document.getElementById('btn-create-guardians');
    if (btnCreateGuardians) btnCreateGuardians.classList.add('disabled');

    removeDisplayItems();

    // Resets the refresh button and re-enables the create guardians button
    const timeout = setTimeout(async () => {
      // Fetch guardians from the backend
      await fetchGuardians();

      // Stop spinning the refresh button
      if (btnRefreshGuardians) btnRefreshGuardians.classList.remove('spin');
      if (btnCreateGuardians) btnCreateGuardians.classList.remove('disabled');
    }, 3000);
    return () => clearTimeout(timeout);
  };
  // #endregion Refresh Guardians


  // #region Fetch
  // Fetch guardians from the backend
  const fetchGuardians = async () => {
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
  };

  // Remove existing displayed guardians
  const removeDisplayItems = () => {
    // Remove current DisplayItems
    const displayItemsContainer = document.getElementById('display-items-container');
    if (displayItemsContainer) displayItemsContainer.innerHTML = '';
  };

  // Fetch guardians when the component is mounted
  useEffect(() => {
    removeDisplayItems();
    fetchGuardians();
  }, []);
  // #endregion Fetch


  // #region HTML
  return (
    <div id="display" className="panel scrollable">
      {/* Refresh Guardians */}
      <img id="btn-refresh-guardians" className="img-button" src={imgRefreshGuardians} alt="search button" title="Refresh Guardians" onClick={refreshGuardians} />

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