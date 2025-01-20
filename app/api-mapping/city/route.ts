import { NextResponse } from "next/server";
import getData from "./api/getData";

export async function GET(): Promise<Response> {
  const response = await getData();
  if (response) {
    return NextResponse.json(response, { status: 200 });
  }

  return NextResponse.json(null, { status: 500 });
}
