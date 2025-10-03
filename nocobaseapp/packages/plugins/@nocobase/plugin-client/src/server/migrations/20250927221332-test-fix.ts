# NocoBase Project Schema Documentation

## Project Overview
This document provides a comprehensive overview of the NocoBase project's UI/UX schema, mobile configuration, database setup, and collections for team synchronization.

**Project Name:** NocoBase  
**Version:** 1.8.26  
**License:** AGPL-3.0  
**Node Version:** >=18  
**Package Manager:** Yarn 1.22.19  

---

## 🎨 UI/UX Schema

### Core UI Architecture
The NocoBase project follows a modern React-based architecture with the following key components:

#### Main Application Structure
```typescript
<MainComponent>
  <Router BaseLayout={Providers}>
    <Application>
      <ComponentManager />
      <RouteManager />
      <ScopeManager />
      <ProviderManager />
      <PluginManager />
    </Application>
  </Router>
</MainComponent>
```

#### Key UI Technologies
- **React:** ^18.0.0
- **Ant Design:** 5.24.2 (Primary UI Library)
- **Formily:** 1.2.3 (Form Management)
- **React Router:** 6.28.1
- **TypeScript:** 5.1.3

#### UI Component System
- **Component Management:** Centralized component registry
- **Route Management:** Dynamic routing system
- **Schema-driven UI:** JSON-based UI schema rendering
- **Theme System:** Customizable theming with theme editor plugin
- **Responsive Design:** Mobile-first approach

### Mobile UI Architecture
The mobile interface is built with a dedicated mobile plugin system:

#### Mobile Component Hierarchy
```typescript
<Mobile>
  <MobileAppContext>
    <MobileRouter>
      <MobileLayout>
        <MobileProviders>
          <RemoteSchemaComponent uid='nocobase-mobile'>
            <MobilePageOutlet /> // Main content area
            <MobileTabBar /> // Bottom navigation
          </RemoteSchemaComponent>
        </MobileProviders>
      </MobileLayout>
    </MobileRouter>
  </MobileAppContext>
</Mobile>
```

#### Mobile-Specific Components
- **MobilePageHeader:** Page navigation and actions
- **MobilePageTabs:** Tab-based navigation
- **MobilePageContent:** Main content area
- **MobileTabBar:** Bottom navigation bar
- **MobilePageNavigationBar:** Top navigation

---

## 📱 Mobile Configuration

### Mobile Plugin Features
- **Responsive Design:** Adaptive layouts for mobile devices
- **Touch-friendly Interface:** Optimized for touch interactions
- **Mobile-specific Routes:** Dedicated mobile routing system
- **JS Bridge:** Communication between native and web components
- **Desktop Mode:** Fallback to desktop interface when needed

### Mobile Layout Structure
1. **Header Section:**
   - Navigation bar with back/forward actions
   - Page title
   - Action buttons

2. **Content Section:**
   - Dynamic page content
   - Form components
   - Data tables
   - Charts and visualizations

3. **Footer Section:**
   - Tab bar navigation
   - Quick actions
   - Status indicators

---

## 🗄️ Database Configuration

### Database Technology Stack
- **Primary Database:** PostgreSQL
- **ORM:** Sequelize
- **Migration System:** Umzug
- **Query Interface:** Custom query interface layer

### Database Connection Configuration
```typescript
{
  dialect: "postgres",
  username: "nocobase",
  database: "nocobase",
  port: "5432",
  timezone: "+05:00",
  tablePrefix: "",
  underscored: false,
  pool: {},
  migrator: {
    context: {
      app: {
        appName: "main",
        name: "main"
      }
    }
  }
}
```

### Database Features
- **Multi-tenancy Support:** Shared database with tenant isolation
- **Migration Management:** Version-controlled schema changes
- **Connection Pooling:** Optimized database connections
- **Transaction Support:** ACID compliance
- **Backup & Restore:** Automated backup system

---

## 📊 Database Collections

### Core Collections

