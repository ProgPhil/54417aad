import React from 'react';
import { Link } from 'react-router-dom';
import '../css/ActivityFeed.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faPhoneSlash } from '@fortawesome/free-solid-svg-icons';

const ActivityFeed = ({ activities, archiveCall }) => {

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
    <div className="feed-tab-container">
      <h2 className="title">Activity Feed</h2>
      <ul className="feed-list">
        {activities.map(activity => (
          <li key={activity.id} className="feed-list-item">
            <div className="icon">
              <FontAwesomeIcon icon={faPhone} style={{ color: getIconColor(activity.call_type) }} />
            </div>
            <Link to={`/detail/${activity.id}`}>{activity.from}</Link>
            <button onClick={() => archiveCall(activity.id)}>Archive</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ActivityFeed;
