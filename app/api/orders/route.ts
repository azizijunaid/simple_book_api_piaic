import { NextRequest, NextResponse } from "next/server";
import pgInstance from "@/app/lib";
import { BookResponse, OrderBody } from "@/app/typings";

export async function GET(request: NextRequest, response: NextResponse) {
  const result = (await pgInstance?.unsafe("SELECT * FROM orders")) as BookResponse[];
  return NextResponse.json({ data: result }, { status: 200 });
}

export async function POST(request: NextRequest) {
  try {
    const { bookId, customer_name, createdBy, quantity } =
      (await request.json()) as OrderBody;

    if (!bookId || !customer_name) {
      return NextResponse.json(
        { error: "required fields missing." },
        {
          status: 403,
        }
      );
    }

    const query = `INSERT INTO "orders" (createdBy, bookId, customer_name, quantity)
    VALUES ('${createdBy}', '${bookId}', '${customer_name}', '${quantity}') returning *`;

    const response = await pgInstance.unsafe(query);

    return NextResponse.json(response, {
      status: 201,
    });
  } catch (error: any) {
    console.log(error);

    return NextResponse.json(
      { error: error.message || "Somethineg went wrong" },
      {
        status: 500,
      }
    );
  }
}
