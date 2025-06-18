

export interface CloudinaryImage {
  asset_id: string;
  public_id: string;
  asset_folder: string;
  display_name?: string;
  format: string;
  version: number;
  resource_type: string;
  type: string;
  created_at: string; // ISO string
  bytes: number;
  width: number;
  height: number;
  backup: boolean;
  access_mode: string;
  url: string;
  secure_url: string;
}
