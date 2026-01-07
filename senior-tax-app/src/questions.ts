import { Question } from './types';

export const QUESTIONS: Question[] = [
  {
    id: 'spouse1FullName',
    title: 'What is your full legal name?',
    description: 'Please enter your name exactly as it appears on your Social Security card',
    type: 'text',
    required: true,
    placeholder: 'John Smith',
    helpText: 'This should match your Social Security card'
  },
  {
    id: 'spouse2FullName',
    title: "What is your spouse's full legal name?",
    description: 'Please enter their name exactly as it appears on their Social Security card. Leave blank if filing single.',
    type: 'text',
    required: false,
    placeholder: 'Jane Smith',
    helpText: 'Leave blank if you are filing as single'
  },
  {
    id: 'spouse1SSN',
    title: 'What is your Social Security Number?',
    description: 'This information is kept private and secure',
    type: 'ssn',
    required: true,
    placeholder: '123-45-6789',
    helpText: 'Format: 123-45-6789'
  },
  {
    id: 'spouse2SSN',
    title: "What is your spouse's Social Security Number?",
    description: 'Leave blank if filing single',
    type: 'ssn',
    required: false,
    placeholder: '123-45-6789',
    helpText: 'Leave blank if you are filing as single'
  },
  {
    id: 'currentAddress',
    title: 'What is your current home address?',
    description: 'Include street address, city, state, and zip code',
    type: 'address',
    required: true,
    placeholder: '123 Main Street, Anytown, NJ 07001',
    helpText: 'Your complete mailing address'
  },
  {
    id: 'spouse1DOB',
    title: 'What is your date of birth?',
    type: 'date',
    required: true,
    helpText: 'Format: MM/DD/YYYY'
  },
  {
    id: 'spouse2DOB',
    title: "What is your spouse's date of birth?",
    description: 'Leave blank if filing single',
    type: 'date',
    required: false,
    helpText: 'Leave blank if you are filing as single'
  },
  {
    id: 'primaryState',
    title: 'What is your primary state of residence?',
    description: 'Which state did you live in for most of 2024?',
    type: 'select',
    required: true,
    options: [
      { value: '', label: 'Please select...' },
      { value: 'NJ', label: 'New Jersey' },
      { value: 'FL', label: 'Florida' }
    ],
    helpText: 'Choose the state where you lived most of the year'
  },
  {
    id: 'didWorkIn2024',
    title: 'Did you work in 2024?',
    description: 'This includes any job where you received a paycheck',
    type: 'yesno',
    required: true,
    helpText: 'Select Yes if you had any employment income'
  },
  {
    id: 'estimatedTotalIncome',
    title: 'What was your total income from all sources in 2024?',
    description: 'Include wages, Social Security, pensions, and any other income. Your best estimate is fine.',
    type: 'currency',
    required: true,
    placeholder: '50000',
    helpText: 'An estimate is okay - we can adjust later'
  },
  {
    id: 'ownsHome',
    title: 'Do you own your home?',
    description: 'This helps us determine if you qualify for property tax deductions',
    type: 'yesno',
    required: true,
    helpText: 'Select Yes if you own the home you live in'
  },
  {
    id: 'hasRetirementAccounts',
    title: 'Do you have retirement accounts?',
    description: 'This includes 401(k), IRA, 403(b), or similar accounts',
    type: 'yesno',
    required: true,
    helpText: 'Common names: 401k, IRA, Roth IRA, 403b'
  },
  {
    id: 'hasInvestmentAccounts',
    title: 'Do you have investment accounts?',
    description: 'This includes brokerage accounts, stocks, bonds, or mutual funds',
    type: 'yesno',
    required: true,
    helpText: 'Accounts where you buy and sell stocks or bonds'
  },
  {
    id: 'hasRentalProperties',
    title: 'Do you own any rental properties?',
    description: 'Properties that you rent out to others',
    type: 'yesno',
    required: true,
    helpText: 'Properties you rent to tenants for income'
  },
  {
    id: 'charitableDonationsOver250',
    title: 'Did you make charitable donations over $250 in 2024?',
    description: 'This includes donations to churches, charities, and non-profit organizations',
    type: 'yesno',
    required: true,
    helpText: 'Total donations to all charities combined'
  },
  {
    id: 'medicalExpensesOver5000',
    title: 'Did you pay more than $5,000 for medical expenses in 2024?',
    description: 'Include doctor visits, prescriptions, hospital bills, and health insurance premiums',
    type: 'yesno',
    required: true,
    helpText: 'Total medical costs not covered by insurance'
  },
  {
    id: 'hasDependents',
    title: 'Do you have any dependents?',
    description: 'This includes children, grandchildren, or others who rely on you for financial support',
    type: 'yesno',
    required: true,
    helpText: 'People you financially support who live with you'
  }
];
