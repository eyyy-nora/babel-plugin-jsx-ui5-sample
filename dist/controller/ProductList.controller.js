sap.ui.define(["io/rocketbase/example/ControllerBase"], function (__ControllerBase) {
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule && typeof obj.default !== "undefined" ? obj.default : obj;
  }

  const ControllerBase = _interopRequireDefault(__ControllerBase);
  /**
   * @name io.rocketbase.example.controller.ProductList
   */


  const ProductList = ControllerBase.extend("io.rocketbase.example.controller.ProductList", {
    getRouteName: function _getRouteName() {
      return "products";
    },
    onProductItemPress: function _onProductItemPress(ev) {
      this.navTo("product", {
        id: ev.getSource().getBindingContext().getProperty('ProductID')
      });
    }
  });
  return ProductList;
});