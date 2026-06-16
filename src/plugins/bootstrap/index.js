// import Vue from "vue";
// import { BootstrapVue } from "bootstrap-vue";

// // Import Bootstrap and BootstrapVue CSS files (order is important)
// import "bootstrap/dist/css/bootstrap.css";
// import "bootstrap-vue/dist/bootstrap-vue.css";

// // Make BootstrapVue available throughout your project
// Vue.use(BootstrapVue);

// import * as bootstrap from "bootstrap/dist/js/bootstrap.bundle";
// import "bootstrap";

// import "bootstrap/dist/css/bootstrap.css";

// // import { createApp } from 'vue';
// // import App from './App.vue';

// // const app = createApp(App);
// //app.provide('bootstrap', bootstrap);

// export function plugins(app) {
//   console.log("load plugins", app);
//   app.provide("bootstrap", bootstrap);
//   return this;
// }
// //app.provide("bootstrap", bootstrap);

// import { createBootstrap } from "bootstrap-vue-next";

// Add the necessary CSS
// import "bootstrap/dist/css/bootstrap.css";
// import "bootstrap-vue-next/dist/bootstrap-vue-next.css";

// import { defineConfig } from "vite";
// import vue from "@vitejs/plugin-vue";
// import Components from "unplugin-vue-components/vite";
// import { BootstrapVueNextResolver } from "bootstrap-vue-next";

// import * as bootstrap from "bootstrap/dist/js/bootstrap.bundle";
// import "bootstrap/dist/css/bootstrap.css";

// import { createBootstrap } from "bootstrap-vue-next";

// // Add the necessary CSS
// import "bootstrap/dist/css/bootstrap.css";
// import "bootstrap-vue-next/dist/bootstrap-vue-next.css";

// export function plugins(app) {
//   //console.log("load plugins", app);
//   // app.provide("bootstrap", bootstrap);
//   app.use(createBootstrap()); // Important
//   //app.use(createBootstrap()); // Important
//   return this;
// }

// // export default defineConfig({
// //   plugins: [
// //     vue(),
// //     Components({
// //       resolvers: [BootstrapVueNextResolver()],
// //     }),
// //   ],
// // });

// import "jquery";
// import "bootstrap";
// import "popper.js";
// import "bootstrap/dist/css/bootstrap.min.css";
// import v3b4 from "vue3-bootstrap4";

// import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/js/bootstrap.js";
import bootstrap from "bootstrap/dist/js/bootstrap.bundle";

const install = function (app) {
  app.use(bootstrap);
  return this;
};

export default { install };

// Vue.config.productionTip = false

// Vue.use(BootstrapVue)
// Vue.use(IconsPlugin)
