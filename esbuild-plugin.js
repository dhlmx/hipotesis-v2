const esbuild = require('esbuild');

module.exports = {
  name: 'external-worker-threads',
  setup(build) {
    // When encountering worker_threads, mark it as external without trying to bundle it
    build.onResolve({ filter: /^worker_threads$/ }, () => ({
      path: 'worker_threads',
      external: true,
    }));
  },
};
