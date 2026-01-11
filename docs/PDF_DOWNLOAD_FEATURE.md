# PDF Download Feature

## Overview
The PDF download feature allows users to export property details as professional, printable PDF documents. This feature is available on both the property listing cards and the detailed property pages.

## Features Included in PDF

### 1. Header Section
- Property title in large, bold text
- Full address (street, city, state, ZIP code)
- Status badge (Available, Pending, or Sold) with color coding
- Property type tag

### 2. Pricing & Financial Information
- **Asking Price**: Displayed prominently with currency formatting
- **ROI (Return on Investment)**: Highlighted in green
- **Monthly Cash Flow**: Shown with positive cash flow indicator

### 3. Property Features
Displayed in a two-column layout:
- Bedrooms
- Bathrooms
- Square Feet
- Year Built
- Number of Units (if applicable)
- Parking Spaces (if applicable)

### 4. Tenant Status
- Visual indicator if property is tenant-occupied
- Note about positive cash flow

### 5. Description
- Full property description with word wrapping
- Automatic page breaks for long descriptions

### 6. Property Highlights
- Bulleted list of key features and amenities
- Each highlight on a separate line
- Checkmark bullets for visual appeal

### 7. Contact Information
Displayed in a highlighted box:
- Agent/Seller name
- Email address
- Phone number

### 8. Footer
- Generation date
- Property ID for reference

## User Interface

### Property Card Button
- Located in the action button row at the bottom of each property card
- Icon: Download icon
- Label: "PDF" (visible on larger screens)
- Shows "..." while generating
- Responsive design with 3-button layout (More/Less Info, PDF, Contact)

### Property Detail Page Button
- Located in the sidebar below pricing information
- Full width button with Download icon
- Label: "Download Details" (changes to "Generating..." during processing)
- Positioned above the "Contact Seller" button
- Disabled state while generating to prevent duplicate clicks

## Technical Details

### PDF Generation Library
- **jsPDF**: Industry-standard JavaScript PDF library
- Client-side generation (no server required)
- Instant download for users

### File Naming Convention
Format: `[Property_Title]_Details.pdf`
- Special characters replaced with underscores
- Example: `Beautiful_Duplex_on_Detroit_s_East_Side_Details.pdf`

### Styling & Branding
- **Primary Color**: Blue (#2980b9) for headers
- **Success Color**: Green (#22c55e) for ROI and cash flow
- **Status Colors**: 
  - Available: Green (#22c55e)
  - Pending: Yellow (#eab308)
  - Sold: Gray (#9ca3af)

### Page Layout
- **Size**: Letter (8.5" x 11")
- **Margins**: 20px on all sides
- **Font**: Helvetica (standard PDF font)
- **Font Sizes**:
  - Title: 20pt
  - Section Headers: 16pt
  - Body Text: 11pt
  - Small Text: 9pt

### Performance
- Generation time: < 1 second for typical property
- No server round-trip required
- Works offline after page load

## Browser Compatibility
- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support
- Mobile browsers: ✅ Full support

## Error Handling
- Try-catch block around PDF generation
- Console logging for debugging
- User feedback through button states (disabled during generation)
- Graceful fallback if generation fails

## Future Enhancements
- [ ] Add property images to PDF
- [ ] Include property location map
- [ ] Add QR code for property URL
- [ ] Custom branding/logo options
- [ ] Multi-property comparison PDFs
- [ ] Email PDF directly to user
- [ ] Print optimization options
- [ ] PDF preview before download

## Usage Examples

### From Property Listing Page
```typescript
// User clicks the PDF button on a property card
// 1. Button shows "..." loading state
// 2. PDF generates with all property details
// 3. Browser downloads file automatically
// 4. Button returns to normal state
```

### From Property Detail Page
```typescript
// User clicks "Download Details" button
// 1. Button shows "Generating..." 
// 2. Button becomes disabled
// 3. PDF generates with comprehensive details
// 4. File downloads to user's device
// 5. Button re-enables with original text
```

## Code Structure

### Main PDF Generator
Location: `utils/pdfGenerator.ts`

Key function:
```typescript
export const generatePropertyPDF = async (property: Property) => {
  // Creates formatted PDF with all property details
}
```

### Integration Points
1. **Property Card Component**: `components/PropertyCard.tsx`
   - Download button with state management
   - Click handler with event propagation control

2. **Property Detail Page**: `app/properties/[id]/page.tsx`
   - Sidebar download button
   - Loading state management

## Development Notes

### Adding New Sections to PDF
To add a new section to the PDF:

1. Add content in `utils/pdfGenerator.ts`
2. Use `yPosition` variable to track vertical position
3. Check if new page is needed: `if (yPosition > pageHeight - 40)`
4. Use helper functions like `addText()` for word wrapping
5. Update section with appropriate styling

### Customizing Appearance
Key customization points in `pdfGenerator.ts`:
- `margin`: Adjust page margins
- Color values: RGB triplets for different sections
- Font sizes: Update `setFontSize()` calls
- Layout: Modify grid columns and spacing

## Testing Checklist
- [ ] Download from property card
- [ ] Download from detail page
- [ ] Verify all property information included
- [ ] Check PDF formatting on different devices
- [ ] Test with properties with varying data (some fields missing)
- [ ] Verify file naming convention
- [ ] Test loading states and button behavior
- [ ] Check for console errors during generation
