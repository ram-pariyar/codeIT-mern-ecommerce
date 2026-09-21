const formatProductPrompt = (data) => {
  return `
    Create a detailed product description for my ecommerce website.
    Follow these instructions:
    1. You will be provided with product's name, category and brand.
    2. The descripton should be markdwon format.
    3. Remove any unnecessary spacings.
    4. Ignore extra messages.
    Name: ${data.name}, Category: ${data.category}, Brand: ${data.brand}.
    `;
};

export default formatProductPrompt;
