export interface SocialProviderMeta {
  id: string;
  label: string;
  env: [string, string];
}

export const SOCIAL_PROVIDERS: SocialProviderMeta[] = [
  { id: 'google', label: 'Google', env: ['GOOGLE_CLIENT_ID', 'GOOGLE_CLIENT_SECRET'] },
  { id: 'facebook', label: 'Facebook', env: ['FACEBOOK_CLIENT_ID', 'FACEBOOK_CLIENT_SECRET'] },
  { id: 'twitter', label: 'X (Twitter)', env: ['TWITTER_CLIENT_ID', 'TWITTER_CLIENT_SECRET'] },
  { id: 'linkedin', label: 'LinkedIn', env: ['LINKEDIN_CLIENT_ID', 'LINKEDIN_CLIENT_SECRET'] },
  { id: 'azure-ad', label: 'Azure AD / Entra ID', env: ['AZURE_AD_CLIENT_ID', 'AZURE_AD_CLIENT_SECRET'] },
  { id: 'instagram', label: 'Instagram', env: ['INSTAGRAM_CLIENT_ID', 'INSTAGRAM_CLIENT_SECRET'] },
  { id: 'amazon', label: 'Amazon', env: ['AMAZON_CLIENT_ID', 'AMAZON_CLIENT_SECRET'] },
];

export function providerIsConfigured(providerId: string): boolean {
  const provider = SOCIAL_PROVIDERS.find((item) => item.id === providerId);
  if (!provider) {
    return false;
  }

  const [idVar, secretVar] = provider.env;
  return Boolean(process.env[idVar] && process.env[secretVar]);
}

export function getProviderStatus(): Record<string, boolean> {
  return SOCIAL_PROVIDERS.reduce<Record<string, boolean>>((status, provider) => {
    status[provider.id] = providerIsConfigured(provider.id);
    return status;
  }, {});
}
