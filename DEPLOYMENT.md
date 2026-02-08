# AA Recovery App - Deployment Guide

This guide covers deploying the AA Recovery App to Azure and building native mobile apps with Capacitor.

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Azure Setup](#azure-setup)
3. [Web Deployment](#web-deployment)
4. [Mobile App Build](#mobile-app-build)
5. [Environment Configuration](#environment-configuration)

## Prerequisites

- Node.js 18.x or higher
- npm or yarn
- Azure account with active subscription
- Azure CLI installed (`az` command)
- Xcode (for iOS builds, macOS only)
- Android Studio (for Android builds)

## Azure Setup

### 1. Create Azure Resources

#### Cosmos DB
```bash
# Login to Azure
az login

# Create resource group
az group create --name aa-recovery-rg --location eastus

# Create Cosmos DB account
az cosmosdb create \
  --name aa-recovery-cosmos \
  --resource-group aa-recovery-rg \
  --default-consistency-level Session \
  --locations regionName=eastus

# Get connection string
az cosmosdb keys list \
  --name aa-recovery-cosmos \
  --resource-group aa-recovery-rg \
  --type connection-strings
```

#### Azure OpenAI
```bash
# Create Azure OpenAI resource
az cognitiveservices account create \
  --name aa-recovery-openai \
  --resource-group aa-recovery-rg \
  --kind OpenAI \
  --sku S0 \
  --location eastus

# Deploy GPT-4 model
az cognitiveservices account deployment create \
  --name aa-recovery-openai \
  --resource-group aa-recovery-rg \
  --deployment-name gpt-4 \
  --model-name gpt-4 \
  --model-version "0613" \
  --model-format OpenAI \
  --scale-settings-scale-type "Standard"

# Get API keys
az cognitiveservices account keys list \
  --name aa-recovery-openai \
  --resource-group aa-recovery-rg
```

#### App Service
```bash
# Create App Service Plan
az appservice plan create \
  --name aa-recovery-plan \
  --resource-group aa-recovery-rg \
  --sku B1 \
  --is-linux

# Create Web App
az webapp create \
  --name aa-recovery-app \
  --resource-group aa-recovery-rg \
  --plan aa-recovery-plan \
  --runtime "NODE:18-lts"

# Configure Web App settings
az webapp config appsettings set \
  --name aa-recovery-app \
  --resource-group aa-recovery-rg \
  --settings \
    COSMOS_ENDPOINT="<your-cosmos-endpoint>" \
    COSMOS_KEY="<your-cosmos-key>" \
    COSMOS_DATABASE="aa-recovery" \
    AZURE_OPENAI_ENDPOINT="<your-openai-endpoint>" \
    AZURE_OPENAI_KEY="<your-openai-key>" \
    AZURE_OPENAI_DEPLOYMENT="gpt-4" \
    NEXTAUTH_SECRET="<generate-random-string>" \
    NEXTAUTH_URL="https://aa-recovery-app.azurewebsites.net"
```

### 2. Configure Environment Variables

Create `.env.local` file with your Azure credentials:

```bash
cp env.template .env.local
```

Edit `.env.local` and fill in the values:
- `COSMOS_ENDPOINT`: Your Cosmos DB endpoint URL
- `COSMOS_KEY`: Your Cosmos DB primary key
- `COSMOS_DATABASE`: aa-recovery
- `AZURE_OPENAI_ENDPOINT`: Your OpenAI resource endpoint
- `AZURE_OPENAI_KEY`: Your OpenAI API key
- `AZURE_OPENAI_DEPLOYMENT`: gpt-4
- `NEXTAUTH_SECRET`: Generate with `openssl rand -base64 32`
- `NEXTAUTH_URL`: http://localhost:3000 (local) or your production URL

## Web Deployment

### Option 1: Azure CLI Deployment

```bash
# Build the app
npm run build

# Deploy to Azure
az webapp up \
  --name aa-recovery-app \
  --resource-group aa-recovery-rg \
  --runtime "NODE:18-lts"
```

### Option 2: GitHub Actions (Recommended)

1. Get publish profile:
```bash
az webapp deployment list-publishing-profiles \
  --name aa-recovery-app \
  --resource-group aa-recovery-rg \
  --xml
```

2. Add secrets to GitHub repository:
   - Go to Settings > Secrets and variables > Actions
   - Add the following secrets:
     - `AZURE_WEBAPP_PUBLISH_PROFILE`: (paste the XML from step 1)
     - `COSMOS_ENDPOINT`
     - `COSMOS_KEY`
     - `COSMOS_DATABASE`
     - `AZURE_OPENAI_ENDPOINT`
     - `AZURE_OPENAI_KEY`
     - `AZURE_OPENAI_DEPLOYMENT`

3. Copy the GitHub Actions workflow:
```bash
mkdir -p .github/workflows
cp azure-deploy.yml .github/workflows/
```

4. Push to main branch:
```bash
git add .
git commit -m "Add Azure deployment workflow"
git push origin main
```

The app will automatically deploy on every push to main.

### Option 3: Manual Deployment via ZIP

```bash
# Build the app
npm run build

# Create deployment package
zip -r deploy.zip .next node_modules package.json next.config.ts

# Deploy
az webapp deployment source config-zip \
  --name aa-recovery-app \
  --resource-group aa-recovery-rg \
  --src deploy.zip
```

## Mobile App Build

### iOS Build

1. Install dependencies:
```bash
npm install
npx cap add ios
```

2. Sync web assets:
```bash
npm run build
npx cap sync ios
```

3. Open in Xcode:
```bash
npx cap open ios
```

4. In Xcode:
   - Select your development team
   - Update bundle identifier (e.g., com.yourcompany.aarecovery)
   - Configure signing certificates
   - Build and run on simulator or device

5. For App Store release:
   - Archive the app (Product > Archive)
   - Validate and upload to App Store Connect
   - Submit for review

### Android Build

1. Install dependencies:
```bash
npm install
npx cap add android
```

2. Sync web assets:
```bash
npm run build
npx cap sync android
```

3. Open in Android Studio:
```bash
npx cap open android
```

4. In Android Studio:
   - Update `applicationId` in `android/app/build.gradle`
   - Configure signing keys
   - Build > Generate Signed Bundle/APK
   - Select APK or AAB for Play Store

5. For Play Store release:
   - Generate signed AAB
   - Upload to Play Console
   - Complete store listing
   - Submit for review

## Environment Configuration

### Database Initialization

The app will automatically create Cosmos DB containers on first use:
- `users` - User profiles
- `step-progress` - Step completion tracking
- `inventories` - Step 4 inventory entries
- `amends` - Step 8 & 9 amends lists
- `daily-entries` - Step 10 & 11 daily entries
- `awakenings` - Awakening journal entries
- `sobriety` - Sobriety date tracking

### Testing Deployment

1. Test local build:
```bash
npm run build
npm start
# Visit http://localhost:3000
```

2. Test production environment:
```bash
# Set NODE_ENV=production
export NODE_ENV=production
npm start
```

3. Verify Azure deployment:
```bash
# Check app logs
az webapp log tail \
  --name aa-recovery-app \
  --resource-group aa-recovery-rg
```

## Troubleshooting

### Common Issues

1. **Build fails on Azure**
   - Check Node.js version in `package.json` engines field
   - Verify all environment variables are set
   - Check build logs: `az webapp log tail`

2. **Cosmos DB connection fails**
   - Verify firewall rules allow Azure services
   - Check connection string format
   - Ensure database name matches configuration

3. **OpenAI API errors**
   - Verify deployment name matches configuration
   - Check API key is valid
   - Ensure sufficient quota/credits

4. **Mobile app doesn't sync**
   - Run `npx cap sync` after web changes
   - Clear derived data (iOS) or clean build (Android)
   - Check Capacitor configuration in `capacitor.config.ts`

### Performance Optimization

1. Enable CDN for static assets
2. Configure caching headers
3. Optimize Cosmos DB queries with proper indexing
4. Use Azure Front Door for global distribution
5. Monitor with Application Insights

## Security Best Practices

1. Never commit `.env` files to version control
2. Rotate API keys regularly
3. Use managed identities when possible
4. Enable HTTPS only
5. Implement rate limiting on API routes
6. Use Azure Key Vault for secrets management
7. Enable Application Insights for monitoring

## Monitoring & Maintenance

### Azure Monitor
```bash
# Enable Application Insights
az monitor app-insights component create \
  --app aa-recovery-insights \
  --location eastus \
  --resource-group aa-recovery-rg

# Link to Web App
az webapp config appsettings set \
  --name aa-recovery-app \
  --resource-group aa-recovery-rg \
  --settings APPINSIGHTS_INSTRUMENTATIONKEY="<instrumentation-key>"
```

### Backup Strategy
- Cosmos DB: Enable automated backups (default every 4 hours)
- Monitor metrics: Request units, latency, availability
- Set up alerts for critical errors

## Support

For issues or questions:
- Check Azure Portal logs
- Review Application Insights
- Consult Azure documentation
- Test locally with production environment variables

## Next Steps

- [ ] Set up custom domain
- [ ] Configure SSL certificate
- [ ] Enable authentication/authorization
- [ ] Add telemetry and analytics
- [ ] Implement CI/CD pipeline
- [ ] Configure staging environment
- [ ] Set up automated testing
- [ ] Add monitoring dashboards
