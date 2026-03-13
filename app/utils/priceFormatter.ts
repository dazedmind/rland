export const priceFormatter = (price: number) => {
    return new Intl.NumberFormat('en-PH', {
        style: 'currency',
        currency: 'PHP',
        maximumFractionDigits: 0,
      }).format(price);
  }

  export const shortPriceFormatter = (price: number) => {
    if (!price) return "0M";
    
    const millions = price / 1000000;
    
    // .toLocaleString() ensures it handles decimals correctly, 
    // and we trim trailing zeros if it's a whole number.
    return millions.toLocaleString(undefined, { maximumFractionDigits: 2 }) + "M";
  };