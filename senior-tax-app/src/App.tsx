import React, { useState, useEffect } from 'react';
import { TaxFormData, INITIAL_FORM_DATA, ValidationError } from './types';
import { QUESTIONS } from './questions';
import { validateField } from './validation';
import { WelcomeScreen } from './components/WelcomeScreen';
import { QuestionScreen } from './components/QuestionScreen';
import { SummaryScreen } from './components/SummaryScreen';
import './styles.css';

type Screen = 'welcome' | 'question' | 'summary';

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('welcome');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [formData, setFormData] = useState<TaxFormData>(INITIAL_FORM_DATA);
  const [validationError, setValidationError] = useState<ValidationError | null>(null);

  // Load saved progress from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('taxFormData');
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        setFormData(parsed);
        // Show a message that progress was restored
        console.log('Progress restored from previous session');
      } catch (error) {
        console.error('Error loading saved data:', error);
      }
    }
  }, []);

  // Auto-save to localStorage whenever formData changes
  useEffect(() => {
    if (currentScreen !== 'welcome') {
      localStorage.setItem('taxFormData', JSON.stringify(formData));
    }
  }, [formData, currentScreen]);

  const handleStart = () => {
    setCurrentScreen('question');
    setCurrentQuestionIndex(0);
  };

  const handleFieldChange = (field: keyof TaxFormData, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value
    }));
    // Clear validation error when user changes the field
    setValidationError(null);
  };

  const handleNext = () => {
    const currentQuestion = QUESTIONS[currentQuestionIndex];
    const value = formData[currentQuestion.id];

    // Validate current field
    const error = validateField(currentQuestion.id, value, currentQuestion);
    if (error) {
      setValidationError(error);
      return;
    }

    setValidationError(null);

    // Move to next question or summary
    if (currentQuestionIndex < QUESTIONS.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      window.scrollTo(0, 0);
    } else {
      setCurrentScreen('summary');
      window.scrollTo(0, 0);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
      setValidationError(null);
      window.scrollTo(0, 0);
    }
  };

  const handleSummaryPrevious = () => {
    setCurrentScreen('question');
    setCurrentQuestionIndex(QUESTIONS.length - 1);
    window.scrollTo(0, 0);
  };

  const handleEdit = (stepNumber: number) => {
    setCurrentScreen('question');
    setCurrentQuestionIndex(stepNumber);
    setValidationError(null);
    window.scrollTo(0, 0);
  };

  const handleSaveProgress = () => {
    // Create a downloadable JSON file
    const dataStr = JSON.stringify(formData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `tax-progress-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    // Show confirmation
    alert('Your progress has been saved! You can load this file later to continue where you left off.');
  };

  const handleLoadProgress = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const loaded = JSON.parse(e.target?.result as string);
        setFormData(loaded);
        alert('Progress loaded successfully!');
      } catch (error) {
        alert('Error loading file. Please make sure it is a valid progress file.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="app">
      {/* Voice Assistance Banner */}
      <div className="voice-banner" role="banner">
        <span className="voice-banner-icon">🎤</span>
        <span className="voice-banner-text">
          Voice assistance will be available in future updates
        </span>
      </div>

      {/* Main Content */}
      {currentScreen === 'welcome' && (
        <WelcomeScreen onStart={handleStart} />
      )}

      {currentScreen === 'question' && (
        <QuestionScreen
          question={QUESTIONS[currentQuestionIndex]}
          value={formData[QUESTIONS[currentQuestionIndex].id]}
          onChange={handleFieldChange}
          onNext={handleNext}
          onPrevious={handlePrevious}
          onSaveProgress={handleSaveProgress}
          currentStep={currentQuestionIndex + 1}
          totalSteps={QUESTIONS.length}
          validationError={validationError}
        />
      )}

      {currentScreen === 'summary' && (
        <SummaryScreen
          formData={formData}
          onEdit={handleEdit}
          onPrevious={handleSummaryPrevious}
        />
      )}

      {/* Load Progress Button (hidden file input) */}
      {currentScreen === 'welcome' && (
        <div className="load-progress-container">
          <label htmlFor="load-progress" className="button button-outline">
            📂 Load Saved Progress
          </label>
          <input
            id="load-progress"
            type="file"
            accept=".json"
            onChange={handleLoadProgress}
            style={{ display: 'none' }}
          />
        </div>
      )}
    </div>
  );
}

export default App;
