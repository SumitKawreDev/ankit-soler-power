export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Lead from '@/models/Lead';
import { verifyAdminToken } from '@/lib/auth';
import { mkdir, writeFile } from 'fs/promises';
import { existsSync } from 'fs';
import { join } from 'path';
import { randomBytes } from 'crypto';

const UPLOAD_DIR = join(process.cwd(), 'public', 'uploads', 'bills');
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'application/pdf'];

async function ensureUploadDir() {
  if (!existsSync(UPLOAD_DIR)) {
    await mkdir(UPLOAD_DIR, { recursive: true });
  }
}

function generateUniqueFilename(originalName: string): string {
  const timestamp = Date.now();
  const random = randomBytes(8).toString('hex');
  const extension = originalName.split('.').pop() || 'jpg';
  return `${timestamp}-${random}.${extension}`;
}

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
    
    // Check if request is multipart/form-data
    const contentType = req.headers.get('content-type');
    if (!contentType?.includes('multipart/form-data')) {
      return NextResponse.json(
        { error: 'Content-Type must be multipart/form-data' },
        { status: 400 }
      );
    }

    const formData = await req.formData();
    
    // Extract form fields
    const name = formData.get('name') as string;
    const phone = formData.get('phone') as string;
    const email = formData.get('email') as string;
    const location = formData.get('location') as string;
    const message = formData.get('message') as string;
    const category = formData.get('category') as 'commercial' | 'residential' | 'franchise';
    const companyName = formData.get('companyName') as string;
    const occupation = formData.get('occupation') as string;
    const billFile = formData.get('electricityBill') as File | null;

    // Validate required fields
    if (!name || !phone || !location || !category) {
      return NextResponse.json(
        { error: 'Name, phone, location, and category are required' },
        { status: 400 }
      );
    }

    let electricityBillPath: string | undefined;

    // Handle file upload if present
    if (billFile) {
      // Validate file type
      if (!ALLOWED_TYPES.includes(billFile.type)) {
        return NextResponse.json(
          { error: 'Invalid file type. Only JPG, PNG, and PDF are allowed' },
          { status: 400 }
        );
      }

      // Validate file size
      if (billFile.size > MAX_FILE_SIZE) {
        return NextResponse.json(
          { error: 'File size exceeds 5MB limit' },
          { status: 400 }
        );
      }

      // Ensure upload directory exists
      await ensureUploadDir();

      // Generate unique filename
      const filename = generateUniqueFilename(billFile.name);
      const filepath = join(UPLOAD_DIR, filename);

      // Save file to disk
      const bytes = await billFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      await writeFile(filepath, buffer);

      // Store relative path for database
      electricityBillPath = `/uploads/bills/${filename}`;
    }

    // Create lead document
    const lead = new Lead({
      name,
      phone,
      email,
      location,
      message,
      category,
      electricityBillPath,
      companyName: companyName || undefined,
      occupation: occupation || undefined,
    });

    await lead.save();

    return NextResponse.json(
      {
        success: true,
        message: 'Inquiry submitted successfully',
        data: {
          leadId: lead._id,
          electricityBillPath,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('POST lead error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
