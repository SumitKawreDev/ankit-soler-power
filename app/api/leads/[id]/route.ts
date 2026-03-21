export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Lead from '@/models/Lead';
import { verifyAdminToken } from '@/lib/auth';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const admin = verifyAdminToken(req);
    if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    await connectDB();
    const lead = await Lead.findById(params.id).lean();
    if (!lead) return NextResponse.json({ error: 'Lead not found' }, { status: 404 });

    return NextResponse.json({ success: true, data: lead });
  } catch (error) {
    console.error('GET lead error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const admin = verifyAdminToken(req);
    if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    await connectDB();
    const lead = await Lead.findByIdAndDelete(params.id);
    if (!lead) return NextResponse.json({ error: 'Lead not found' }, { status: 404 });

    return NextResponse.json({ success: true, message: 'Lead deleted' });
  } catch (error) {
    console.error('DELETE lead error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
