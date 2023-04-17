import pgInstance from '@/app/lib';
import { NextRequest, NextResponse } from 'next/server';

import { BookResponse, Params } from '@/app/typings';

export async function GET(request: NextRequest, { params }: { params: Params }) {
  const { bookId } = params;
  const result = await pgInstance?.unsafe(`SELECT * FROM book where id = ${bookId}`) as BookResponse[];
  return NextResponse.json({ data: result }, { status: 200 });
}
