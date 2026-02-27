# PayVidi Account Types Implementation Guide

## Overview
The PayVidi platform now supports three new account types with dedicated dashboards:
1. **Entrepreneur** - Business management and team coordination
2. **Trader** - Investment portfolio and market analysis
3. **Creator** - Content creation and audience engagement

## Account Type Signup Flow

### Entrepreneurs
- **URL**: `entrepreneur@payvidi.com` / `entrepreneur123`
- **Dashboard Features**:
  - Total Revenue tracking
  - Growth Rate monitoring (28% MoM)
  - Team Members management (12 active)
  - Projects overview (24 completed)
  - Client Rating (4.8⭐)
  - Business Analytics
  - Team Management
  - Project Viewing
  - Partner Invitations
  - Financial Management

### Traders
- **URL**: `trader@payvidi.com` / `trader123`
- **Dashboard Features**:
  - Portfolio Value ($125,000)
  - Day P&L tracking (+$2,850)
  - Win Rate analytics (73%)
  - Active Positions (15)
  - Total Trades (234)
  - Market Watch with top performers
  - Trade Placement
  - Position Management
  - Price Alert Settings
  - Portfolio Analysis

### Creators
- **URL**: `creator@payvidi.com` / `creator123`
- **Dashboard Features**:
  - Total Views (125K)
  - Earnings ($8,500)
  - Followers (4.2K)
  - Engagement Rate (8.7%)
  - Content Pieces (24)
  - Recent Content Management
  - Upload New Content
  - Campaign Creation
  - Analytics Viewing
  - Audience Insights

## Account Type Selection

During signup, users must select their account type with visual indicators:
- **Entrepreneur** (Briefcase icon) - Business Management
- **Trader** (TrendingUp icon) - Investment Trading
- **Creator** (Sparkles icon) - Content Creation

## Database Updates Required

To persist these new account types in production, update the users table:

\`\`\`sql
ALTER TABLE users ADD COLUMN account_type VARCHAR(50) 
CHECK (account_type IN ('entrepreneur', 'trader', 'creator'));

CREATE TABLE entrepreneur_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  business_name VARCHAR(255),
  team_size INTEGER,
  created_at TIMESTAMP
);

CREATE TABLE trader_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  portfolio_value DECIMAL(12,2),
  win_rate DECIMAL(5,2),
  created_at TIMESTAMP
);

CREATE TABLE creator_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  content_type VARCHAR(100),
  follower_count INTEGER,
  created_at TIMESTAMP
);
\`\`\`

## Frontend Files Structure

\`\`\`
/components/dashboards/
├── entrepreneur-dashboard.tsx
├── trader-dashboard.tsx
└── creator-dashboard.tsx

/components/auth/
├── simple-login.tsx (updated with signup flow)
└── simple-auth.tsx (updated with account types)
\`\`\`

## Key Features

1. **Signup Flow**: Users select account type during registration
2. **Role-Based Dashboards**: Each account type has a dedicated, specialized dashboard
3. **Authentication**: Simple auth system supports account type checking
4. **Responsive Design**: All dashboards work on mobile and desktop
5. **Demo Accounts**: Pre-configured demo accounts for testing

## Demo Account Credentials

| Account Type | Email | Password |
|---|---|---|
| Entrepreneur | entrepreneur@payvidi.com | entrepreneur123 |
| Trader | trader@payvidi.com | trader123 |
| Creator | creator@payvidi.com | creator123 |

## Implementation Notes

- The signup process now includes an "Account Type" selection step
- Each dashboard is optimized for its specific user role
- The authentication system checks for `accountType` property in the user object
- Existing admin and freelancer accounts still work with the legacy dashboard
- All dashboards are fully responsive and mobile-friendly

## Future Enhancements

1. Persistent storage in Supabase
2. Real-time data integration
3. Advanced analytics per account type
4. Team collaboration features
5. API integrations for market data (traders)
6. Content monetization platform (creators)
7. Team management tools (entrepreneurs)
