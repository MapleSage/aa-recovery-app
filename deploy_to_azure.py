#!/usr/bin/env python3
import requests
import json
import subprocess
import sys

print("Getting deployment credentials...")
result = subprocess.run([
    'az', 'webapp', 'deployment', 'list-publishing-credentials',
    '--name', 'aa-recovery-app',
    '--resource-group', 'aa-recovery-app-rg'
], capture_output=True, text=True)

if result.returncode != 0:
    print(f"Error: {result.stderr}")
    sys.exit(1)

creds = json.loads(result.stdout)
username = creds['publishingUserName']
password = creds['publishingPassword']

print(f"✅ Got credentials for user: {username}")
print("📦 Uploading deploy.zip (388MB) - this will take 3-5 minutes...")

url = 'https://aa-recovery-app.scm.azurewebsites.net/api/zipdeploy'

with open('deploy.zip', 'rb') as f:
    response = requests.post(
        url,
        data=f,
        auth=(username, password),
        headers={'Content-Type': 'application/zip'},
        timeout=600
    )

print(f"\n{'='*60}")
print(f"Deployment Status: {response.status_code}")
print(f"{'='*60}")

if response.status_code == 200:
    print("✅ Deployment successful!")
    print("\nYour app is deploying now. It will be live in 1-2 minutes at:")
    print("https://aa-recovery-app.azurewebsites.net")
elif response.status_code == 202:
    print("✅ Deployment accepted and processing!")
    print("\nYour app is deploying now. It will be live in 2-3 minutes at:")
    print("https://aa-recovery-app.azurewebsites.net")
else:
    print(f"❌ Deployment failed!")
    print(f"Response: {response.text[:500]}")
    sys.exit(1)
