import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { z } from 'zod';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const result = await query(
      'SELECT * FROM broadcasts ORDER BY start_date DESC'
    );
    return NextResponse.json({ broadcasts: result.rows });
  } catch (error) {
    console.error('[broadcasts] GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch broadcasts' }, { status: 500 });
  }
}

// const broadcastSchema = z.object({
//   eventName: z.string().min(1),
//   role: z.string().min(1),
//   startDate: z.string(),
//   endDate: z.string().optional().nullable(),
//   durationHours: z.number().int().positive(),
//   organizerLogoS3Path: z.string().optional().nullable(),
//   gameIconPath: z.string().min(1),
//   details: z.string().optional().nullable(),
//   vodUrl: z.string().url().optional().nullable(),
// });

// export async function POST(request: Request) {
//   try {
//     const body = await request.json();
//     const validatedData = broadcastSchema.parse(body);

//     const result = await query(
//       `INSERT INTO broadcasts
//        (event_name, role, start_date, end_date, duration_hours, organizer_logo_s3_path, game_icon_path, details, vod_url)
//        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
//        RETURNING *`,
//       [
//         validatedData.eventName,
//         validatedData.role,
//         validatedData.startDate,
//         validatedData.endDate || null,
//         validatedData.durationHours,
//         validatedData.organizerLogoS3Path || null,
//         validatedData.gameIconPath,
//         validatedData.details || null,
//         validatedData.vodUrl || null,
//       ]
//     );

//     return NextResponse.json(result.rows[0], { status: 201 });
//   } catch (error) {
//     if (error instanceof z.ZodError) {
//       return NextResponse.json(
//         { error: 'Validation failed', details: error.errors },
//         { status: 400 }
//       );
//     }
//     console.error('[broadcasts] POST error:', error);
//     return NextResponse.json({ error: 'Failed to create broadcast' }, { status: 500 });
//   }
// }
