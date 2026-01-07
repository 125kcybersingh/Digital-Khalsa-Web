import { TaxFormData, ValidationError, Question } from './types';

export const validateField = (
  field: keyof TaxFormData,
  value: any,
  question: Question
): ValidationError | null => {
  // Check required fields
  if (question.required) {
    if (value === null || value === undefined || value === '') {
      return {
        field,
        message: 'This question is required. Please provide an answer.'
      };
    }
  }

  // Type-specific validation
  switch (question.type) {
    case 'ssn':
      if (value && question.required) {
        const ssnPattern = /^\d{3}-\d{2}-\d{4}$/;
        if (!ssnPattern.test(value)) {
          return {
            field,
            message: 'Please enter a valid Social Security Number in the format 123-45-6789'
          };
        }
      }
      break;

    case 'date':
      if (value && question.required) {
        const date = new Date(value);
        const now = new Date();
        const minDate = new Date(1900, 0, 1);

        if (isNaN(date.getTime())) {
          return {
            field,
            message: 'Please enter a valid date'
          };
        }

        if (date > now) {
          return {
            field,
            message: 'Date cannot be in the future'
          };
        }

        if (date < minDate) {
          return {
            field,
            message: 'Please enter a date after 1900'
          };
        }

        // Check if person is at least 18 years old
        const age = now.getFullYear() - date.getFullYear();
        if (age < 18) {
          return {
            field,
            message: 'You must be at least 18 years old'
          };
        }
      }
      break;

    case 'currency':
      if (value && question.required) {
        const numValue = parseInt(value, 10);
        if (isNaN(numValue) || numValue < 0) {
          return {
            field,
            message: 'Please enter a valid amount (numbers only, no decimals)'
          };
        }
      }
      break;

    case 'text':
    case 'address':
      if (value && question.required) {
        if (value.trim().length < 2) {
          return {
            field,
            message: 'Please enter at least 2 characters'
          };
        }
      }
      break;

    case 'select':
      if (question.required && (!value || value === '')) {
        return {
          field,
          message: 'Please select an option'
        };
      }
      break;

    case 'yesno':
      if (question.required && value === null) {
        return {
          field,
          message: 'Please select Yes or No'
        };
      }
      break;
  }

  return null;
};

export const validateAllFields = (
  formData: TaxFormData,
  questions: Question[]
): ValidationError[] => {
  const errors: ValidationError[] = [];

  questions.forEach((question) => {
    const value = formData[question.id];
    const error = validateField(question.id, value, question);
    if (error) {
      errors.push(error);
    }
  });

  return errors;
};
