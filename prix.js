// services/pricingService.js
class PricingEngine {
  constructor(basePrice, options) {
    this.basePrice = basePrice;
    this.options = options;
  }

  calculateTotal() {
    return this.options.reduce((total, option) => {
      return total + (option.selected ? option.priceImpact : 0);
    }, this.basePrice);
  }

  calculateTimeline() {
    const baseDays = 30; // Temps de base
    const optionDays = this.options.reduce((days, option) => {
      return days + (option.selected ? option.timeImpact : 0);
    }, 0);
    return baseDays + optionDays;
  }

  generateBreakdown() {
    return {
      basePrice: this.basePrice,
      options: this.options.filter(o => o.selected),
      total: this.calculateTotal(),
      timeline: this.calculateTimeline()
    };
  }
}