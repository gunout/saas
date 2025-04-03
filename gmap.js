// services/siteAnalysisService.js
const analyzeSite = async (coordinates, mobileHomeDimensions) => {
  const elevationData = await getElevationData(coordinates);
  const soilData = await getSoilType(coordinates);
  const accessAnalysis = analyzeAccessRoutes(coordinates);
  
  return {
    needsFoundation: elevationData.slope > 5 || soilData.type === 'argileux',
    specialTransport: mobileHomeDimensions.width > 3.5,
    utilityConnections: {
      water: nearestUtilityDistance('water', coordinates),
      electricity: nearestUtilityDistance('electricity', coordinates)
    }
  };
};