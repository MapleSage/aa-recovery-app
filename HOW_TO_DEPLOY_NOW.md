# How to Deploy Your App RIGHT NOW

## Current Status
✅ All Azure infrastructure is deployed and running
✅ Application is built successfully (`deploy-source.zip` = 23MB)
❌ Need to upload files (automated CLI methods hitting auth/size limits)

## The FASTEST Working Methods

### Method 1: Azure Portal - Drag & Drop (2 MINUTES) ⭐⭐⭐

**This is THE EASIEST way:**

1. **Open**: https://portal.azure.com
2. **Search**: "aa-recovery-app" (top search bar)
3. **Click**: Your app service name
4. **Left Menu**: Click "Advanced Tools" > "Go"
5. **New Tab Opens**: Kudu dashboard
6. **Top Menu**: Click "Tools" > "Zip Push Deploy"
7. **Drag & Drop**: `deploy-source.zip` (23MB file from your project folder)
8. **Wait**: 30 seconds for upload + 2-3 minutes for Azure to build
9. **Done**: Visit https://aa-recovery-app.azurewebsites.net

**Why this works:** Kudu interface bypasses CLI auth issues and accepts any size.

---

### Method 2: VS Code Extension (3 MINUTES) ⭐⭐

1. **Install**: "Azure App Service" extension in VS Code
2. **Sign In**: Click Azure icon in sidebar > Sign in
3. **Find App**: Expand your subscription > Find "aa-recovery-app"
4. **Right Click**: On aa-recovery-app > "Deploy to Web App"
5. **Select**: Your project folder
6. **Confirm**: Click "Deploy"
7. **Wait**: 3-5 minutes
8. **Done**: App is live!

---

### Method 3: FTP Upload (5 MINUTES) ⭐

1. **Get Credentials**:
   - Go to Azure Portal > aa-recovery-app
   - Click "Deployment Center"
   - Click "FTPS Credentials" tab
   - Copy username & password

2. **Use FileZilla/Cyberduck**:
   - Host: `ftps://waws-prod-dm1-123.ftp.azurewebsites.windows.net`
   - Username: (from portal)
   - Password: (from portal)
   - Connect

3. **Navigate**: `/site/wwwroot/`

4. **Upload All Files**:
   - `.next` folder
   - `app` folder
   - `components` folder
   - `lib` folder
   - `public` folder
   - `node_modules` folder (or run `npm install` remotely)
   - `package.json`
   - `package-lock.json`
   - `next.config.ts`
   - `server.js`
   - All other TypeScript configs

5. **SSH & Build** (if didn't upload node_modules):
   ```bash
   cd /home/site/wwwroot
   npm install
   npm run build
   ```

---

### Method 4: GitHub Actions (BEST LONG-TERM) ⭐⭐⭐

**If you have GitHub:**

1. **Create GitHub Repo** (if you haven't):
   ```bash
   # On GitHub.com, create new repo
   git remote add origin https://github.com/YOUR_USERNAME/aa-recovery-app.git
   git push -u origin main
   ```

2. **Add Secret**:
   - Go to GitHub repo > Settings > Secrets and variables > Actions
   - Click "New repository secret"
   - Name: `AZURE_WEBAPP_PUBLISH_PROFILE`
   - Value: Get from Azure Portal:
     - Portal > aa-recovery-app > "Download publish profile"
     - Paste entire XML content
   - Click "Add secret"

3. **Workflow Already Exists**:
   - File: `.github/workflows/azure-deploy.yml` (already in your repo)
   - It will auto-deploy on every push to `main`

4. **Push Code**:
   ```bash
   git push origin main
   ```

5. **Monitor**:
   - GitHub > Actions tab
   - Watch deployment progress
   - Takes 5-7 minutes first time

6. **Done**:
   - Auto-deploys on every future push
   - No manual steps needed ever again!

---

## Which Method Should You Use?

| Method | Time | Difficulty | Best For |
|--------|------|------------|----------|
| **Portal Drag & Drop** | 2 min | Easiest | **Right now** |
| **VS Code** | 3 min | Easy | Developers |
| **FTP** | 5 min | Medium | Manual control |
| **GitHub Actions** | 10 min setup | Medium | **Long-term** |

---

## After Upload

1. **Wait 2-3 minutes** for Azure to:
   - Extract files
   - Run `npm install`
   - Run `npm run build`
   - Start the server

2. **Visit**: https://aa-recovery-app.azurewebsites.net

3. **Check Logs** if issues:
   ```bash
   az webapp log tail --name aa-recovery-app --resource-group aa-recovery-app-rg
   ```

---

## If Something Goes Wrong

### App shows "Application Error"
```bash
# Restart app
az webapp restart --name aa-recovery-app --resource-group aa-recovery-app-rg

# Check logs
az webapp log tail --name aa-recovery-app --resource-group aa-recovery-app-rg
```

### Build fails
```bash
# SSH into app
az webapp ssh --name aa-recovery-app --resource-group aa-recovery-app-rg

# Manual build
cd /home/site/wwwroot
npm install
npm run build
```

### App won't start
- Check that `server.js` is uploaded
- Verify startup command: `node server.js`
- Check environment variables are set

---

## Files You Need

All ready in your project folder:
- ✅ `deploy-source.zip` (23MB) - Upload this via Portal
- ✅ `server.js` - Custom Azure server
- ✅ `.env.production.local` - Your credentials
- ✅ `.github/workflows/azure-deploy.yml` - GitHub Actions workflow

---

## 🎯 RECOMMENDED PATH

**For immediate deployment:**
1. Use **Portal Drag & Drop** (Method 1) - Get it working in 2 minutes

**For long-term:**
2. Set up **GitHub Actions** (Method 4) - Auto-deploy on every push

---

## Summary

- Infrastructure: ✅ 100% Complete
- Code: ✅ Built & Ready
- **Next Step**: Choose a deployment method above and upload!

**Your app will be live at https://aa-recovery-app.azurewebsites.net in 5 minutes!**
