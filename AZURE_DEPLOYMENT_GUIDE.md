# Azure Premium Deployment Guide - AA Recovery App

Complete guide for deploying the AA Recovery App to Azure using premium tier services.

## Prerequisites

### Required Tools
- Azure CLI (`az`) - [Install Guide](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli)
- Node.js 18.x or higher
- Git
- Active Azure subscription

### Verify Installation
```bash
# Check Azure CLI
az --version

# Check Node.js
node --version

# Login to Azure
az login
```

## Quick Deployment (Automated)

### Option 1: One-Command Deploy

```bash
# Make script executable
chmod +x deploy-azure-premium.sh

# Run deployment
./deploy-azure-premium.sh
```

This script will:
1. Create all Azure resources (Cosmos DB, OpenAI, App Service)
2. Configure environment variables
3. Build and deploy your application
4. Set up Application Insights monitoring
5. Generate credentials and publish profile

**Estimated time:** 15-20 minutes

### Option 2: Manual Deployment

Follow the step-by-step guide below for manual deployment.

---

## Manual Deployment Steps

### Step 1: Create Resource Group

```bash
# Set variables
RESOURCE_GROUP="aa-recovery-premium-rg"
LOCATION="eastus"

# Create resource group
az group create \
  --name $RESOURCE_GROUP \
  --location $LOCATION \
  --tags Environment=Production Project=AA-Recovery
```

### Step 2: Deploy Azure Cosmos DB (Premium)

```bash
COSMOS_ACCOUNT="aa-recovery-cosmos-premium"

# Create Cosmos DB account with serverless (pay-per-use)
az cosmosdb create \
  --name $COSMOS_ACCOUNT \
  --resource-group $RESOURCE_GROUP \
  --locations regionName=$LOCATION \
  --default-consistency-level Session \
  --enable-automatic-failover true \
  --capabilities EnableServerless

# Get endpoint and key
COSMOS_ENDPOINT=$(az cosmosdb show \
  --name $COSMOS_ACCOUNT \
  --resource-group $RESOURCE_GROUP \
  --query documentEndpoint -o tsv)

COSMOS_KEY=$(az cosmosdb keys list \
  --name $COSMOS_ACCOUNT \
  --resource-group $RESOURCE_GROUP \
  --query primaryMasterKey -o tsv)

echo "Cosmos Endpoint: $COSMOS_ENDPOINT"
echo "Cosmos Key: $COSMOS_KEY"
```

**Features:**
- Serverless mode (pay per request)
- Automatic failover
- 99.99% SLA
- Global distribution ready
- Automatic indexing

### Step 3: Deploy Azure OpenAI (GPT-4)

```bash
OPENAI_ACCOUNT="aa-recovery-openai-premium"

# Create Azure OpenAI account
az cognitiveservices account create \
  --name $OPENAI_ACCOUNT \
  --resource-group $RESOURCE_GROUP \
  --kind OpenAI \
  --sku S0 \
  --location eastus \
  --yes

# Deploy GPT-4 Turbo model
az cognitiveservices account deployment create \
  --name $OPENAI_ACCOUNT \
  --resource-group $RESOURCE_GROUP \
  --deployment-name gpt-4 \
  --model-name gpt-4 \
  --model-version "turbo-2024-04-09" \
  --model-format OpenAI \
  --sku-capacity 10 \
  --sku-name "Standard"

# Get endpoint and key
OPENAI_ENDPOINT=$(az cognitiveservices account show \
  --name $OPENAI_ACCOUNT \
  --resource-group $RESOURCE_GROUP \
  --query properties.endpoint -o tsv)

OPENAI_KEY=$(az cognitiveservices account keys list \
  --name $OPENAI_ACCOUNT \
  --resource-group $RESOURCE_GROUP \
  --query key1 -o tsv)

echo "OpenAI Endpoint: $OPENAI_ENDPOINT"
echo "OpenAI Key: $OPENAI_KEY"
```

**Model Details:**
- GPT-4 Turbo (latest version)
- 10 requests per second capacity
- Advanced reasoning capabilities
- Better context understanding
- Lower latency

### Step 4: Create App Service (Premium)

