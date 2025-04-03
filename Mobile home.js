{
  _id: ObjectId,
  manufacturer: String,
  model: String,
  basePrice: Number,
  customizable: Boolean,
  dimensions: {
    length: Number,
    width: Number,
    height: Number
  },
  defaultConfig: {
    bedrooms: Number,
    bathrooms: Number,
    livingArea: Number,
    kitchenType: String // 'équipée', 'semi-équipée', etc.
  },
  options: [{
    name: String,
    description: String,
    priceImpact: Number,
    category: String // 'plomberie', 'électricité', 'isolation', etc.
  }],
  images: [String], // URLs vers les images
  certifications: [String], // NF, CE, etc.
  energyClass: String,
  estimatedConstructionTime: Number // en jours
}