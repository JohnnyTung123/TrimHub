const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const createCheckoutSession = async (req, res) => {
  const { item, checkoutURL } = req.body;
  console.log("Create checkout session:", item, checkoutURL);

  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: "hkd",
          product_data: {
            name: item.name,
          },
          unit_amount: item.unit_amount,
        },
        quantity: item.quantity,
      },
    ],
    mode: "payment",
    success_url: `${checkoutURL}?success=true`,
    cancel_url: `${checkoutURL}?canceled=true`,
  });

  console.log("Going to redirect to:", session.url);
  res.status(200).json(session.url);
};

module.exports = { createCheckoutSession };