#### 1. Users Collection
```typescript
{
  name: 'users',
  title: 'Users',
  model: 'UserModel',
  shared: true,
  fields: [
    { name: 'id', type: 'bigInt', primaryKey: true, autoIncrement: true },
    { name: 'nickname', type: 'string', interface: 'input' },
    { name: 'username', type: 'string', unique: true, required: true },
    { name: 'email', type: 'string', unique: true, required: true },
    { name: 'phone', type: 'string', unique: true, required: true },
    { name: 'password', type: 'password', hidden: true },
    { name: 'appLang', type: 'string' },
    { name: 'systemSettings', type: 'json', defaultValue: {} },
    { name: 'createdAt', type: 'date', interface: 'createdAt' },
    { name: 'updatedAt', type: 'date', interface: 'updatedAt' }
  ]
}
```

#### 2. Collections Collection
```typescript
{
  name: 'collections',
  title: 'Collections',
  shared: true,
  fields: [
    { name: 'key', type: 'uid', primaryKey: true },
    { name: 'name', type: 'uid', unique: true, prefix: 't_' },
    { name: 'title', type: 'string', required: true, translation: true },
    { name: 'inherit', type: 'boolean', defaultValue: false },
    { name: 'hidden', type: 'boolean', defaultValue: false },
    { name: 'options', type: 'json', defaultValue: {} },
    { name: 'description', type: 'string' },
    { name: 'fields', type: 'hasMany', target: 'fields' },
    { name: 'category', type: 'belongsToMany', target: 'collectionCategories' }
  ]
}
```

#### 3. Workflows Collection
```typescript
{
  name: 'workflows',
  title: 'Workflows',
  shared: true,
  fields: [
    { name: 'key', type: 'uid' },
    { name: 'title', type: 'string', interface: 'input', required: true },
    { name: 'enabled', type: 'boolean', defaultValue: false },
    { name: 'description', type: 'text', interface: 'textarea' },
    { name: 'type', type: 'string', required: true, interface: 'select' },
    { name: 'triggerTitle', type: 'string' },
    { name: 'config', type: 'jsonb', required: true, defaultValue: {} },
    { name: 'nodes', type: 'hasMany', target: 'flow_nodes' },
    { name: 'executions', type: 'hasMany' },
    { name: 'executed', type: 'integer', defaultValue: 0 },
    { name: 'allExecuted', type: 'integer', defaultValue: 0 },
    { name: 'current', type: 'boolean' },
    { name: 'sync', type: 'boolean', defaultValue: false },
    { name: 'revisions', type: 'hasMany', target: 'workflows' },
    { name: 'options', type: 'jsonb', defaultValue: {} },
    { name: 'stats', type: 'hasOne', target: 'workflowStats' },
    { name: 'versionStats', type: 'hasOne', target: 'workflowVersionStats' },
    { name: 'categories', type: 'belongsToMany', target: 'workflowCategories' }
  ]
}
```

### Plugin Collections

#### Workflow-related Collections
- **flow_nodes:** Workflow node definitions
- **workflowTasks:** Task management
- **workflowStats:** Execution statistics
- **workflowVersionStats:** Version-specific statistics
- **workflowCategories:** Workflow categorization
- **workflowCategoryRelations:** Many-to-many relationships
- **userWorkflowTasks:** User-specific tasks
- **jobs:** Background job management
- **executions:** Workflow execution logs

#### Notification Collections
- **channels:** Notification channels
- **messageLogs:** Message delivery logs
- **notificationChannels:** Channel configurations
- **notificationSendLogs:** Send operation logs
- **notificationInAppMessages:** In-app message storage

#### Authentication Collections
- **roles:** User roles and permissions
- **authenticators:** Authentication methods
- **users-authenticators:** User authentication mappings
- **users-verifiers:** User verification records
- **users-verificators:** Verification methods

### Field Types Supported
- **Basic Types:** string, text, number, integer, bigInt, boolean, date, datetime
- **Special Types:** password, uid, json, jsonb
- **Relationship Types:** hasOne, hasMany, belongsTo, belongsToMany
- **Interface Types:** input, textarea, select, radioGroup, email, createdAt, updatedAt

---

## 🔌 Plugin Architecture

### Core Plugins
- **plugin-client:** Core client functionality
- **plugin-mobile:** Mobile interface support
- **plugin-data-source-main:** Main data source management
- **plugin-users:** User management
- **plugin-acl:** Access control and permissions
- **plugin-auth:** Authentication system
- **plugin-workflow:** Workflow engine
- **plugin-notification-manager:** Notification system

