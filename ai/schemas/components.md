# Component Registry

Component library for Homerun marketplace (Armut, ProntoPro variants).

## Design Principles

- **Mobile-first**: All components optimized for 375px–428px viewports
- **Accessibility**: WCAG 2.1 AA minimum; keyboard navigation required
- **Brand consistency**: Use design tokens (colors, spacing, typography)
- **Performance**: Lazy load heavy components; minimize re-renders

## Design Tokens

```tsx
// Brand Colors
primary: '#2cb34f'      // Green (CTAs, active states)
secondary: '#e3e5e8'    // Light gray (borders, backgrounds)
success: '#c6f1d1'      // Light green (progress, success states)
text: '#000000'         // Black (primary text)
textSecondary: '#6b7280' // Gray (secondary text)
error: '#ef4444'        // Red (errors, warnings)
white: '#ffffff'

// Spacing (Tailwind scale)
xs: 0.25rem  // 4px
sm: 0.5rem   // 8px
md: 1rem     // 16px
lg: 1.5rem   // 24px
xl: 2rem     // 32px
```

---

## Core Components

### Button / CTA

Fixed-position call-to-action button.

**Props:**

- `onClick•` (function): Click handler
- `children•` (ReactNode): Button label
- `className` (string): Additional Tailwind classes
- `disabled` (boolean): Disable interaction

**Rules:**

- Always use for primary actions (submit form, continue flow)
- Fixed to bottom of viewport on mobile
- Use brand primary color (`#2cb34f`)

**Example:**

```tsx
<CTA onClick={handleSubmit}>Continue to quotes</CTA>
```

---

### FormField

Text input, select, or textarea field.

**Props:**

- `name•` (string): Field name (must match DB schema)
- `label•` (string): Visible label
- `type•` (string): `text` | `email` | `tel` | `number` | `select` | `textarea` | `date`
- `value` (string | number): Controlled value
- `onChange` (function): Change handler
- `placeholder` (string): Placeholder text
- `helpText` (string): Helper text below input
- `error` (string): Error message
- `required` (boolean): Mark as required
- `options` (array): For `type="select"`: `{label, value}[]`

**Rules:**

- Include `helpText` for complex fields (e.g., budget, date)
- Show `error` inline below field
- Use semantic HTML (`<input>`, `<select>`, `<textarea>`)
- Label must be visible (not placeholder-only)

**Example:**

```tsx
<FormField
  name="budget_min"
  label="Minimum Budget"
  type="number"
  placeholder="e.g., 100"
  helpText="Enter amount in EUR"
  required
/>

<FormField
  name="category"
  label="Service Category"
  type="select"
  options={[
    { label: 'Plumbing', value: 'plumbing' },
    { label: 'Electrical', value: 'electrical' }
  ]}
/>
```

---

### QuoteCard

Displays a professional's quote (price, ETA, rating).

**Props:**

- `proName•` (string): Professional name
- `price•` (number): Price in cents
- `currency•` (string): ISO currency code (e.g., `EUR`, `USD`, `TRY`)
- `eta` (number): Estimated days to completion
- `rating` (number): 0–5 star rating
- `reviewCount` (number): Number of reviews
- `proAvatar` (string): Avatar image URL
- `onClick` (function): Selection handler

**Rules:**

- Price must include currency symbol (format: `€123.45`)
- If `rating` provided, show stars + `reviewCount`
- Use card layout with hover state
- Include CTA button ("Select Pro")

**Example:**

```tsx
<QuoteCard
  proName="Mario Rossi"
  price={12000}
  currency="EUR"
  eta={3}
  rating={4.5}
  reviewCount={42}
  onClick={() => selectQuote(quoteId)}
/>
```

---

### ServiceCard

Displays a service category with icon and name.

**Props:**

- `name•` (string): Service name
- `icon•` (string): Icon URL or component
- `onClick•` (function): Click handler
- `description` (string): Short description

**Rules:**

- Use on homepage and search results
- Icon should be 48×48px minimum
- Prefer SVG icons
- Show hover/active state

**Example:**

```tsx
<ServiceCard
  name="Plumbing"
  icon="/icons/plumbing.svg"
  description="Leaks, installations, repairs"
  onClick={() => navigate("/request/plumbing")}
/>
```

---

### ProgressBar

Linear progress indicator for multi-step flows.

**Props:**

- `value•` (number): Current progress value
- `max` (number): Maximum value (default: 100)
- `label` (string): Accessible label

**Rules:**

- Use on checkout, request forms (multi-step)
- Show percentage visually
- Use success color (`#c6f1d1` background, `#2cb34f` fill)

**Example:**

```tsx
<ProgressBar value={2} max={4} label="Step 2 of 4" />
```

---

### Stepper

Multi-step form indicator (dots or numbered).

**Props:**

- `steps•` (array): Step labels: `{id, label}[]`
- `current•` (number): Current step index (0-based)
- `onStepClick` (function): Optional navigation handler

