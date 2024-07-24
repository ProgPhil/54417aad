import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/buttons.css';

const ButtonGroup = ({ archiveAll, unarchiveAll }) => {
  const navigate = useNavigate();
  return (
    <div className="button-group">
      <div className="nav-buttons">
        <button className="nav-button" onClick={() => navigate('/')}>Activity Feed</button>
        <button className="nav-button" onClick={() => navigate('/archive')}>Archived Feed</button>
      </div>
      <div className="action-buttons">
        <button className="action-button" onClick={unarchiveAll}>Unarchive All</button>
        <button className="action-button" onClick={archiveAll}>Archive All</button>
      </div>
    </div>
  );
};

export default ButtonGroup;
