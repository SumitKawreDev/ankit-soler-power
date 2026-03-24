export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Lead from '@/models/Lead';
import { verifyAdminToken } from '@/lib/auth';
import cloudinary from '@/lib/cloudinary';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'application/pdf'];

async function uploadToCloudinary(file: File): Promise<string> {
  return new Promise(async (resolve, reject) => {
    try {
      console.log('Converting file to buffer...');
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      console.log('Buffer created, size:', buffer.length, 'bytes');

      console.log('Starting Cloudinary upload_stream...');
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: 'ankit-solar/bills',
          resource_type: 'auto',
          allowed_formats: ['jpg', 'jpeg', 'png', 'pdf'],
        },
        (error, result) => {
          if (error) {
            console.error('Cloudinary upload error:', error);
            reject(error);
          } else if (result) {
            console.log('Cloudinary upload successful, URL:', result.secure_url);
            resolve(result.secure_url);
          } else {
            reject(new Error('Upload failed - no result returned'));
          }
        }
      );

      stream.end(buffer);
    } catch (error) {
      console.error('Buffer conversion error:', error);
      reject(error);
    }
  });
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
    // Validate environment variables
    if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
      console.error('Missing Cloudinary environment variables');
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

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
    
    // Debug: Log file reception
    const billFile = formData.get('electricityBill') as File | null;
    console.log('File received:', billFile ? {
      name: billFile.name,
      type: billFile.type,
      size: billFile.size,
    } : 'No file');
    
    // Extract form fields
    const name = formData.get('name') as string;
    const phone = formData.get('phone') as string;
    const email = formData.get('email') as string;
    const location = formData.get('location') as string;
    const message = formData.get('message') as string;
    const category = formData.get('category') as 'commercial' | 'residential' | 'franchise';
    const companyName = formData.get('companyName') as string;
    const occupation = formData.get('occupation') as string;

    // Validate required fields
    if (!name || !phone || !location || !category) {
      return NextResponse.json(
        { error: 'Name, phone, location, and category are required' },
        { status: 400 }
      );
    }

    let billImage: string | undefined;

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

      // Upload to Cloudinary
      try {
        console.log('Starting Cloudinary upload...');
        billImage = await uploadToCloudinary(billFile);
        console.log('Cloudinary upload successful:', billImage);
      } catch (uploadError) {
        console.error('Cloudinary upload error:', uploadError);
        const errorMessage = uploadError instanceof Error ? uploadError.message : 'Unknown error';
        return NextResponse.json(
          { error: `Failed to upload file: ${errorMessage}` },
          { status: 500 }
        );
      }
    }

    // Create lead document
    const lead = new Lead({
      name,
      phone,
      email,
      location,
      message,
      category,
      billImage,
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
          billImage,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('POST lead error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Internal server error';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