**Rules:**

- Always visible on multi-step flows
- Mark completed steps with checkmark or fill
- Current step uses primary color
- Disable future steps (not clickable)

**Example:**

```tsx
<Stepper
  steps={[
    { id: "details", label: "Details" },
    { id: "quotes", label: "Quotes" },
    { id: "payment", label: "Payment" },
  ]}
  current={1}
/>
```

---

### SearchBar

Search input with icon and autocomplete.

**Props:**

- `placeholder•` (string): Placeholder text
- `value` (string): Controlled value
- `onChange•` (function): Change handler
- `onSubmit` (function): Submit handler (Enter key)
- `suggestions` (array): Autocomplete items: `string[]`
- `loading` (boolean): Show loading spinner

**Rules:**

- Use debounce (300ms) for autocomplete
- Show max 5–8 suggestions
- Highlight matching text in suggestions
- Clear button when value present

**Example:**

```tsx
<SearchBar
  placeholder="Search services (e.g., plumber)"
  value={query}
  onChange={setQuery}
  suggestions={["Plumbing", "Plumber near me", "Pipe repair"]}
/>
```

---

### Header / StatusBar

Top navigation bar with logo, title, and actions.

**Props:**

- `title` (string): Page title
- `showBack` (boolean): Show back button
- `onBack` (function): Back button handler
- `actions` (ReactNode): Right-side actions (e.g., notifications)

**Rules:**

- Fixed to top of viewport
- Include safe area insets (iOS notch)
- Logo left, title center, actions right
- Back button uses `←` icon or "Back"

**Example:**

```tsx
<Header
  title="Request Service"
  showBack
  onBack={() => navigate(-1)}
  actions={<NotificationBell count={3} />}
/>
```

---

### BottomNavigation

Bottom tab bar for main app sections.

**Props:**

- `tabs•` (array): Tab items: `{id, label, icon, href}[]`
- `active•` (string): Active tab ID
- `onChange•` (function): Tab change handler

**Rules:**

- Fixed to bottom of viewport
- 3–5 tabs maximum
- Icon + label for each tab
- Highlight active tab with primary color

**Example:**

```tsx
<BottomNavigation
  tabs={[
    { id: "home", label: "Home", icon: "home", href: "/" },
    { id: "requests", label: "Requests", icon: "inbox", href: "/requests" },
    { id: "profile", label: "Profile", icon: "user", href: "/profile" },
  ]}
  active="home"
  onChange={(id) => navigate(tabs.find((t) => t.id === id).href)}
/>
```

---

### Checkbox / CheckboxGroup

Single or grouped checkboxes.

**Props:**

- `name•` (string): Field name
- `label•` (string): Label text
- `checked` (boolean): Checked state
- `onChange` (function): Change handler
- `disabled` (boolean): Disable interaction
- `options` (array): For groups: `{label, value}[]`

**Rules:**

- Use for multi-select (e.g., "Select services")
- Label must be clickable (wraps input)
- Show checkmark icon when checked

**Example:**

```tsx
<CheckboxGroup
  name="services"
  options={[
    { label: "Pipe repair", value: "pipe_repair" },
    { label: "Drain cleaning", value: "drain_clean" },
  ]}
  onChange={setSelectedServices}
/>
```

---

### RadioButton / RadioGroup

Single or grouped radio buttons.

**Props:**

- `name•` (string): Field name
- `options•` (array): `{label, value, description?}[]`
- `value` (string): Selected value
- `onChange` (function): Change handler

**Rules:**

- Use for single-select (e.g., "Choose payment method")
- Show description below label if provided
- Only one can be selected

**Example:**

```tsx
<RadioGroup
  name="payment_method"
  options={[
    { label: "Credit Card", value: "card", description: "Visa, Mastercard" },
    { label: "PayPal", value: "paypal" },
  ]}
  value={paymentMethod}
  onChange={setPaymentMethod}
/>
```

---

### PriceRange

Dual-handle slider for budget selection.

**Props:**

- `min•` (number): Minimum value
- `max•` (number): Maximum value
- `value•` (array): `[minValue, maxValue]`
- `onChange•` (function): Change handler
- `currency` (string): Currency code (default: `EUR`)
- `step` (number): Increment step (default: 10)

**Rules:**

- Show current values above handles
- Format with currency symbol
- Snap to step increments

**Example:**

```tsx
<PriceRange
  min={0}
  max={1000}
  value={[100, 500]}
  onChange={setBudgetRange}
  currency="EUR"
  step={50}
/>
```

---

### PaymentInfoCard / CreditCardForm

Payment method input or display.

**Props (CreditCardForm):**

- `onSubmit•` (function): Form submit handler
- `loading` (boolean): Processing state

**Props (PaymentInfoCard):**

- `cardLast4•` (string): Last 4 digits
- `cardBrand` (string): `visa` | `mastercard` | `amex`
- `expiryDate` (string): MM/YY format
- `onEdit` (function): Edit handler

