import fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";

import type { OAuthClientProvider } from "@modelcontextprotocol/sdk/client/auth.js";
import type {
  OAuthClientInformationFull,
  OAuthClientMetadata,
  OAuthTokens,
} from "@modelcontextprotocol/sdk/shared/auth.js";

const STORAGE_DIR = path.join(process.cwd(), ".silpo-oauth");
const STORAGE_FILE = path.join(STORAGE_DIR, "oauth.json");

type OAuthStorage = {
  clientInformation?: OAuthClientInformationFull;
  tokens?: OAuthTokens;
  codeVerifier?: string;
  state?: string;
  authorizationUrl?: string;
};

async function readStorage(): Promise<OAuthStorage> {
  try {
    const content = await fs.readFile(STORAGE_FILE, "utf8");
    return JSON.parse(content);
  } catch {
    return {};
  }
}

async function writeStorage(data: OAuthStorage): Promise<void> {
  await fs.mkdir(STORAGE_DIR, { recursive: true });

  await fs.writeFile(
    STORAGE_FILE,
    JSON.stringify(data, null, 2),
    "utf8",
  );
}

export class SilpoOAuthProvider implements OAuthClientProvider {
  private readonly callbackUrl: string;

  constructor(
    callbackUrl = "http://localhost:3000/api/mcp/callback",
  ) {
    this.callbackUrl = callbackUrl;
  }

  get redirectUrl(): string {
    return this.callbackUrl;
  }

  get clientMetadata(): OAuthClientMetadata {
    return {
      redirect_uris: [this.callbackUrl],
      client_name: "Silpo Family AI",
      client_uri: "http://localhost:3000",
      grant_types: ["authorization_code", "refresh_token"],
      response_types: ["code"],
      token_endpoint_auth_method: "none",
    };
  }

  async state(): Promise<string> {
    const storage = await readStorage();

    const newState = crypto.randomUUID();

    storage.state = newState;
    await writeStorage(storage);

    return newState;
  }

  async clientInformation() {
    const storage = await readStorage();
    return storage.clientInformation;
  }

  async saveClientInformation(
    clientInformation: OAuthClientInformationFull,
  ): Promise<void> {
    const storage = await readStorage();

    storage.clientInformation = clientInformation;

    await writeStorage(storage);
  }

  async tokens() {
    const storage = await readStorage();
    return storage.tokens;
  }

  async saveTokens(tokens: OAuthTokens): Promise<void> {
    const storage = await readStorage();

    storage.tokens = tokens;

    await writeStorage(storage);
  }

  async saveCodeVerifier(codeVerifier: string): Promise<void> {
    const storage = await readStorage();

    storage.codeVerifier = codeVerifier;

    await writeStorage(storage);
  }

  async codeVerifier(): Promise<string> {
    const storage = await readStorage();

    if (!storage.codeVerifier) {
      throw new Error("Silpo OAuth code verifier not found");
    }

    return storage.codeVerifier;
  }

  async redirectToAuthorization(
    authorizationUrl: URL,
  ): Promise<void> {
    const storage = await readStorage();

    storage.authorizationUrl = authorizationUrl.toString();

    await writeStorage(storage);

    console.log("=================================");
    console.log("SILPO AUTHORIZATION URL");
    console.log(authorizationUrl.toString());
    console.log("=================================");
  }

  async getAuthorizationUrl(): Promise<string | undefined> {
    const storage = await readStorage();

    return storage.authorizationUrl;
  }

  async getSavedState(): Promise<string | undefined> {
    const storage = await readStorage();

    return storage.state;
  }
}