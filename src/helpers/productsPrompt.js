const formatProductPrompt = (data) => {
  return `
    Create a detailed product description for my ecommerce website.
    Follow these instructions:
    1. You will be provided with product's name, category and brand.
    2. The descripton should be markdwon format about 70 word count.
    4. After Description add specification in bullet points 
    5. Remove any unnecessary spacings but add new line and spacing where necessary.
    6. Ignore extra messages.
    7. Add Headings where necessary.
    Name: ${data.name}, Category: ${data.category}, Brand: ${data.brand}.
    `;
};

export default formatProductPrompt;
