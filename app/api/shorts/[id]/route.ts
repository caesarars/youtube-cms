import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Short from '@/lib/models/Short';

// GET single short by id
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const short = await Short.findById(params.id);
    if (!short) {
      return NextResponse.json({ error: 'Short not found' }, { status: 404 });
    }
    return NextResponse.json(short);
  } catch (error) {
    console.error('Failed to fetch short:', error);
    return NextResponse.json({ error: 'Failed to fetch short' }, { status: 500 });
  }
}

// PUT update a short
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const body = await request.json();
    const short = await Short.findByIdAndUpdate(params.id, body, {
      new: true,
      runValidators: true,
    });
    if (!short) {
      return NextResponse.json({ error: 'Short not found' }, { status: 404 });
    }
    return NextResponse.json(short);
  } catch (error) {
    console.error('Failed to update short:', error);
    return NextResponse.json({ error: 'Failed to update short' }, { status: 500 });
  }
}

// DELETE a short
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const short = await Short.findByIdAndDelete(params.id);
    if (!short) {
      return NextResponse.json({ error: 'Short not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Short deleted' });
  } catch (error) {
    console.error('Failed to delete short:', error);
    return NextResponse.json({ error: 'Failed to delete short' }, { status: 500 });
  }
}
