import React, { useState, useEffect } from 'react';
import './Styles/NotificationComponent.css';
import axios from 'axios';

import {
  Container,
  Wrapper,
  ToggleButton,
  UnreadCount,
  NotificationsList,
  NotificationItem,
  NotificationMessage,
  MarkAsReadButton,
  MarkAsUnreadButton,
  LoadingText,
  NotLoggedInMessage,
} from './Styles/NotificationsStyle';
import { getSocket, initializeSocket } from '../socket';





function NotificationComponent() {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showNotifications, setShowNotifications] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Added loading state

  const URL = "/notifications";

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');

    if (token) {
      axios.get('users/check_auth', { headers: { Authorization: `Bearer ${token}` } })
        .then((res) => {
          initializeSocket(token);
          setLoggedIn(true);
        })
        .catch((err) => {
          localStorage.removeItem('jwtToken');
          setLoggedIn(false);
        })
        .finally(() => {
          setIsLoading(false); // Mark loading as complete
        });
    } else {
      setLoggedIn(false);
      setIsLoading(false); // Mark loading as complete
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');

    axios.get(URL, { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => {
        setNotifications(response.data);
        const unreadCount = response.data.filter(notification => !notification.is_read).length;
        setUnreadCount(unreadCount >= 0 ? unreadCount : 0); // Ensure unreadCount is not negative
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);


  const toggleRead = (notificationId) => {
    var readVal = false;
    const token = localStorage.getItem('jwtToken');
    const updatedNotifications = notifications.map((notification) => {
      if (notification._id === notificationId) {
        readVal = !notification.is_read;
        return { ...notification, is_read: !notification.is_read };
      }
      return notification;
    });

    const putURL = `/notifications?notificationId=${notificationId}&is_read=${readVal}`;
    axios.put(putURL,{headers: {Authorization: `Bearer ${token}`}})
    .then((response)=>{
      console.log(response.data.data);
      
    })
    .catch((err)=>{
      console.log(err);
    });


  
    setNotifications(updatedNotifications);
  };
  
  useEffect(() => {
    console.log(notifications); // This will show the updated state
    const unreadCount = notifications.filter(notification => !notification.is_read).length;
    setUnreadCount(unreadCount >= 0 ? unreadCount : 0);
    const socket = getSocket();
    if(socket){
    socket.emit("notification_count",{
      un_read : loggedIn?unreadCount:-1,
    });}
  
  }, [notifications,loggedIn]);

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  return (
    <Container>
      {isLoading ? (
        <LoadingText>Loading...</LoadingText>
      ) : loggedIn ? (
        <Wrapper>
            <ToggleButton onClick={toggleNotifications}>
                {unreadCount >= 0 && <UnreadCount>Unread Count: {unreadCount}</UnreadCount>}
            </ToggleButton>

          {showNotifications && (
            <NotificationsList>
            {notifications.map((notification) => (

              <NotificationItem 
                key={notification._id}
                isRead={notification.is_read}
              >
                <NotificationMessage >{notification.message}</NotificationMessage>
                
                {!notification.is_read && <MarkAsReadButton onClick={() => toggleRead(notification._id)}>Mark As Read</MarkAsReadButton>}
                {notification.is_read && <MarkAsUnreadButton onClick={() => toggleRead(notification._id)}>Not Mark As Read</MarkAsUnreadButton>}

              <br/><br/><br/>  
              </NotificationItem>
              
              
            ))}
            </NotificationsList>
          )}
        </Wrapper>
      ) : (
        <NotLoggedInMessage>You are not logged in</NotLoggedInMessage>
      )}
    </Container>
  );
}

export default NotificationComponent;

































// import React, { useState, useEffect } from 'react';
// import './Styles/NotificationComponent.css';
// import axios from "axios";
// // import './NotificationComponent.css'; // Create a CSS file for styling

// function NotificationComponent() {
//   const [notifications, setNotifications] = useState('');
//   const [unreadCount, setUnreadCount] = useState(0);
//   const [showNotifications, setShowNotifications] = useState(true);

//   const [loggedIn,setLoggedIn] = useState(false);
//   const URL = "/notifications";

//   useEffect(()=>{
//     var token = localStorage.getItem('jwtToken');
//     if(token){
//       axios.get('users/check_auth',{headers : {Authorization: `Bearer ${token}`}})
//       .then((res)=>{
//         setLoggedIn(true);
//       })
//       .catch((err)=>{
//         localStorage.removeItem('jwtToken');
//         setLoggedIn(false);
//       });
//     }
//     else{
//       setLoggedIn(false);
//     }

//   },[]);

//   useEffect(()=>{
//     var token = localStorage.getItem('jwtToken');

//     axios.get(URL,{headers : {Authorization: `Bearer ${token}`}})
//     .then(response => {
//         console.log(response.data);
//         setNotifications(response.data);
//         console.log(notifications);
//         let a = 0;

//         response.data.forEach(element => {
//           a++;
//         });

//         setUnreadCount(a);
//     })
//     .catch((err)=>{
//         console.log(err);
//     });
//   },[]);


//   const markAsRead = (notificationId) => {
//     // Update the notification as read in the database
//     // Remove the notification from 'notifications' state
//     // Decrement 'unreadCount'
//     unreadCount--;
//     setUnreadCount(unreadCount);
//   };

//   const toggleNotifications = () => {
//     setShowNotifications(!showNotifications);
//   };

//   return (
//     <>
//       {loggedIn?
//         (
//             <div className="notification-wrapper">
//             <div className="notification-icon" onClick={toggleNotifications}>
//                 <i className="fa fa-bell" />
//                 {unreadCount > 0 && <span className="unread-count">{unreadCount}</span>}
//             </div>
//             {showNotifications && (
//                 <div className="notification-dropdown">
//                 {notifications.map((notification) => (
//                     <div
//                     key={notification._id}
//                     className={`notification ${notification.is_read ? 'read' : 'unread'}`}
//                     onClick={() => markAsRead(notification._id)}
//                     >
//                     {notification.message}
//                     </div>
//                 ))}
//                 </div>
//             )}
//             </div>
//         ):
//         <h1>You are not loggedIn</h1>
//       }
//     </>
//   );
// }

// export default NotificationComponent;
