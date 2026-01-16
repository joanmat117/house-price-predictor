export const formatCOP = (number:number) => {
  if(typeof number !== 'number') return number
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(number);
};
