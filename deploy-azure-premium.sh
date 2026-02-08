#!/bin/bash

# AA Recovery App - Azure Premium Deployment Script
# This script deploys the app to Azure with premium tier resources

set -e  # Exit on error

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
RESOURCE_GROUP="aa-recovery-app-rg"
LOCATION="centralus"
APP_NAME="aa-recovery-app"
COSMOS_ACCOUNT="aa-recovery-cosmos-db"
OPENAI_ACCOUNT="aa-recovery-openai"
APP_SERVICE_PLAN="aa-recovery-plan"
SUBSCRIPTION_ID=""  # Will be auto-detected

echo -e "${BLUE}╔════════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║   AA Recovery App - Azure Premium Deployment              ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════════════════╝${NC}"
echo ""

# Function to print status messages
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

# Check if Azure CLI is installed
if ! command -v az &> /dev/null; then
    print_error "Azure CLI is not installed. Please install it from https://docs.microsoft.com/en-us/cli/azure/install-azure-cli"
    exit 1
fi

# Login to Azure
print_status "Checking Azure login status..."
if ! az account show &> /dev/null; then
    print_status "Please log in to Azure..."
    az login
fi

# Get subscription ID
SUBSCRIPTION_ID=$(az account show --query id -o tsv)
print_success "Using subscription: $SUBSCRIPTION_ID"

# Create Resource Group
print_status "Creating resource group: $RESOURCE_GROUP in $LOCATION..."
az group create \
    --name $RESOURCE_GROUP \
    --location $LOCATION \
    --tags Environment=Production Project=AA-Recovery \
    || print_warning "Resource group may already exist"

print_success "Resource group ready"

# Create Azure Cosmos DB (Premium tier with autoscale)
print_status "Creating Azure Cosmos DB account (Premium - may take 5-10 minutes)..."
az cosmosdb create \
    --name $COSMOS_ACCOUNT \
    --resource-group $RESOURCE_GROUP \
    --locations regionName=$LOCATION \
    --default-consistency-level Session \
    --enable-automatic-failover true \
    --enable-multiple-write-locations false \
    --kind GlobalDocumentDB \
    --capabilities EnableServerless \
    || print_warning "Cosmos DB account may already exist"

print_success "Cosmos DB account created"

# Get Cosmos DB connection details
print_status "Retrieving Cosmos DB credentials..."
COSMOS_ENDPOINT=$(az cosmosdb show \
    --name $COSMOS_ACCOUNT \
    --resource-group $RESOURCE_GROUP \
    --query documentEndpoint -o tsv)

COSMOS_KEY=$(az cosmosdb keys list \
    --name $COSMOS_ACCOUNT \
    --resource-group $RESOURCE_GROUP \
    --query primaryMasterKey -o tsv)

print_success "Cosmos DB credentials retrieved"

# Create Azure OpenAI resource
print_status "Creating Azure OpenAI account..."
az cognitiveservices account create \
    --name $OPENAI_ACCOUNT \
    --resource-group $RESOURCE_GROUP \
    --kind OpenAI \
    --sku S0 \
    --location eastus \
    --yes \
    || print_warning "OpenAI account may already exist"

print_success "Azure OpenAI account created"

# Deploy GPT-4 model
print_status "Deploying GPT-4 model..."
az cognitiveservices account deployment create \
    --name $OPENAI_ACCOUNT \
    --resource-group $RESOURCE_GROUP \
    --deployment-name gpt-4 \
    --model-name gpt-4 \
    --model-version "turbo-2024-04-09" \
    --model-format OpenAI \
    --sku-capacity 10 \
    --sku-name "Standard" \
    || print_warning "GPT-4 deployment may already exist"

print_success "GPT-4 model deployed"

# Get OpenAI credentials
print_status "Retrieving Azure OpenAI credentials..."
OPENAI_ENDPOINT=$(az cognitiveservices account show \
    --name $OPENAI_ACCOUNT \
    --resource-group $RESOURCE_GROUP \
    --query properties.endpoint -o tsv)

OPENAI_KEY=$(az cognitiveservices account keys list \
    --name $OPENAI_ACCOUNT \
    --resource-group $RESOURCE_GROUP \
    --query key1 -o tsv)

print_success "Azure OpenAI credentials retrieved"

# Create App Service Plan (Premium tier - P1V3)
print_status "Creating App Service Plan (Premium P1V3)..."
az appservice plan create \
    --name $APP_SERVICE_PLAN \
    --resource-group $RESOURCE_GROUP \
    --location $LOCATION \
    --sku P1V3 \
    --is-linux \
    || print_warning "App Service Plan may already exist"

print_success "App Service Plan created"

# Create Web App
print_status "Creating Web App..."
az webapp create \
    --name $APP_NAME \
    --resource-group $RESOURCE_GROUP \
    --plan $APP_SERVICE_PLAN \
    --runtime "NODE:20-lts" \
    || print_warning "Web App may already exist"

print_success "Web App created"

