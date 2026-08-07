export type CampaignStatus = "active" | "expired";

export interface Campaign {
  slug: string;
  status: CampaignStatus;
  redirectUrl?: string;
  title: string;
  description: string;
  socialImage: string;
}
