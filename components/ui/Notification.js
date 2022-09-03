import { useContext } from 'react';
import NotificationContext from '../../store/notifiactionContext';

import classes from './Notification.module.css';

function Notification(props) {
  const notificationContext = useContext(NotificationContext);

  const activeNotification = notificationContext.notification;
  
  
  if(!activeNotification) return <></>;
  
  const { title, message, status } = activeNotification;
  
  let statusClasses = '';
  
  if (status === 'success') {
    statusClasses = classes.success;
  }
  
  if (status === 'error') {
    statusClasses = classes.error;
  }
  
  if (status === 'pending') {
    statusClasses = classes.pending;
  }
  const activeClasses = `${classes.notification} ${statusClasses}`;

  return (
    <div className={activeClasses} onClick={notificationContext.hideNotification}>
      <h2>{title}</h2>
      <p>{message}</p>
    </div>
  );
}

export default Notification;