// routes/mobileHomeRoutes.js
router.get('/models/:id/config', async (req, res) => {
  try {
    const model = await MobileHome.findById(req.params.id);
    if (!model) {
      return res.status(404).json({ error: 'Modèle non trouvé' });
    }
    
    res.json({
      baseModel: model.basePrice,
      options: model.options.map(opt => ({
        id: opt._id,
        category: opt.category,
        name: opt.name,
        priceImpact: opt.priceImpact,
        description: opt.description,
        imageUrl: opt.imageUrl
      }))
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});