# Generate NextAuth secret
NEXTAUTH_SECRET=$(openssl rand -base64 32)

# Configure Web App settings
print_status "Configuring Web App environment variables..."
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
        SCM_DO_BUILD_DURING_DEPLOYMENT="true" \
    > /dev/null

print_success "Environment variables configured"

# Enable HTTPS only
print_status "Enabling HTTPS only..."
az webapp update \
    --name $APP_NAME \
    --resource-group $RESOURCE_GROUP \
    --https-only true \
    > /dev/null

print_success "HTTPS enforced"

# Enable Application Insights
print_status "Creating Application Insights..."
az monitor app-insights component create \
    --app "$APP_NAME-insights" \
    --location $LOCATION \
    --resource-group $RESOURCE_GROUP \
    --application-type web \
    || print_warning "Application Insights may already exist"

INSIGHTS_KEY=$(az monitor app-insights component show \
    --app "$APP_NAME-insights" \
    --resource-group $RESOURCE_GROUP \
    --query instrumentationKey -o tsv)

az webapp config appsettings set \
    --name $APP_NAME \
    --resource-group $RESOURCE_GROUP \
    --settings APPINSIGHTS_INSTRUMENTATIONKEY="$INSIGHTS_KEY" \
    > /dev/null

print_success "Application Insights configured"

# Build the application
print_status "Building Next.js application..."
npm install
npm run build

print_success "Application built successfully"

# Deploy to Azure
print_status "Deploying application to Azure (this may take a few minutes)..."
az webapp up \
    --name $APP_NAME \
    --resource-group $RESOURCE_GROUP \
    --plan $APP_SERVICE_PLAN \
    --runtime "NODE:20-lts" \
    > /dev/null

print_success "Application deployed"

# Get publish profile for GitHub Actions
print_status "Generating publish profile for CI/CD..."
az webapp deployment list-publishing-profiles \
    --name $APP_NAME \
    --resource-group $RESOURCE_GROUP \
    --xml > publish-profile.xml

print_success "Publish profile saved to publish-profile.xml"

# Display summary
echo ""
echo -e "${GREEN}╔════════════════════════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║           Deployment Completed Successfully!              ║${NC}"
echo -e "${GREEN}╚════════════════════════════════════════════════════════════╝${NC}"
echo ""
echo -e "${BLUE}📋 Deployment Summary:${NC}"
echo -e "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${YELLOW}Resource Group:${NC}      $RESOURCE_GROUP"
echo -e "${YELLOW}Location:${NC}            $LOCATION"
echo -e "${YELLOW}Web App URL:${NC}         https://$APP_NAME.azurewebsites.net"
echo -e "${YELLOW}Cosmos DB:${NC}           $COSMOS_ACCOUNT"
echo -e "${YELLOW}Azure OpenAI:${NC}        $OPENAI_ACCOUNT"
echo -e "${YELLOW}App Service Plan:${NC}    $APP_SERVICE_PLAN (Premium P1V3)"
echo ""
echo -e "${BLUE}🔐 Credentials (saved to .env.production.local):${NC}"
echo -e "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "COSMOS_ENDPOINT=$COSMOS_ENDPOINT"
echo "COSMOS_KEY=$COSMOS_KEY"
echo "AZURE_OPENAI_ENDPOINT=$OPENAI_ENDPOINT"
echo "AZURE_OPENAI_KEY=$OPENAI_KEY"
echo "NEXTAUTH_SECRET=$NEXTAUTH_SECRET"
echo ""

# Save credentials to file
cat > .env.production.local <<EOF
# Azure Cosmos DB
COSMOS_ENDPOINT=$COSMOS_ENDPOINT
COSMOS_KEY=$COSMOS_KEY
COSMOS_DATABASE=aa-recovery

# Azure OpenAI
AZURE_OPENAI_ENDPOINT=$OPENAI_ENDPOINT
AZURE_OPENAI_KEY=$OPENAI_KEY
AZURE_OPENAI_DEPLOYMENT=gpt-4

# NextAuth
NEXTAUTH_SECRET=$NEXTAUTH_SECRET
NEXTAUTH_URL=https://$APP_NAME.azurewebsites.net
EOF

print_success "Credentials saved to .env.production.local"

echo ""
echo -e "${BLUE}📝 Next Steps:${NC}"
echo -e "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "1. Visit your app: ${GREEN}https://$APP_NAME.azurewebsites.net${NC}"
echo -e "2. Set up CI/CD with GitHub Actions (publish profile saved)"
echo -e "3. Configure custom domain (optional)"
echo -e "4. Enable Azure CDN for better performance (optional)"
echo -e "5. Set up alerts in Application Insights"
echo ""
echo -e "${YELLOW}⚠️  Important:${NC}"
echo -e "   - Keep .env.production.local file secure (DO NOT commit to Git)"
echo -e "   - Add GitHub secrets for automated deployments"
echo -e "   - Monitor costs in Azure Portal"
echo ""

print_success "Deployment script completed!"
