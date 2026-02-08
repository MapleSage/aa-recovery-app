# Quick Start - Deploy to Azure in 5 Minutes

## Prerequisites
- Azure account ([Create free account](https://azure.microsoft.com/free))
- Azure CLI installed ([Download](https://docs.microsoft.com/cli/azure/install-azure-cli))
- Node.js 18+ installed

## Automated Deployment (Recommended)

### Step 1: Login to Azure
```bash
az login
```

### Step 2: Run Deployment Script
```bash
chmod +x deploy-azure-premium.sh
./deploy-azure-premium.sh
```

**That's it!** The script will:
- ✅ Create all Azure resources (15-20 min)
- ✅ Configure Cosmos DB (Serverless)
- ✅ Deploy GPT-4 on Azure OpenAI
- ✅ Create Premium App Service (P1V3)
- ✅ Build and deploy your app
- ✅ Set up monitoring
- ✅ Generate credentials

### Step 3: Access Your App

After deployment completes, visit:
```
https://aa-recovery-app.azurewebsites.net
```

## What You Get

### Premium Infrastructure
- **App Service P1V3**: 2 vCPU, 8GB RAM, auto-scaling
- **Cosmos DB Serverless**: Pay per request, 99.99% SLA
- **Azure OpenAI GPT-4**: Latest model with 10 req/s
- **Application Insights**: Full monitoring and analytics
- **HTTPS**: Automatic SSL certificate
- **CI/CD**: GitHub Actions ready

### Cost
- **Estimated**: $200-450/month
- **Free tier available**: First month may be covered by free credits

## Manual Deployment

If you prefer step-by-step control, see [AZURE_DEPLOYMENT_GUIDE.md](AZURE_DEPLOYMENT_GUIDE.md)

## Post-Deployment

### 1. Verify Deployment
```bash
# Check app status
az webapp show \
  --name aa-recovery-app \
  --resource-group aa-recovery-premium-rg \
  --query state

# Test the app
curl https://aa-recovery-app.azurewebsites.net
```

### 2. View Credentials
Your credentials are saved in `.env.production.local`:
```bash
cat .env.production.local
```

⚠️ **Keep this file secure!** Do not commit to Git.

### 3. Set Up GitHub CI/CD (Optional)

1. Add GitHub secrets (from `.env.production.local`):
   - `AZURE_WEBAPP_PUBLISH_PROFILE` (from `publish-profile.xml`)
   - `COSMOS_ENDPOINT`
   - `COSMOS_KEY`
   - `COSMOS_DATABASE`
   - `AZURE_OPENAI_ENDPOINT`
   - `AZURE_OPENAI_KEY`
   - `AZURE_OPENAI_DEPLOYMENT`

2. Push to GitHub - auto-deployment will trigger!

### 4. Monitor Your App

**Azure Portal:**
- App Service: Monitor performance
- Cosmos DB: View data and metrics
- Application Insights: Track errors and usage
- Cost Management: Monitor spending

**CLI:**
```bash
# View logs
az webapp log tail \
  --name aa-recovery-app \
  --resource-group aa-recovery-premium-rg

# Check metrics
az monitor metrics list \
  --resource aa-recovery-app \
  --resource-group aa-recovery-premium-rg \
  --resource-type "Microsoft.Web/sites" \
  --metric "Requests"
```

## Common Issues

### Issue: Build fails
```bash
# Solution: Check Node version
az webapp config show \
  --name aa-recovery-app \
  --resource-group aa-recovery-premium-rg
```

### Issue: Environment variables missing
```bash
# Solution: Verify settings
az webapp config appsettings list \
  --name aa-recovery-app \
  --resource-group aa-recovery-premium-rg
```

### Issue: Database connection fails
```bash
# Solution: Check Cosmos DB status
az cosmosdb show \
  --name aa-recovery-cosmos-premium \
  --resource-group aa-recovery-premium-rg
```

## Need Help?

- 📖 [Full Deployment Guide](AZURE_DEPLOYMENT_GUIDE.md)
- 📖 [Project Documentation](README.md)
- 🐛 [Report Issues](https://github.com/yourusername/aa-recovery-app/issues)
- 💬 [Azure Support](https://azure.microsoft.com/support)

## Clean Up (Delete Everything)

To delete all resources and stop charges:
```bash
az group delete \
  --name aa-recovery-premium-rg \
  --yes \
  --no-wait
```

⚠️ **Warning**: This permanently deletes all data!

## Next Steps

- ✅ Test all app features
- ✅ Configure custom domain
- ✅ Set up backup strategy
- ✅ Enable auto-scaling
- ✅ Configure alerts
- ✅ Build mobile apps (iOS/Android)

---

**Your AA Recovery App is live! 🎉**

Visit: https://aa-recovery-app.azurewebsites.net
