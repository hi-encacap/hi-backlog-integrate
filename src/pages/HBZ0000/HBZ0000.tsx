import { cookies } from "next/headers";

import { nulabService } from "@/services/server";

import Content from "./components/Content";
import Header from "./components/Header";

const HBZ0000 = async () => {
  const nulabAuthToken = cookies().get("nulab-auth-token");

  if (!nulabAuthToken) {
    return nulabService.requestOAuth2Access();
  }

  try {
    const nulabAuthorizedUser = await nulabService.getAuthorizedUser();
    const [backlogProjects] = await Promise.all([nulabService.getBacklogProjects()]);

    return (
      <>
        <Header user={nulabAuthorizedUser} />
        <Content projects={backlogProjects} />
      </>
    );
  } catch (error) {
    return nulabService.refreshOAuth2Token();
  }
};

export default HBZ0000;
