import React from 'react';
import '../css/ArchiveTab.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faMissedCall } from '@fortawesome/free-solid-svg-icons';

const ArchiveTab = ({ activities, unarchiveCall }) => {

  const getIconColor = (callType) => {
    switch (callType) {
      case 'answered':
        return 'green'; // Color for answered calls
      case 'missed':
        return 'red';   // Color for missed calls
      case 'voicemail':
        return 'blue';  // Color for voicemail calls
      default:
        return 'black'; // Default color
    }
  };

  return (
    <div className="archive-tab-container">
      <h2 className="title">Archived Activities</h2>
      <ul className="archive-list">
        {activities.map(activity => (
          
          <li key={activity.id} className="archive-list-item">
            <div className="icon">
              <FontAwesomeIcon icon={faPhone} style={{ color: getIconColor(activity.call_type) }} />
            </div>
            {activity.from}
            <button onClick={() => unarchiveCall(activity.id)}>Unarchive</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ArchiveTab;