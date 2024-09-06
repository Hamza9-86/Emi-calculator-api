const EMI = require('../model/model');

// Function to Calculate EMI
function calculateEMI(loanAmount, interestRate, loanTenureMonths) {
  const R = interestRate / 12 / 100; // Monthly interest rate
  const N = loanTenureMonths;
  const emi = (loanAmount * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);
  return emi;
}

// POST /api/calculate-emi
exports.calculateEMI = async (req, res) => {
  const { loan_amount, interest_rate, loan_tenure_months, prepayment_amount = 0 } = req.body;

  // Calculate EMI
  const emi = calculateEMI(loan_amount, interest_rate, loan_tenure_months);

  // Calculate the month-wise breakdown
  let remainingBalance = loan_amount;
  let monthlyBreakdown = [];
  let totalMonths = loan_tenure_months;
  let prepaymentDone = false;

  for (let i = 1; i <= totalMonths; i++) {
    // Calculate interest and principal for the current month
    const interestPaid = remainingBalance * (interest_rate / 12 / 100);
    const principalPaid = emi - interestPaid;
    remainingBalance -= principalPaid;

    // Handle prepayment only in the first month
    let prepaymentMade = 0;
    if (prepayment_amount && !prepaymentDone) {
      remainingBalance -= prepayment_amount;
      prepaymentMade = prepayment_amount;
      prepaymentDone = true; // Mark prepayment as done
    }

    // Ensure floating-point precision does not lead to imbalance
    remainingBalance = Math.max(0, remainingBalance); // Balance should not go below 0

    // Add the monthly breakdown
    monthlyBreakdown.push({
      month: i,
      emiPaid: emi.toFixed(2),
      interestPaid: interestPaid.toFixed(2),
      principalPaid: principalPaid.toFixed(2),
      prepayment: prepaymentMade.toFixed(2),
      remainingBalance: remainingBalance.toFixed(2),
    });

    // Adjust loan tenure if balance paid off early
    if (remainingBalance <= 0) {
      totalMonths = i; // Adjust tenure to current month
      break;
    }
  }

  // Save EMI record to the database
  try {
    const emiRecord = await EMI.create({
      loan_amount,
      interest_rate,
      loan_tenure_months: totalMonths,
      emi,
      prepayment_amount,
      remaining_balance: remainingBalance,
    });

    res.status(201).json({
      loanAmount: loan_amount,
      interestRate: interest_rate,
      loanTenureMonths: totalMonths,
      emi: emi.toFixed(2),
      prepayment: prepayment_amount,
      monthWisePayments: monthlyBreakdown,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error calculating EMI', error });
  }
};

exports.getAllEMIs = async (req, res) => {
  try {
    const emis = await EMI.findAll();
    res.status(200).json(emis);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching EMI records', error });
  }
};

exports.getEMIById = async (req, res) => {
  const id = req.params.id;
  try {
    const emi = await EMI.findByPk(id);
    if (!emi) {
      return res.status(404).json({ message: 'EMI record not found' });
    }
    res.status(200).json(emi);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching EMI record', error });
  }
};
