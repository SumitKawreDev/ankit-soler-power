export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Franchise from '@/models/Franchise';
import { verifyAdminToken } from '@/lib/auth';

export async function GET() {
  try {
    await connectDB();
    const franchises = await Franchise.find({}).sort({ createdAt: -1 }).lean();
    return NextResponse.json({ success: true, data: franchises });
  } catch (error) {
    console.error('GET franchise error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const admin = verifyAdminToken(req);
    if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    await connectDB();
    const body = await req.json();

    const franchise = new Franchise(body);
    await franchise.save();

    return NextResponse.json({ success: true, data: franchise }, { status: 201 });
  } catch (error) {
    console.error('POST franchise error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
