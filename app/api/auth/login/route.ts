export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Admin from '@/models/Admin';
import { signToken } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { userId, password } = await req.json();

    if (!userId || !password) {
      return NextResponse.json({ error: 'User ID and password are required' }, { status: 400 });
    }

    // Auto-create admin if none exists (first run)
    let admin = await Admin.findOne({ userId });
    if (!admin) {
      const defaultId = process.env.ADMIN_DEFAULT_ID || 'admin';
      const defaultPassword = process.env.ADMIN_DEFAULT_PASSWORD || 'admin123';
      if (userId === defaultId) {
        admin = new Admin({ userId: defaultId, password: defaultPassword });
        await admin.save();
      } else {
        return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
      }
    }

    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const token = signToken({ id: admin._id.toString(), userId: admin.userId });

    const response = NextResponse.json({ success: true, message: 'Login successful', token });
    response.cookies.set('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60,
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
