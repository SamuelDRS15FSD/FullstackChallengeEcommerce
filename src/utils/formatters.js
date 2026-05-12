const EXCHANGE_RATE = 4000;

export const formatPriceCOP = (priceUSD) => {
  if (priceUSD == null || isNaN(priceUSD)) return "$ 0 COP";
  const priceCOP = Number(priceUSD) * EXCHANGE_RATE;
  const formattedNumber = new Intl.NumberFormat('es-CO', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(priceCOP);
  
  return `$ ${formattedNumber} COP`;
};

const categoryMap = {
  "men's clothing": "Ropa de Hombre",
  "women's clothing": "Ropa de Mujer",
  "jewelery": "Joyería",
  "electronics": "Electrónica"
};

export const translateCategory = (category) => {
  if (!category) return "";
  return categoryMap[category.toLowerCase()] || category;
};
