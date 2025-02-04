import { createGoogleAccount } from "@/features/login-with-google";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const queryParamsCode = request.nextUrl.searchParams.get("code");
  if (queryParamsCode) {
    const Tokens = await createGoogleAccount(queryParamsCode);
    const port = `:${process.env.HOST_PORT}`
    const url = `${process.env.HOST_URL}${port??""}/auth?accessTokenData=${Tokens.access.token}&refreshTokenData=${Tokens.refresh.token}`
    console.log("url =>   ",url)
    return Response.redirect(url);
  }
  return Response.redirect(process.env.HOST_URL??"http://sck.kz");
}
