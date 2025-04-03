// controllers/paymentController.js
exports.createEscrowPayment = async (req, res) => {
  const { quoteId, amount, clientId } = req.body;
  
  try {
    // Créer le Payment Intent avec transfert différé
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency: 'eur',
      customer: client.stripeId,
      metadata: { quoteId },
      payment_method_types: ['card'],
      transfer_data: {
        destination: professional.stripeAccountId,
        amount: Math.round(amount * 100 * 0.7) // 30% de commission plateforme
      }
    });

    // Enregistrer la transaction en base
    await Transaction.create({
      quote: quoteId,
      amount,
      type: 'deposit',
      paymentIntentId: paymentIntent.id,
      status: 'pending'
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};