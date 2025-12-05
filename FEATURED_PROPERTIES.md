# ⭐ Featured Properties System

## Overview

Properties are **automatically evaluated** and marked as "Featured" based on quality criteria. This ensures the best investment opportunities are highlighted to buyers.

## How It Works

### Automatic Evaluation

When a seller publishes a property, the system automatically checks 6 quality criteria:

1. **High ROI** (≥ 12%)
2. **Optimal Price Range** ($50K - $300K)
3. **Strong Cash Flow** (≥ $1,000/month)
4. **Multiple Images** (3+ photos)
5. **Good Condition** (Tenant occupied OR built after 2010)
6. **Complete Details** (Description 50+ chars, bedrooms, bathrooms)

**A property is featured if it meets at least 3 of these 6 criteria.**

### Featured Badge

Featured properties display a purple/pink gradient "FEATURED" badge on their card.

### Sorting Priority

When users select "Featured First" sorting:
1. Featured properties appear first
2. Within featured properties, sorted by quality score (0-100)
3. Non-featured properties sorted by newest first

## Quality Scoring

Featured properties are ranked 0-100 based on:

- **ROI** (up to 25 points)
  - 15%+ → 25 points
  - 12-15% → 20 points
  - 10-12% → 15 points
  - Below 10% → Proportional

- **Cash Flow** (up to 25 points)
  - $2,000+ → 25 points
  - $1,000-$2,000 → 20 points
  - $500-$1,000 → 15 points
  - Below $500 → Proportional

- **Price Sweet Spot** (up to 20 points)
  - $70K-$200K → 20 points
  - $50K-$300K → 15 points
  - $30K-$400K → 10 points
  - Outside range → 5 points

- **Image Quality** (up to 15 points)
  - 5+ images → 15 points
  - 3-4 images → 12 points
  - 2 images → 8 points
  - 1 image → 5 points

- **Property Condition** (up to 15 points)
  - Tenant occupied → 10 points
  - Built 2015+ → 5 points
  - Built 2000-2014 → 3 points

## Examples

### Featured Property Example
```
Title: Modern Family Home
Price: $120,000 ✓ (optimal range)
ROI: 13.5% ✓ (high ROI)
Cash Flow: $1,200/month ✓ (strong)
Images: 4 photos ✓ (multiple)
Year: 2018 ✓ (good condition)
Details: Complete ✓

Score: 6/6 → FEATURED
Quality Score: 95/100
```

### Non-Featured Property Example
```
Title: Investment Opportunity
Price: $450,000 ✗ (outside range)
ROI: 8.5% ✗ (below threshold)
Cash Flow: $600/month ✗ (below $1000)
Images: 2 photos ✗ (less than 3)
Year: 2005, no tenant ✗
Details: Complete ✓

Score: 1/6 → Not Featured
```

## For Sellers: How to Get Featured

To maximize your chances of being featured:

1. **Price Strategically** ($50K-$300K range)
2. **Show Strong ROI** (aim for 12%+)
3. **Demonstrate Cash Flow** ($1,000+/month)
4. **Upload Multiple Photos** (3+ high-quality images)
5. **Complete All Fields** (detailed description, beds, baths)
6. **Highlight Tenants** (if property is occupied)

### Quick Checklist

Before publishing, ensure:
- [ ] Property price is $50K-$300K
- [ ] ROI calculation shows 12%+
- [ ] Monthly cash flow is $1,000+
- [ ] At least 3 property images uploaded
- [ ] Description is detailed (50+ characters)
- [ ] Bedrooms and bathrooms specified
- [ ] Year built or tenant status provided

## Technical Details

### Files

- **`lib/featuredEvaluation.ts`** - Evaluation logic
- **`app/dashboard/seller/page.tsx`** - Auto-evaluation on submit
- **`app/properties/page.tsx`** - Featured-first sorting
- **`components/PropertyCard.tsx`** - Featured badge display

### Functions

```typescript
// Check if property should be featured
evaluateFeaturedStatus(property): boolean

// Calculate quality score (0-100)
calculateFeaturedScore(property): number

// Get criteria breakdown
getFeaturedCriteria(property): {
  met: string[];
  notMet: string[];
  score: number;
}
```

### Console Logging

When a property is featured, you'll see in the console:
```
✨ Property "Modern Family Home" is FEATURED (Score: 6/6)
Criteria met: High ROI, Good price point, High cash flow, Multiple images, Good condition, Complete details
```

## Benefits

### For Buyers
- Quickly identify high-quality opportunities
- Trust that featured properties meet quality standards
- Better investment decisions

### For Sellers
- Quality properties get more visibility
- Automatic, fair evaluation
- Incentive to provide complete information

### For Platform
- Quality control without manual review
- Consistent standards
- Better user experience

## Future Enhancements

Potential improvements:
- Manual override for admin users
- Premium featured slots (paid)
- Time-based featured rotation
- Location-based featured weighting
- Seasonal criteria adjustments
- Featured property analytics

## FAQ

**Q: Can sellers manually mark properties as featured?**  
A: No, featured status is automatically determined by quality criteria.

**Q: Do featured properties expire?**  
A: No, but their ranking may change as newer, higher-quality properties are added.

**Q: What if a property is just below the threshold?**  
A: Update the listing with better photos, more details, or adjust pricing to meet criteria.

**Q: Can featured status be removed?**  
A: Yes, if property details are edited and no longer meet 3+ criteria.

**Q: How often is featured status recalculated?**  
A: Currently only when the property is first published. Future updates may add periodic re-evaluation.

---

**The featured system ensures buyers see the best investment opportunities first, while motivating sellers to create high-quality, detailed listings.**
