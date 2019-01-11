import Control from "sap/ui/core/Control";
/**
 * @name some.namespace.MyControl
 */
export default class MyControl extends Control {
	static metadata = {
		properties: {
			title: { type: "string" },
		},
		aggregations: {
			content: { type: "sap.ui.core.Control", multiple: true },
			footer: { type: "sap.m.IBar", multiple: false }
		},
		events: {
			buttonPress: {}
		}
	}
	static renderer = {
		render(rm, control) {
			rm.render(<div ui5control>
				<h1>{control.getTitle()}</h1>
				<div id="content">
					<ui5aggregation>content</ui5aggregation>
				</div>
				{this.renderFoobar(rm,control)}
				<button onclick="fireButtonPress">
					<ui5icon>sap-icon://accept</ui5icon>
					Press Me!
				</button>
				<ui5control>footer</ui5control>
			</div>);
		},
		renderFoobar(rm, control) {
			rm.render(<div id="foobar">
				<span>Foobar</span>
			</div>);
		},
	}
}
