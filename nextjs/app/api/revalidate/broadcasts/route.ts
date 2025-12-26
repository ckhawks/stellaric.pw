import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const apiKey = request.headers.get('x-api-key');

    if (!apiKey || apiKey !== process.env.INTERNAL_API_KEY) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    revalidatePath('/broadcasts');

    return NextResponse.json({
      revalidated: true,
      message: 'Broadcasts page revalidated successfully',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('[revalidate/broadcasts] error:', error);
    return NextResponse.json(
      { error: 'Failed to revalidate' },
      { status: 500 }
    );
  }
}
