# Hybrid App

> **Architecture Version:** 1.0
> **Status:** Approved
> **Architecture Style:** Modular Monolith
> **Application Type:** Web + Progressive Web App (PWA) + Hybrid Mobile Application

This document is the **single source of truth** for all future development decisions.
The architecture sections define the rules to follow. The **Current State** section tracks what has actually been built.

---

## Current State

> This section is updated after every development milestone.

### Infrastructure — Complete

| Item | Status | Notes |
|---|---|---|
| Laravel 13 + PHP 8.4 | ✅ | Configured |
| MariaDB connection | ✅ | Requires local MariaDB running — run `php artisan migrate` |
| Vite 8 + React 19 + TypeScript | ✅ | Configured |
| Tailwind CSS v4 | ✅ | With Shadcn CSS variable theme (neutral) |
| Shadcn UI | ✅ | `components.json` configured, components added via CLI |
| Capacitor | ✅ | `capacitor.config.ts`, `npm run build:mobile` workflow |
| React Router | ✅ | `router/` with public, guest, protected splits |
| TanStack React Query | ✅ | `QueryProvider` configured |
| Sonner (toasts) | ✅ | `ToastProvider` configured |
| Axios | ✅ | `core/api/client.ts` — CSRF + credentials wired |
| App startup flow | ✅ | `App → Providers → Router → Layouts → Pages` |

### Modules — In Progress

| Module | Backend | Frontend | Status |
|---|---|---|---|
| Dashboard | — | `HomePage` — Welcome page at `/` | ✅ Complete |

### Modules — Not Started

Auth, User, Settings, Orders, Products, Inventory, Notifications

---

## Table of Contents

