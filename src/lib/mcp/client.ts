import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";

import { SilpoOAuthProvider } from "./oauth-provider";

export const SILPO_MCP_URL =
  "https://mcp.silpo.ua/mcp";

export function createSilpoOAuthProvider() {
  return new SilpoOAuthProvider(
    "http://localhost:3000/api/mcp/callback",
  );
}

export async function createSilpoMcpClient(): Promise<Client> {
  const client = new Client(
    {
      name: "silpo-family-ai-agent",
      version: "0.1.0",
    },
    {
      capabilities: {},
    },
  );

  const authProvider =
    createSilpoOAuthProvider();

  const transport =
    new StreamableHTTPClientTransport(
      new URL(SILPO_MCP_URL),
      {
        authProvider,
      },
    );

  await client.connect(transport);

  return client;
}