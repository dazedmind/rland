"use client";
import React, { useState, useMemo, useEffect, useCallback } from "react";
import Image from "next/image";
import rlandLogo from "@/public/rland-logo.png";
import NavBar from "@/components/layout/NavBar";
import Footer from "@/components/layout/Footer";
import PageBanner from "@/components/layout/PageBanner";
import MobileNavBar from "@/components/layout/MobileNavBar";
import { Input } from "@/components/ui/input";
import { ChevronDownIcon, Printer, Trash2 } from "lucide-react";
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
import {
  MISC_FEES_PERCENTAGE,
  calculateLoanResults,
  formatCurrency,
  formatFixingLabel,
  formatCommaIntegerInput,
  parseCommaIntegerInput,
  getAvailableFixingTerms,
  getInterestRateForFixing,
  INITIAL_LOAN_INPUTS,
  LOAN_YEAR_OPTIONS,
  DOWN_PAYMENT_TERM_OPTIONS,
  type LoanInputs,
  type PaymentType,
} from "@/lib/loan-calculator";

function LoanCalculatorPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [inputs, setInputs] = useState<LoanInputs>(INITIAL_LOAN_INPUTS);

  const availableFixingTerms = useMemo(
    () =>
      getAvailableFixingTerms(
        inputs.paymentType,
        inputs.loanPaymentTermMonths,
      ),
    [inputs.paymentType, inputs.loanPaymentTermMonths],
  );

  useEffect(() => {
    if (availableFixingTerms.length === 0) return;
    if (!availableFixingTerms.includes(inputs.fixingTermMonths)) {
      const next = availableFixingTerms[availableFixingTerms.length - 1];
      setInputs((prev) => ({ ...prev, fixingTermMonths: next }));
    }
  }, [availableFixingTerms, inputs.fixingTermMonths]);

  const results = useMemo(() => calculateLoanResults(inputs), [inputs]);

  const handleInputChange = useCallback(
    <K extends keyof LoanInputs>(field: K, value: LoanInputs[K]) => {
      setInputs((prev) => ({ ...prev, [field]: value }));
    },
    [],
  );

  const handleClear = () => {
    setInputs(INITIAL_LOAN_INPUTS);
  };

  const fixingAnnualForDisplay = getInterestRateForFixing(
    inputs.paymentType,
    inputs.fixingTermMonths,
  );

  const handlePrintBreakdown = () => {
    window.print();
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
                <h2 className="text-4xl font-bold text-foreground">
                  Enter Loan Details
                </h2>
              </span>

              <div className="flex flex-col gap-3 border border-border rounded-xl p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-1.5">
                  <label className="text-sm font-semibold text-primary">
                    Total Contract Price (PHP)
                  </label>
                  <Input
                    type="text"
                    inputMode="numeric"
                    autoComplete="off"
                    placeholder="Enter Contract Price"
                    value={formatCommaIntegerInput(inputs.totalContractPrice)}
                    onChange={(e) =>
                      handleInputChange(
                        "totalContractPrice",
                        parseCommaIntegerInput(e.target.value),
                      )
                    }
                    className="w-full"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-1.5">
                  <label className="text-sm font-semibold text-primary">
                    Down Payment Plan
                  </label>
                  <div className="relative">
                    <ChevronDownIcon className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-500" />
                    <select
                      value={inputs.downPaymentPlan}
                      onChange={(e) =>
                        handleInputChange(
                          "downPaymentPlan",
                          Number(e.target.value),
                        )
                      }
                      className="w-full h-10 text-sm text-black rounded px-3 appearance-none"
                    >
                      <option value={20000}>Platinum - ₱20,000</option>
                      <option value={15000}>Gold - ₱15,000</option>
                      <option value={10000}>
                        Silver / Silver Expanded - ₱10,000
                      </option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-1.5">
                  <label className="text-sm font-semibold text-primary">
                    Reservation Fee (PHP)
                  </label>
                  <Input
                    type="text"
                    readOnly
                    value="15,000"
                    className="w-full bg-neutral-100"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-1.5">
                  <label className="text-sm font-semibold text-primary">
                    Down Payment Term (Months)
                  </label>
                  <div className="relative">
                    <ChevronDownIcon className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-500" />
                    <select
                      value={inputs.downPaymentTermMonths}
                      onChange={(e) =>
                        handleInputChange(
                          "downPaymentTermMonths",
                          Number(e.target.value),
                        )
                      }
                      className="w-full h-10 text-sm text-black rounded px-3 appearance-none"
                    >
                      {DOWN_PAYMENT_TERM_OPTIONS.map((o) => (
                        <option key={o.value} value={o.value}>
                          {o.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-1.5">
                  <label className="text-sm font-semibold text-primary">
                    Payment Type
                  </label>
                  <div className="relative">
                    <ChevronDownIcon className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-500" />
                    <select
                      value={inputs.paymentType}
                      onChange={(e) =>
                        handleInputChange(
                          "paymentType",
                          e.target.value as PaymentType,
                        )
                      }
                      className="w-full h-10 text-sm text-black rounded px-3 appearance-none"
                    >
                      <option value="bank">Bank</option>
                      <option value="pagibig">Pag-Ibig</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-1.5">
                  <label className="text-sm font-semibold text-primary">
                    Loan Payment Term
                  </label>
                  <div className="relative">
                    <ChevronDownIcon className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-500" />
                    <select
                      value={inputs.loanPaymentTermMonths}
                      onChange={(e) =>
                        handleInputChange(
                          "loanPaymentTermMonths",
                          Number(e.target.value),
                        )
                      }
                      className="w-full h-10 text-sm text-black rounded px-3 appearance-none"
                    >
                      {LOAN_YEAR_OPTIONS.map((o) => (
                        <option key={o.value} value={o.value}>
                          {o.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-1.5">
                  <label className="text-sm font-semibold text-primary">
                    Fixing Term
                  </label>
                  <div className="relative">
                    <ChevronDownIcon className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-500" />
                    <select
                      id="fixingTerm"
                      value={inputs.fixingTermMonths}
                      onChange={(e) =>
                        handleInputChange(
                          "fixingTermMonths",
                          Number(e.target.value),
                        )
                      }
                      className="w-full h-10 text-sm text-black rounded px-3 appearance-none"
                    >
                      {availableFixingTerms.map((m) => {
                        const rate = getInterestRateForFixing(
                          inputs.paymentType,
                          m,
                        );
                        return (
                          <option key={m} value={m}>
                            {formatFixingLabel(m, rate)}
                          </option>
                        );
                      })}
                    </select>
                  </div>
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2 border border-border rounded-xl p-6 bg-linear-to-br from-primary to-blue-950 text-white">
                  <p className="font-semibold uppercase text-sm tracking-wider text-secondary">
                    Monthly Down Payment
                  </p>
                  <p className="text-3xl font-bold">
                    {formatCurrency(results.monthlyDownPayment)}
                  </p>
                  <p className="text-xs text-white/60">
                    First {inputs.downPaymentTermMonths} months
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

              <div className="flex flex-row flex-wrap items-center justify-between gap-4 w-full">
                <h2 className="text-3xl font-bold text-primary">
                  Payment Breakdown
                </h2>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handlePrintBreakdown}
                  className="gap-1.5 shrink-0 print:hidden hover:text-primary"
                >
                  <Printer className="size-4" aria-hidden />
                  Print
                </Button>
              </div>

              <div
                id="loan-calculator-print-area"
                className="border border-border rounded-xl overflow-hidden bg-white"
              >
                <header className="hidden flex-col items-center gap-3 border-b border-border bg-neutral-50 px-4 py-5 text-center print:flex print:bg-white print:py-4">
                  <Image
                    src={rlandLogo}
                    alt=""
                    width={140}
                    height={48}
                    className="h-11 w-auto max-w-[200px] object-contain object-center"
                    priority
                  />
                  <div className="space-y-1">
                    <p className="text-base uppercase font-semibold text-primary md:text-lg">
                      Loan payment breakdown
                    </p>
                    <p className="text-sm text-neutral-700">
                      R Land Development Inc.
                    </p>
                    <p className="text-xs text-neutral-500">
                      rland.ph/loan-calculator · Estimates only; confirm details with our sales team
                    </p>
                  </div>
                </header>
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

                    <TableRow className="hover:bg-transparent">
                      <TableCell className="text-sm font-bold text-primary py-2">Total Contract Price</TableCell>
                      <TableCell className="text-right text-sm font-bold text-primary py-2">
                        {formatCurrency(results.totalContractPrice)}
                      </TableCell>
                    </TableRow>
                    <TableRow className="hover:bg-transparent">
                      <TableCell className="pl-6 text-sm text-neutral-500 py-1 font-medium">Add:</TableCell>
                      <TableCell className="text-right py-1" />
                    </TableRow>
                    <TableRow className="hover:bg-transparent">
                      <TableCell className="pl-6 text-sm text-neutral-400 py-2">Miscellaneous Fees ({MISC_FEES_PERCENTAGE}%)</TableCell>
                      <TableCell className="text-right text-sm text-neutral-400 py-2">{formatCurrency(results.miscFees)}</TableCell>
                    </TableRow>
                    <TableRow className="hover:bg-transparent border-b border-border">
                      <TableCell className="pl-6 text-sm text-neutral-400 py-2">Move-In Fee</TableCell>
                      <TableCell className="text-right text-sm text-neutral-400 py-2">{formatCurrency(results.moveInFee)}</TableCell>
                    </TableRow>
                    <TableRow className="hover:bg-transparent">
                      <TableCell className="text-sm font-bold text-primary py-3">Gross Total Contract Price</TableCell>
                      <TableCell className="text-right text-sm font-bold text-primary py-3">
                        {formatCurrency(results.grossTotalContractPrice)}
                      </TableCell>
                    </TableRow>

                    <TableRow className="hover:bg-transparent">
                      <TableCell className="text-sm text-neutral-600 py-2">
                        Down Payment (plan)
                      </TableCell>
                      <TableCell className="text-right text-sm text-neutral-600 py-2">
                        {formatCurrency(results.downPayment)}
                      </TableCell>
                    </TableRow>
                    <TableRow className="hover:bg-transparent">
                      <TableCell className="pl-6 text-sm text-neutral-500 py-1 font-medium">Less:</TableCell>
                      <TableCell className="text-right py-1" />
                    </TableRow>
                    <TableRow className="hover:bg-transparent border-b border-border">
                      <TableCell className="pl-6 text-sm text-neutral-400 py-2">Reservation Fee</TableCell>
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
                        Monthly Down Payment ({inputs.downPaymentTermMonths} months)
                      </TableCell>
                      <TableCell className="text-right text-sm text-neutral-600 py-2">
                        {formatCurrency(results.monthlyDownPayment)}
                      </TableCell>
                    </TableRow>
                    <TableRow className="hover:bg-transparent border-b border-border">
                      <TableCell className="text-sm text-neutral-600 py-2">Balloon Payment (Last Month)</TableCell>
                      <TableCell className="text-right text-sm text-neutral-600 py-2">
                        {formatCurrency(results.balloonPayment)}
                      </TableCell>
                    </TableRow>

                    <TableRow className="hover:bg-transparent">
                      <TableCell className="text-sm text-neutral-600 py-2">Payment Type</TableCell>
                      <TableCell className="text-right text-sm text-neutral-600 py-2">
                        {results.paymentType}
                      </TableCell>
                    </TableRow>
                    <TableRow className="hover:bg-transparent border-b border-border">
                      <TableCell className="text-sm text-neutral-600 py-2">Fixing Term</TableCell>
                      <TableCell className="text-right text-sm text-neutral-600 py-2">
                        {formatFixingLabel(inputs.fixingTermMonths, fixingAnnualForDisplay)}
                      </TableCell>
                    </TableRow>

                    <TableRow className="hover:bg-transparent">
                      <TableCell className="text-sm text-neutral-600 py-2">Loan Amount</TableCell>
                      <TableCell className="text-right text-sm text-neutral-600 py-2">
                        {formatCurrency(results.loanAmount)}
                      </TableCell>
                    </TableRow>
                    <TableRow className="hover:bg-transparent">
                      <TableCell className="text-sm text-neutral-400 py-2">Rate (per annum)</TableCell>
                      <TableCell className="text-right text-sm text-neutral-400 py-2">
                        {results.interestRate.toFixed(3)}%
                      </TableCell>
                    </TableRow>
                    <TableRow className="hover:bg-transparent">
                      <TableCell className="text-sm text-neutral-400 py-2">Period</TableCell>
                      <TableCell className="text-right text-sm text-neutral-400 py-2">
                        {(() => {
                          const y = results.loanPeriodMonths / 12;
                          return `${y === 1 ? "1 year" : `${y} years`} (${results.loanPeriodMonths} months)`;
                        })()}
                      </TableCell>
                    </TableRow>

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
