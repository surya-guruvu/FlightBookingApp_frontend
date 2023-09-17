// NotificationStyles.js
// NotificationStyles.js
import styled, { css } from 'styled-components';

export const Container = styled.div`
  font-family: Arial, sans-serif;
  background-color: #f7f7f7;
  padding: 20px;
`;

export const Wrapper = styled.div`
  background-color: #fff;
  border: 1px solid #ddd;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const ToggleButton = styled.div`
  cursor: pointer;
`;

export const UnreadCount = styled.span`
  background-color: #ff5722;
  color: #fff;
  padding: 5px 10px;
  border-radius: 20px;
  font-weight: bold;
  margin-right: 10px;
`;

export const NotificationsList = styled.div`
  margin-top: 10px;
`;

// Define a function to conditionally set background color based on 'is_read' property
const getBackgroundColor = (props) => {
    if (props.isRead) {
      return css`
        background-color: #ffffff ; /* Background color for read messages */
      `;
    } else {
      return css`
        background-color: #f0f0f0; /* Background color for unread messages */
      `;
    }
  };

export const NotificationItem = styled.div`
  border-bottom: 1px solid #ddd;
  padding: 10px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${(props) => getBackgroundColor(props)};
`;





export const NotificationMessage = styled.p`
  flex-grow: 1;
  margin: 0;
   /* Apply background color based on 'is_read' */
`;


// export const NotificationMessage = styled.p`
//   flex-grow: 1;
//   margin: 0;
// `;

export const MarkAsReadButton = styled.button`
  background-color: #3498db;
  color: #fff;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 10px;
`;

export const MarkAsUnreadButton = styled.button`
  background-color: #e74c3c;
  color: #fff;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 10px;
`;

export const LoadingText = styled.p`
  font-size: 18px;
  font-weight: bold;
`;

export const NotLoggedInMessage = styled.h1`
  font-size: 24px;
  color: #e74c3c;
`;
