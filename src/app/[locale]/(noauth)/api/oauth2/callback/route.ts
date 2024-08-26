import { cookies } from "next/headers";
import { NextRequest } from "next/server";

import { nulabService } from "@/services/server";

export const dynamic = "force-dynamic";

export const GET = async (request: NextRequest) => {
  const {
    nextUrl: { searchParams, origin },
  } = request;
  const code = searchParams.get("code");
  const refreshedToken = searchParams.get("refreshed_token");

  if (refreshedToken) {
    const cookiesStore = cookies();
    cookiesStore.set("nulab-auth-token", refreshedToken);

    return Response.redirect(origin);
  }

  if (!code) {
    return Response.error();
  }

  const nulubOAuth2Token = await nulabService.requestOAuth2Token(code, {
    redirect_uri: `${origin}/api/oauth2/callback`,
  });

  const { access_token, refresh_token, expires_in } = nulubOAuth2Token;

  const cookiesStore = cookies();

  cookiesStore.set("nulab-auth-token", access_token, {
    maxAge: Number(expires_in),
  });
  cookiesStore.set("nulab-refresh-token", refresh_token);

  return Response.redirect(origin);
};
