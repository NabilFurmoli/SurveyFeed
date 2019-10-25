const keys = require("../config/secrets");
const stripe = require("stripe")(keys.stripeSecretKey);
const requireLogin = require("../middlewares/requireLogin");

module.exports = app => {
  app.post("/api/stripe", requireLogin, async (req, res) => {
    // this reaches back to stripe to finalize the payments
    const chargeResult = await stripe.charges.create({
      amount: 500, // how much to charge
      currency: "usd",
      description: "$5 for five Surveys",
      source: req.body.id // the token.id stripe checkout module give us and we sent to backend.
    });

    // req.user is the current user instance that we have in database.
    // update creadit and save it to the database.
    req.user.credits += 5;
    const user = await req.user.save();

    res.send(user);
  });
};