```bash
APP_NAME="aa-recovery-app"
APP_SERVICE_PLAN="aa-recovery-premium-plan"

# Create Premium App Service Plan (P1V3)
az appservice plan create \
  --name $APP_SERVICE_PLAN \
  --resource-group $RESOURCE_GROUP \
  --location $LOCATION \
  --sku P1V3 \
  --is-linux

# Create Web App
az webapp create \
  --name $APP_NAME \
  --resource-group $RESOURCE_GROUP \
  --plan $APP_SERVICE_PLAN \
  --runtime "NODE:18-lts"
```

**P1V3 Features:**
- 2 vCPU cores
- 8 GB RAM
- 250 GB storage
- Auto-scaling capable
- Custom domains with SSL
- Deployment slots
- Advanced networking

### Step 5: Configure Environment Variables

```bash
# Generate NextAuth secret
NEXTAUTH_SECRET=$(openssl rand -base64 32)

# Set all environment variables
az webapp config appsettings set \
  --name $APP_NAME \
  --resource-group $RESOURCE_GROUP \
  --settings \
    COSMOS_ENDPOINT="$COSMOS_ENDPOINT" \
    COSMOS_KEY="$COSMOS_KEY" \
    COSMOS_DATABASE="aa-recovery" \
    AZURE_OPENAI_ENDPOINT="$OPENAI_ENDPOINT" \
    AZURE_OPENAI_KEY="$OPENAI_KEY" \
    AZURE_OPENAI_DEPLOYMENT="gpt-4" \
    NEXTAUTH_SECRET="$NEXTAUTH_SECRET" \
    NEXTAUTH_URL="https://$APP_NAME.azurewebsites.net" \
    NODE_ENV="production" \
    WEBSITE_NODE_DEFAULT_VERSION="18-lts" \
    SCM_DO_BUILD_DURING_DEPLOYMENT="true"
```

### Step 6: Enable Security Features

```bash
# Enable HTTPS only
az webapp update \
  --name $APP_NAME \
  --resource-group $RESOURCE_GROUP \
  --https-only true

# Enable managed identity (optional)
az webapp identity assign \
  --name $APP_NAME \
  --resource-group $RESOURCE_GROUP
```

### Step 7: Set Up Application Insights

```bash
# Create Application Insights
az monitor app-insights component create \
  --app "$APP_NAME-insights" \
  --location $LOCATION \
  --resource-group $RESOURCE_GROUP \
  --application-type web

# Get instrumentation key
INSIGHTS_KEY=$(az monitor app-insights component show \
  --app "$APP_NAME-insights" \
  --resource-group $RESOURCE_GROUP \
  --query instrumentationKey -o tsv)

# Configure app to use insights
az webapp config appsettings set \
  --name $APP_NAME \
  --resource-group $RESOURCE_GROUP \
  --settings APPINSIGHTS_INSTRUMENTATIONKEY="$INSIGHTS_KEY"
```

### Step 8: Build and Deploy Application

```bash
# Build locally
npm install
npm run build

# Deploy using Azure CLI
az webapp up \
  --name $APP_NAME \
  --resource-group $RESOURCE_GROUP \
  --plan $APP_SERVICE_PLAN \
  --runtime "NODE:18-lts"
```

### Step 9: Configure CI/CD with GitHub Actions

```bash
# Get publish profile
az webapp deployment list-publishing-profiles \
  --name $APP_NAME \
  --resource-group $RESOURCE_GROUP \
  --xml > publish-profile.xml
```

**GitHub Setup:**
1. Go to your GitHub repository
2. Navigate to Settings > Secrets and variables > Actions
3. Add the following secrets:
   - `AZURE_WEBAPP_PUBLISH_PROFILE`: (paste content from publish-profile.xml)
   - `COSMOS_ENDPOINT`: Your Cosmos DB endpoint
   - `COSMOS_KEY`: Your Cosmos DB key
   - `COSMOS_DATABASE`: aa-recovery
   - `AZURE_OPENAI_ENDPOINT`: Your OpenAI endpoint
   - `AZURE_OPENAI_KEY`: Your OpenAI key
   - `AZURE_OPENAI_DEPLOYMENT`: gpt-4

