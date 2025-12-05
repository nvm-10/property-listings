import { NextRequest, NextResponse } from 'next/server';
import { isSellerWhitelisted } from '@/lib/sellerWhitelist';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json(
        { allowed: false, error: 'Email is required' },
        { status: 400 }
      );
    }

    const allowed = isSellerWhitelisted(email);

    return NextResponse.json({ allowed });
  } catch (error) {
    console.error('Error checking seller access:', error);
    return NextResponse.json(
      { allowed: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
