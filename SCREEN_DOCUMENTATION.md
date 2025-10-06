# Olympus UI - Screen & Component Documentation

## Application Overview

The Olympus UI application is a service request creation flow with a homepage, search functionality, and a multi-step form process. The application follows a mobile-first design approach with a clean, modern interface.

## User Flow

```
Homepage → Search Page → Radio Buttons → Checkboxes → Text Field → Completion
```

## Main Screens

### 1. Homepage Screen

**File:** `src/components/Homepage.tsx`  
**Purpose:** Entry point of the application, displays service categories and search functionality

**Components Used:**

- `Header` - Contains logo, status bar, and search bar
- `ServiceCategories` - Displays categorized service options
- `BottomNavigation` - Bottom navigation bar

**Key Features:**

- Service category browsing
- Search bar for service discovery
- Mobile-optimized layout
- Clickable service items that start the request flow

**Props:**

- `onSearch: () => void` - Callback when search is initiated
- `onServiceClick: (serviceName: string) => void` - Callback when a service is selected

---

### 2. Search Page Screen

**File:** `src/components/SearchPage.tsx`  
**Purpose:** Dedicated search interface with search results

**Key Features:**

- Search input field
- Real-time search filtering
- Service result list
- Back navigation to homepage

**Props:**

- `onBack: () => void` - Callback for back navigation
- `onServiceSelect: (serviceName: string) => void` - Callback when a service is selected

---

### 3. Radio Button Screen (Step 1)

**File:** `src/components/RadioButtonScreen.tsx`  
**Purpose:** First step of the request creation form - radio button selection

**Components Used:**

- `StatusBar` - Mobile status bar
- `Header` (FormHeader) - Form header with back/close buttons
- `ProgressBar` - Progress indicator
- `PriceRange` - Price range display
- `SeasonalityBanner` - Seasonal information banner
- `CTA` - Call-to-action button

**Key Features:**

- Radio button selection for service options
- Progress tracking
- Price range display
- Seasonal information

**Props:**

- `onNext: () => void` - Callback to proceed to next step
- `onBack: () => void` - Callback for back navigation

---

### 4. Checkbox Screen (Step 2)

**File:** `src/components/CheckboxScreen.tsx`  
**Purpose:** Second step of the request creation form - checkbox selection

**Components Used:**

- `StatusBar` - Mobile status bar
- `Header` (FormHeader) - Form header with back/close buttons
- `ProgressBar` - Progress indicator
- `PriceRange` - Price range display
- `SeasonalityBanner` - Seasonal information banner
- `CTA` - Call-to-action button

**Key Features:**

- Multiple checkbox selection
- Progress tracking
- Price range display
- Seasonal information

**Props:**

- `onNext: () => void` - Callback to proceed to next step
- `onBack: () => void` - Callback for back navigation

---

### 5. Text Field Screen (Step 3)

**File:** `src/components/TextFieldScreen.tsx`  
**Purpose:** Final step of the request creation form - text input

**Components Used:**

- `StatusBar` - Mobile status bar
- `Header` (FormHeader) - Form header with back/close buttons
- `ProgressBar` - Progress indicator
- `PriceRange` - Price range display
- `SeasonalityBanner` - Seasonal information banner
- `TextAreaInput` - Text input component
- `ExamplesSection` - Example suggestions
- `CTA` - Call-to-action button

**Key Features:**

- Text area for additional details
- Example suggestions
- Progress tracking
- Form completion

**Props:**

- `onNext: () => void` - Callback when form is completed
- `onBack: () => void` - Callback for back navigation

---

## Shared Components

### Navigation Components

#### NavigationApp

**File:** `src/components/NavigationApp.tsx`  
**Purpose:** Main navigation controller that manages screen transitions

**Features:**

- Screen state management
- Navigation flow control
- Back button handling
- Service selection handling

#### FormHeader

**File:** `src/components/FormHeader.tsx`  
**Purpose:** Header component for form screens

**Features:**

- Back button
- Title display
- Close button

#### Header (Homepage)

**File:** `src/components/Header.tsx`  
**Purpose:** Header component for homepage with search functionality

**Features:**

- Mobile status bar
- Logo display
- Search bar integration

### UI Components

#### SearchBar

**File:** `src/components/SearchBar.tsx`  
**Purpose:** Search input component

**Features:**

- Clickable search interface
- Search icon
- Placeholder text

