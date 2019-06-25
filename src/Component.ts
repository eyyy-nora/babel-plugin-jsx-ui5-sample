import UIComponent from "sap/ui/core/UIComponent";
import JSONModel from "sap/ui/model/json/JSONModel";
import ODataModel from "sap/ui/model/odata/v2/ODataModel";

/**
 * @name io.rocketbase.example.Component
 */
export default class Component extends UIComponent {
  static metadata = {
    manifest: "json"
  };

  init() {
    super.init();
    this.registerModels();
    this.getRouter().initialize();
  }

  registerModels() {
    this.setModel(new JSONModel({}, false), "App");
    const odata = new ODataModel({
      serviceUrl:"/odata/V2/Northwind/Northwind.svc/",
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
}
