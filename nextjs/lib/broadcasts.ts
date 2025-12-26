import { Broadcast } from '@/lib/db/types';
import { BroadcastDisplay } from '@/types/broadcast';

export function formatBroadcastDate(startDate: string, endDate: string | null): string {
  const start = new Date(startDate);
  if (!endDate) {
    return start.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  }

  const end = new Date(endDate);

  // Same month: "Mar 18-20, 2024"
  if (start.getMonth() === end.getMonth()) {
    return `${start.toLocaleDateString('en-US', { month: 'short' })} ${start.getDate()}-${end.getDate()}, ${start.getFullYear()}`;
  }

  // Different months: "Mar 18 - Apr 2, 2024"
  return `${start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${end.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}, ${start.getFullYear()}`;
}

export function formatDuration(hours: number): string {
  if (hours < 24) {
    return `${hours} hour${hours !== 1 ? 's' : ''}`;
  }

  const days = Math.floor(hours / 24);
  const remainingHours = hours % 24;

  if (remainingHours === 0) {
    return `${days} day${days !== 1 ? 's' : ''}`;
  }

  return `${days}d ${remainingHours}h`;
}

export function getS3Url(path: string | null): string | null {
  if (!path) return null;

  return `https://s3.${process.env.NEXT_PUBLIC_S3_REGION}.amazonaws.com/${process.env.NEXT_PUBLIC_S3_BUCKET}/${path}`;
}

export function getGameName(iconPath: string): string {
  // Extract game name from path like "game-icons/valorant.svg"
  const filename = iconPath.split('/').pop() || '';
  return filename.replace('.svg', '').replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());
}

export function transformBroadcast(broadcast: Broadcast): BroadcastDisplay {
  return {
    ...broadcast,
    dateDisplay: formatBroadcastDate(broadcast.start_date, broadcast.end_date),
    durationDisplay: formatDuration(broadcast.duration_hours),
    logoUrl: getS3Url(broadcast.organizer_logo_s3_path)
  };
}
