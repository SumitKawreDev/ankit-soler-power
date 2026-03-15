import { NextRequest, NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
import connectDB from '@/lib/mongodb';
import Lead from '@/models/Lead';
import Project from '@/models/Project';
import Franchise from '@/models/Franchise';
import { verifyAdminToken } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    const admin = verifyAdminToken(req);
    if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    await connectDB();

    const [
      totalLeads,
      commercialLeads,
      residentialLeads,
      franchiseLeads,
      totalProjects,
      commercialProjects,
      residentialProjects,
      totalFranchise,
      recentLeads,
      recentProjects,
    ] = await Promise.all([
      Lead.countDocuments(),
      Lead.countDocuments({ category: 'commercial' }),
      Lead.countDocuments({ category: 'residential' }),
      Lead.countDocuments({ category: 'franchise' }),
      Project.countDocuments(),
      Project.countDocuments({ category: 'commercial' }),
      Project.countDocuments({ category: 'residential' }),
      Franchise.countDocuments(),
      Lead.find().sort({ createdAt: -1 }).limit(5).lean(),
      Project.find().sort({ createdAt: -1 }).limit(5).lean(),
    ]);

    return NextResponse.json({
      success: true,
      data: {
        leads: { total: totalLeads, commercial: commercialLeads, residential: residentialLeads, franchise: franchiseLeads },
        projects: { total: totalProjects, commercial: commercialProjects, residential: residentialProjects },
        franchise: { total: totalFranchise },
        recentLeads,
        recentProjects,
      },
    });
  } catch (error) {
    console.error('Stats error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
