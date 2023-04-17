import { NextRequest, NextResponse } from "next/server";
import { verifyAuth } from './app/lib/auth';

export async function middleware(request: NextRequest) {
  try {
    const authToken = request.headers.get("authorization")
    const host = request.headers.get("host")!;

    if (!authToken) {
      return NextResponse.json(
        { error: "not permitted" },
        {
          status: 401,
        }
      );
    }

    // api call to fetch user data from database
    const decodedUser = await verifyAuth(authToken, host);

    // passing the data by headers
    const headers = new Headers(request.headers);
    headers.set("userId", JSON.stringify(decodedUser.id));

    return NextResponse.next({ headers });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      {
        status: 500,
      }
    );
  }
}

export const config = {
  matcher: ["/api/orders/:path*"],
};
