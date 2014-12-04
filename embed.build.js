({
  baseUrl: ".",
  mainConfigFile: "config.js",
  name: "app/client-libs/almond/almond", // assumes a production build using almond
  include: ['embed'],
  out: "embed.min.js",
  optimize: "none",
  optimizeCss: "standard",
  stubModules: ['rv', 'amd-loader', 'text']
})