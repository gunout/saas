// routes/quoteRoutes.js
router.post('/calculate', validateConfig, async (req, res) => {
  const { modelId, selectedOptions, siteCharacteristics } = req.body;
  
  try {
    const model = await MobileHome.findById(modelId);
    const pricingEngine = new PricingEngine(model.basePrice, model.options);
    
    // Appliquer les sélections
    pricingEngine.options.forEach(option => {
      option.selected = selectedOptions.includes(option._id.toString());
    });

    // Calcul des coûts supplémentaires (terrain, fondations, etc.)
    const sitePrepCost = calculateSitePreparationCost(siteCharacteristics);
    
    res.json({
      priceBreakdown: pricingEngine.generateBreakdown(),
      sitePreparation: sitePrepCost,
      totalPrice: pricingEngine.calculateTotal() + sitePrepCost.total,
      timeline: pricingEngine.calculateTimeline() + sitePrepCost.days
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});