#### ServiceCategories

**File:** `src/components/ServiceCategories.tsx`  
**Purpose:** Container for service category sections

**Features:**

- Multiple category display
- Service click handling

#### ServiceCategory

**File:** `src/components/ServiceCategory.tsx`  
**Purpose:** Individual service category section

**Features:**

- Category title
- Horizontal scrolling service list
- Service item rendering

#### ServiceItem

**File:** `src/components/ServiceItem.tsx`  
**Purpose:** Individual service item display

**Features:**

- Service image
- Service name
- Click handling

#### BottomNavigation

**File:** `src/components/BottomNavigation.tsx`  
**Purpose:** Bottom navigation bar

**Features:**

- Home, Search, Requests, Profile tabs
- Active state indication

### Form Components

#### StatusBar

**File:** `src/components/StatusBar.tsx`  
**Purpose:** Mobile status bar simulation

**Features:**

- Time display
- Battery indicator
- Signal indicators

#### ProgressBar

**File:** `src/components/ProgressBar.tsx`  
**Purpose:** Progress indicator for form steps

**Features:**

- Visual progress representation
- Step completion indication

#### PriceRange

**File:** `src/components/PriceRange.tsx`  
**Purpose:** Price range display component

**Features:**

- Min/max price display
- Price formatting

#### SeasonalityBanner

**File:** `src/components/SeasonalityBanner.tsx`  
**Purpose:** Seasonal information banner

**Features:**

- Seasonal messaging
- Visual indicators

#### CTA (Call-to-Action)

**File:** `src/components/CTA.tsx`  
**Purpose:** Call-to-action button component

**Features:**

- Primary action button
- Click handling
- Styling consistency

### Additional Components

#### CheckoutPage

**File:** `src/components/CheckoutPage.tsx`  
**Purpose:** Checkout/payment page (standalone)

**Features:**

- Payment form
- Credit card input
- Payment processing

#### CreditCardForm

**File:** `src/components/CreditCardForm/CreditCardForm.tsx`  
**Purpose:** Credit card input form

**Features:**

- Card number input
- Expiry date input
- CVV input
- Form validation

#### PaymentInfoCard

**File:** `src/components/PaymentInfoCard/PaymentInfoCard.tsx`  
**Purpose:** Payment information display card

**Features:**

- Payment summary
- Information display

## Navigation Flow

### Screen Transitions

1. **Homepage** → **Search Page**: Click search bar or search button
2. **Homepage** → **Radio Button Screen**: Click any service item
3. **Search Page** → **Radio Button Screen**: Click any search result
4. **Search Page** → **Homepage**: Click back button
5. **Radio Button Screen** → **Checkbox Screen**: Click next button
6. **Checkbox Screen** → **Text Field Screen**: Click next button
7. **Text Field Screen** → **Completion**: Click next button

### Back Navigation

- Each screen has a back button that returns to the previous screen
- Homepage is the root screen (no back navigation)
- Form screens maintain the flow sequence

## File Structure

```
src/components/
├── Homepage.tsx              # Main homepage screen
├── SearchPage.tsx            # Search interface
├── RadioButtonScreen.tsx     # Form step 1
├── CheckboxScreen.tsx        # Form step 2
├── TextFieldScreen.tsx       # Form step 3
├── NavigationApp.tsx         # Navigation controller
├── Header.tsx                # Homepage header
├── FormHeader.tsx            # Form screen header
├── SearchBar.tsx             # Search input
├── ServiceCategories.tsx     # Service categories container
├── ServiceCategory.tsx       # Individual category
├── ServiceItem.tsx           # Service item display
├── BottomNavigation.tsx      # Bottom nav bar
├── StatusBar.tsx             # Mobile status bar
├── ProgressBar.tsx           # Progress indicator
├── PriceRange.tsx            # Price display
├── SeasonalityBanner.tsx     # Seasonal banner
├── CTA.tsx                   # Call-to-action button
├── CheckoutPage.tsx          # Checkout page
├── CreditCardForm/           # Credit card form components
└── PaymentInfoCard/          # Payment info components
```

## Usage Notes

- All screens are designed for mobile-first experience
- Navigation is handled through the `NavigationApp` component
- Form data is not persisted between sessions
- Service selection triggers the request creation flow
- Search functionality provides filtered results
- Progress tracking shows user's position in the flow
