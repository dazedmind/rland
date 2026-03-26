"use client";
import React, { useState, useMemo } from "react";
import NavBar from "@/components/layout/NavBar";
import Footer from "@/components/layout/Footer";
import PageBanner from "@/components/layout/PageBanner";
import MobileNavBar from "@/components/layout/MobileNavBar";
import { Input } from "@/components/ui/input";
import { ChevronDownIcon, RotateCcw, Trash2 } from "lucide-react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import ScrollReveal from "@/components/ui/ScrollReveal";

// ── Types ──────────────────────────────────────────────────────────────────
interface LoanInputs {
  totalContractPrice: number;
  reservationFee: number;
  downPaymentPercentage: number;
  downPaymentTermsMonths: number;
  loanYears: number;
  vatPercentage: number;
  miscFeesPercentage: number;
  bankFeesPercentage: number;
  interestRate: number;
}

interface LoanResults {
  totalContractPrice: number;
  vat: number;
  miscFees: number;
  bankFees: number;
  grossTotalContractPrice: number;
  downPayment: number;
  reservationFee: number;
  netDownPayment: number;
  monthlyDownPayment: number;
  loanAmount: number;
  interestRate: number;
  loanPeriodMonths: number;
  monthlyAmortization: number;
  requiredMonthlyIncome: number;
}

// ── Calculation ────────────────────────────────────────────────────────────
const calculateLoanResults = (inputs: LoanInputs): LoanResults => {
  const {
    totalContractPrice,
    reservationFee,
    downPaymentPercentage,
    downPaymentTermsMonths,
    loanYears,
    vatPercentage,
    miscFeesPercentage,
    bankFeesPercentage,
    interestRate,
  } = inputs;

  const vat = totalContractPrice * (vatPercentage / 100);
  const miscFees = totalContractPrice * (miscFeesPercentage / 100);
  const bankFees = totalContractPrice * (bankFeesPercentage / 100);
  const grossTotalContractPrice =
    totalContractPrice + vat + miscFees + bankFees;
  const downPayment = grossTotalContractPrice * (downPaymentPercentage / 100);
  const netDownPayment = downPayment - reservationFee;
  const monthlyDownPayment = netDownPayment / downPaymentTermsMonths;
  const loanAmount = grossTotalContractPrice - downPayment;
  const loanPeriodMonths = loanYears * 12;
  const monthlyInterestRate = interestRate / 100 / 12;

  let monthlyAmortization = 0;
  if (monthlyInterestRate > 0) {
    const numerator =
      monthlyInterestRate * Math.pow(1 + monthlyInterestRate, loanPeriodMonths);
    const denominator = Math.pow(1 + monthlyInterestRate, loanPeriodMonths) - 1;
    monthlyAmortization = loanAmount * (numerator / denominator);
  } else {
    monthlyAmortization = loanAmount / loanPeriodMonths;
  }

  const requiredMonthlyIncome = monthlyAmortization / 0.35;

  return {
    totalContractPrice,
    vat,
    miscFees,
    bankFees,
    grossTotalContractPrice,
    downPayment,
    reservationFee,
    netDownPayment,
    monthlyDownPayment,
    loanAmount,
    interestRate,
    loanPeriodMonths,
    monthlyAmortization,
    requiredMonthlyIncome,
  };
};

const formatCurrency = (amount: number): string =>
  new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    minimumFractionDigits: 2,
  }).format(amount);

function LoanCalculatorPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [inputs, setInputs] = useState<LoanInputs>({
    totalContractPrice: 2000000,
    reservationFee: 50000,
    downPaymentPercentage: 20,
    downPaymentTermsMonths: 12,
    loanYears: 15,
    vatPercentage: 12,
    miscFeesPercentage: 2,
    bankFeesPercentage: 1,
    interestRate: 6.5,
  });

  const results = useMemo(() => calculateLoanResults(inputs), [inputs]);

  const handleInputChange = (field: keyof LoanInputs, value: number) => {
    setInputs((prev) => ({ ...prev, [field]: value }));
  };

  const handleClear = () => {
    setInputs({
      totalContractPrice: 0,
      reservationFee: 0,
      downPaymentPercentage: 20,
      downPaymentTermsMonths: 12,
      loanYears: 15,
      vatPercentage: 12,
      miscFeesPercentage: 2,
      bankFeesPercentage: 1,
      interestRate: 6.5,
    });
  };

  return (
    <div className="pt-20 md:pt-30">
      <header>
        <NavBar
          isScrolled={true}
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
        />
        <MobileNavBar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      </header>

      <PageBanner
        title="Loan Calculator"
        description="This loan calculator helps estimate your monthly payments."
        breadcrumb="Loan Calculator"
      />

      <main>
        <ScrollReveal className="w-full">
        <section className="flex flex-col items-start px-8 md:px-16 xl:px-44 justify-center py-16 space-y-8">
          <div className="flex flex-col lg:flex-row justify-between w-full gap-16 items-start">
            {/* ── LEFT: Inputs ── */}
            <div className="flex flex-col gap-4 w-full lg:w-2/5">
              <span className="flex flex-col gap-2">
                <p className="text-secondary font-semibold uppercase text-sm tracking-wider">
                  Calculator
                </p>
                <h2 className="text-4xl font-bold text-primary">
                  Enter Loan Details
                </h2>
              </span>

              <div className="flex flex-col gap-3 border border-border rounded-xl p-6">
                {/* Text inputs */}
                <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-1.5">
                  <label className="text-sm font-semibold text-primary">
                    Total Contract Price (PHP)
                  </label>
                  <Input
                    type="number"
                    placeholder="Enter Contract Price"
                    value={
                      inputs.totalContractPrice === 0
                        ? ""
                        : inputs.totalContractPrice
                    }
                    onChange={(e) =>
                      handleInputChange(
                        "totalContractPrice",
                        Number(e.target.value),
                      )
                    }
                    className="w-full"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-1.5">
                  <label className="text-sm font-semibold text-primary">
                    Reservation Fee (PHP)
                  </label>
                  <Input
                    type="number"
                    placeholder="Enter Reservation Fee"
                    value={
                      inputs.reservationFee === 0 ? "" : inputs.reservationFee
                    }
                    onChange={(e) =>
                      handleInputChange(
                        "reservationFee",
                        Number(e.target.value),
                      )
                    }
                    className="w-full"
                  />
                </div>

                {/* Select fields */}
                {[
                  {
                    label: "Down Payment Percentage (%)",
                    field: "downPaymentPercentage" as keyof LoanInputs,
                    options: [10, 15, 20, 25, 30].map((v) => ({
                      value: v,
                      label: `${v}%`,
                    })),
                  },
                  {
                    label: "Down Payment Terms (Months)",
                    field: "downPaymentTermsMonths" as keyof LoanInputs,
                    options: [6, 12, 18, 24].map((v) => ({
                      value: v,
                      label: `${v} months`,
                    })),
                  },
                  {
                    label: "Number of Years to Pay Loan",
                    field: "loanYears" as keyof LoanInputs,
                    options: [5, 10, 15, 20, 25, 30].map((v) => ({
                      value: v,
                      label: `${v} years`,
                    })),
                  },
                ].map(({ label, field, options }) => (
                  <div key={field} className="grid grid-cols-1 md:grid-cols-2 items-center gap-1.5">
                    <label className="text-sm font-semibold text-primary">
                      {label}
                    </label>
                    <div className="relative">
                      <ChevronDownIcon className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-500" />
                      <select
                        value={inputs[field] as number}
                        onChange={(e) =>
                          handleInputChange(field, Number(e.target.value))
                        }
                        className="w-full h-10 text-sm text-black rounded px-3 appearance-none"
                      >
                        {options.map((o) => (
                          <option key={o.value} value={o.value}>
                            {o.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                ))}

                <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-1.5">
                  <label className="text-sm font-semibold text-primary">
                    Interest Rate (% per annum)
                  </label>
                  <Input
                    type="number"
                    step="0.1"
                    placeholder="Enter Interest Rate"
                    value={inputs.interestRate}
                    onChange={(e) =>
                      handleInputChange("interestRate", Number(e.target.value))
                    }
                    className="w-full"
                  />
                </div>

                {/* Additional Fees */}
                <div className="pt-3 flex flex-col gap-3">
                  <p className="text-secondary font-semibold uppercase text-sm tracking-wider">
                    Additional Fees (%)
                  </p>
                  {[
                    {
                      label: "VAT (%)",
                      field: "vatPercentage" as keyof LoanInputs,
                    },
                    {
                      label: "Miscellaneous Fees (%)",
                      field: "miscFeesPercentage" as keyof LoanInputs,
                    },
                    {
                      label: "Bank Fees (%)",
                      field: "bankFeesPercentage" as keyof LoanInputs,
                    },
                  ].map(({ label, field }) => (
                    <div key={field} className="grid grid-cols-1 md:grid-cols-2 items-center gap-1.5">
                      <label className="text-sm font-semibold text-primary">
                        {label}
                      </label>
                      <Input
                        type="number"
                        step="0.1"
                        value={inputs[field] as number}
                        onChange={(e) =>
                          handleInputChange(field, Number(e.target.value))
                        }
                        className="w-full"
                      />
                    </div>
                  ))}
                </div>

                {results.totalContractPrice > 0 && (
                  <Button
                    onClick={handleClear}
                    variant="outline"
                    size="sm"
                    className="w-full text-primary mt-2 hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4" /> Clear
                  </Button>
                )}
              </div>
            </div>

            {/* ── RIGHT: Results ── */}
            <div className="w-full lg:w-3/5 flex flex-col gap-6">
              {/* Summary cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2 border border-border rounded-xl p-6 bg-linear-to-br from-primary to-blue-950 text-white">
                  <p className="font-semibold uppercase text-sm tracking-wider text-secondary">
                    Monthly Down Payment
                  </p>
                  <p className="text-3xl font-bold">
                    {formatCurrency(results.monthlyDownPayment)}
                  </p>
                  <p className="text-xs text-white/60">
                    First {inputs.downPaymentTermsMonths} months
                  </p>
                </div>
                <div className="flex flex-col gap-2 border border-border rounded-xl p-6 bg-linear-to-br from-primary to-blue-950 text-white">
                  <p className="font-semibold uppercase text-sm tracking-wider text-secondary">
                    Monthly Amortization
                  </p>
                  <p className="text-3xl font-bold">
                    {formatCurrency(results.monthlyAmortization)}
                  </p>
                  <p className="text-xs text-white/60">
                    After down payment period
                  </p>
                </div>
              </div>

              {/* Table */}
              <span>
                <h2 className="text-3xl font-bold text-primary">
                  Payment Breakdown
                </h2>
              </span>

              <div className="border border-border rounded-xl overflow-hidden">
              <Table>
                  <TableHeader>
                    <TableRow className="bg-neutral-50 hover:bg-neutral-50">
                      <TableHead className="font-semibold text-neutral-500 uppercase text-xs tracking-wider py-3">
                        Description
                      </TableHead>
                      <TableHead className="text-right font-semibold text-neutral-500 uppercase text-xs tracking-wider py-3">
                        Amount
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>

                    {/* ── Group 1: Contract Price ── */}
            
                    <TableRow className="hover:bg-transparent">
                      <TableCell className="text-sm font-bold text-primary py-2">Total Contract Price</TableCell>
                      <TableCell className="text-right text-sm font-bold text-primary py-2">
                        {formatCurrency(results.totalContractPrice)}
                      </TableCell>
                    </TableRow>
                    <TableRow className="hover:bg-transparent">
                      <TableCell className="pl-6 text-sm text-neutral-400 py-2">+ VAT ({inputs.vatPercentage}%)</TableCell>
                      <TableCell className="text-right text-sm text-neutral-400 py-2">{formatCurrency(results.vat)}</TableCell>
                    </TableRow>
                    <TableRow className="hover:bg-transparent">
                      <TableCell className="pl-6 text-sm text-neutral-400 py-2">+ Miscellaneous Fees ({inputs.miscFeesPercentage}%)</TableCell>
                      <TableCell className="text-right text-sm text-neutral-400 py-2">{formatCurrency(results.miscFees)}</TableCell>
                    </TableRow>
                    <TableRow className="hover:bg-transparent border-b border-border">
                      <TableCell className="pl-6 text-sm text-neutral-400 py-2">+ Bank Fees ({inputs.bankFeesPercentage}%)</TableCell>
                      <TableCell className="text-right text-sm text-neutral-400 py-2">{formatCurrency(results.bankFees)}</TableCell>
                    </TableRow>
                    <TableRow className="hover:bg-transparent">
                      <TableCell className="text-sm font-bold text-primary py-3">Gross Total Contract Price</TableCell>
                      <TableCell className="text-right text-sm font-bold text-primary py-3">
                        {formatCurrency(results.grossTotalContractPrice)}
                      </TableCell>
                    </TableRow>

                    <TableRow className="hover:bg-transparent">
                      <TableCell className="text-sm text-neutral-600 py-2">
                        Down Payment ({inputs.downPaymentPercentage}%)
                      </TableCell>
                      <TableCell className="text-right text-sm text-neutral-600 py-2">
                        {formatCurrency(results.downPayment)}
                      </TableCell>
                    </TableRow>
                    <TableRow className="hover:bg-transparent border-b border-border">
                      <TableCell className="pl-6 text-sm text-neutral-400 py-2">− Reservation Fee</TableCell>
                      <TableCell className="text-right text-sm text-neutral-400 py-2">
                        {formatCurrency(results.reservationFee)}
                      </TableCell>
                    </TableRow>
                    <TableRow className="hover:bg-transparent">
                      <TableCell className="text-sm font-bold text-primary py-3">Net Down Payment</TableCell>
                      <TableCell className="text-right text-sm font-bold text-primary py-3">
                        {formatCurrency(results.netDownPayment)}
                      </TableCell>
                    </TableRow>
                    <TableRow className="hover:bg-transparent">
                      <TableCell className="text-sm text-neutral-600 py-2">
                        Monthly Down Payment ({inputs.downPaymentTermsMonths} months)
                      </TableCell>
                      <TableCell className="text-right text-sm text-neutral-600 py-2">
                        {formatCurrency(results.monthlyDownPayment)}
                      </TableCell>
                    </TableRow>
                    
                    <TableRow className="hover:bg-transparent">
                      <TableCell className="text-sm text-neutral-600 py-2">Loan Amount</TableCell>
                      <TableCell className="text-right text-sm text-neutral-600 py-2">
                        {formatCurrency(results.loanAmount)}
                      </TableCell>
                    </TableRow>
                    <TableRow className="hover:bg-transparent">
                      <TableCell className="text-sm text-neutral-400 py-2">Interest Rate</TableCell>
                      <TableCell className="text-right text-sm text-neutral-400 py-2">
                        {results.interestRate}% per annum
                      </TableCell>
                    </TableRow>
                    <TableRow className="hover:bg-transparent">
                      <TableCell className="text-sm text-neutral-400 py-2">Loan Period</TableCell>
                      <TableCell className="text-right text-sm text-neutral-400 py-2">
                        {results.loanPeriodMonths} months ({inputs.loanYears} years)
                      </TableCell>
                    </TableRow>

                    {/* ── Totals ── */}
                    <TableRow className="hover:bg-primary/90 bg-primary">
                      <TableCell className="text-sm font-bold text-white py-4">Monthly Amortization</TableCell>
                      <TableCell className="text-right text-sm font-bold text-white py-4">
                        {formatCurrency(results.monthlyAmortization)}
                      </TableCell>
                    </TableRow>
                    <TableRow className="hover:bg-transparent bg-neutral-50">
                      <TableCell className="text-sm font-semibold text-neutral-600 py-4">Required Monthly Income</TableCell>
                      <TableCell className="text-right text-sm font-semibold text-neutral-600 py-4">
                        {formatCurrency(results.requiredMonthlyIncome)}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>

              {/* Disclaimer */}
              <p className="text-xs italic text-neutral-400 leading-relaxed">
                <strong className="not-italic font-semibold text-neutral-500">
                  Note:{" "}
                </strong>
                This calculator provides estimates only. Actual loan terms,
                interest rates, and fees may vary based on your credit score,
                property type, and lender requirements. Please consult with our
                sales team for accurate quotations.
              </p>
            </div>
          </div>
        </section>
        </ScrollReveal>
      </main>

      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default LoanCalculatorPage;
