export default ({ config }) => {
  const organization = process.env.SENTRY_ORG;
  const project = process.env.SENTRY_PROJECT;
  const authToken = process.env.SENTRY_AUTH_TOKEN;
  return {
    ...config,
    hooks: {
      postPublish: [
        {
          file: "sentry-expo/upload-sourcemaps",
          config: {
            organization,
            project,
            authToken,
          },
        },
      ],
    },
  };
};
