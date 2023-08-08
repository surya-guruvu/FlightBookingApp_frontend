import React, { useState } from 'react';
import { captureMessage } from '@sentry/react';

const FeedbackForm = () => {
  const [userFeedback, setUserFeedback] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userFeedback.trim() !== '') {
      captureMessage(userFeedback); // Capture user-reported feedback
      setUserFeedback('');
      alert('Thank you for your feedback!'); // Display a confirmation message
    } else {
      alert('Please provide your feedback before submitting.'); // Display validation message
    }
  };

  return (
    <div>
      <h2>Provide Feedback</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={userFeedback}
          onChange={(e) => setUserFeedback(e.target.value)}
          placeholder="Report an issue or provide feedback"
          rows="4"
          cols="50"
        />
        <button type="submit">Submit Feedback</button>
      </form>
    </div>
  );
};

export default FeedbackForm;
