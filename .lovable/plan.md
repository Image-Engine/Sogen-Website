

## Shopify Customer Account OAuth 2.0 Login with PKCE

### Overview
Implement a complete Shopify Customer Account authentication system using OAuth 2.0 with PKCE, including edge functions for token management, customer/order/address APIs, React context for auth state, and account management pages.

### Store Configuration
The Shopify store domain is `sokbattery-frontline-shine-zq4jf.myshopify.com`. You will need to provide the numeric Shopify Store ID (found in Shopify Admin URL or via the Customer Account API settings). This ID is used in URLs like `https://shopify.com/{STORE_ID}/auth/oauth/authorize`.

### Required Secrets (3 new)
- **SHOPIFY_CUSTOMER_API_CLIENT_ID** -- from Shopify Admin > Settings > Customer accounts > OAuth client
- **SHOPIFY_CUSTOMER_API_CLIENT_SECRET** -- same location
- **SHOPIFY_ACCESS_TOKEN** -- already exists in secrets (Admin API token)

### Files to Create

#### 1. Types (`src/types/shopifyCustomer.ts`)
TypeScript interfaces for: `ShopifyCustomer`, `ShopifyAddress`, `ShopifyOrder`, `ShopifyOrderLineItem`, `ShopifyFulfillment`, `ShopifyMoney`, `ShopifyAuthTokens`, `PKCEParams`

#### 2. OAuth Library (`src/lib/shopifyOAuth.ts`)
- PKCE helpers: `generatePKCEParams()`, `storePKCEParams()`, `retrievePKCEParams()` using `crypto.subtle` for SHA-256 code challenge
- `buildAuthorizationUrl()` targeting `https://shopify.com/{STORE_ID}/auth/oauth/authorize` with scopes `openid email customer-account-api:full`
- Token storage in localStorage: `storeTokens()`, `getStoredToken()`, `getStoredRefreshToken()`, `clearTokens()`, `isTokenExpiringSoon()`
- `getRedirectUri()` returning `{origin}/auth/callback`
- Edge function caller helper using `VITE_SUPABASE_URL`

#### 3. Edge Function: `shopify-oauth` (`supabase/functions/shopify-oauth/index.ts`)
Single function with action-based routing via POST body `{ action, ... }`:
- **getClientId** -- returns `SHOPIFY_CUSTOMER_API_CLIENT_ID`
- **exchangeToken** -- exchanges authorization code + PKCE verifier for tokens via Shopify's token endpoint
- **refreshToken** -- refreshes expired access tokens
- **getCustomer** -- GraphQL query to Customer Account API for profile data
- **getOrders** -- fetches order history via Customer Account API GraphQL
- **getOrder** -- fetches single order by ID
- **getAddresses** / **createAddress** / **updateAddress** / **deleteAddress** / **setDefaultAddress** -- full CRUD for customer addresses
- **updateCustomer** -- updates first name, last name, phone

#### 4. Edge Function: `shopify-customer` (`supabase/functions/shopify-customer/index.ts`)
Admin API calls using existing `SHOPIFY_ACCESS_TOKEN` for data not available via Customer Account API (e.g., customer tags, marketing status).

#### 5. Auth Context (`src/contexts/ShopifyCustomerContext.tsx`)
React context providing:
- State: `isAuthenticated`, `isLoading`, `customer`, `accessToken`
- Methods: `initiateLogin()`, `exchangeCodeForToken()`, `refreshAccessToken()`, `logout()`, `fetchCustomer()`, `fetchOrders()`, `fetchOrder()`, `fetchAddresses()`, `createAddress()`, `updateAddress()`, `deleteAddress()`, `setDefaultAddress()`, `updateCustomer()`
- Auto-fetches customer on token load
- Auto-refreshes tokens before expiry (checks `isTokenExpiringSoon()`)

#### 6. Protected Route (`src/components/auth/ProtectedRoute.tsx`)
Wrapper component that redirects unauthenticated users to `/account/login`.

#### 7. Pages

| Route | File | Description |
|---|---|---|
| `/account/login` | `src/pages/account/Login.tsx` | Immediately initiates OAuth redirect (no form) |
| `/auth/callback` | `src/pages/auth/Callback.tsx` | Handles OAuth callback, verifies state, exchanges code, redirects to `/` |
| `/account` | `src/pages/account/Dashboard.tsx` | Shows customer name + recent orders |
| `/account/orders` | `src/pages/account/Orders.tsx` | Order history list |
| `/account/orders/:id` | `src/pages/account/OrderDetail.tsx` | Single order detail |
| `/account/addresses` | `src/pages/account/Addresses.tsx` | Address CRUD with default support |
| `/account/profile` | `src/pages/account/Profile.tsx` | Edit name and phone |

#### 8. Header Update (`src/components/layout/Header.tsx`)
- Replace the static User icon button with conditional logic:
  - **Guest**: clicking triggers `initiateLogin()`
  - **Authenticated**: shows dropdown menu with My Account, Orders, Addresses, Profile, Sign Out

#### 9. App.tsx Updates
- Wrap app in `ShopifyCustomerProvider`
- Add all new routes
- `/auth/callback` route outside protected wrapper
- `/account/*` routes wrapped in `ProtectedRoute`

#### 10. Config Updates
- `supabase/config.toml`: add `[functions.shopify-oauth]` and `[functions.shopify-customer]` with `verify_jwt = false`

### Technical Details

**PKCE Flow:**
1. User clicks login -> generate code_verifier + code_challenge (SHA-256)
2. Store verifier + random state in sessionStorage
3. Redirect to Shopify authorization URL with code_challenge
4. Shopify redirects back to `/auth/callback` with code + state
5. Verify state matches, send code + verifier to edge function
6. Edge function exchanges for access_token + refresh_token
7. Store tokens in localStorage, fetch customer profile

**Customer Account API GraphQL endpoint:**
`https://shopify.com/{STORE_ID}/account/customer/api/2025-01/graphql`

**Token endpoint:**
`https://shopify.com/{STORE_ID}/auth/oauth/token`

**Authorization endpoint:**
`https://shopify.com/{STORE_ID}/auth/oauth/authorize`

**Edge function CORS headers** follow existing pattern from `fetch-google-reviews`.

**Styling** follows existing patterns: Tailwind classes, shadcn/ui components (Card, Button, Badge, Sheet, DropdownMenu), consistent with current Header and page layouts.

