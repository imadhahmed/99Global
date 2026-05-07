export const generateWhatsAppLink = (product, phoneNumber, region = "LK") => {
  const price = region === "LK" 
    ? `Rs. ${Number(product.priceLKR).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`
    : `QAR ${Number(product.priceQAR).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;

  const message = `Hello NINETY NINE,

I would like to order this item:
*Product:* ${product.name}
*Item Code:* ${product.itemCode}
*Price:* ${price}

Please let me know the next steps for payment and delivery.`;

  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
};
