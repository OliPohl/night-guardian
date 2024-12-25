import { Guardian } from '../../types/guardian.ts';
import './display-item.css';

import itemDots from './resources/item-dots.svg';

function DisplayItem(item: Guardian) {
  return (
    <>
      <div id="display-item">
        <p className="item-text">{item.alarm}</p>
        <p className="item-text">{item.repeats}</p>
        <p className="item-text">{item.warning}</p>
        <p className="item-text">{item.snooze}</p>
        <p className="item-text">{item.delay}</p>
        <p className="item-text">{item.difficulty}</p>
        <div id="item-toggle">
          <label className="toggle">
            <input type="checkbox"></input>
            <span className="slider"></span>
          </label>
        </div>
        <img id="item-dots" src={itemDots} alt="edit" />
      </div>
      <div className="medium-divider"></div>
    </>
  );
}


export default DisplayItem;
