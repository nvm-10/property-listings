# 🏠 PropertyHub - Detroit Rental Properties for Canadian Investors

A modern platform connecting Canadian investors with turnkey Detroit rental properties featuring Section 8 tenants and guaranteed cash flow. Specializing in Michigan real estate investments.

## ✨ Features

### 🎨 Design & UI
- **Modern, Attractive Design** with gradient backgrounds and smooth animations
- **Glassmorphism Effects** for a premium look
- **Responsive Design** that works perfectly on all devices
- **Beautiful Property Cards** with hover effects and detailed information
- **Smooth Animations** using Framer Motion
- **Custom Color Scheme** with cyan/blue and purple gradients

### 🚀 Technologies Used

- **Next.js 16** - Latest version with App Router
- **TypeScript** - Type-safe code
- **Tailwind CSS v4** - Modern utility-first CSS framework
- **Framer Motion** - Smooth, professional animations
- **Lucide React** - Beautiful, consistent icons
- **React Hook Form** - Form management
- **Zod** - Schema validation
- **jsPDF** - PDF generation for property details

### 💼 Key Features

1. **Detroit-Focused Listings** - Curated Detroit rental properties and Michigan real estate
2. **Section 8 Ready** - Properties with Section 8 tenants for guaranteed income
3. **Canadian Investor Friendly** - Streamlined process for Canadians investing in the USA
4. **Property Cards** - Show:
   - Detroit property images with hover effects
   - Price and ROI metrics for Michigan real estate
   - Monthly cash flow from Section 8 tenants
   - Property features (beds, baths, sqft)
   - Tenant occupancy status
   - Property type badges
   - Status indicators (Available/Pending/Sold)
5. **Investment Blog** - Educational content for Canadian investors about Detroit rental properties
6. **PDF Download** - Download professional property details as PDF documents for offline viewing and sharing
7. **Statistics Section** - Display impressive metrics
6. **Call-to-Action Sections** - Strategic CTAs throughout
7. **Smooth Scroll Animations** - Elements animate on scroll
8. **Sticky Navigation** - Transparent header that becomes solid on scroll

## 📁 Project Structure

```
property-listings/
├── app/
│   ├── layout.tsx          # Root layout with Navbar
│   ├── page.tsx            # Home page with hero & featured properties
│   ├── properties/
│   │   └── page.tsx        # All properties with filters
│   └── globals.css         # Global styles & custom CSS
├── components/
│   ├── Navbar.tsx          # Navigation header
│   └── PropertyCard.tsx    # Reusable property card
├── data/
│   └── properties.ts       # Sample property data
├── types/
│   └── property.ts         # TypeScript interfaces
├── utils/
│   └── pdfGenerator.ts     # PDF generation utility
└── public/                 # Static assets
```

## 🎯 Design Highlights

### Color Palette
- **Primary (Cyan/Blue)**: `#0ea5e9`
- **Accent (Purple)**: `#d946ef`
- **Gradients**: Smooth transitions between cyan → purple
- **Neutral Grays**: Professional gray scale for text and backgrounds

### Typography
- **Headings**: Bold, large sizes with gradient text effects
- **Body**: Clean, readable Inter font family
- **Numbers**: Extra bold for emphasis on pricing and ROI

### Components

#### Property Cards
- Clean white background
- Rounded corners (2xl)
- Shadow on hover with lift effect
- Badge system for status and featured properties
- Gradient buttons
- Icon-based feature display

#### Navigation
- Fixed position with backdrop blur
- Smooth color transition on scroll
- Mobile-responsive hamburger menu
- Gradient logo icon

## 🚀 Getting Started

### Installation

The project is already set up! Just run:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the result.

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## 📊 Sample Data

The project includes 6 sample properties with realistic Detroit real estate data:
- Single Family Residences
- Duplexes
- Multi-Family properties
- Portfolio packages

Each property includes:
- Multiple high-quality images (from Unsplash)
- Detailed location information
- Financial metrics (Price, ROI, Cash Flow)
- Property features
- Tenant status
- Highlights

## 🎨 Customization

### Colors
Edit `app/globals.css` to change the color scheme:
```css
:root {
  --primary: #0ea5e9;
  --accent: #d946ef;
}
```

### Property Data
Add or modify properties in `data/properties.ts`:
```typescript
{
  id: '7',
  title: 'Your Property',
  price: 100000,
  roi: 12.5,
  // ... more fields
}
```

### Animations
Adjust animation timings in components using Framer Motion props:
```typescript
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.6 }}
>
```

## 🌟 Best Practices Used

1. **Component Reusability** - DRY principle
2. **TypeScript** - Type safety throughout
3. **Responsive Design** - Mobile-first approach
4. **Performance** - Optimized images with Next.js Image
5. **Accessibility** - Semantic HTML and ARIA labels
6. **SEO** - Proper meta tags and structure
7. **Modern CSS** - Tailwind v4 with custom properties

## 📱 Pages

### Home Page (/)
- Full-screen hero with gradient background
- Key features showcase
- Statistics section
- Featured properties (3 cards)
- Call-to-action sections

### Properties Page (/properties)
- All properties grid
- Search functionality
- Type filtering
- Sort options (price, ROI, featured)
- Results count

## 📥 PDF Download Feature

Each property can be downloaded as a **comprehensive investment analysis PDF** that includes:

- **Property Title & Price** - Prominent display with red pricing
- **UNLEVERAGED Analysis** - Full cash purchase scenario with ROI, income/expense breakdown
- **LEVERAGED Analysis** - Financed purchase scenario (25% down) with ROI, mortgage calculations
- **Side-by-Side Comparison** - Professional tables comparing both investment scenarios
- **Detailed Financial Projections**:
  - Monthly and yearly rental income (with 4% vacancy rate)
  - Property taxes, insurance, maintenance estimates
  - Property management fees (10%)
  - Mortgage calculations (7% interest, 30-year term for leveraged)
  - Net income projections
- **House Details** - Bedrooms, bathrooms, lot size, square footage, garage, projected rent
- **Legal Disclaimer** - Investment analysis disclaimer
- **Professional Formatting** - Clean tabular layout matching industry standards

### Usage

**From Property Cards:**
- Click the "PDF" button on any property card to instantly download

**From Property Detail Page:**
- Click the "Download Details" button in the sidebar

### Technical Implementation

The PDF generator (`utils/pdfGenerator.ts`) uses jsPDF to create:
- Multi-page layouts with automatic page breaks
- Color-coded sections matching the website theme
- Formatted pricing and financial metrics
- Wrapped text for descriptions and highlights
- Footer with generation date and property ID

## 🔮 Future Enhancements

- Contact form
- About page
- Blog/News section
- Property comparison tool
- Save favorites
- Email notifications
- Virtual tours
- Mortgage calculator
- User authentication
- Admin dashboard

## 📞 Support

For questions or support:
- Phone: 1-866-964-6088
- Email: contact@propertyhub.com

## 📄 License

This project is built for demonstration purposes.

---

Built with ❤️ using Next.js 16, TypeScript, and Tailwind CSS v4