### UI Plugins
- **plugin-theme-editor:** Theme customization
- **plugin-ui-schema-storage:** UI schema persistence
- **plugin-block-template:** Template system
- **plugin-block-workbench:** Workbench interface
- **plugin-calendar:** Calendar functionality
- **plugin-charts:** Data visualization
- **plugin-kanban:** Kanban boards
- **plugin-gantt:** Gantt charts

### Field Plugins
- **plugin-field-attachment-url:** File attachments
- **plugin-field-china-region:** Chinese region selection
- **plugin-field-formula:** Calculated fields
- **plugin-field-markdown-vditor:** Markdown editor
- **plugin-field-sequence:** Auto-increment sequences
- **plugin-field-sort:** Sortable fields

---

## 🚀 Development Setup

### Prerequisites
- Node.js >= 18
- Yarn 1.22.19
- PostgreSQL database
- Git

### Installation Commands
```bash
# Install dependencies
yarn install

# Start development server
yarn dev

# Build for production
yarn build

# Run tests
yarn test

# Run migrations
yarn nocobase upgrade

# Create new migration
yarn nocobase create-migration <name> --pkg <package> --on <timing>
```

### Project Structure
```
nocobaseapp/
├── packages/
│   ├── core/                 # Core functionality
│   ├── plugins/              # Plugin system
│   └── presets/              # Preset configurations
├── storage/                  # Application data
├── migrations/               # Custom migrations
└── examples/                 # Example implementations
```

---

## 📋 Migration System

### Migration Structure
```typescript
import { Migration } from '@nocobase/server';

export default class extends Migration {
  on = 'afterLoad'; // 'beforeLoad' or 'afterLoad'
  appVersion = '<1.9.0';

  async up() {
    // Migration logic here
  }
}
```

### Migration Execution
- **Timing:** beforeLoad (before app initialization) or afterLoad (after app initialization)
- **Version Control:** App version constraints
- **Database Operations:** Schema changes, data migrations, cleanup operations
- **Rollback Support:** Automatic rollback on failure

---

## 🔧 Configuration Files

### Key Configuration Files
- **package.json:** Project dependencies and scripts
- **tsconfig.json:** TypeScript configuration
- **yarn.lock:** Dependency lock file
- **docker-compose.yml:** Container orchestration
- **lerna.json:** Monorepo configuration

### Environment Variables
- **DB_DIALECT:** Database type (postgres, mysql, sqlite)
- **DB_HOST:** Database host
- **DB_PORT:** Database port
- **DB_DATABASE:** Database name
- **DB_USER:** Database username
- **DB_PASSWORD:** Database password
- **DB_TIMEZONE:** Database timezone

---

## 📝 API Documentation

### REST API
- **Base URL:** `/api`
- **Authentication:** Token-based
- **Content Type:** `application/json`
- **Response Format:** JSON

### GraphQL API
- **Endpoint:** `/graphql`
- **Schema:** Auto-generated from collections
- **Queries:** Read operations
- **Mutations:** Write operations
- **Subscriptions:** Real-time updates

---

## 🎯 Best Practices

### Development Guidelines
1. **Component Development:** Use TypeScript for type safety
2. **Schema Design:** Follow NocoBase collection patterns
3. **Plugin Development:** Extend existing functionality
4. **Migration Writing:** Always test migrations thoroughly
5. **UI Consistency:** Follow Ant Design guidelines

### Performance Optimization
1. **Database Indexing:** Proper index configuration
2. **Query Optimization:** Efficient database queries
3. **Caching:** Implement appropriate caching strategies
4. **Bundle Optimization:** Code splitting and lazy loading
5. **Mobile Performance:** Optimize for mobile devices

---

## 📞 Support & Resources

### Documentation
- **Official Docs:** https://docs.nocobase.com
- **API Reference:** Available in the application
- **Plugin Development:** Plugin-specific documentation

### Community
- **GitHub:** https://github.com/nocobase/nocobase
- **Issues:** GitHub issue tracker
- **Discussions:** Community forums

---

*This documentation is automatically generated and should be updated as the project evolves. Last updated: September 27, 2025*