**Rules:**

- Never log or store raw card numbers
- Use Stripe/payment gateway for tokenization
- Show card brand icon
- Validate with Luhn algorithm (client-side only)

**Example:**

```tsx
<CreditCardForm onSubmit={handlePayment} loading={processing} />

<PaymentInfoCard
  cardLast4="4242"
  cardBrand="visa"
  expiryDate="12/25"
  onEdit={() => setEditMode(true)}
/>
```

---

### SeasonalityBanner

Info banner for seasonal messaging.

**Props:**

- `message•` (string): Banner message
- `icon` (string): Icon name or URL
- `onDismiss` (function): Dismiss handler
- `variant` (string): `info` | `warning` | `success`

**Rules:**

- Show at top of page (below header)
- Use appropriate color per variant
- Include dismiss button (X)

**Example:**

```tsx
<SeasonalityBanner
  message="High demand for heating repairs this week"
  variant="info"
  onDismiss={() => dismissBanner("heating_2024")}
/>
```

---

## Layout Components

### Container

Max-width wrapper for content.

**Props:**

- `children•` (ReactNode): Content
- `maxWidth` (string): `sm` | `md` | `lg` (default: `md`)

**Rules:**

- Use for all page content
- Center horizontally
- Add horizontal padding (16px mobile)

**Example:**

```tsx
<Container maxWidth="md">
  <h1>Welcome to Homerun</h1>
</Container>
```

---

### Stack

Vertical or horizontal spacing container.

**Props:**

- `children•` (ReactNode): Child elements
- `direction` (string): `row` | `column` (default: `column`)
- `spacing` (string): `xs` | `sm` | `md` | `lg` | `xl` (default: `md`)
- `align` (string): `start` | `center` | `end`

**Example:**

```tsx
<Stack spacing="lg">
  <FormField name="email" label="Email" />
  <FormField name="phone" label="Phone" />
</Stack>
```

---

## Validation & Error Handling

### Form Validation

- Validate on blur (not on every keystroke)
- Show errors inline below field
- Disable submit button until valid
- Use consistent error messages:
  - Required: "{Field} is required"
  - Format: "Please enter a valid {field}"
  - Range: "{Field} must be between {min} and {max}"

### Error Messages

```tsx
{
  required: "This field is required",
  email: "Please enter a valid email address",
  phone: "Please enter a valid phone number",
  budget: "Budget must be between €50 and €10,000",
  date: "Please select a future date"
}
```

---

## Accessibility Checklist

- [ ] Keyboard navigable (Tab, Enter, Escape)
- [ ] Focus indicators visible
- [ ] ARIA labels on icons/buttons without text
- [ ] Color contrast ≥4.5:1 (text), ≥3:1 (UI)
- [ ] Screen reader tested (VoiceOver, NVDA)
- [ ] Error messages announced to screen readers

---

## Testing Guidelines

- Unit tests: all interactive components (Button, FormField, etc.)
- Integration tests: multi-step flows (RequestService → ViewQuotes)
- Visual regression: Chromatic or Percy
- Accessibility: axe-core or Pa11y

---

## Code Examples

### Complete Form Flow

```tsx
import { FormField, CTA, ProgressBar, Stepper } from "@/components";

function RequestServiceForm() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    category: "",
    location: "",
    preferred_date: "",
    budget_min: 0,
    budget_max: 1000,
  });

  const steps = [
    { id: "category", label: "Service" },
    { id: "details", label: "Details" },
    { id: "budget", label: "Budget" },
  ];

  return (
    <>
      <Stepper steps={steps} current={step} />
      <ProgressBar value={step + 1} max={steps.length} />

      {step === 0 && (
        <FormField
          name="category"
          label="What service do you need?"
          type="select"
          options={serviceCategories}
          value={formData.category}
          onChange={(val) => setFormData({ ...formData, category: val })}
          required
        />
      )}

      {step === 1 && (
        <>
          <FormField
            name="location"
            label="Your location"
            type="text"
            placeholder="City or postal code"
            value={formData.location}
            onChange={(val) => setFormData({ ...formData, location: val })}
            required
          />
          <FormField
            name="preferred_date"
            label="When do you need this?"
            type="date"
            value={formData.preferred_date}
            onChange={(val) =>
              setFormData({ ...formData, preferred_date: val })
            }
            helpText="Select your preferred start date"
          />
        </>
      )}

      {step === 2 && (
        <PriceRange
          min={0}
          max={5000}
          value={[formData.budget_min, formData.budget_max]}
          onChange={([min, max]) =>
            setFormData({ ...formData, budget_min: min, budget_max: max })
          }
          currency="EUR"
        />
      )}

      <CTA onClick={() => (step < 2 ? setStep(step + 1) : submitRequest())}>
        {step < 2 ? "Continue" : "Submit Request"}
      </CTA>
    </>
  );
}
```
