import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './component/Header.jsx';
import ActivityFeed from './component/ActivityFeed.jsx';
import ArchiveTab from './component/ArchiveTab.jsx';
import ButtonGroup from './component/ButtonGroup.jsx';
import CustomRouter from './component/CustomRouter.jsx';
import CallDetail from './component/CallDetail.jsx';

const App = () => {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await fetch(`https://aircall-backend.onrender.com/activities`);
        const data = await response.json();
        setActivities(data);
      } catch (error) {
        console.error('Error fetching activities:', error);
      }
    };

    fetchActivities();
  }, []);

  const updateCallStatus = async (id, isArchived) => {
    try {
      await fetch(`https://aircall-backend.onrender.com/activities/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_archived: isArchived }),
      });
      setActivities(prevActivities =>
        prevActivities.map(activity =>
          activity.id === id ? { ...activity, is_archived: isArchived } : activity
        )
      );
    } catch (error) {
      console.error('Error updating call status:', error);
    }
  };

  const archiveCall = (id) => {
    updateCallStatus(id, true);
  };

  const unarchiveCall = (id) => {
    updateCallStatus(id, false);
  };

  const archiveAll = async () => {
    try {
      await Promise.all(
        activities.map(activity =>
          updateCallStatus(activity.id, true)
        )
      );
    } catch (error) {
      console.error('Error archiving all calls:', error);
    }
  };

  const unarchiveAll = async () => {
    try {
      await Promise.all(
        activities.map(activity =>
          updateCallStatus(activity.id, false)
        )
      );
    } catch (error) {
      console.error('Error unarchiving all calls:', error);
    }
  };

  const routes = [
    { path: '/', element: <ActivityFeed activities={activities.filter(activity => !activity.is_archived)} archiveCall={archiveCall} /> },
    { path: '/archive', element: <ArchiveTab activities={activities.filter(activity => activity.is_archived)} unarchiveCall={unarchiveCall} /> },
    { path: '/detail/:id', element: <CallDetail activities={activities} /> },
  ];

  return (
    <Router>
      <div className='container'>
        <Header />
        <ButtonGroup archiveAll={archiveAll} unarchiveAll={unarchiveAll} />
        <CustomRouter routes={routes} />
      </div>
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById('app'));

export default App;
