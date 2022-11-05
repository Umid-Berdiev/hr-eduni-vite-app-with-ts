import { createApp, defineAsyncComponent } from "vue";
import { createPinia } from "pinia";
import i18n from "./plugins/i18n";
import * as EvaIcons from "@stefandesu/eva-icons-vue";
import BootstrapVue3 from "bootstrap-vue-3";
import vClickOutside from "click-outside-vue3";
import Maska from "maska";
import DatePicker from "ant-design-vue";
import App from "./App.vue";
import router from "./router";

import "sweetalert2/dist/sweetalert2.min.css";
import "./assets/scss/custom/plugins/mermaid.min.css";
import "ant-design-vue/dist/antd.min.css";
import "./assets/scss/app.scss";

// import './assets/main.css'

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.use(BootstrapVue3);
app.use(vClickOutside);
app.use(Maska);
app.use(DatePicker);
app.use(EvaIcons);
app.use(i18n);
app.use(router);
app.mount("#app");
