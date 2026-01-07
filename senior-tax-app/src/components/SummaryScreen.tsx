import React from 'react';
import { TaxFormData } from '../types';

interface SummaryScreenProps {
  formData: TaxFormData;
  onEdit: (step: number) => void;
  onPrevious: () => void;
}

export const SummaryScreen: React.FC<SummaryScreenProps> = ({
  formData,
  onEdit,
  onPrevious
}) => {
  const formatSSN = (ssn: string): string => {
    if (!ssn) return 'Not provided';
    return `***-**-${ssn.slice(-4)}`;
  };

  const formatCurrency = (amount: string): string => {
    if (!amount) return '$0';
    const num = parseInt(amount, 10);
    return `$${num.toLocaleString()}`;
  };

  const formatYesNo = (value: boolean | null): string => {
    if (value === null) return 'Not answered';
    return value ? 'Yes' : 'No';
  };

  const formatDate = (date: string): string => {
    if (!date) return 'Not provided';
    const d = new Date(date);
    return d.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = () => {
    // Create a formatted text version for download
    const content = `
TAX PREPARATION SUMMARY
Generated: ${new Date().toLocaleDateString()}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PERSONAL INFORMATION

Your Name: ${formData.spouse1FullName || 'Not provided'}
Your Social Security Number: ${formatSSN(formData.spouse1SSN)}
Your Date of Birth: ${formatDate(formData.spouse1DOB)}

Spouse's Name: ${formData.spouse2FullName || 'Filing Single'}
Spouse's Social Security Number: ${formatSSN(formData.spouse2SSN)}
Spouse's Date of Birth: ${formatDate(formData.spouse2DOB)}

Current Address: ${formData.currentAddress || 'Not provided'}
Primary State: ${formData.primaryState === 'NJ' ? 'New Jersey' : formData.primaryState === 'FL' ? 'Florida' : 'Not selected'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

INCOME INFORMATION

Did you work in 2024? ${formatYesNo(formData.didWorkIn2024)}
Total Income (estimated): ${formatCurrency(formData.estimatedTotalIncome)}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

ASSETS

Own Home: ${formatYesNo(formData.ownsHome)}
Retirement Accounts: ${formatYesNo(formData.hasRetirementAccounts)}
Investment Accounts: ${formatYesNo(formData.hasInvestmentAccounts)}
Rental Properties: ${formatYesNo(formData.hasRentalProperties)}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

DEDUCTIONS

Charitable Donations Over $250: ${formatYesNo(formData.charitableDonationsOver250)}
Medical Expenses Over $5,000: ${formatYesNo(formData.medicalExpensesOver5000)}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

DEPENDENTS

Have Dependents: ${formatYesNo(formData.hasDependents)}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

NEXT STEPS

1. Review all information for accuracy
2. Gather your supporting documents (W-2s, 1099s, etc.)
3. Contact a tax professional to complete your return
4. Keep this summary with your tax records

This is a summary only and is not a tax return.
Please consult with a qualified tax professional.
    `;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tax-summary-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="screen summary-screen">
      <div className="content-container">
        <h1 className="main-title">Your Tax Information Summary</h1>

        <div className="summary-intro">
          <p className="summary-text">
            Great job! You've completed all the questions. Please review your
            information below. You can click on any section to make changes.
          </p>
        </div>

        <div className="summary-sections">
          {/* Personal Information */}
          <div className="summary-section">
            <h2 className="section-title">Personal Information</h2>
            <div className="summary-items">
              <div className="summary-item">
                <span className="summary-label">Your Name:</span>
                <span className="summary-value">{formData.spouse1FullName || 'Not provided'}</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Your Social Security:</span>
                <span className="summary-value">{formatSSN(formData.spouse1SSN)}</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Your Date of Birth:</span>
                <span className="summary-value">{formatDate(formData.spouse1DOB)}</span>
              </div>
              {formData.spouse2FullName && (
                <>
                  <div className="summary-item">
                    <span className="summary-label">Spouse's Name:</span>
                    <span className="summary-value">{formData.spouse2FullName}</span>
                  </div>
                  <div className="summary-item">
                    <span className="summary-label">Spouse's Social Security:</span>
                    <span className="summary-value">{formatSSN(formData.spouse2SSN)}</span>
                  </div>
                  <div className="summary-item">
                    <span className="summary-label">Spouse's Date of Birth:</span>
                    <span className="summary-value">{formatDate(formData.spouse2DOB)}</span>
                  </div>
                </>
              )}
              <div className="summary-item">
                <span className="summary-label">Address:</span>
                <span className="summary-value">{formData.currentAddress || 'Not provided'}</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Primary State:</span>
                <span className="summary-value">
                  {formData.primaryState === 'NJ' ? 'New Jersey' :
                   formData.primaryState === 'FL' ? 'Florida' : 'Not selected'}
                </span>
              </div>
            </div>
          </div>

          {/* Income Information */}
          <div className="summary-section">
            <h2 className="section-title">Income Information</h2>
            <div className="summary-items">
              <div className="summary-item">
                <span className="summary-label">Worked in 2024:</span>
                <span className="summary-value">{formatYesNo(formData.didWorkIn2024)}</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Total Income (estimated):</span>
                <span className="summary-value">{formatCurrency(formData.estimatedTotalIncome)}</span>
              </div>
            </div>
          </div>

          {/* Assets */}
          <div className="summary-section">
            <h2 className="section-title">Assets</h2>
            <div className="summary-items">
              <div className="summary-item">
                <span className="summary-label">Own Home:</span>
                <span className="summary-value">{formatYesNo(formData.ownsHome)}</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Retirement Accounts:</span>
                <span className="summary-value">{formatYesNo(formData.hasRetirementAccounts)}</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Investment Accounts:</span>
                <span className="summary-value">{formatYesNo(formData.hasInvestmentAccounts)}</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Rental Properties:</span>
                <span className="summary-value">{formatYesNo(formData.hasRentalProperties)}</span>
              </div>
            </div>
          </div>

          {/* Deductions */}
          <div className="summary-section">
            <h2 className="section-title">Deductions</h2>
            <div className="summary-items">
              <div className="summary-item">
                <span className="summary-label">Charitable Donations Over $250:</span>
                <span className="summary-value">{formatYesNo(formData.charitableDonationsOver250)}</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Medical Expenses Over $5,000:</span>
                <span className="summary-value">{formatYesNo(formData.medicalExpensesOver5000)}</span>
              </div>
            </div>
          </div>

          {/* Dependents */}
          <div className="summary-section">
            <h2 className="section-title">Dependents</h2>
            <div className="summary-items">
              <div className="summary-item">
                <span className="summary-label">Have Dependents:</span>
                <span className="summary-value">{formatYesNo(formData.hasDependents)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="summary-actions">
          <div className="summary-info-box">
            <h3 className="info-box-title">Next Steps</h3>
            <ul className="info-list">
              <li>Review all information above for accuracy</li>
              <li>Download or print this summary for your records</li>
              <li>Gather your supporting documents (W-2s, 1099s, receipts)</li>
              <li>Contact a tax professional to complete your tax return</li>
            </ul>
            <p className="disclaimer">
              <strong>Important:</strong> This is a summary only and is not a tax return.
              Please consult with a qualified tax professional to file your taxes.
            </p>
          </div>

          <div className="action-buttons">
            <button
              type="button"
              className="button button-outline"
              onClick={onPrevious}
              aria-label="Go back to review answers"
            >
              ← Go Back
            </button>
            <button
              type="button"
              className="button button-secondary"
              onClick={handlePrint}
              aria-label="Print this summary"
            >
              🖨️ Print Summary
            </button>
            <button
              type="button"
              className="button button-primary"
              onClick={handleDownloadPDF}
              aria-label="Download summary as text file"
            >
              📥 Download Summary
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
