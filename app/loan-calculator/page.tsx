"use client";
import React, { useState, useMemo } from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import PageBanner from "@/components/PageBanner";
import MobileNavBar from "@/components/MobileNavBar";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { ChevronDownIcon, RotateCcw } from "lucide-react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

// Types
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

// Calculation utilities
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

  // Calculate additional fees
  const vat = totalContractPrice * (vatPercentage / 100);
  const miscFees = totalContractPrice * (miscFeesPercentage / 100);
  const bankFees = totalContractPrice * (bankFeesPercentage / 100);

  // Gross Total Contract Price
  const grossTotalContractPrice =
    totalContractPrice + vat + miscFees + bankFees;

  // Down Payment calculations
  const downPayment = grossTotalContractPrice * (downPaymentPercentage / 100);
  const netDownPayment = downPayment - reservationFee;
  const monthlyDownPayment = netDownPayment / downPaymentTermsMonths;

  // Loan calculations
  const loanAmount = grossTotalContractPrice - downPayment;
  const loanPeriodMonths = loanYears * 12;
  const monthlyInterestRate = interestRate / 100 / 12;

  // Monthly Amortization using the loan payment formula
  // M = P * [r(1+r)^n] / [(1+r)^n - 1]
  let monthlyAmortization = 0;
  if (monthlyInterestRate > 0) {
    const numerator =
      monthlyInterestRate * Math.pow(1 + monthlyInterestRate, loanPeriodMonths);
    const denominator = Math.pow(1 + monthlyInterestRate, loanPeriodMonths) - 1;
    monthlyAmortization = loanAmount * (numerator / denominator);
  } else {
    monthlyAmortization = loanAmount / loanPeriodMonths;
  }

  // Required Monthly Income (typically 35% debt-to-income ratio)
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

// Currency formatter
const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    minimumFractionDigits: 2,
  }).format(amount);
};

function LoanCalculatorPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Input states
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

  // Calculate results using useMemo for performance
  const results = useMemo(() => calculateLoanResults(inputs), [inputs]);
  //   const [results, setResults] = useState<LoanResults>({
  //     totalContractPrice: 0,
  //     vat: 0,
  //     miscFees: 0,
  //     bankFees: 0,
  //     grossTotalContractPrice: 0,
  //     downPayment: 0,
  //     reservationFee: 0,
  //     netDownPayment: 0,
  //     monthlyDownPayment: 0,
  //     loanAmount: 0,
  //     interestRate: 0,
  //     loanPeriodMonths: 0,
  //     monthlyAmortization: 0,
  //     requiredMonthlyIncome: 0,
  //   });

  // Input change handler
  const handleInputChange = (field: keyof LoanInputs, value: number) => {
    setInputs((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  //   const handleCalculate = () => {
  //     const results = calculateLoanResults(inputs);
  //     setResults(results);
  //   };

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

    inputs.totalContractPrice = 0;

    // setResults({
    //     totalContractPrice: 0,
    //     vat: 0,
    //     miscFees: 0,
    //     bankFees: 0,
    //     grossTotalContractPrice: 0,
    //     downPayment: 0,
    //     reservationFee: 0,
    //     netDownPayment: 0,
    //     monthlyDownPayment: 0,
    //     loanAmount: 0,
    //     interestRate: 0,
    //     loanPeriodMonths: 0,
    //     monthlyAmortization: 0,
    //     requiredMonthlyIncome: 0,
    // });
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
      {/* PAGE BANNER */}
      <PageBanner
        title="Loan Calculator"
        description="This loan calculator helps estimate your monthly payments."
        breadcrumb="Loan Calculator"
      />
      <main>
        {/* CALCULATOR SECTION */}
        <section className="flex flex-col items-start px-8 md:px-16 xl:px-64  justify-center py-16 space-y-8">
          <span className="flex flex-col gap-4">
            <h1 className="text-4xl font-bold">Finance Your Future Home</h1>
            <p className="leading-relaxed">
              This loan calculator helps estimate your monthly payments based on
              your loan amount, interest rate, and payment terms.
            </p>
          </span>

          <div className="flex flex-col lg:flex-row justify-between w-full gap-8">
            {/* CALCULATOR INPUTS */}
            <div className="flex flex-col gap-4 w-full lg:w-2/5">
              <h2 className="text-2xl font-semibold text-primary">
                Loan Details
              </h2>

              <Field>
                <FieldLabel>Total Contract Price (PHP)</FieldLabel>
                <Input
                  type="number"
                  placeholder="Enter Contract Price"
                  value={
                    inputs.totalContractPrice === 0
                      ? ""
                      : inputs.totalContractPrice
                  }
                  //   min={0}
                  onChange={(e) =>
                    handleInputChange(
                      "totalContractPrice",
                      Number(e.target.value),
                    )
                  }
                  className="w-full"
                />
              </Field>

              <Field>
                <FieldLabel>Reservation Fee (PHP)</FieldLabel>
                <Input
                  type="number"
                  placeholder="Enter Reservation Fee"
                  value={
                    inputs.reservationFee === 0 ? "" : inputs.reservationFee
                  }
                  onChange={(e) =>
                    handleInputChange("reservationFee", Number(e.target.value))
                  }
                  className="w-full"
                />
              </Field>

              <Field>
                <FieldLabel>Down Payment Percentage (%)</FieldLabel>
                <div className="relative">
                  <ChevronDownIcon className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-500" />
                  <select
                    value={inputs.downPaymentPercentage}
                    onChange={(e) =>
                      handleInputChange(
                        "downPaymentPercentage",
                        Number(e.target.value),
                      )
                    }
                    className="w-full h-10 text-sm text-black rounded-md px-3 border border-neutral-300 appearance-none bg-white"
                  >
                    <option value={10}>10%</option>
                    <option value={15}>15%</option>
                    <option value={20}>20%</option>
                    <option value={25}>25%</option>
                    <option value={30}>30%</option>
                  </select>
                </div>
              </Field>

              <Field>
                <FieldLabel>Down Payment Terms (Months)</FieldLabel>
                <div className="relative">
                  <ChevronDownIcon className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-500" />
                  <select
                    value={inputs.downPaymentTermsMonths}
                    onChange={(e) =>
                      handleInputChange(
                        "downPaymentTermsMonths",
                        Number(e.target.value),
                      )
                    }
                    className="w-full h-10 text-sm text-black rounded-md px-3 border border-neutral-300 appearance-none bg-white"
                  >
                    <option value={6}>6 months</option>
                    <option value={12}>12 months</option>
                    <option value={18}>18 months</option>
                    <option value={24}>24 months</option>
                  </select>
                </div>
              </Field>

              <Field>
                <FieldLabel>Number of Years to Pay Loan</FieldLabel>
                <div className="relative">
                  <ChevronDownIcon className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-500" />
                  <select
                    value={inputs.loanYears}
                    onChange={(e) =>
                      handleInputChange("loanYears", Number(e.target.value))
                    }
                    className="w-full h-10 text-sm text-black rounded-md px-3 border border-neutral-300 appearance-none bg-white"
                  >
                    <option value={5}>5 years</option>
                    <option value={10}>10 years</option>
                    <option value={15}>15 years</option>
                    <option value={20}>20 years</option>
                    <option value={25}>25 years</option>
                    <option value={30}>30 years</option>
                  </select>
                </div>
              </Field>

              <Field>
                <FieldLabel>Interest Rate (% per annum)</FieldLabel>
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
              </Field>

              {/* Advanced Options */}
              <div className="pt-4 border-t border-neutral-200">
                <h3 className="text-lg font-semibold mb-3 text-neutral-700">
                  Additional Fees (%)
                </h3>

                <Field>
                  <FieldLabel>VAT (%)</FieldLabel>
                  <Input
                    type="number"
                    step="0.1"
                    value={inputs.vatPercentage}
                    onChange={(e) =>
                      handleInputChange("vatPercentage", Number(e.target.value))
                    }
                    className="w-full"
                  />
                </Field>

                <Field>
                  <FieldLabel>Miscellaneous Fees (%)</FieldLabel>
                  <Input
                    type="number"
                    step="0.1"
                    value={inputs.miscFeesPercentage}
                    onChange={(e) =>
                      handleInputChange(
                        "miscFeesPercentage",
                        Number(e.target.value),
                      )
                    }
                    className="w-full"
                  />
                </Field>

                <Field>
                  <FieldLabel>Bank Fees (%)</FieldLabel>
                  <Input
                    type="number"
                    step="0.1"
                    value={inputs.bankFeesPercentage}
                    onChange={(e) =>
                      handleInputChange(
                        "bankFeesPercentage",
                        Number(e.target.value),
                      )
                    }
                    className="w-full"
                  />
                </Field>
              </div>

              <span className="flex gap-4 justify-between w-full">
                {results.totalContractPrice > 0 && (
                  <Button
                    onClick={handleClear}
                    variant="outline"
                    className="flex-1 bg-input  rounded-md "
                  >
                    {" "}
                    <RotateCcw className="w-4 h-4" /> Clear
                  </Button>
                )}
              </span>
            </div>

            {/* RESULTS TABLE */}
            <div className="w-full lg:w-3/5">
              <h2 className="text-2xl font-semibold mb-4 text-primary">
                Payment Breakdown
              </h2>
              <div className="border border-neutral-200 rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-neutral-50">
                      <TableHead className="font-semibold text-neutral-900">
                        Description
                      </TableHead>
                      <TableHead className="text-right font-semibold text-neutral-900">
                        Amount
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">
                        Total Contract Price
                      </TableCell>
                      <TableCell className="text-right">
                        {formatCurrency(results.totalContractPrice)}
                      </TableCell>
                    </TableRow>
                    <TableRow className="bg-neutral-50">
                      <TableCell className="pl-8 text-sm text-neutral-600">
                        + VAT ({inputs.vatPercentage}%)
                      </TableCell>
                      <TableCell className="text-right text-sm">
                        {formatCurrency(results.vat)}
                      </TableCell>
                    </TableRow>
                    <TableRow className="bg-neutral-50">
                      <TableCell className="pl-8 text-sm text-neutral-600">
                        + Miscellaneous Fees ({inputs.miscFeesPercentage}%)
                      </TableCell>
                      <TableCell className="text-right text-sm">
                        {formatCurrency(results.miscFees)}
                      </TableCell>
                    </TableRow>
                    <TableRow className="bg-neutral-50">
                      <TableCell className="pl-8 text-sm text-neutral-600">
                        + Bank Fees ({inputs.bankFeesPercentage}%)
                      </TableCell>
                      <TableCell className="text-right text-sm">
                        {formatCurrency(results.bankFees)}
                      </TableCell>
                    </TableRow>
                    <TableRow className="bg-primary/10 font-semibold">
                      <TableCell>Gross Total Contract Price</TableCell>
                      <TableCell className="text-right">
                        {formatCurrency(results.grossTotalContractPrice)}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        Down Payment ({inputs.downPaymentPercentage}%)
                      </TableCell>
                      <TableCell className="text-right">
                        {formatCurrency(results.downPayment)}
                      </TableCell>
                    </TableRow>
                    <TableRow className="bg-neutral-50">
                      <TableCell className="pl-8 text-sm text-neutral-600">
                        - Reservation Fee
                      </TableCell>
                      <TableCell className="text-right text-sm">
                        {formatCurrency(results.reservationFee)}
                      </TableCell>
                    </TableRow>
                    <TableRow className="font-semibold">
                      <TableCell>Net Down Payment</TableCell>
                      <TableCell className="text-right">
                        {formatCurrency(results.netDownPayment)}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        Monthly Down Payment ({inputs.downPaymentTermsMonths}{" "}
                        months)
                      </TableCell>
                      <TableCell className="text-right">
                        {formatCurrency(results.monthlyDownPayment)}
                      </TableCell>
                    </TableRow>
                    <TableRow className="bg-secondary/10 font-semibold">
                      <TableCell>Loan Amount</TableCell>
                      <TableCell className="text-right">
                        {formatCurrency(results.loanAmount)}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Interest Rate</TableCell>
                      <TableCell className="text-right">
                        {results.interestRate}% per annum
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Loan Period</TableCell>
                      <TableCell className="text-right">
                        {results.loanPeriodMonths} months ({inputs.loanYears}{" "}
                        years)
                      </TableCell>
                    </TableRow>
                    <TableRow className="bg-primary text-white font-bold text-lg">
                      <TableCell>Monthly Amortization</TableCell>
                      <TableCell className="text-right">
                        {formatCurrency(results.monthlyAmortization)}
                      </TableCell>
                    </TableRow>
                    <TableRow className="bg-neutral-100 font-semibold">
                      <TableCell>Required Monthly Income</TableCell>
                      <TableCell className="text-right">
                        {formatCurrency(results.requiredMonthlyIncome)}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>

              {/* Summary Card */}
              <div className="mt-6 p-6 bg-linear-to-br from-primary to-blue-900 text-white rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-4">Payment Summary</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs opacity-90">
                      Monthly Down Payment (First{" "}
                      {inputs.downPaymentTermsMonths} months)
                    </p>
                    <p className="text-2xl font-bold">
                      {formatCurrency(results.monthlyDownPayment)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs opacity-90">
                      Monthly Amortization (After down payment)
                    </p>
                    <p className="text-2xl font-bold">
                      {formatCurrency(results.monthlyAmortization)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Disclaimer */}
              <div className="mt-4">
                <p className="text-xs italic text-neutral-600">
                  <strong>Note:</strong> This calculator provides estimates
                  only. Actual loan terms, interest rates, and fees may vary
                  based on your credit score, property type, and lender
                  requirements. Please consult with our sales team for accurate
                  quotations.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default LoanCalculatorPage;
