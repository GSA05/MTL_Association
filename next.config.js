const isGithubActions = process.env.GITHUB_ACTIONS || false;

let assetPrefix = "";
let basePath = "";

if (isGithubActions) {
  const repo = process.env.GITHUB_REPOSITORY.replace(/.*?\//, "");

  assetPrefix = `/${repo}/`;
  basePath = `/${repo}`;
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  assetPrefix,
  basePath,
  ...(isGithubActions && { output: "export" }),
  async redirects() {
    return [
      {
        source: "/",
        destination: "https://voleum-org.github.io/MTL_Association",
        permanent: true,
        basePath: false,
      },
    ];
  },
};

module.exports = nextConfig;
