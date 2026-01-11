import { jsPDF } from 'jspdf';
import { Property } from '@/types/property';

export const generatePropertyPDF = async (property: Property) => {
  const pdf = new jsPDF();
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 15;
  let yPosition = margin;

  // Helper function to format currency
  const formatCurrency = (value: number, decimals: boolean = false) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: decimals ? 2 : 0,
      maximumFractionDigits: decimals ? 2 : 0,
    }).format(value);
  };

  // Calculate financial projections
  const calculateFinancials = () => {
    const price = property.price;
    const projectedRent = property.cashFlow + 500; // Estimate rent from cash flow
    const vacancyRate = 0.04; // 4% vacancy
    const mgmtFeeRate = 0.10; // 10% management fee
    const monthlyTaxes = (price * 0.015) / 12; // Estimate 1.5% annual taxes
    const monthlyInsurance = 100;
    const monthlyMaintenance = 50;
    
    // Unleveraged scenario
    const unleveraged = {
      rentalIncome: projectedRent,
      vacancy: projectedRent * vacancyRate,
      totalIncome: projectedRent * (1 - vacancyRate),
      taxes: monthlyTaxes,
      insurance: monthlyInsurance,
      maintenance: monthlyMaintenance,
      mgmtFee: projectedRent * mgmtFeeRate,
      mortgage: 0,
      totalExpense: 0,
      netIncome: 0,
      roi: 0,
    };
    unleveraged.totalExpense = unleveraged.taxes + unleveraged.insurance + unleveraged.maintenance + unleveraged.mgmtFee;
    unleveraged.netIncome = unleveraged.totalIncome - unleveraged.totalExpense;
    unleveraged.roi = (unleveraged.netIncome * 12) / price * 100;

    // Leveraged scenario (assuming 25% down, 7% interest, 30 years)
    const downPayment = price * 0.25;
    const loanAmount = price * 0.75;
    const monthlyRate = 0.07 / 12;
    const numPayments = 30 * 12;
    const monthlyMortgage = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1);
    
    const leveraged = {
      rentalIncome: projectedRent,
      vacancy: projectedRent * vacancyRate,
      totalIncome: projectedRent * (1 - vacancyRate),
      taxes: monthlyTaxes,
      insurance: monthlyInsurance,
      maintenance: monthlyMaintenance,
      mgmtFee: projectedRent * mgmtFeeRate,
      mortgage: monthlyMortgage,
      totalExpense: 0,
      netIncome: 0,
      downPayment: downPayment,
      roi: 0,
    };
    leveraged.totalExpense = leveraged.taxes + leveraged.insurance + leveraged.maintenance + leveraged.mgmtFee + leveraged.mortgage;
    leveraged.netIncome = leveraged.totalIncome - leveraged.totalExpense;
    leveraged.roi = (leveraged.netIncome * 12) / downPayment * 100;

    return { unleveraged, leveraged, projectedRent };
  };

  const financials = calculateFinancials();

  // Page 1: Property Title and Price
  pdf.setTextColor(0, 0, 0);
  pdf.setFontSize(16);
  pdf.setFont('helvetica', 'bold');
  pdf.text(property.title, margin, yPosition);
  yPosition += 10;

  // Price in red, centered
  pdf.setTextColor(220, 20, 60); // Red color
  pdf.setFontSize(24);
  pdf.setFont('helvetica', 'bold');
  const priceText = formatCurrency(property.price);
  const priceWidth = pdf.getTextWidth(priceText);
  pdf.text(priceText, (pageWidth - priceWidth) / 2, yPosition);
  yPosition += 15;

  pdf.setTextColor(0, 0, 0);

  // Helper function to draw table cell
  const drawCell = (x: number, y: number, width: number, height: number, text: string, bold: boolean = false, bgColor: number[] | null = null, textColor: number[] = [0, 0, 0], fontSize: number = 9, align: 'left' | 'right' | 'center' = 'left') => {
    // Draw background
    if (bgColor) {
      pdf.setFillColor(bgColor[0], bgColor[1], bgColor[2]);
      pdf.rect(x, y, width, height, 'F');
    }
    
    // Draw border
    pdf.setDrawColor(0, 0, 0);
    pdf.rect(x, y, width, height);
    
    // Draw text
    pdf.setTextColor(textColor[0], textColor[1], textColor[2]);
    pdf.setFontSize(fontSize);
    pdf.setFont('helvetica', bold ? 'bold' : 'normal');
    
    const textY = y + height / 2 + 2;
    let textX = x + 2;
    
    if (align === 'right') {
      const textWidth = pdf.getTextWidth(text);
      textX = x + width - textWidth - 2;
    } else if (align === 'center') {
      const textWidth = pdf.getTextWidth(text);
      textX = x + (width - textWidth) / 2;
    }
    
    pdf.text(text, textX, textY);
  };

  // Table dimensions
  const colWidth = 53;
  const rowHeight = 6;
  const startX = margin;
  let currentY = yPosition;

  // UNLEVERAGED Section (Left Side)
  const unleveragedX = startX;
  
  // Header: UNLEVERAGED
  drawCell(unleveragedX, currentY, colWidth * 3, rowHeight, 'UNLEVERAGED', true, null, [0, 0, 0], 10, 'center');
  currentY += rowHeight;

  // ROI Header
  drawCell(unleveragedX, currentY, colWidth * 2, rowHeight, 'ROI (net cash on cash return)', true, [255, 100, 100], [255, 255, 255], 9);
  drawCell(unleveragedX + colWidth * 2, currentY, colWidth, rowHeight, `${financials.unleveraged.roi.toFixed(2)}%`, true, [0, 255, 0], [0, 0, 0], 10, 'center');
  currentY += rowHeight;

  // House details header
  drawCell(unleveragedX, currentY, colWidth * 2, rowHeight, 'House details', true, [200, 200, 200]);
  drawCell(unleveragedX + colWidth * 2, currentY, colWidth, rowHeight, '', false);
  currentY += rowHeight;

  // House details rows
  const houseDetails = [
    ['# of bedrooms-', property.features.bedrooms || 'N/A'],
    ['# of bathrooms-', property.features.bathrooms || 'N/A'],
    ['Lot size-', property.features.parking ? `${property.features.parking} spaces` : 'N/A'],
    ['Sq footage-', property.features.sqft?.toLocaleString() || 'N/A'],
    ['Garage-', property.features.parking ? 'yes' : 'no'],
    ['Projected rent-', formatCurrency(financials.projectedRent, true)],
    ['Monthly mgmt fee-', '10%'],
  ];

  houseDetails.forEach(([label, value]) => {
    drawCell(unleveragedX, currentY, colWidth * 2, rowHeight, String(label), false);
    drawCell(unleveragedX + colWidth * 2, currentY, colWidth, rowHeight, String(value), false, null, [0, 0, 0], 9, 'center');
    currentY += rowHeight;
  });

  // Income header
  drawCell(unleveragedX, currentY, colWidth, rowHeight, 'Income', true, [200, 200, 200]);
  drawCell(unleveragedX + colWidth, currentY, colWidth, rowHeight, 'Monthly', true, [200, 200, 200], [0, 0, 0], 9, 'center');
  drawCell(unleveragedX + colWidth * 2, currentY, colWidth, rowHeight, 'Yearly', true, [200, 200, 200], [0, 0, 0], 9, 'center');
  currentY += rowHeight;

  // Income rows
  const unleveragedIncome = [
    ['Rental income', financials.unleveraged.rentalIncome, financials.unleveraged.rentalIncome * 12],
    ['Vacancy', -financials.unleveraged.vacancy, -financials.unleveraged.vacancy * 12],
    ['Total income', financials.unleveraged.totalIncome, financials.unleveraged.totalIncome * 12],
  ];

  unleveragedIncome.forEach(([label, monthly, yearly], idx) => {
    const isBold = idx === unleveragedIncome.length - 1;
    drawCell(unleveragedX, currentY, colWidth, rowHeight, String(label), isBold);
    drawCell(unleveragedX + colWidth, currentY, colWidth, rowHeight, formatCurrency(Number(monthly), true), isBold, null, [0, 0, 0], 9, 'right');
    drawCell(unleveragedX + colWidth * 2, currentY, colWidth, rowHeight, formatCurrency(Number(yearly)), isBold, null, [0, 0, 0], 9, 'right');
    currentY += rowHeight;
  });

  // Expenses header
  drawCell(unleveragedX, currentY, colWidth, rowHeight, 'Expenses', true, [200, 200, 200]);
  drawCell(unleveragedX + colWidth, currentY, colWidth, rowHeight, 'Monthly', true, [200, 200, 200], [0, 0, 0], 9, 'center');
  drawCell(unleveragedX + colWidth * 2, currentY, colWidth, rowHeight, 'Yearly', true, [200, 200, 200], [0, 0, 0], 9, 'center');
  currentY += rowHeight;

  // Expense rows
  const unleveragedExpenses = [
    ['Taxes', financials.unleveraged.taxes, financials.unleveraged.taxes * 12],
    ['Insurance', financials.unleveraged.insurance, financials.unleveraged.insurance * 12],
    ['Maintenance + Utilities', financials.unleveraged.maintenance, financials.unleveraged.maintenance * 12],
    ['Mortgage (P&I)', 0, 0],
    ['Property mgmt fee', financials.unleveraged.mgmtFee, financials.unleveraged.mgmtFee * 12],
    ['Total expense', financials.unleveraged.totalExpense, financials.unleveraged.totalExpense * 12],
    ['Net income', financials.unleveraged.netIncome, financials.unleveraged.netIncome * 12],
  ];

  unleveragedExpenses.forEach(([label, monthly, yearly], idx) => {
    const isBold = idx >= unleveragedExpenses.length - 2;
    drawCell(unleveragedX, currentY, colWidth, rowHeight, String(label), isBold);
    drawCell(unleveragedX + colWidth, currentY, colWidth, rowHeight, formatCurrency(Number(monthly), true), isBold, null, [0, 0, 0], 9, 'right');
    drawCell(unleveragedX + colWidth * 2, currentY, colWidth, rowHeight, formatCurrency(Number(yearly)), isBold, null, [0, 0, 0], 9, 'right');
    currentY += rowHeight;
  });

  // LEVERAGED Section (Right Side)
  currentY = yPosition;
  const leveragedX = unleveragedX + colWidth * 3 + 2;

  // Header: LEVERAGED + Downpayment
  drawCell(leveragedX, currentY, colWidth * 2, rowHeight, 'LEVERAGED', true, null, [0, 0, 0], 10, 'center');
  drawCell(leveragedX + colWidth * 2, currentY, colWidth, rowHeight, 'Downpayment', true, null, [0, 0, 0], 9, 'center');
  currentY += rowHeight;

  // ROI Header
  drawCell(leveragedX, currentY, colWidth, rowHeight, 'ROI (net cash on cash return)', true, [255, 100, 100], [255, 255, 255], 8);
  drawCell(leveragedX + colWidth, currentY, colWidth, rowHeight, formatCurrency(financials.leveraged.downPayment, true), true, null, [0, 0, 0], 9, 'center');
  drawCell(leveragedX + colWidth * 2, currentY, colWidth, rowHeight, `${financials.leveraged.roi.toFixed(2)}%`, true, [0, 255, 0], [0, 0, 0], 10, 'center');
  currentY += rowHeight;

  // House details header
  drawCell(leveragedX, currentY, colWidth * 2, rowHeight, 'House details', true, [200, 200, 200]);
  drawCell(leveragedX + colWidth * 2, currentY, colWidth, rowHeight, '', false);
  currentY += rowHeight;

  // House details rows
  houseDetails.forEach(([label, value]) => {
    drawCell(leveragedX, currentY, colWidth * 2, rowHeight, String(label), false);
    drawCell(leveragedX + colWidth * 2, currentY, colWidth, rowHeight, String(value), false, null, [0, 0, 0], 9, 'center');
    currentY += rowHeight;
  });

  // Income header
  drawCell(leveragedX, currentY, colWidth, rowHeight, 'Income', true, [200, 200, 200]);
  drawCell(leveragedX + colWidth, currentY, colWidth, rowHeight, 'Monthly', true, [200, 200, 200], [0, 0, 0], 9, 'center');
  drawCell(leveragedX + colWidth * 2, currentY, colWidth, rowHeight, 'Yearly', true, [200, 200, 200], [0, 0, 0], 9, 'center');
  currentY += rowHeight;

  // Income rows
  const leveragedIncome = [
    ['Rental income', financials.leveraged.rentalIncome, financials.leveraged.rentalIncome * 12],
    ['Vacancy', -financials.leveraged.vacancy, -financials.leveraged.vacancy * 12],
    ['Total income', financials.leveraged.totalIncome, financials.leveraged.totalIncome * 12],
  ];

  leveragedIncome.forEach(([label, monthly, yearly], idx) => {
    const isBold = idx === leveragedIncome.length - 1;
    drawCell(leveragedX, currentY, colWidth, rowHeight, String(label), isBold);
    drawCell(leveragedX + colWidth, currentY, colWidth, rowHeight, formatCurrency(Number(monthly), true), isBold, null, [0, 0, 0], 9, 'right');
    drawCell(leveragedX + colWidth * 2, currentY, colWidth, rowHeight, formatCurrency(Number(yearly)), isBold, null, [0, 0, 0], 9, 'right');
    currentY += rowHeight;
  });

  // Expenses header
  drawCell(leveragedX, currentY, colWidth, rowHeight, 'Expenses', true, [200, 200, 200]);
  drawCell(leveragedX + colWidth, currentY, colWidth, rowHeight, 'Monthly', true, [200, 200, 200], [0, 0, 0], 9, 'center');
  drawCell(leveragedX + colWidth * 2, currentY, colWidth, rowHeight, 'Yearly', true, [200, 200, 200], [0, 0, 0], 9, 'center');
  currentY += rowHeight;

  // Expense rows
  const leveragedExpenses = [
    ['Taxes', financials.leveraged.taxes, financials.leveraged.taxes * 12],
    ['Insurance', financials.leveraged.insurance, financials.leveraged.insurance * 12],
    ['Maintenance & Utilities', financials.leveraged.maintenance, financials.leveraged.maintenance * 12],
    ['Mortgage (P&I)', financials.leveraged.mortgage, financials.leveraged.mortgage * 12],
    ['Property management fee', financials.leveraged.mgmtFee, financials.leveraged.mgmtFee * 12],
    ['Total expense', financials.leveraged.totalExpense, financials.leveraged.totalExpense * 12],
    ['Net income', financials.leveraged.netIncome, financials.leveraged.netIncome * 12],
  ];

  leveragedExpenses.forEach(([label, monthly, yearly], idx) => {
    const isBold = idx >= leveragedExpenses.length - 2;
    drawCell(leveragedX, currentY, colWidth, rowHeight, String(label), isBold);
    drawCell(leveragedX + colWidth, currentY, colWidth, rowHeight, formatCurrency(Number(monthly), true), isBold, null, [0, 0, 0], 9, 'right');
    drawCell(leveragedX + colWidth * 2, currentY, colWidth, rowHeight, formatCurrency(Number(yearly)), isBold, null, [0, 0, 0], 9, 'right');
    currentY += rowHeight;
  });

  // Disclaimer text
  currentY += 10;
  pdf.setFontSize(8);
  pdf.setFont('helvetica', 'normal');
  pdf.setTextColor(80, 80, 80);
  const disclaimerText = 'Please note that the figures and percentages quoted within this document are approximate and are based past results. Where available, certain figures, such as taxes, are based on publicly available information at the time of publication. Final figures will be verified and supplied by the title company at the time of closing.';
  const disclaimerLines = pdf.splitTextToSize(disclaimerText, pageWidth - 2 * margin);
  pdf.text(disclaimerLines, margin, currentY);

  // Save the PDF
  const fileName = `${property.title.replace(/[^a-zA-Z0-9]/g, '_')}_Investment_Analysis.pdf`;
  pdf.save(fileName);
};
