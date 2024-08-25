import { MetadataRoute } from "next";

import { env } from "@/libs";
import { articleCategoryService } from "@/services/server";
import { appConfig } from "@/utils/config";

const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  const siteURL = env.NEXT_PUBLIC_SITE_URL;
  const { locales } = appConfig;

  const homeSitemaps: MetadataRoute.Sitemap = locales.map((locale) => ({
    url: `${siteURL}/${locale}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "daily",
    priority: 1,
  }));

  const articleCategories = await articleCategoryService.getAllPublic();
  const articleCategorySidemaps: MetadataRoute.Sitemap = articleCategories.flatMap((articleCategory) =>
    locales.map((locale) => ({
      url: `${siteURL}/${locale}/articles/${articleCategory.slug}`,
      lastModified: new Date().toISOString(),
      changeFrequency: "daily",
      priority: 0.7,
    })),
  );

  return [
    {
      url: `${siteURL}/`,
      lastModified: new Date().toISOString(),
      changeFrequency: "daily",
      priority: 1,
    },
    ...homeSitemaps,
    ...articleCategorySidemaps,
  ];
};

export default sitemap;
