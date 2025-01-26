import { useState, useEffect, useRef } from 'react';
import { Guardian } from '../../types/guardian.ts';
import './display-item.css';

import itemDots from './resources/item-dots.svg';
import repeatsMonday from './resources/repeats-monday.svg';
import repeatsTuesday from './resources/repeats-tuesday.svg';
import repeatsWednesday from './resources/repeats-wednesday.svg';
import repeatsThursday from './resources/repeats-thursday.svg';
import repeatsFriday from './resources/repeats-friday.svg';
import repeatsSaturday from './resources/repeats-saturday.svg';
import repeatsSunday from './resources/repeats-sunday.svg';

function DisplayItem(item: Guardian) {
  const [menuVisible, setMenuVisible] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const menuRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<HTMLImageElement>(null);

  const getDifficultyText = (difficulty: number): string => {
    switch (difficulty) {
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

  const weekdayIcons: { [key: string]: string } = {
    Monday: repeatsMonday,
    Tuesday: repeatsTuesday,
    Wednesday: repeatsWednesday,
    Thursday: repeatsThursday,
    Friday: repeatsFriday,
    Saturday: repeatsSaturday,
    Sunday: repeatsSunday,
  };

  const handleDotsClick = (event: React.MouseEvent) => {
    if (!menuVisible) {
      setMenuPosition({ top: event.clientY, left: event.clientX });
    }
    setMenuVisible(!menuVisible);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && dotsRef.current) {
      const targetElement = event.target as HTMLElement;
      if (!menuRef.current.contains(targetElement) && !dotsRef.current.contains(targetElement)) {
        setMenuVisible(false);
      }
    }
  };

  const handleMenuOptionClick = () => {
    setMenuVisible(false);
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      <div id="display-item">
        <p className="item-text">{item.alarm}</p>
        <div id="item-repeats">
          {item.repeats.length > 0 ? (
            item.repeats.map((day) => (
              <img key={day} src={weekdayIcons[day]} alt={day} title={day} />
            ))
          ) : (
            <p>None</p>
          )}
        </div>
        <p className="item-text">{item.warning} min</p>
        <p className="item-text">{getSnoozeText(item.snooze)}</p>
        <p className="item-text">{item.extension} min</p>
        <p className="item-text">{getDifficultyText(item.difficulty)}</p>
        <div id="item-toggle">
          <label className="toggle">
            <input type="checkbox"></input>
            <span className="slider"></span>
          </label>
        </div>
        <img id="item-dots" ref={dotsRef} src={itemDots} alt="edit" onClick={handleDotsClick} />
        <div id="dots-menu" ref={menuRef} className={menuVisible ? '' : 'opacity-hidden'} style={{ top: menuPosition.top, left: menuPosition.left }}>
          <p onClick={handleMenuOptionClick}>Edit</p>
          <p id="dots-remove" onClick={handleMenuOptionClick}>Remove</p>
        </div>
      </div>
      <div className="medium-divider"></div>
    </>
  );
}


export default DisplayItem;
// remove items and button on update click