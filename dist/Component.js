sap.ui.define(["sap/ui/core/UIComponent", "sap/ui/model/json/JSONModel", "sap/ui/model/odata/v2/ODataModel"], function (UIComponent, JSONModel, ODataModel) {
  /**
   * @name io.rocketbase.example.Component
   */
  const Component = UIComponent.extend("io.rocketbase.example.Component", {
    metadata: {
      manifest: "json"
    },
    init: function _init() {
      UIComponent.prototype.init.call(this);
      this.registerModels();
      this.getRouter().initialize();
    },
    registerModels: function _registerModels() {
      this.setModel(new JSONModel({}, false), "App");
      const odata = new ODataModel({
        serviceUrl: "/odata/V2/Northwind/Northwind.svc/",
        synchronizationMode: "None",
        groupId: '$direct',
        autoExpandSelect: true
      });
      /*odata.setChangeGroups({
        Product: {
          groupId: "product"
        }
      });
      odata.setDeferredGroups(["product"]);
      */

      this.setModel(odata);
    }
  });
  return Component;
});