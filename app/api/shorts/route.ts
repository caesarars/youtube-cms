import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Short from '@/lib/models/Short';

// GET all shorts
export async function GET() {
  try {
    await connectDB();
    const shorts = await Short.find().sort({ createdAt: -1 });
    return NextResponse.json(shorts);
  } catch (error) {
    console.error('Failed to fetch shorts:', error);
    return NextResponse.json({ error: 'Failed to fetch shorts' }, { status: 500 });
  }
}

// POST create a new short
export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    const short = await Short.create(body);
    return NextResponse.json(short, { status: 201 });
  } catch (error) {
    console.error('Failed to create short:', error);
    return NextResponse.json({ error: 'Failed to create short' }, { status: 500 });
  }
}
