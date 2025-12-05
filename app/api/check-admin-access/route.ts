import { NextResponse } from 'next/server';
import { isAdminWhitelisted } from '@/lib/adminWhitelist';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();
    
    if (!email) {
      return NextResponse.json({ allowed: false }, { status: 400 });
    }

    const isAllowed = isAdminWhitelisted(email);
    
    return NextResponse.json({ allowed: isAllowed });
  } catch (error) {
    return NextResponse.json({ allowed: false }, { status: 500 });
  }
}
