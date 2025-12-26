import { Broadcast } from '@/lib/db/types';

export interface BroadcastDisplay extends Broadcast {
  dateDisplay: string;
  durationDisplay: string;
  logoUrl: string | null;
  game: string;
}

export function dbToDisplay(broadcast: Broadcast): BroadcastDisplay {
  return {
    ...broadcast,
    dateDisplay: '',
    durationDisplay: '',
    logoUrl: null,
    game: '',
  };
}
