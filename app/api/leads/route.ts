import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Lead from '@/models/Lead';
import { verifyAdminToken } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    const admin = verifyAdminToken(req);
    if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    await connectDB();
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    const limit = searchParams.get('limit');

    const query: Record<string, unknown> = {};
    if (category) query.category = category;

    let leadsQuery = Lead.find(query).sort({ createdAt: -1 });
    if (limit) leadsQuery = leadsQuery.limit(parseInt(limit));

    const leads = await leadsQuery.lean();
    return NextResponse.json({ success: true, data: leads });
  } catch (error) {
    console.error('GET leads error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();

    const { name, phone, location, category } = body;
    if (!name || !phone || !location || !category) {
      return NextResponse.json({ error: 'Name, phone, location, and category are required' }, { status: 400 });
    }

    const lead = new Lead(body);
    await lead.save();

    return NextResponse.json({ success: true, message: 'Inquiry submitted successfully' }, { status: 201 });
  } catch (error) {
    console.error('POST lead error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
