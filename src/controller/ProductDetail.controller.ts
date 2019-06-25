import ControllerBase from "io/rocketbase/example/ControllerBase";

/**
 * @name io.rocketbase.example.controller.ProductDetail
 */
export default class ProductDetail extends ControllerBase {

  getRouteName(): string | void {
    return "product";
  }

  getGroupId() {
    const id = this.getModel('@Route').getProperty('/id');
    return `Products(${id})`;
  }

  onPatternMatched(evt: any): void {
    const id = this.getModel('@Route').getProperty('/id');
    this.getView().bindElement(`/Products(${id})`);
  }

  onSavePress() {
    this.getModel().submitChanges();
  }

  onCancelPress() {
    this.getModel().resetChanges([this.getView().getBindingContext().getPath('')]);
  }

}
