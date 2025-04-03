// services/erpIntegrationService.js
class ERPIntegration {
  constructor(erpType) {
    this.erpType = erpType;
  }

  async syncInventory(manufacturerId) {
    const erpAdapter = ERPAdapters[this.erpType];
    const components = await erpAdapter.getComponents(manufacturerId);
    
    await MobileHome.updateMany(
      { manufacturer: manufacturerId },
      { $set: { inventoryStatus: components } }
    );
  }

  async placeOrder(quoteId) {
    const quote = await Quote.findById(quoteId).populate('mobileHomeConfig.model');
    const erpAdapter = ERPAdapters[this.erpType];
    
    return erpAdapter.createOrder({
      model: quote.mobileHomeConfig.model.reference,
      options: quote.mobileHomeConfig.selectedOptions,
      deliveryDate: quote.constructionTimeline.startDate
    });
  }
}