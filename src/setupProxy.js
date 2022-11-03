// eslint-disable-next-line @typescript-eslint/no-var-requires
const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/dne/v1.0",
    createProxyMiddleware({
      target: "http://172.20.4.124:8880/",
      changeOrigin: true,
    })
  );
};
