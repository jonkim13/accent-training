import React, { useState } from 'react';
import './App.css';

function App() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isMoved, setIsMoved] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isRatingContainerVisible, setIsRatingContainerVisible] = useState(false);
  const [isFeedbackContainerVisible, setIsFeedbackContainerVisible] = useState(false);
  const [rating, setRating] = useState(null);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);

    if (!isFlipped) {
      setTimeout(() => {
        setIsExpanded(true);
        setTimeout(() => {
          setIsMoved(true);
          setTimeout(() => {
            setIsRatingContainerVisible(true);
            setTimeout(() => {
              setIsFeedbackContainerVisible(true);
            }, 600);
          }, 600);
        }, 600);
      }, 600);
    } else {
      setIsMoved(false);
      setIsExpanded(false);
      setIsRatingContainerVisible(false);
      setIsFeedbackContainerVisible(false);
    }
  };

  const handleRating = (rating) => {
    setRating(rating);
    console.log('Rating:', rating);
  };

  return (
    <div className={`app-container ${isMoved ? 'moved' : ''}`}>
      <header className="app-header">
        <h1 className="main-title">Pronunciation Training</h1>
      </header>
      <div className={`card-container ${isFlipped ? 'flipped' : ''}`}>
        <div className={`card ${isExpanded ? 'expanded' : ''}`}>
          <div className="card-front">
            <div className="pronunciation-container">
              <button className="speaker-box">
                <i className="fas fa-volume-up"></i> {/* Speaker icon */}
              </button>
              <h2 className="dynamic-pronunciation">at·luhs</h2>
            </div>
            <h3 className="dynamic-word">Atlas</h3>
            <button className="mic-button" onClick={handleFlip}>
              <i className="fas fa-microphone"></i> {/* Microphone icon */}
            </button>
          </div>

          <div className="card-back">
            <h2>at·luhs</h2>
            <h3>Atlas</h3>
            <button className="mic-button" onClick={handleFlip}>
              <i className="fas fa-microphone"></i> {/* Microphone icon for Go Back */}
            </button>
          </div>
        </div>
      </div>

      {isRatingContainerVisible && (
        <div className="rating-container rating-container-visible">
          <h2>Rate Your Pronunciation</h2>
          <div className="rating-buttons">
            <button className="rating-button bad" onClick={() => handleRating('Bad')}>Bad</button>
            <button className="rating-button ok" onClick={() => handleRating('Ok')}>Ok</button>
            <button className="rating-button average" onClick={() => handleRating('Average')}>Average</button>
            <button className="rating-button good" onClick={() => handleRating('Good')}>Good</button>
          </div>
        </div>
      )}

      {isFeedbackContainerVisible && (
        <div className="feedback-container feedback-container-visible">
          <h2>Feedback Container</h2>
          <p>AI feedback goes here</p>
        </div>
      )}
    </div>
  );
}

export default App;
