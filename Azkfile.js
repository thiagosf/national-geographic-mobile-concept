/**
 * Documentation: http://docs.azk.io/Azkfile.js
 */
// Adds the systems that shape your system
systems({
  national: {
    depends: [],
    image: {"docker": "azukiapp/node:5.2.0"},
    workdir: "/azk/#{manifest.dir}",
    shell: "/bin/bash",
    provision: [
      "npm install"
    ],
    command: ["npm", "start"],
    wait: 20,
    mounts: {
      '/azk/#{manifest.dir}': path("."),
      '/azk/#{manifest.dir}/node_modules': persistent("./node_modules"),
    },
    scalable: {"default": 1},
    http: {
      domains: [ "#{system.name}.#{azk.default_domain}" ]
    },
    ports: {
      http: "8000/tcp",
      livereload: "35729:35729/tcp"
    },
    envs: {
      NODE_ENV: "dev",
      PORT: "8000",
    }
  },
});
