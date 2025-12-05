import { Property } from '@/types/property';

/**
 * Evaluates if a property should be featured based on quality criteria
 * 
 * A property is featured if it meets at least 3 of these criteria:
 * 1. High ROI (>= 12%)
 * 2. Good price point ($50k-$300k - optimal investment range)
 * 3. High cash flow (>= $1000/month)
 * 4. Has multiple images (3+)
 * 5. Good condition (tenant occupied or recently built)
 * 6. Complete property details (has description, bedrooms, bathrooms)
 */
export function evaluateFeaturedStatus(property: Partial<Property>): boolean {
  let score = 0;
  const criteria: string[] = [];

  // 1. High ROI (>= 12%)
  if (property.roi && property.roi >= 12) {
    score++;
    criteria.push('High ROI');
  }

  // 2. Good price point ($50k-$300k)
  if (property.price && property.price >= 50000 && property.price <= 300000) {
    score++;
    criteria.push('Good price point');
  }

  // 3. High cash flow (>= $1000/month)
  if (property.cashFlow && property.cashFlow >= 1000) {
    score++;
    criteria.push('High cash flow');
  }

  // 4. Has multiple images (3+)
  if (property.images && property.images.length >= 3) {
    score++;
    criteria.push('Multiple images');
  }

  // 5. Good condition
  const yearBuilt = property.features?.yearBuilt;
  if (property.tenantOccupied || (yearBuilt && yearBuilt >= 2010)) {
    score++;
    criteria.push('Good condition');
  }

  // 6. Complete details
  const hasDescription = property.description && property.description.length > 50;
  const hasBedrooms = property.features?.bedrooms && property.features.bedrooms > 0;
  const hasBathrooms = property.features?.bathrooms && property.features.bathrooms > 0;
  
  if (hasDescription && hasBedrooms && hasBathrooms) {
    score++;
    criteria.push('Complete details');
  }

  // Feature if it meets at least 3 criteria
  const isFeatured = score >= 3;

  // Log for debugging (remove in production)
  if (isFeatured) {
    console.log(`✨ Property "${property.title}" is FEATURED (Score: ${score}/6)`);
    console.log(`Criteria met: ${criteria.join(', ')}`);
  }

  return isFeatured;
}

/**
 * Calculate a featured score (0-100) for ranking featured properties
 */
export function calculateFeaturedScore(property: Property): number {
  let score = 0;

  // ROI contributes up to 25 points
  if (property.roi >= 15) score += 25;
  else if (property.roi >= 12) score += 20;
  else if (property.roi >= 10) score += 15;
  else score += (property.roi / 10) * 10;

  // Cash flow contributes up to 25 points
  if (property.cashFlow >= 2000) score += 25;
  else if (property.cashFlow >= 1000) score += 20;
  else if (property.cashFlow >= 500) score += 15;
  else score += (property.cashFlow / 500) * 10;

  // Price optimization (sweet spot) contributes up to 20 points
  if (property.price >= 70000 && property.price <= 200000) score += 20;
  else if (property.price >= 50000 && property.price <= 300000) score += 15;
  else if (property.price >= 30000 && property.price <= 400000) score += 10;
  else score += 5;

  // Image quality contributes up to 15 points
  if (property.images.length >= 5) score += 15;
  else if (property.images.length >= 3) score += 12;
  else if (property.images.length >= 2) score += 8;
  else score += 5;

  // Property condition contributes up to 15 points
  if (property.tenantOccupied) score += 10;
  if (property.features.yearBuilt && property.features.yearBuilt >= 2015) score += 5;
  else if (property.features.yearBuilt && property.features.yearBuilt >= 2000) score += 3;

  return Math.min(score, 100);
}

/**
 * Get featured criteria breakdown for display
 */
export function getFeaturedCriteria(property: Partial<Property>): {
  met: string[];
  notMet: string[];
  score: number;
} {
  const met: string[] = [];
  const notMet: string[] = [];

  // Check each criterion
  if (property.roi && property.roi >= 12) {
    met.push(`High ROI (${property.roi}%)`);
  } else {
    notMet.push(`ROI below 12% (${property.roi}%)`);
  }

  if (property.price && property.price >= 50000 && property.price <= 300000) {
    met.push(`Optimal price range ($${property.price.toLocaleString()})`);
  } else {
    notMet.push('Price outside optimal range');
  }

  if (property.cashFlow && property.cashFlow >= 1000) {
    met.push(`Strong cash flow ($${property.cashFlow}/mo)`);
  } else {
    notMet.push('Cash flow below $1000/mo');
  }

  if (property.images && property.images.length >= 3) {
    met.push(`${property.images.length} images`);
  } else {
    notMet.push('Less than 3 images');
  }

  const yearBuilt = property.features?.yearBuilt;
  if (property.tenantOccupied || (yearBuilt && yearBuilt >= 2010)) {
    met.push(property.tenantOccupied ? 'Tenant occupied' : `Recently built (${yearBuilt})`);
  } else {
    notMet.push('Older property, no tenant');
  }

  const hasDescription = property.description && property.description.length > 50;
  const hasBedrooms = property.features?.bedrooms && property.features.bedrooms > 0;
  const hasBathrooms = property.features?.bathrooms && property.features.bathrooms > 0;
  
  if (hasDescription && hasBedrooms && hasBathrooms) {
    met.push('Complete listing details');
  } else {
    notMet.push('Missing details');
  }

  return {
    met,
    notMet,
    score: met.length,
  };
}
