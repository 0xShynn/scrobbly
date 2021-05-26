export default {
  hooks: {
    postPublish: [
      {
        config: {
          organization: `${process.env.SENTRY_ORG}`,
          project: `${process.env.SENTRY_PROJECT}`,
          authToken: `${process.env.SENTRY_AUTH_TOKEN}`,
        },
      },
    ],
  },
};
