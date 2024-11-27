function Moneyformate(val = []) {
  return Intl.NumberFormat('en', {
    currency: 'INR',
    style: 'currency',
  }).format(val);
}

export default Moneyformate;
