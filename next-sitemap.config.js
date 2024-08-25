/** @type {import('next-sitemap').IConfig} */
const siteURL = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";

module.exports = {
  siteUrl: siteURL,
  generateRobotsTxt: true,
  exclude: ["/server-sitemap.xml"],
  robotsTxtOptions: {
    additionalSitemaps: [`${siteURL}/server-sitemap.xml`],
  },
};
