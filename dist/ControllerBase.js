sap.ui.define(["sap/ui/core/mvc/Controller", "sap/ui/model/json/JSONModel", "sap/ui/core/routing/History"], function (Controller, JSONModel, History) {
  /**
   * @name io.rocketbase.example.ControllerBase
   */
  const ControllerBase = Controller.extend("io.rocketbase.example.ControllerBase", {
    onInit: function _onInit() {
      this.initModels();
      this._fragments = {};
      this.initRouting();
    },
    initModels: function _initModels() {
      this.setModel(new JSONModel({}, false), '@View');
      this.setModel(new JSONModel(this.getRoutingDefaults(), false), '@Route');
    },
    initRouting: function _initRouting() {
      let name = this.getRouteName();
      if (!name) return;
      this.getRouter().getRoute(name).attachMatched(this.onRouteMatched.bind(this)).attachPatternMatched(this._onPatternMatched.bind(this));
    },
    getRouteName: function _getRouteName() {},
    getRoutingDefaults: function _getRoutingDefaults() {},
    onRouteMatched: function _onRouteMatched(evt) {},
    onPatternMatched: function _onPatternMatched(evt) {},
    _onPatternMatched: function _onPatternMatched2(evt) {
      let args = evt.getParameter('arguments');
      this.getModel('@Route').setData($.extend({}, this.getRoutingDefaults(), args));
      this.onPatternMatched.apply(this, arguments);
    },
    setModel: function _setModel(_model, _name) {
      let view = this.getView();
      return view.setModel.apply(view, arguments);
    },
    getModel: function _getModel(_name) {
      let view = this.getView();
      return view.getModel.apply(view, arguments);
    },
    i18n: function _i18n() {
      let rb = this.getModel('i18n').getResourceBundle();
      return rb.getText.apply(rb, arguments);
    },
    getRouter: function _getRouter() {
      return this.getOwnerComponent().getRouter();
    },
    navTo: function _navTo(_route, _data) {
      let router = this.getRouter();
      router.navTo.apply(router, arguments);
    },
    navBack: function _navBack() {
      let history = History.getInstance();
      if (history.getPreviousHash()) window.history.go(-1);else this.navTo("home");
    },
    refreshRoute: function _refreshRoute() {
      // @ts-ignore
      this.navTo(this.getRouteName(), $.extend({}, this.getRoutingDefaults(), this.getModel('@Route')));
    },
    fragment: function _fragment(path, models) {
      if (this._fragments[path]) return this._fragments[path]; // @ts-ignore

      let fragment = this._fragments[path] = sap.ui.xmlfragment(this.idFor(path), path, this);

      if (models) {
        Object.keys(models).forEach(key => {
          fragment.setModel(models[key], key);
        });
      }

      this.getView().addDependent(fragment);
      return fragment;
    }
  });
  return ControllerBase;
});