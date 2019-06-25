sap.ui.define(["sap/ui/core/Control"], function (Control) {
  return Control.extend("my.Control", {
    metadata: {
      properties: {
        title: {
          type: "string"
        },
        description: {
          type: "Testcontrol",
          defaultValue: "Bla"
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
    renderer: {
      render: function (rm, control) {
        rm.write("<div");
        rm.writeControlData(control);
        rm.writeClasses();
        rm.write(">");
        rm.write("<h1");
        rm.writeClasses();
        rm.write(">");
        rm.writeEscaped((control.getTitle() || ""));
        rm.write("</h1>");
        rm.write("<div");
        rm.writeAttributeEscaped("id", control.getId() + "-" + "content");
        rm.writeClasses();
        rm.write(">");
        (control.getAggregation("content") || []).forEach(rm.renderControl.bind(rm));
        rm.write("</div>");
        rm.writeEscaped((this.renderFoobar(rm, control) || ""));
        rm.write("<button");
        rm.addClass("__handler1");
        rm.writeClasses();
        rm.write(">");
        rm.writeIcon("sap-icon://accept");
        rm.writeEscaped("\n\t\t\t\t\t\tPress Me!\n\t\t\t\t\t");
        rm.write("</button>");
        if (control.getAggregation("footer")) rm.renderControl(control.getAggregation("footer"));
        rm.write("</div>");
      },
      renderFoobar: function (rm, control) {
        rm.write("<div");
        rm.writeAttributeEscaped("id", control.getId() + "-" + "foobar");
        rm.writeClasses();
        rm.write(">");
        rm.write("<span");
        rm.writeClasses();
        rm.write(">");
        rm.writeEscaped("Foobar");
        rm.write("</span>");
        rm.write("</div>");
      }
    },
    onAfterRendering: function _onAfterRendering() {
      this.$().find(".__handler1").on("click", this.fireButtonPress.bind(this));
    }
  });
});