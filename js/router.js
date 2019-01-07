var router = new VueRouter({});
router.map({
  "/": {
    component: app.list
  }
});

var App = Vue.extend({});
router.start(App, "#app");
