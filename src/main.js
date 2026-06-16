import { createApp } from "vue";
// import VueRouter from "vue-router";
import App from "./App.vue";
import store from "./store";

import plugins from "./plugins/bootstrap";
import appRouter from "./router";
// import VueRouter from "vue-router";
// import "./plugins/bootstrap";

// Vue.use(VueRouter);
const app = createApp(App).use(appRouter).use(store);

plugins.install(app);
// app.use(VueRouter);
app.mount("#app");
