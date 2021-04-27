import Vue from "vue";
import Alert from "../components/alert.vue";

const Instance = new Vue({
  render(h) {
    return h(Alert);
  }
});
const comp = Instance.$mount();
document.body.appendChild(comp.$el);
const AlertIns = Instance.$children[0];

export default AlertIns;