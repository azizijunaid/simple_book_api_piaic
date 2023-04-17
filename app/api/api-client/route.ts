import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import pgInstance from '@/app/lib';

type Body = {
  name?: string;
  email?: string;
};

export async function POST(request: NextRequest) {
  try {
    const { name, email } = (await request.json()) as Body;

    if (!name || !email) {
      return NextResponse.json(
        { error: "required fields missing." },
        {
          status: 401,
        }
      );
    }

    const query = `INSERT INTO "users" (name, email) VALUES ('${name}', '${email}') returning *`;
    await pgInstance.unsafe(query);

    const accessToken = jwt.sign(
      {
        email,
      },
      process.env.ACCESS_TOKEN_SECRET || "",
      { expiresIn: "7d" }
    );
    console.log("🚀 ~ file: route.ts:34 ~ POST ~ accessToken:", accessToken)

    return NextResponse.json(
      { accessToken },
      {
        status: 200,
      }
    );

  } catch (error: any) {
    console.log(error);

    return NextResponse.json(
      { error: "API client already registered." },
      {
        status: 409,
      }
    );
  }
}
