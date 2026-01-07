// Type definitions for the Senior Tax Preparation Application

export interface TaxFormData {
  // Personal Information
  spouse1FullName: string;
  spouse2FullName: string;
  spouse1SSN: string;
  spouse2SSN: string;
  spouse1DOB: string;
  spouse2DOB: string;
  currentAddress: string;
  primaryState: 'NJ' | 'FL' | '';

  // Income and Employment
  didWorkIn2024: boolean | null;
  estimatedTotalIncome: string;

  // Assets
  ownsHome: boolean | null;
  hasRetirementAccounts: boolean | null;
  hasInvestmentAccounts: boolean | null;
  hasRentalProperties: boolean | null;

  // Deductions
  charitableDonationsOver250: boolean | null;
  medicalExpensesOver5000: boolean | null;

  // Dependents
  hasDependents: boolean | null;
}

export interface Question {
  id: keyof TaxFormData;
  title: string;
  description?: string;
  type: 'text' | 'ssn' | 'date' | 'select' | 'yesno' | 'currency' | 'address';
  options?: Array<{ value: string; label: string }>;
  required: boolean;
  placeholder?: string;
  helpText?: string;
}

export interface ValidationError {
  field: keyof TaxFormData;
  message: string;
}

export const INITIAL_FORM_DATA: TaxFormData = {
  spouse1FullName: '',
  spouse2FullName: '',
  spouse1SSN: '',
  spouse2SSN: '',
  spouse1DOB: '',
  spouse2DOB: '',
  currentAddress: '',
  primaryState: '',
  didWorkIn2024: null,
  estimatedTotalIncome: '',
  ownsHome: null,
  hasRetirementAccounts: null,
  hasInvestmentAccounts: null,
  hasRentalProperties: null,
  charitableDonationsOver250: null,
  medicalExpensesOver5000: null,
  hasDependents: null,
};
