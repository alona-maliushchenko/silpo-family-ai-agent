import { NextResponse } from "next/server";

import {
  createSilpoOAuthProvider,
  SILPO_MCP_URL,
} from "@/lib/mcp/client";

import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const url = new URL(request.url);

  const code = url.searchParams.get("code");
  const returnedState = url.searchParams.get("state");

  console.log("=== SILPO OAUTH CALLBACK ===");
  console.log("Has code:", Boolean(code));
  console.log("Has state:", Boolean(returnedState));

  if (!code) {
    return NextResponse.json(
      {
        error:
          "Silpo OAuth callback не містить authorization code",
      },
      { status: 400 },
    );
  }

  const provider = createSilpoOAuthProvider();

  const expectedState = await provider.getSavedState();

  if (
    expectedState &&
    returnedState !== expectedState
  ) {
    console.error("OAuth state mismatch");

    return NextResponse.json(
      {
        error: "OAuth state mismatch",
      },
      { status: 400 },
    );
  }

  try {
    const transport =
      new StreamableHTTPClientTransport(
        new URL(SILPO_MCP_URL),
        {
          authProvider: provider,
        },
      );

    await transport.finishAuth(code);

    await transport.close();

    console.log("=== SILPO OAUTH SUCCESS ===");

    return NextResponse.redirect(
      new URL("/products", request.url),
    );
  } catch (error) {
    console.error(
      "=== SILPO OAUTH CALLBACK ERROR ===",
    );
    console.error(error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Silpo OAuth authorization failed",
      },
      { status: 500 },
    );
  }
}