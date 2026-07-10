# Banner Image Setup

## Location
Save the Rebekha Catering promotional banner image to this directory as:
- **Filename**: `business-banner.jpg`
- **Path**: `src/assets/business-banner.jpg`

## Image Details
- **Purpose**: Promotional business banner displayed on the Home page
- **Placement**: Featured section after the hero, before the About section
- **Format**: JPG (can also use PNG)
- **Recommended Size**: 1200px width minimum for optimal quality

## Implementation
The banner image is already imported and used in `src/pages/Home.tsx`:
```typescript
import businessBannerImage from "@/assets/business-banner.jpg";
```

Once you save the image file to this location, it will automatically display on the website.

## Additional Info
- The banner section includes responsive design for mobile and desktop
- Business info cards below the banner display contact, location, and license details
- The section uses the same design system as the rest of the website
