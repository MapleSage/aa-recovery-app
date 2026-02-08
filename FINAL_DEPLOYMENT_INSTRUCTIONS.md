# Final Deployment Instructions

## ✅ Azure Resources - ALL DEPLOYED!

All infrastructure is live and running:

| Resource | Name | Status |
|----------|------|--------|
| Resource Group | aa-recovery-app-rg | ✅ Running |
| Location | Central US | ✅ Active |
| Cosmos DB | aa-recovery-cosmos-db | ✅ Running |
| Azure OpenAI | aa-recovery-openai | ✅ Running |
| App Service Plan | aa-recovery-plan (P1V3) | ✅ Running |
| Web App | aa-recovery-app | ✅ Running |

**App URL:** https://aa-recovery-app.azurewebsites.net

**Monthly Cost:** ~$200-450

## 📦 Application Code - Needs Upload

The infrastructure is ready, but the application files need to be uploaded.

## 🚀 How to Complete Deployment

### Method 1: Azure Portal (EASIEST - 2 minutes)

1. Go to https://portal.azure.com
2. Search for "aa-recovery-app" in the top search bar
3. Click on your app service
4. In the left menu, click **Deployment Center**
5. Choose one of these options:

   **Option A: Local Git**
   - Click "Local Git"
   - Copy the git URL
   - Run: `git remote add azure <URL>`
   - Run: `git push azure main`

   **Option B: GitHub Actions** (if you have GitHub)
   - Click "GitHub"
   - Connect your repository
   - It will auto-deploy on every push

   **Option C: ZIP Deploy**
   - Click "FTPS credentials" tab at top
   - Note the username and password
   - Use FileZilla or Cyberduck to upload files
   - Or use curl with those credentials

### Method 2: Azure CLI (if auth works)

```bash
# Try this simple command
az webapp deploy \
  --resource-group aa-recovery-app-rg \
  --name aa-recovery-app \
  --src-path deploy.zip \
  --type zip
```

### Method 3: GitHub Actions (RECOMMENDED for long-term)

1. Push this repo to GitHub
2. Go to GitHub repo > Settings > Secrets
3. Add secret: `AZURE_WEBAPP_PUBLISH_PROFILE`
4. Paste content from `publish-profile.xml`
5. Push code - auto-deploys!

## 📁 Files Ready for Deployment

- `deploy.zip` (388MB) - Full application with node_modules
- `deploy-lean.zip` (272MB) - Without node_modules (Azure will build)
- `server.js` - Custom Next.js server for Azure
- `publish-profile.xml` - Deployment credentials

## 🔐 Your Credentials

Saved in: `.env.production.local`

Contains:
- Cosmos DB endpoint and key
- Azure OpenAI endpoint and key
- NextAuth secret
- All environment variables

**⚠️ Keep this file secure! Never commit to Git!**

## ✅ What's Already Configured

- ✅ Node.js 20 runtime
- ✅ Startup command: `node server.js`
- ✅ All environment variables set
- ✅ HTTPS enabled
- ✅ Premium tier (P1V3)
- ✅ Always On enabled

## 🎯 Once Deployed

Your app will be live at:
**https://aa-recovery-app.azurewebsites.net**

Features available:
- Full 12-step program
- Sobriety tracker
- AI chat (GPT-4)
- Step inventories
- Daily journals
- Cloud data sync

## 📊 Monitor Your App

```bash
# View logs
az webapp log tail --name aa-recovery-app --resource-group aa-recovery-app-rg

# Restart app
az webapp restart --name aa-recovery-app --resource-group aa-recovery-app-rg

# Check status
az webapp show --name aa-recovery-app --resource-group aa-recovery-app-rg --query state
```

## 💡 Tips

1. **First deployment takes 2-3 minutes** after upload
2. **Use deploy-lean.zip** if you want Azure to build (faster upload)
3. **Set up GitHub Actions** for easiest long-term maintenance
4. **Monitor costs** in Azure Portal > Cost Management

## 🆘 If You Need Help

1. Azure Portal has excellent docs
2. Check logs for any errors
3. Restart the app if it's not responding
4. Verify environment variables are set

## 🎉 You're Almost There!

Just upload the files using any of the methods above and your app will be live!

---

**Next Steps:**
1. Choose a deployment method above
2. Upload the files
3. Wait 2-3 minutes
4. Visit https://aa-recovery-app.azurewebsites.net
5. Test all features!
