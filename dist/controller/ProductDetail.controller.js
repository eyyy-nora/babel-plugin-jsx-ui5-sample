sap.ui.define(["io/rocketbase/example/ControllerBase"], function (__ControllerBase) {
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule && typeof obj.default !== "undefined" ? obj.default : obj;
  }

  const ControllerBase = _interopRequireDefault(__ControllerBase);
  /**
   * @name io.rocketbase.example.controller.ProductDetail
   */


  const ProductDetail = ControllerBase.extend("io.rocketbase.example.controller.ProductDetail", {
    getRouteName: function _getRouteName() {
      return "product";
    },
    getGroupId: function _getGroupId() {
      const id = this.getModel('@Route').getProperty('/id');
      return `Products(${id})`;
    },
    onPatternMatched: function _onPatternMatched(evt) {
      const id = this.getModel('@Route').getProperty('/id');
      this.getView().bindElement(`/Products(${id})`);
    },
    onSavePress: function _onSavePress() {
      this.getModel().submitChanges();
    },
    onCancelPress: function _onCancelPress() {
      this.getModel().resetChanges([this.getView().getBindingContext().getPath('')]);
    }
  });
  return ProductDetail;
});