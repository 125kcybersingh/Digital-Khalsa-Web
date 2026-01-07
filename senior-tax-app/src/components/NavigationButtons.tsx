import React from 'react';

interface NavigationButtonsProps {
  onPrevious?: () => void;
  onNext: () => void;
  showPrevious: boolean;
  nextLabel?: string;
  isNextDisabled?: boolean;
}

export const NavigationButtons: React.FC<NavigationButtonsProps> = ({
  onPrevious,
  onNext,
  showPrevious,
  nextLabel = 'Next',
  isNextDisabled = false
}) => {
  return (
    <div className="navigation-buttons">
      {showPrevious && onPrevious && (
        <button
          type="button"
          className="button button-secondary"
          onClick={onPrevious}
          aria-label="Go to previous question"
        >
          ← Previous
        </button>
      )}
      <button
        type="button"
        className="button button-primary"
        onClick={onNext}
        disabled={isNextDisabled}
        aria-label={nextLabel}
      >
        {nextLabel} →
      </button>
    </div>
  );
};
