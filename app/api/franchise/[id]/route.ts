export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Franchise from '@/models/Franchise';
import { verifyAdminToken } from '@/lib/auth';

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const admin = verifyAdminToken(req);
    if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    await connectDB();
    const body = await req.json();
    const franchise = await Franchise.findByIdAndUpdate(params.id, body, { new: true });
    if (!franchise) return NextResponse.json({ error: 'Franchise not found' }, { status: 404 });

    return NextResponse.json({ success: true, data: franchise });
  } catch (error) {
    console.error('PUT franchise error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const admin = verifyAdminToken(req);
    if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    await connectDB();
    const franchise = await Franchise.findByIdAndDelete(params.id);
    if (!franchise) return NextResponse.json({ error: 'Franchise not found' }, { status: 404 });

    return NextResponse.json({ success: true, message: 'Franchise deleted' });
  } catch (error) {
    console.error('DELETE franchise error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
