
### DAY_1


Perfect. Let's treat this like we're building a production-grade React application, not just a hackathon project.

I'll assume:

* ✅ React + Vite
* ✅ Tailwind CSS v4
* ✅ React Router
* ✅ **Tabler Icons**
* ✅ **React Toastify**
* ✅ Axios
* ✅ React Hook Form + Zod
* ✅ TanStack Table
* ✅ Recharts
* ❌ No shadcn
* ❌ No component libraries (Material UI, Ant Design, etc.)

---

# AuctXI Frontend Roadmap

We'll divide the frontend into **12 phases**.

**Rule:** We never move to the next phase until the previous one is complete.

---

# PHASE 1 — Project Foundation

This phase contains **no UI**.

---

## Step 1 — Install Packages

```bash
npm install react-router-dom
npm install axios
npm install @tabler/icons-react
npm install react-hook-form
npm install zod
npm install @hookform/resolvers
npm install @tanstack/react-table
npm install recharts
npm install react-toastify
npm install clsx
npm install tailwind-merge
```

---

## Step 2 — Folder Structure

Inside `src`

```
src
│
├── assets
├── components
├── config
├── constants
├── context
├── data
├── hooks
├── layouts
├── pages
├── routes
├── services
├── styles
├── utils
│
├── App.jsx
└── main.jsx
```

Do **NOT** create every file yet.

Only folders.

---

# Step 3 — Assets

Inside

```
assets
```

create

```
assets
│
├── avatars
├── icons
├── illustrations
├── images
└── logos
```

---

# Step 4 — Styles Folder

Inside

```
styles
```

create

```
styles
│
├── variables.css
├── typography.css
├── utilities.css
└── animations.css
```

---

# Step 5 — Config Folder

Create

```
config
│
├── navigation.js
└── theme.js
```

Nothing else.

---

# Step 6 — Constants

Create

```
constants
│
├── routes.js
├── roles.js
├── auctionStatus.js
├── paymentStatus.js
└── playerStatus.js
```

---

# Step 7 — Utils

Create

```
utils
│
├── cn.js
├── formatCurrency.js
├── formatDate.js
└── helpers.js
```

---

# Step 8 — Data

Since backend doesn't exist

```
data
│
├── dashboard.js
├── auctions.js
├── players.js
├── teams.js
├── users.js
└── payments.js
```

---

# Step 9 — Services

```
services
│
├── api.js
├── auctionService.js
├── playerService.js
├── teamService.js
├── userService.js
└── paymentService.js
```

Initially these will just return mock data.

Later they'll use Axios.

---

# Step 10 — Context

```
context
│
├── AuthContext.jsx
└── SidebarContext.jsx
```

---

# Step 11 — Hooks

```
hooks
│
├── useSidebar.js
├── usePagination.js
├── useSearch.js
└── useDebounce.js
```

---

# Step 12 — Layouts

```
layouts
│
├── DashboardLayout.jsx
└── AuthLayout.jsx
```

---

After this,

**PHASE 1 is complete.**

No UI yet.

---

# PHASE 2 — Design System

Now we decide every design rule.

---

## Colors

Already done.

We'll improve later.

---

## Typography

Need to decide

```
Display

H1

H2

H3

H4

Body

Small

Caption
```

---

## Radius

Choose ONE scale.

Example

```
Button

rounded-lg

Card

rounded-xl

Modal

rounded-2xl
```

---

## Shadows

```
Card

shadow-sm

Dropdown

shadow-md

Modal

shadow-xl
```

---

## Icon Sizes

Since we're using Tabler

```
Sidebar

20px

Cards

24px

Buttons

18px

Tables

16px
```

---

## Spacing

Follow only

```
4

8

12

16

20

24

32

40

48

64
```

---

## Transition

```
150ms

200ms

300ms
```

Nothing else.

---

When this finishes,

the design system is complete.

---

# PHASE 3 — Routing

Now create

```
routes

AppRoutes.jsx

ProtectedRoute.jsx
```

Then define routes

```
/

dashboard

auctions

teams

players

users

payments

reports

settings

login
```

No pages yet.

---

# PHASE 4 — Layout

This is the first UI.

Build only

```
Sidebar

Header

Content

DashboardLayout
```

Nothing else.

When DashboardLayout works,

every page will automatically have

```
Sidebar

Header

Content
```

---

# PHASE 5 — Reusable Components

This is the biggest phase.

Create

```
components

common
```

Inside

```
Button

Card

Badge

Avatar

Breadcrumb

PageTitle

SearchInput

Loader

EmptyState

Pagination

Modal

Toast

ConfirmationDialog
```

Notice

No auction component.

No player component.

Only generic.

---

# PHASE 6 — Table System

Create

```
components

table
```

Inside

```
DataTable

TableToolbar

TableFilters

TablePagination

TableActions

StatusBadge
```

Every page uses this.

---

# PHASE 7 — Forms

```
components

forms
```

Create

```
TextInput

PasswordInput

NumberInput

Textarea

Select

Checkbox

Switch

ImageUpload

DatePicker
```

Every form uses these.

---

# PHASE 8 — Charts

Create wrappers.

```
components

charts
```

```
LineChart

BarChart

PieChart
```

---

# PHASE 9 — Dashboard Components

```
components

dashboard
```

```
StatCard

OverviewChart

RecentAuctions

TopPlayers

RevenueWidget

LiveAuctionCard
```

---

# PHASE 10 — Pages

Now finally

```
Dashboard

Auctions

Teams

Players

Users

Payments

Reports

Settings
```

Because you've already built

Layout

Cards

Tables

Charts

Buttons

Forms

the pages become easy.

---

# PHASE 11 — API Integration

Replace

```
Mock Data
```

with

```
Axios
```

No page changes.

---

# PHASE 12 — Polish

Now add

* Loading Skeletons
* Error States
* Empty States
* Responsive fixes
* Animations
* Toast notifications (React Toastify)

---

# Final folder structure after Phase 1

```
src
│
├── assets
│   ├── avatars
│   ├── icons
│   ├── illustrations
│   ├── images
│   └── logos
│
├── components
│
├── config
│
├── constants
│
├── context
│
├── data
│
├── hooks
│
├── layouts
│
├── pages
│
├── routes
│
├── services
│
├── styles
│
├── utils
│
├── App.jsx
└── main.jsx
```

---

## Before we write any React code

The very next thing I recommend is **not creating components**—it's finalizing the **design system**.

That means we'll define, in detail:

* Complete color palette (including text, sidebar, hover, borders)
* Typography scale (H1–Caption)
* Spacing scale
* Border radius
* Shadows
* Component sizing (buttons, inputs, tables, cards)
* Icon sizing
* Status badge colors
* Z-index hierarchy
* Transition timings

Once those are locked, every component you build afterward will look consistent, and you won't be redesigning buttons or cards halfway through the project. This is exactly how frontend teams avoid UI inconsistency.