4. The GitHub Actions workflow (.github/workflows/azure-deploy.yml) will auto-deploy on push to main

---

## Cost Estimation (US East)

### Monthly Costs (Estimated)

| Service | Tier | Cost |
|---------|------|------|
| **App Service P1V3** | Premium | ~$146/month |
| **Cosmos DB** | Serverless | ~$25-100/month (usage-based) |
| **Azure OpenAI** | GPT-4 | ~$30-200/month (usage-based) |
| **Application Insights** | Standard | ~$2.88/GB (first 5GB free) |
| **Storage** | Blob Storage | ~$0.02/GB |
| **Total Estimated** | | **~$200-450/month** |

**Cost Optimization Tips:**
- Use Cosmos DB Serverless (pay per request)
- Monitor OpenAI usage and set quotas
- Use App Service auto-scaling
- Enable Azure Cost Management alerts

---

## Post-Deployment Configuration

### 1. Custom Domain (Optional)

```bash
# Add custom domain
az webapp config hostname add \
  --webapp-name $APP_NAME \
  --resource-group $RESOURCE_GROUP \
  --hostname yourdomain.com

# Enable SSL
az webapp config ssl bind \
  --certificate-thumbprint <thumbprint> \
  --ssl-type SNI \
  --name $APP_NAME \
  --resource-group $RESOURCE_GROUP
```

### 2. Enable Auto-Scaling

```bash
# Create autoscale rule
az monitor autoscale create \
  --resource-group $RESOURCE_GROUP \
  --resource $APP_SERVICE_PLAN \
  --resource-type Microsoft.Web/serverfarms \
  --name autoscale-rule \
  --min-count 1 \
  --max-count 3 \
  --count 1

# Add CPU-based scaling rule
az monitor autoscale rule create \
  --resource-group $RESOURCE_GROUP \
  --autoscale-name autoscale-rule \
  --condition "Percentage CPU > 70 avg 5m" \
  --scale out 1
```

### 3. Set Up Backup

```bash
# Enable backup
az webapp config backup create \
  --resource-group $RESOURCE_GROUP \
  --webapp-name $APP_NAME \
  --backup-name initial-backup \
  --container-url "<storage-container-url>"
```

### 4. Configure Alerts

```bash
# CPU alert
az monitor metrics alert create \
  --name high-cpu-alert \
  --resource-group $RESOURCE_GROUP \
  --scopes /subscriptions/$SUBSCRIPTION_ID/resourceGroups/$RESOURCE_GROUP/providers/Microsoft.Web/sites/$APP_NAME \
  --condition "avg Percentage CPU > 80" \
  --description "Alert when CPU usage is high"

# Response time alert
az monitor metrics alert create \
  --name slow-response-alert \
  --resource-group $RESOURCE_GROUP \
  --scopes /subscriptions/$SUBSCRIPTION_ID/resourceGroups/$RESOURCE_GROUP/providers/Microsoft.Web/sites/$APP_NAME \
  --condition "avg Http Response Time > 3" \
  --description "Alert when response time is slow"
```

---

## Monitoring & Management

### Azure Portal Links

After deployment, access these portals:

- **App Service**: https://portal.azure.com/#resource/subscriptions/{subscription-id}/resourceGroups/{resource-group}/providers/Microsoft.Web/sites/{app-name}
- **Cosmos DB**: https://portal.azure.com/#resource/subscriptions/{subscription-id}/resourceGroups/{resource-group}/providers/Microsoft.DocumentDB/databaseAccounts/{cosmos-account}
- **Azure OpenAI**: https://portal.azure.com/#resource/subscriptions/{subscription-id}/resourceGroups/{resource-group}/providers/Microsoft.CognitiveServices/accounts/{openai-account}
- **Application Insights**: https://portal.azure.com/#resource/subscriptions/{subscription-id}/resourceGroups/{resource-group}/providers/Microsoft.Insights/components/{app-name}-insights

### View Logs

