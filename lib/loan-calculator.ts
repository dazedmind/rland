export const RESERVATION_FEE = 15000;
export const MOVE_IN_FEE = 10000;
export const INCOME_MULTIPLIER = 3.3;
export const MISC_FEES_PERCENTAGE = 7.87;
export const DOWN_PAYMENT_MODIFIER = 0.85;

export type PaymentType = "bank" | "pagibig";

export const INTEREST_RATES = {
  bank: {
    12: 0.07,
    36: 0.075,
    48: 0.08,
    60: 0.08,
    default: 0.08,
  },
  pagibig: {
    12: 0.0575,
    36: 0.0625,
    60: 0.065,
    120: 0.07125,
    180: 0.0775,
    240: 0.085,
    300: 0.09125,
    360: 0.0975,
    default: 0.0975,
  },
} as const satisfies Record<
  PaymentType,
  Record<number | "default", number>
>;

export function getFixingTermKeys(paymentType: PaymentType): number[] {
  return paymentType === "bank"
    ? [12, 36, 48, 60]
    : [12, 36, 60, 120, 180, 240, 300, 360];
}

export function getInterestRateForFixing(
  paymentType: PaymentType,
  fixingMonths: number,
): number {
  const table = INTEREST_RATES[paymentType];
  const rate = (table as Record<number, number | undefined>)[fixingMonths];
  if (rate !== undefined) return rate;
  return table.default;
}

export function getAvailableFixingTerms(
  paymentType: PaymentType,
  loanPaymentTermMonths: number,
): number[] {
  return getFixingTermKeys(paymentType).filter(
    (m) => m <= loanPaymentTermMonths,
  );
}

export function formatFixingLabel(months: number, annualDecimal: number): string {
  const years = months / 12;
  const pct = (annualDecimal * 100).toFixed(3);
  const yLabel = years === 1 ? "1 Year" : `${years} Years`;
  return `${yLabel} (${pct}%)`;
}

export interface LoanInputs {
  totalContractPrice: number;
  downPaymentPlan: number;
  downPaymentTermMonths: number;
  paymentType: PaymentType;
  loanPaymentTermMonths: number;
  fixingTermMonths: number;
}

export interface LoanResults {
  totalContractPrice: number;
  miscFees: number;
  moveInFee: number;
  grossTotalContractPrice: number;
  downPayment: number;
  reservationFee: number;
  netDownPayment: number;
  monthlyDownPayment: number;
  balloonPayment: number;
  loanAmount: number;
  interestRate: number;
  loanPeriodMonths: number;
  monthlyAmortization: number;
  requiredMonthlyIncome: number;
  paymentType: string;
  fixingTermMonths: number;
}

export function calculateLoanResults(inputs: LoanInputs): LoanResults {
  const {
    totalContractPrice,
    downPaymentPlan,
    downPaymentTermMonths,
    paymentType,
    loanPaymentTermMonths,
    fixingTermMonths,
  } = inputs;

  const reservationFee = RESERVATION_FEE;
  const moveInFee = MOVE_IN_FEE;

  if (totalContractPrice <= 0) {
    return {
      totalContractPrice: 0,
      miscFees: 0,
      moveInFee,
      grossTotalContractPrice: moveInFee,
      downPayment: downPaymentPlan,
      reservationFee,
      netDownPayment: downPaymentPlan - reservationFee,
      monthlyDownPayment: 0,
      balloonPayment: 0,
      loanAmount: 0,
      interestRate: 0,
      loanPeriodMonths: loanPaymentTermMonths,
      monthlyAmortization: 0,
      requiredMonthlyIncome: 0,
      paymentType: paymentType === "bank" ? "Bank" : "Pag-Ibig",
      fixingTermMonths,
    };
  }

  const miscFees = totalContractPrice * (MISC_FEES_PERCENTAGE / 100);
  const grossTotalContractPrice = totalContractPrice + miscFees + moveInFee;
  const downPayment = downPaymentPlan;
  const netDownPayment = downPayment - reservationFee;

  const term = Math.max(1, downPaymentTermMonths);
  const baseMonthlyDown = netDownPayment / term;
  const monthlyDownPayment = baseMonthlyDown * DOWN_PAYMENT_MODIFIER;
  const balloonPayment = netDownPayment - monthlyDownPayment * (term - 1);

  const loanAmount = Math.max(0, grossTotalContractPrice - downPayment);

  const annualRate = getInterestRateForFixing(paymentType, fixingTermMonths);
  const monthlyInterestRate = annualRate / 12;
  const n = Math.max(1, loanPaymentTermMonths);

  let monthlyAmortization = 0;
  if (loanAmount > 0 && n > 0) {
    if (monthlyInterestRate > 0) {
      const numerator =
        monthlyInterestRate * Math.pow(1 + monthlyInterestRate, n);
      const denominator = Math.pow(1 + monthlyInterestRate, n) - 1;
      monthlyAmortization = loanAmount * (numerator / denominator);
    } else {
      monthlyAmortization = loanAmount / n;
    }
  }

  const requiredMonthlyIncome = monthlyAmortization * INCOME_MULTIPLIER;

  return {
    totalContractPrice,
    miscFees,
    moveInFee,
    grossTotalContractPrice,
    downPayment,
    reservationFee,
    netDownPayment,
    monthlyDownPayment,
    balloonPayment,
    loanAmount,
    interestRate: annualRate * 100,
    loanPeriodMonths: loanPaymentTermMonths,
    monthlyAmortization,
    requiredMonthlyIncome,
    paymentType: paymentType === "bank" ? "Bank" : "Pag-Ibig",
    fixingTermMonths,
  };
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    minimumFractionDigits: 2,
  }).format(amount);
}

/** Strip non-digits; parse integer for total contract price input. */
export function parseCommaIntegerInput(raw: string): number {
  const digits = raw.replace(/\D/g, "");
  if (digits === "") return 0;
  const n = parseInt(digits, 10);
  return Number.isFinite(n) ? Math.min(n, Number.MAX_SAFE_INTEGER) : 0;
}

/** Format whole number with thousands separators for display (empty when 0). */
export function formatCommaIntegerInput(amount: number): string {
  if (amount <= 0) return "";
  return amount.toLocaleString("en-US");
}

export const INITIAL_LOAN_INPUTS: LoanInputs = {
  totalContractPrice: 0,
  downPaymentPlan: 10000,
  downPaymentTermMonths: 12,
  paymentType: "pagibig",
  loanPaymentTermMonths: 360,
  fixingTermMonths: 360,
};

export const LOAN_YEAR_OPTIONS = Array.from({ length: 30 }, (_, i) => {
  const years = i + 1;
  const months = years * 12;
  return { value: months, label: `${years} Year${years > 1 ? "s" : ""}` };
});

export const DOWN_PAYMENT_TERM_OPTIONS = Array.from({ length: 20 }, (_, i) => {
  const m = i + 1;
  return { value: m, label: `${m} Month${m > 1 ? "s" : ""}` };
});
