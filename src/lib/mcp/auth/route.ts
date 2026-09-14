import { NextResponse } from "next/server";

import {
  createSilpoMcpClient,
  createSilpoOAuthProvider,
} from "@/lib/mcp/client";

export const runtime = "nodejs";

export async function GET() {
  const provider = createSilpoOAuthProvider();

  try {
    const client = await createSilpoMcpClient();

    await client.close();

    return NextResponse.json({
      success: true,
      message: "Silpo MCP already authorized",
    });
  } catch (error) {
    console.log("=== SILPO AUTH START ===");
    console.log(error);

    const authorizationUrl =
      await provider.getAuthorizationUrl();

    if (!authorizationUrl) {
      return NextResponse.json(
        {
          error:
            "Не вдалося отримати Silpo authorization URL",
        },
        { status: 500 },
      );
    }

    return NextResponse.redirect(authorizationUrl);
  }
}