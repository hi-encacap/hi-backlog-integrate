import { redirect } from "next/navigation";

import { NulabApiPath } from "@/constants/nulab-api";
import { IBacklogProject } from "@/interfaces/nulab";
import { env } from "@/libs";
import nulabRequest from "@/utils/axios/nulab";
import { joinURLs } from "@/utils/helper";
import { cookies } from "next/headers";

const requestOAuth2Access = () => {
  const nulabBaseURL = env.NEXT_PUBLIC_NULAB_BASE_URL;
  const nulabClientId = env.NEXT_PUBLIC_NULAB_CLIENT_ID;

  redirect(
    `${nulabBaseURL}/${NulabApiPath.REQUEST_OAUTH_ACCESS}?client_id=${nulabClientId}&response_type=code`,
  );
};

const requestOAuth2Token = async (code: string, options: Record<string, string>) => {
  const response = await nulabRequest.post<Record<string, string>>(
    "api/v2/oauth2/token",
    {
      ...options,
      grant_type: "authorization_code",
      code,
      client_id: env.NEXT_PUBLIC_NULAB_CLIENT_ID,
      client_secret: env.NEXT_APP_NULAB_CLIENT_SECRET,
    },
    {
      headers: {
        Authorization: "!",
      },
    },
  );

  return response.data.data;
};

const refreshOAuth2Token = async () => {
  const nulabRefreshToken = cookies().get("nulab-refresh-token");

  if (!nulabRefreshToken) {
    return requestOAuth2Access();
  }

  try {
    const response = await nulabRequest.post<Record<string, string>>("api/v2/oauth2/token", {
      grant_type: "refresh_token",
      refresh_token: nulabRefreshToken,
      client_id: env.NEXT_PUBLIC_NULAB_CLIENT_ID,
      client_secret: env.NEXT_APP_NULAB_CLIENT_SECRET,
    });

    const { access_token, refresh_token, expires_in } = response.data.data;
    const cookiesStore = cookies();

    cookiesStore.set("nulab-auth-token", access_token, {
      maxAge: Number(expires_in),
    });
    cookiesStore.set("nulab-refresh-token", refresh_token);

    return redirect(joinURLs(env.NEXT_PUBLIC_SITE_URL, "api/oauth2/callback"));
  } catch (error) {
    return requestOAuth2Access();
  }
};

const getAuthorizedUser = async () => {
  const response = await nulabRequest.get<Record<string, string>>("api/v2/users/myself");

  return response.data.data;
};

const getBacklogProjects = async () => {
  const response = await nulabRequest.get<IBacklogProject[]>("api/v2/projects");

  return response.data.data;
};

export { getAuthorizedUser, getBacklogProjects, refreshOAuth2Token, requestOAuth2Access, requestOAuth2Token };
