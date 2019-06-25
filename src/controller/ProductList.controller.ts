import ControllerBase from "io/rocketbase/example/ControllerBase";

/**
 * @name io.rocketbase.example.controller.ProductList
 */
export default class ProductList extends ControllerBase {
  getRouteName(): string | void {
    return "products";
  }

  onProductItemPress(ev: any) {
    this.navTo("product", {
      id: ev.getSource().getBindingContext().getProperty('ProductID')
    });
  }
}
