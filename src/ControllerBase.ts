import Controller from "sap/ui/core/mvc/Controller";
import JSONModel from "sap/ui/model/json/JSONModel";
import History from "sap/ui/core/routing/History";
import Fragment from "sap/ui/core/Fragment";
import Model from "sap/ui/model/Model";
import XMLView from "sap/ui/core/mvc/XMLView";
import Control from "sap/ui/core/Control";
import UIComponent from "sap/ui/core/UIComponent";

interface IHasView {
  getView(): XMLView
}

/**
 * @name io.rocketbase.example.ControllerBase
 */
export default class ControllerBase extends Controller implements IHasView {

  _fragments: { [key: string]: Fragment };

  onInit() {
    this.initModels();
    this._fragments = {};
    this.initRouting();
  }

  initModels() {
    this.setModel(new JSONModel({}, false), '@View');
    this.setModel(new JSONModel(this.getRoutingDefaults(), false), '@Route');
  }

  initRouting() {
    let name = this.getRouteName();
    if (!name) return;
    this.getRouter().getRoute(name)
      .attachMatched(this.onRouteMatched.bind(this))
      .attachPatternMatched(this._onPatternMatched.bind(this));
  }

  getRouteName(): string | void {
  }

  getRoutingDefaults(): any {
  }

  onRouteMatched(evt: any): void {
  }

  onPatternMatched(evt: any): void {
  }

  _onPatternMatched(evt) {
    let args = evt.getParameter('arguments');
    this.getModel('@Route').setData($.extend({}, this.getRoutingDefaults(), args));
    this.onPatternMatched.apply(this, arguments);
  }

  setModel(_model?: Model, _name?: string) {
    let view = this.getView();
    return view.setModel.apply(view, arguments);
  }

  getModel(_name?: string) {
    let view = this.getView();
    return view.getModel.apply(view, arguments);
  }

  i18n() {
    let rb = this.getModel('i18n').getResourceBundle();
    return rb.getText.apply(rb, arguments);
  }

  getRouter() {
    return (this.getOwnerComponent() as UIComponent).getRouter();
  }

  navTo(_route?:string, _data?:any):void {
    let router = this.getRouter();
    router.navTo.apply(router, arguments);
  }

  navBack() {
    let history = History.getInstance();
    if (history.getPreviousHash())
      window.history.go(-1);
    else
      this.navTo("home");
  }

  refreshRoute() {
    // @ts-ignore
    this.navTo(this.getRouteName(), $.extend({}, this.getRoutingDefaults(), this.getModel('@Route')));
  }

  fragment(path, models?: {[key:string]: Model}) {
    if (this._fragments[path])
      return this._fragments[path];
    // @ts-ignore
    let fragment: Control = this._fragments[path] = sap.ui.xmlfragment(this.idFor(path), path, this);
    if (models) {
      Object.keys(models).forEach(key => {
        fragment.setModel(models[key], key);
      });
    }
    this.getView().addDependent(fragment);
    return fragment;
  }
}
