export interface Broadcast {
  id: number;
  event_name: string;
  role: string;
  start_date: string;
  end_date: string | null;
  duration_hours: number;
  organizer_logo_s3_path: string | null;
  game: string;
  organizer: string;
  details: string | null;
  vod_url: string | null;
  created_at: Date;
  updated_at: Date;
}
