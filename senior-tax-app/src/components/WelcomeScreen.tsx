import React from 'react';

interface WelcomeScreenProps {
  onStart: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
  return (
    <div className="screen welcome-screen">
      <div className="content-container">
        <h1 className="main-title">Welcome to Your Tax Preparation Guide</h1>

        <div className="welcome-content">
          <p className="welcome-text">
            We're here to help you prepare your tax information in a simple,
            step-by-step way. This process should take about 15-20 minutes.
          </p>

          <div className="info-box">
            <h2 className="section-title">What to Expect</h2>
            <ul className="info-list">
              <li>We'll ask you one question at a time</li>
              <li>You can go back to change your answers anytime</li>
              <li>Your progress is saved automatically</li>
              <li>We use simple, clear language - no confusing tax terms</li>
              <li>At the end, you'll get a summary you can print or save</li>
            </ul>
          </div>

          <div className="info-box">
            <h2 className="section-title">What You'll Need</h2>
            <ul className="info-list">
              <li>Your Social Security number</li>
              <li>Your spouse's Social Security number (if married)</li>
              <li>Information about your income (best estimate is fine)</li>
              <li>Details about your home, if you own one</li>
            </ul>
          </div>

          <div className="reassurance-text">
            <p>
              <strong>Don't worry if you don't know exact numbers.</strong> We can work
              with estimates, and you can always go back and update your answers.
            </p>
          </div>

          <button
            className="button button-primary button-large"
            onClick={onStart}
            aria-label="Start the tax preparation process"
          >
            Let's Get Started →
          </button>
        </div>
      </div>
    </div>
  );
};
