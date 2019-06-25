sap.ui.define(["sap/ui/core/Control"], function(Control) {
	return Control.extend("my.Control",{
		metadata: {
			properties: {
				title: { type: "string" },
        description: { type: "Testcontrol", defaultValue: "Bla" }
			},
			aggregations: {
				content: { type: "sap.ui.core.Control", multiple: true },
				footer: { type: "sap.m.IBar", multiple: false }
			},
			events: {
				buttonPress: {}
			}
		},
		renderer: {
			render: function(rm, control) {
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
			renderFoobar: function(rm, control) {
				rm.render(<div id="foobar">
					<span>Foobar</span>
				</div>);
			},
		}
	});
});
