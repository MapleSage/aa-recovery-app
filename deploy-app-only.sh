#!/bin/bash

# AA Recovery App - Deploy App Service Only (No Cosmos DB)
# Use this when Cosmos DB capacity is limited

set -e

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Configuration
RESOURCE_GROUP="aa-recovery-app-rg"
LOCATION="centralus"
APP_NAME="aa-recovery-app-$(date +%s)"
APP_SERVICE_PLAN="aa-recovery-plan"

echo -e "${BLUE}Deploying AA Recovery App (LocalStorage mode)${NC}"
echo ""

# Create Resource Group
echo -e "${BLUE}Creating resource group...${NC}"
az group create \
  --name $RESOURCE_GROUP \
  --location $LOCATION \
  --tags Environment=Production Project=AA-Recovery

# Create App Service Plan
echo -e "${BLUE}Creating App Service Plan (B1)...${NC}"
az appservice plan create \
  --name $APP_SERVICE_PLAN \
  --resource-group $RESOURCE_GROUP \
  --location $LOCATION \
  --sku B1 \
  --is-linux

# Create Web App
echo -e "${BLUE}Creating Web App...${NC}"
az webapp create \
  --name $APP_NAME \
  --resource-group $RESOURCE_GROUP \
  --plan $APP_SERVICE_PLAN \
  --runtime "NODE:18-lts"

# Enable HTTPS
az webapp update \
  --name $APP_NAME \
  --resource-group $RESOURCE_GROUP \
  --https-only true

# Build app
echo -e "${BLUE}Building application...${NC}"
npm install
npm run build

# Deploy
echo -e "${BLUE}Deploying application...${NC}"
az webapp up \
  --name $APP_NAME \
  --resource-group $RESOURCE_GROUP \
  --plan $APP_SERVICE_PLAN \
  --runtime "NODE:18-lts"

echo ""
echo -e "${GREEN}═══════════════════════════════════════════════════${NC}"
echo -e "${GREEN}Deployment Complete!${NC}"
echo -e "${GREEN}═══════════════════════════════════════════════════${NC}"
echo ""
echo -e "${YELLOW}App URL:${NC} https://$APP_NAME.azurewebsites.net"
echo ""
echo -e "${YELLOW}Note:${NC} App is using LocalStorage (browser storage)"
echo -e "      Add Cosmos DB later for cloud sync"
echo ""
