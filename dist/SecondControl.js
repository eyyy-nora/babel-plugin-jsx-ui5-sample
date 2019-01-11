sap.ui.define(["sap/ui/core/Control"], function (Control) {
  /**
   * @name some.namespace.MyControl
   */
  const MyControl = Control.extend("some.namespace.MyControl", {
    renderer: {
      render(rm, control) {
        rm.write("<div");
        rm.writeControlData(control);
        rm.writeClasses();
        rm.write(">");
        rm.writeEscaped("\n\t\t\t\t");
        rm.write("<h1");
        rm.writeClasses();
        rm.write(">");
        rm.writeEscaped((control.getTitle() || ""));
        rm.write("</h1>");
        rm.writeEscaped("\n\t\t\t\t");
        rm.write("<div");
        rm.writeAttributeEscaped("id", control.getId() + "-" + "content");
        rm.writeClasses();
        rm.write(">");
        rm.writeEscaped("\n\t\t\t\t\t");
        (control.getAggregation("content") || []).forEach(rm.renderControl.bind(rm));
        rm.writeEscaped("\n\t\t\t\t");
        rm.write("</div>");
        rm.writeEscaped("\n\t\t\t\t");
        rm.writeEscaped((this.renderFoobar(rm, control) || ""));
        rm.writeEscaped("\n\t\t\t\t");
        rm.write("<button");
        rm.addClass("__handler0");
        rm.writeClasses();
        rm.write(">");
        rm.writeEscaped("\n\t\t\t\t\t");
        rm.writeIcon("sap-icon://accept");
        rm.writeEscaped("\n\t\t\t\t\tPress Me!\n\t\t\t\t");
        rm.write("</button>");
        rm.writeEscaped("\n\t\t\t\t");
        if (control.getAggregation("footer")) rm.renderControl(control.getAggregation("footer"));
        rm.writeEscaped("\n\t\t\t");
        rm.write("</div>");
      },

      renderFoobar(rm, control) {
        rm.write("<div");
        rm.writeAttributeEscaped("id", control.getId() + "-" + "foobar");
        rm.writeClasses();
        rm.write(">");
        rm.writeEscaped("\n\t\t\t\t");
        rm.write("<span");
        rm.writeClasses();
        rm.write(">");
        rm.writeEscaped("Foobar");
        rm.write("</span>");
        rm.writeEscaped("\n\t\t\t");
        rm.write("</div>");
      }

    },
    metadata: {
      properties: {
        title: {
          type: "string"
        }
      },
      aggregations: {
        content: {
          type: "sap.ui.core.Control",
          multiple: true
        },
        footer: {
          type: "sap.m.IBar",
          multiple: false
        }
      },
      events: {
        buttonPress: {}
      }
    },
    onAfterRendering: function _onAfterRendering() {
      this.$().find(".__handler0").on("click", this.fireButtonPress.bind(this));
    }
  });
  return MyControl;
});