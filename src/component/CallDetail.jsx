import React from 'react';
import { useParams } from 'react-router-dom';
import '../css/CallDetail.css';

const CallDetail = ({ activities }) => {
  const { id } = useParams();
  const activity = activities.find(act => act.id === id);

  if (!activity) {
    return <div>Activity not found</div>;
  }

  return (
    <div className="call-detail-container">
      <h2>Call Details</h2>
      <p><strong>Direction:</strong> {activity.direction}</p>
      <p><strong>From:</strong> {activity.from}</p>
      <p><strong>To:</strong> {activity.to}</p>
      <p><strong>Via:</strong> {activity.via}</p>
      <p><strong>Duration:</strong> {activity.duration} seconds</p>
      <p><strong>Call Type:</strong> {activity.call_type}</p>
      <p><strong>Status:</strong> {activity.is_archived ? 'Archived' : 'Active'}</p>
      <p><strong>Created At:</strong> {new Date(activity.created_at).toLocaleString()}</p>
    </div>
  );
};

export default CallDetail;