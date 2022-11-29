import { createApp, Vue } from 'vue'
import App from './App.vue'
import './plugins/elements';
import store from "./store";

Vue.config.productionTip = false

createApp(App).use(store).mount("#app")
