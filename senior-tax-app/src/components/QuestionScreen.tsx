import React, { useState } from 'react';
import { Question, TaxFormData, ValidationError } from '../types';
import { VoiceInputPlaceholder } from './VoiceInputPlaceholder';
import { NavigationButtons } from './NavigationButtons';
import { ProgressBar } from './ProgressBar';

interface QuestionScreenProps {
  question: Question;
  value: any;
  onChange: (field: keyof TaxFormData, value: any) => void;
  onNext: () => void;
  onPrevious: () => void;
  onSaveProgress: () => void;
  currentStep: number;
  totalSteps: number;
  validationError?: ValidationError | null;
}

export const QuestionScreen: React.FC<QuestionScreenProps> = ({
  question,
  value,
  onChange,
  onNext,
  onPrevious,
  onSaveProgress,
  currentStep,
  totalSteps,
  validationError
}) => {
  const [localValue, setLocalValue] = useState(value);

  const handleChange = (newValue: any) => {
    setLocalValue(newValue);
    onChange(question.id, newValue);
  };

  const formatSSN = (value: string): string => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 3) return numbers;
    if (numbers.length <= 5) return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
    return `${numbers.slice(0, 3)}-${numbers.slice(3, 5)}-${numbers.slice(5, 9)}`;
  };

  const handleSSNChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatSSN(e.target.value);
    handleChange(formatted);
  };

  const formatCurrency = (value: string): string => {
    const numbers = value.replace(/\D/g, '');
    return numbers;
  };

  const handleCurrencyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCurrency(e.target.value);
    handleChange(formatted);
  };

  const renderInput = () => {
    switch (question.type) {
      case 'text':
      case 'address':
        return (
          <div className="input-with-voice">
            <input
              type="text"
              className="input-field"
              value={localValue || ''}
              onChange={(e) => handleChange(e.target.value)}
              placeholder={question.placeholder}
              aria-label={question.title}
              aria-describedby={`help-${question.id}`}
            />
            <VoiceInputPlaceholder />
          </div>
        );

      case 'ssn':
        return (
          <div className="input-with-voice">
            <input
              type="text"
              className="input-field"
              value={localValue || ''}
              onChange={handleSSNChange}
              placeholder={question.placeholder}
              maxLength={11}
              aria-label={question.title}
              aria-describedby={`help-${question.id}`}
            />
            <VoiceInputPlaceholder />
          </div>
        );

      case 'date':
        return (
          <div className="input-with-voice">
            <input
              type="date"
              className="input-field"
              value={localValue || ''}
              onChange={(e) => handleChange(e.target.value)}
              aria-label={question.title}
              aria-describedby={`help-${question.id}`}
            />
            <VoiceInputPlaceholder />
          </div>
        );

      case 'currency':
        return (
          <div className="input-with-voice">
            <div className="currency-input-wrapper">
              <span className="currency-symbol">$</span>
              <input
                type="text"
                className="input-field input-currency"
                value={localValue || ''}
                onChange={handleCurrencyChange}
                placeholder={question.placeholder}
                aria-label={question.title}
                aria-describedby={`help-${question.id}`}
              />
            </div>
            <VoiceInputPlaceholder />
          </div>
        );

      case 'select':
        return (
          <select
            className="input-field select-field"
            value={localValue || ''}
            onChange={(e) => handleChange(e.target.value)}
            aria-label={question.title}
            aria-describedby={`help-${question.id}`}
          >
            {question.options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );

      case 'yesno':
        return (
          <div className="yesno-buttons">
            <button
              type="button"
              className={`button button-yesno ${localValue === true ? 'selected' : ''}`}
              onClick={() => handleChange(true)}
              aria-label="Yes"
              aria-pressed={localValue === true}
            >
              Yes
            </button>
            <button
              type="button"
              className={`button button-yesno ${localValue === false ? 'selected' : ''}`}
              onClick={() => handleChange(false)}
              aria-label="No"
              aria-pressed={localValue === false}
            >
              No
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  const isAnswered = () => {
    if (question.type === 'yesno') {
      return localValue !== null;
    }
    if (!question.required) return true;
    return localValue && localValue.toString().trim() !== '';
  };

  return (
    <div className="screen question-screen">
      <ProgressBar current={currentStep} total={totalSteps} />

      <div className="content-container">
        <div className="question-container">
          <h1 className="question-title">{question.title}</h1>

          {question.description && (
            <p className="question-description">{question.description}</p>
          )}

          <div className="input-container">
            {renderInput()}
          </div>

          {validationError && validationError.field === question.id && (
            <div className="error-message" role="alert">
              {validationError.message}
            </div>
          )}

          {question.helpText && (
            <p className="help-text" id={`help-${question.id}`}>
              💡 {question.helpText}
            </p>
          )}
        </div>

        <div className="button-container">
          <button
            type="button"
            className="button button-outline save-button"
            onClick={onSaveProgress}
            aria-label="Save your progress"
          >
            💾 Save Progress
          </button>

          <NavigationButtons
            onPrevious={onPrevious}
            onNext={onNext}
            showPrevious={currentStep > 1}
            isNextDisabled={!isAnswered() && question.required}
          />
        </div>
      </div>
    </div>
  );
};