1. [Technology Stack](#1-technology-stack)
2. [Core Principles](#2-core-principles)
3. [High-Level Architecture](#3-high-level-architecture)
4. [Repository Structure](#4-repository-structure)
5. [Backend Architecture](#5-backend-architecture)
6. [Frontend Architecture](#6-frontend-architecture)
7. [Frontend Module Structure](#7-frontend-module-structure)
8. [Shared Layer](#8-shared-layer)
9. [Core Layer](#9-core-layer)
10. [Providers](#10-providers)
11. [Routing](#11-routing)
12. [Layout System](#12-layout-system)
13. [API Architecture](#13-api-architecture)
14. [State Management](#14-state-management)
15. [Authentication](#15-authentication)
16. [Backend Layer Responsibilities](#16-backend-layer-responsibilities)
17. [Frontend Layer Responsibilities](#17-frontend-layer-responsibilities)
18. [Database Design](#18-database-design)
19. [Request Lifecycle](#19-request-lifecycle)
20. [Module Communication](#20-module-communication)
21. [Shared Backend Layer](#21-shared-backend-layer)
22. [Dependency Direction](#22-dependency-direction)
23. [Development Rules](#23-development-rules)
24. [Future Architecture](#24-future-architecture)
25. [Development Workflow](#25-development-workflow)

---

## 1. Technology Stack

| Layer | Technology |
|---|---|
| Backend | Laravel 13, PHP 8.4 |
| Database | MariaDB / MySQL |
| Frontend | React 19, TypeScript, Vite |
| Routing | React Router |
| UI | Tailwind CSS v4, Shadcn UI, Lucide Icons |
| Server State | TanStack React Query |
| Global UI State | Zustand |
| Forms | React Hook Form + Zod |
| HTTP Client | Axios |
| Mobile | Capacitor |
| Notifications | Sonner |

---

## 2. Core Principles

- Modular Monolith
- Domain-Driven Folder Structure
- API First
- Single Repository, Single Deployment
- Feature-Based Organization
- Clean Code, SOLID, DRY, KISS, YAGNI
- High Cohesion, Low Coupling

---

## 3. High-Level Architecture

```
Browser / PWA / Mobile
        │
React Application
        │
  React Router
        │
  Feature Pages
        │
 Services (Axios)
        │
Laravel API Routes
        │
Business Services
        │
 Eloquent Models
        │
    Database
```

---

## 4. Repository Structure

```
project/
├── app/                    # Laravel core (minimal — logic lives in modules/)
├── bootstrap/
├── config/
├── database/
├── modules/                # Backend business modules
├── public/
├── resources/              # Frontend (React lives here)
├── routes/
├── storage/
├── tests/
├── mobile/                 # Capacitor standalone build entry
├── composer.json
├── package.json
└── vite.config.js
```

---

## 5. Backend Architecture

Business logic is organized by domain under `modules/`, not by framework layer.

```
modules/
├── Auth/
├── User/
├── Dashboard/
├── Settings/
├── Notification/
├── Inventory/
├── Orders/
├── Products/
└── Shared/
```

Each module is self-contained:

```
modules/User/
├── Actions/
├── DTOs/
├── Enums/
├── Events/
├── Exceptions/
├── Http/
│   ├── Controllers/
│   ├── Middleware/
│   ├── Requests/
│   └── Resources/
├── Jobs/
├── Listeners/
├── Models/
├── Notifications/
├── Policies/
├── Providers/
├── Repositories/
├── Routes/
├── Services/
├── Support/
└── Tests/
```

---

## 6. Frontend Architecture

React lives inside Laravel. It is not a separate application.

```
resources/js/
├── app.tsx                 # Entry point — mounts React
├── AppRoot.tsx             # Providers → Router → Layouts → Pages
├── core/                   # Application infrastructure
├── shared/                 # Reusable UI (no business logic)
├── providers/              # App-wide service providers
├── router/                 # Route definitions
├── layouts/                # Layout shells
├── assets/                 # Static assets
└── modules/                # Feature modules
```

---

## 7. Frontend Module Structure

Each business domain owns its full frontend implementation:

```
resources/js/modules/
├── auth/
├── dashboard/
├── user/
├── settings/
├── orders/
└── products/
```

Each module contains:

```
modules/user/
├── api/            # Axios service calls
├── components/     # Module-specific components
├── hooks/          # Module-specific hooks (useUsers, etc.)
├── pages/          # Route-level page components
├── routes/         # Module route definitions
├── types/          # TypeScript types
└── utils/          # Module-specific helpers
```

Every feature stays inside its own module. No cross-module imports of internal implementation.

---

## 8. Shared Layer

Reusable UI that has no business logic:

```
resources/js/shared/
├── components/     # Button, Modal, Table, Avatar, Loader, EmptyState
├── hooks/          # useDebounce, useMediaQuery, etc.
├── constants/
├── types/
├── utils/          # Pure helpers (date, format, etc.)
└── icons/
```

**Rule:** No business logic belongs here.

---

## 9. Core Layer

Application-level infrastructure:

```
resources/js/core/
├── api/            # Axios instance + interceptors
├── auth/           # Authentication manager
├── config/         # Environment configuration
├── http/           # HTTP utilities
├── storage/        # LocalStorage abstraction
└── theme/          # Theme configuration
```

**Rule:** No business logic belongs here.

---

## 10. Providers

Providers initialize application-wide services.

```
resources/js/providers/
├── AppProvider.tsx
├── AuthProvider.tsx
├── ThemeProvider.tsx
├── QueryProvider.tsx
└── ToastProvider.tsx
```

Application startup flow:

```
App → Providers → Router → Layouts → Pages
```

---

## 11. Routing

React Router owns all frontend routing. Laravel serves only the application shell.

```
Browser → Laravel → React → React Router → Page
```

```
resources/js/router/
├── index.tsx       # Root router — aggregates all module routes
├── protected.tsx   # Authenticated routes
├── guest.tsx       # Unauthenticated-only routes
└── public.tsx      # Public routes
```

Each module registers its own routes:

```
modules/user/routes/index.tsx
modules/dashboard/routes/index.tsx
```

The main router aggregates all module routes.

---

## 12. Layout System

```
resources/js/layouts/
├── PublicLayout.tsx
├── GuestLayout.tsx
├── AuthenticatedLayout.tsx
└── AdminLayout.tsx
```

Layouts own: Navigation, Sidebar, Header, Footer, Breadcrumb, Mobile Navigation.

**Rule:** Pages must never duplicate layout logic.

---

## 13. API Architecture

Components never call Axios directly.

```
Component → Hook → Service → Axios → Laravel API
```

Example:

```
UsersPage → useUsers() → UserService → Axios → /api/users
```

---

## 14. State Management

| Category | Tool | Examples |
|---|---|---|
| Server State | React Query | Users, Orders, Products, Stats |
| Global UI State | Zustand | Sidebar, Theme, Language, Preferences |
| Local State | React (`useState`) | Form input, Dialog, Accordion |

**Rule:** Global state must never store server data. That belongs in React Query.

---

## 15. Authentication

Laravel Sanctum manages authentication via session cookies.

```
React → Axios → Laravel → Sanctum → Session Cookie → Middleware → Controller
```

JWT should only be introduced if required by business needs.

---

## 16. Backend Layer Responsibilities

| Layer | Responsibility |
|---|---|
| Controllers | Receive request, delegate, return response. No business logic. |
| Requests | Validation + authorization only. |
| Services | Business rules and orchestration. |
| Repositories | Only when abstraction is justified. Avoid unnecessary layers. |
| Models | Database persistence only. |
| Resources | API response transformation. |
| Policies | Authorization. |
| Events | Cross-module communication. |
| Jobs | Background processing. |

---

## 17. Frontend Layer Responsibilities

| Layer | Responsibility |
|---|---|
| Pages | Route-level components. |
| Components | Reusable UI pieces. |
| Hooks | Business UI logic, data fetching orchestration. |
| Services | API communication only. |
| Types | TypeScript definitions. |
| Utils | Pure helper functions. |
| Routes | Module route definitions. |

---

## 18. Database Design

Database follows domain boundaries. Each module owns its schema.

```
users / roles / permissions
orders / order_items
products / categories
inventory
notifications
```

**Rule:** Avoid generic tables. No business logic in the database layer.

---

## 19. Request Lifecycle

```
User Action
    → React Page
    → Hook
    → Service
    → Axios
    → Laravel Route
    → Form Request (validation)
    → Controller
    → Service (business logic)
    → Repository (optional)
    → Eloquent Model
    → Database
    → API Resource
    → React Query cache
    → UI re-render
```

---

## 20. Module Communication

Modules must never import internal implementation from another module.

Preferred communication:

- Events
- Contracts / Interfaces
- Shared Services

---

## 21. Shared Backend Layer

```
modules/Shared/
├── Contracts/
├── Enums/
├── Exceptions/
├── Helpers/
├── Support/
└── Traits/
```

**Rule:** No business logic belongs in Shared.

---

## 22. Dependency Direction

Dependencies always point inward toward the domain:

```
UI → Hooks → Services → HTTP → Laravel → Domain Services → Models
```

Business logic must never depend on UI.

---

## 23. Development Rules

**Always:**
- Organize by feature, not by type
- Keep modules independent
- Keep components small and focused
- Write fully typed code
- Validate every incoming request
- Handle errors consistently
- Keep services reusable

**Never:**
- Put business logic inside controllers
- Call Axios directly from components
- Duplicate validation logic
- Create unnecessary abstractions
- Create circular module dependencies
- Use global state for server data

---

## 24. Future Architecture

The architecture supports extension for:

- Multi-tenancy
- Offline Support (PWA)
- Push Notifications
- Background Synchronization
- File Storage
- Queue Workers
- Search
- Analytics & Reporting
- Role-Based Access Control
- Modular Expansion

None of these require architectural changes.

---

## 25. Development Workflow

### Prerequisites

- PHP 8.4, Composer
- Node.js 20.19+ (`nvm use 20.19.3`)
- MariaDB running locally

### First-time setup

```bash
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
npm install
npm run build
```

### Local development server

```bash
composer run dev
```

Starts Laravel, Vite (HMR), queue worker, and log tail concurrently.

### Add a Shadcn component

```bash
npx shadcn@latest add button
```

### Register API routes (first time)

```bash
php artisan install:api
```

---

### Mobile (Capacitor)

```bash
# Add platforms (first time only)
npx cap add android
npx cap add ios

# Build and sync
npm run build:mobile
npx cap sync

# Open in IDE
npx cap open android      # Android Studio
npx cap open ios          # Xcode
```

---

## Guiding Principle

> The application is built as a **single Laravel application** where Laravel owns the backend and React owns the frontend. Both coexist in one repository while remaining clearly separated by responsibility. Every feature is organized around business domains, enabling long-term scalability without introducing unnecessary complexity or microservices.
