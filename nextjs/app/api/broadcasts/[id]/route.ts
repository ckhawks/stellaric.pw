import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    if (isNaN(id)) {
      return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
    }

    const body = await request.json();

    // Build dynamic UPDATE query based on provided fields
    const fields: string[] = [];
    const values: any[] = [];
    let paramIndex = 1;

    if (body.eventName !== undefined) {
      fields.push(`event_name = $${paramIndex++}`);
      values.push(body.eventName);
    }
    if (body.role !== undefined) {
      fields.push(`role = $${paramIndex++}`);
      values.push(body.role);
    }
    if (body.startDate !== undefined) {
      fields.push(`start_date = $${paramIndex++}`);
      values.push(body.startDate);
    }
    if (body.endDate !== undefined) {
      fields.push(`end_date = $${paramIndex++}`);
      values.push(body.endDate);
    }
    if (body.durationHours !== undefined) {
      fields.push(`duration_hours = $${paramIndex++}`);
      values.push(body.durationHours);
    }
    if (body.organizerLogoS3Path !== undefined) {
      fields.push(`organizer_logo_s3_path = $${paramIndex++}`);
      values.push(body.organizerLogoS3Path);
    }
    if (body.gameIconPath !== undefined) {
      fields.push(`game_icon_path = $${paramIndex++}`);
      values.push(body.gameIconPath);
    }
    if (body.details !== undefined) {
      fields.push(`details = $${paramIndex++}`);
      values.push(body.details);
    }
    if (body.vodUrl !== undefined) {
      fields.push(`vod_url = $${paramIndex++}`);
      values.push(body.vodUrl);
    }

    if (fields.length === 0) {
      return NextResponse.json(
        { error: 'No fields to update' },
        { status: 400 }
      );
    }

    fields.push(`updated_at = NOW()`);
    values.push(id);

    const result = await query(
      `UPDATE broadcasts SET ${fields.join(', ')} WHERE id = $${paramIndex} RETURNING *`,
      values
    );

    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'Broadcast not found' }, { status: 404 });
    }

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error('[broadcasts] PATCH error:', error);
    return NextResponse.json(
      { error: 'Failed to update broadcast' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    if (isNaN(id)) {
      return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
    }

    const result = await query('DELETE FROM broadcasts WHERE id = $1', [id]);

    if (result.rowCount === 0) {
      return NextResponse.json({ error: 'Broadcast not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[broadcasts] DELETE error:', error);
    return NextResponse.json(
      { error: 'Failed to delete broadcast' },
      { status: 500 }
    );
  }
}
