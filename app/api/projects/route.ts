import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Project from '@/models/Project';
import { verifyAdminToken } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    const featured = searchParams.get('featured');
    const limit = searchParams.get('limit');

    const query: Record<string, unknown> = {};
    if (category) query.category = category;
    if (featured === 'true') query.featured = true;

    let projectsQuery = Project.find(query).sort({ createdAt: -1 });
    if (limit) projectsQuery = projectsQuery.limit(parseInt(limit));

    const projects = await projectsQuery.lean();
    return NextResponse.json({ success: true, data: projects });
  } catch (error) {
    console.error('GET projects error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const admin = verifyAdminToken(req);
    if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    await connectDB();
    const body = await req.json();

    const project = new Project(body);
    await project.save();

    return NextResponse.json({ success: true, data: project }, { status: 201 });
  } catch (error) {
    console.error('POST project error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