```bash
# Stream logs
az webapp log tail \
  --name $APP_NAME \
  --resource-group $RESOURCE_GROUP

# Download logs
az webapp log download \
  --name $APP_NAME \
  --resource-group $RESOURCE_GROUP \
  --log-file logs.zip
```

### Check Application Health

```bash
# Get app status
az webapp show \
  --name $APP_NAME \
  --resource-group $RESOURCE_GROUP \
  --query state

# View metrics
az monitor metrics list \
  --resource /subscriptions/$SUBSCRIPTION_ID/resourceGroups/$RESOURCE_GROUP/providers/Microsoft.Web/sites/$APP_NAME \
  --metric "Http2xx" "Http4xx" "Http5xx"
```

---

## Troubleshooting

### Common Issues

#### 1. Build Fails
```bash
# Check build logs
az webapp log tail --name $APP_NAME --resource-group $RESOURCE_GROUP

# Verify Node version
az webapp config show --name $APP_NAME --resource-group $RESOURCE_GROUP --query linuxFxVersion
```

#### 2. Environment Variables Not Set
```bash
# List all settings
az webapp config appsettings list \
  --name $APP_NAME \
  --resource-group $RESOURCE_GROUP

# Update specific setting
az webapp config appsettings set \
  --name $APP_NAME \
  --resource-group $RESOURCE_GROUP \
  --settings KEY=VALUE
```

#### 3. Cosmos DB Connection Issues
```bash
# Verify Cosmos DB is running
az cosmosdb show --name $COSMOS_ACCOUNT --resource-group $RESOURCE_GROUP --query provisioningState

# Check firewall rules
az cosmosdb show --name $COSMOS_ACCOUNT --resource-group $RESOURCE_GROUP --query ipRules
```

#### 4. OpenAI API Errors
```bash
# Check deployment status
az cognitiveservices account deployment show \
  --name $OPENAI_ACCOUNT \
  --resource-group $RESOURCE_GROUP \
  --deployment-name gpt-4

# Verify quota
az cognitiveservices account show \
  --name $OPENAI_ACCOUNT \
  --resource-group $RESOURCE_GROUP \
  --query properties.capabilities
```

---

## Security Best Practices

### 1. Rotate Keys Regularly
```bash
# Rotate Cosmos DB key
az cosmosdb keys regenerate \
  --name $COSMOS_ACCOUNT \
  --resource-group $RESOURCE_GROUP \
  --key-kind primary

# Rotate OpenAI key
az cognitiveservices account keys regenerate \
  --name $OPENAI_ACCOUNT \
  --resource-group $RESOURCE_GROUP \
  --key-name key1
```

### 2. Enable Diagnostic Logging
```bash
az webapp log config \
  --name $APP_NAME \
  --resource-group $RESOURCE_GROUP \
  --application-logging filesystem \
  --detailed-error-messages true \
  --failed-request-tracing true \
  --web-server-logging filesystem
```

### 3. Configure IP Restrictions (Optional)
```bash
az webapp config access-restriction add \
  --name $APP_NAME \
  --resource-group $RESOURCE_GROUP \
  --rule-name "Allow Office IP" \
  --action Allow \
  --ip-address "YOUR_IP_ADDRESS/32" \
  --priority 100
```

---

## Cleanup (Delete All Resources)

⚠️ **Warning:** This will delete all resources and data!

```bash
# Delete entire resource group
az group delete \
  --name $RESOURCE_GROUP \
  --yes \
  --no-wait
```

---

## Support & Resources

- **Azure Documentation**: https://docs.microsoft.com/azure
- **Azure Status**: https://status.azure.com
- **Pricing Calculator**: https://azure.microsoft.com/pricing/calculator
- **Azure Support**: https://azure.microsoft.com/support/options

---

## Next Steps After Deployment

1. ✅ Verify app is running: https://{app-name}.azurewebsites.net
2. ✅ Test AI chat functionality
3. ✅ Test data persistence (create entries)
4. ✅ Set up monitoring alerts
5. ✅ Configure custom domain (optional)
6. ✅ Enable CDN for static assets (optional)
7. ✅ Set up backup strategy
8. ✅ Configure budget alerts

---

**Deployment completed! Your AA Recovery App is now live on Azure Premium tier.** 🎉
