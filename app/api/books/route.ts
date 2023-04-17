import { NextRequest, NextResponse } from "next/server";
import pgInstance from "@/app/lib";
import { BookResponse } from '@/app/typings';
import qs from "query-string";

export async function GET(request: NextRequest) {

  let query = "SELECT * from book";
  const { author_id , limit } = qs.parse(request.nextUrl.searchParams.toString());

  if (author_id) {
    query += ` WHERE author_id='${author_id}'`;
  }

  if (limit) {
    query += ` LIMIT ${limit}`;
  }

  const result = await pgInstance?.unsafe(query) as BookResponse[];
  return NextResponse.json({ data: result }, { status: 200 });
}

export async function POST(request: NextRequest, response: NextResponse) {
  try {
    const { author_id, book_name } = await request.json() as BookResponse;
    const sql = `INSERT INTO "book" (book_name, author_id) VALUES ('${book_name}', '${author_id}') returning *`;
    await pgInstance?.unsafe(sql);
    return NextResponse.json({ data: `successfully added` }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ data: error.message }, { status: 500 });
  }
}
