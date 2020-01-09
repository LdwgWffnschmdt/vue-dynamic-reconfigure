'use strict';Object.defineProperty(exports,'__esModule',{value:true});var ROSLIB=require('roslib');//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var script = {
  name: 'ros-dynamic-reconfigure-enum',
  props: ['value'],
  methods: {
    change: function change() {
      this.$emit("change", this.value);
    }
  }
};function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    var options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    var hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            var originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            var existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}/* script */
var __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('v-select',{attrs:{"label":_vm.value.name,"placeholder":_vm.value.default.toString(),"hint":_vm.value.description,"persistent-hint":true,"items":_vm.value.edit_method.enum,"item-value":"value","item-text":"name"},on:{"change":_vm.change},model:{value:(_vm.value.value),callback:function ($$v) {_vm.$set(_vm.value, "value", $$v);},expression:"value.value"}})};
var __vue_staticRenderFns__ = [];

  /* style */
  var __vue_inject_styles__ = undefined;
  /* scoped */
  var __vue_scope_id__ = undefined;
  /* module identifier */
  var __vue_module_identifier__ = "data-v-4687ef0c";
  /* functional template */
  var __vue_is_functional_template__ = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__ = normalizeComponent(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    false,
    undefined,
    undefined,
    undefined
  );//
//
//
//
//
//
//
//
//
//
//

var script$1 = {
  name: 'ros-dynamic-reconfigure-str',
  props: ['value'],
  methods: {
    change: function change() {
      this.$emit("change", this.value);
    }
  }
};/* script */
var __vue_script__$1 = script$1;

/* template */
var __vue_render__$1 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('v-text-field',{attrs:{"label":_vm.value.name,"placeholder":_vm.value.default,"hint":_vm.value.description,"persistent-hint":true},on:{"change":_vm.change},model:{value:(_vm.value.value),callback:function ($$v) {_vm.$set(_vm.value, "value", $$v);},expression:"value.value"}})};
var __vue_staticRenderFns__$1 = [];

  /* style */
  var __vue_inject_styles__$1 = undefined;
  /* scoped */
  var __vue_scope_id__$1 = undefined;
  /* module identifier */
  var __vue_module_identifier__$1 = "data-v-bf861718";
  /* functional template */
  var __vue_is_functional_template__$1 = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$1 = normalizeComponent(
    { render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 },
    __vue_inject_styles__$1,
    __vue_script__$1,
    __vue_scope_id__$1,
    __vue_is_functional_template__$1,
    __vue_module_identifier__$1,
    false,
    undefined,
    undefined,
    undefined
  );//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var script$2 = {
  name: 'ros-dynamic-reconfigure-int',
  props: ['value'],
  data: function data () {
    var this$1 = this;

    return {
      valid: false,
      rules: [
        function (value) { return value >= this$1.value.min || 'Minumum is ' + this$1.value.min; },
        function (value) { return value <= this$1.value.max || 'Maximum is ' + this$1.value.max; },
        function (value) { return value == "" || (!isNaN(value) && 
                                parseInt(Number(value)) == value && 
                                !isNaN(parseInt(value, 10))) || 'Only integers are allowed'; } ]
    }
  },
  methods: {
    change: function change() {
      if (this.valid) { this.$emit("change", this.value); }
    }
  }
};function createInjectorSSR(context) {
    if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__;
    }
    if (!context)
        { return function () { }; }
    if (!('styles' in context)) {
        context._styles = context._styles || {};
        Object.defineProperty(context, 'styles', {
            enumerable: true,
            get: function () { return context._renderStyles(context._styles); }
        });
        context._renderStyles = context._renderStyles || renderStyles;
    }
    return function (id, style) { return addStyle(id, style, context); };
}
function addStyle(id, css, context) {
    var group =  css.media || 'default' ;
    var style = context._styles[group] || (context._styles[group] = { ids: [], css: '' });
    if (!style.ids.includes(id)) {
        style.media = css.media;
        style.ids.push(id);
        var code = css.source;
        style.css += code + '\n';
    }
}
function renderStyles(styles) {
    var css = '';
    for (var key in styles) {
        var style = styles[key];
        css +=
            '<style data-vue-ssr-id="' +
                Array.from(style.ids).join(' ') +
                '"' +
                (style.media ? ' media="' + style.media + '"' : '') +
                '>' +
                style.css +
                '</style>';
    }
    return css;
}/* script */
var __vue_script__$2 = script$2;

/* template */
var __vue_render__$2 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"ros-dynamic-reconfigure-slider"},[_vm._ssrNode("<span"+(_vm._ssrClass(null,['name', 'pa-0', _vm.valid ? '' : 'error--text']))+">"+_vm._ssrEscape(_vm._s(_vm.value.name))+"</span> "),_c('v-layout',{staticStyle:{"position":"relative"},attrs:{"row":"","wrap":""}},[_c('v-flex',{staticClass:"pr-3",attrs:{"xs10":""}},[_c('v-slider',{attrs:{"step":"1","min":_vm.value.min,"max":_vm.value.max,"error":!_vm.valid,"persistent-hint":true},on:{"change":_vm.change},model:{value:(_vm.value.value),callback:function ($$v) {_vm.$set(_vm.value, "value", $$v);},expression:"value.value"}})],1),_vm._v(" "),_c('v-flex',{attrs:{"xs2":""}},[_c('v-form',{ref:"form",model:{value:(_vm.valid),callback:function ($$v) {_vm.valid=$$v;},expression:"valid"}},[_c('v-text-field',{ref:"input",staticClass:"mt-0",attrs:{"type":"number","step":"1","min":_vm.value.min,"max":_vm.value.max,"placeholder":_vm.value.default.toString(),"hint":_vm.value.description,"persistent-hint":true,"rules":_vm.rules},on:{"change":_vm.change},model:{value:(_vm.value.value),callback:function ($$v) {_vm.$set(_vm.value, "value", _vm._n($$v));},expression:"value.value"}})],1)],1)],1),_vm._ssrNode(" <span class=\"description\">"+_vm._ssrEscape(_vm._s(_vm.value.description))+"</span>")],2)};
var __vue_staticRenderFns__$2 = [];

  /* style */
  var __vue_inject_styles__$2 = function (inject) {
    if (!inject) { return }
    inject("data-v-7bd39c8d_0", { source: ".ros-dynamic-reconfigure-slider{margin-top:-12px;margin-bottom:-20px}.ros-dynamic-reconfigure-slider .v-text-field__details{position:absolute;left:0;top:75%}.ros-dynamic-reconfigure-slider .name{font-size:12px;font-weight:400;position:relative;top:12px}.ros-dynamic-reconfigure-slider .description{font-size:12px;top:-12px;opacity:0}.ros-dynamic-reconfigure-slider .theme--light .description,.ros-dynamic-reconfigure-slider .theme--light .name{color:rgba(0,0,0,.54)}.ros-dynamic-reconfigure-slider .theme--dark .description,.ros-dynamic-reconfigure-slider .theme--dark .name{color:rgba(255,255,255,.7)}", map: undefined, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__$2 = undefined;
  /* module identifier */
  var __vue_module_identifier__$2 = "data-v-7bd39c8d";
  /* functional template */
  var __vue_is_functional_template__$2 = false;
  /* style inject shadow dom */
  

  
  var __vue_component__$2 = normalizeComponent(
    { render: __vue_render__$2, staticRenderFns: __vue_staticRenderFns__$2 },
    __vue_inject_styles__$2,
    __vue_script__$2,
    __vue_scope_id__$2,
    __vue_is_functional_template__$2,
    __vue_module_identifier__$2,
    false,
    undefined,
    createInjectorSSR,
    undefined
  );//
//
//
//
//
//
//
//
//
//

var script$3 = {
  name: 'ros-dynamic-reconfigure-bool',
  props: ['value'],
  methods: {
    change: function change() {
      this.$emit("change", this.value);
    }
  }
};/* script */
var __vue_script__$3 = script$3;

/* template */
var __vue_render__$3 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('v-checkbox',{attrs:{"label":_vm.value.name,"hint":_vm.value.description,"persistent-hint":true},on:{"change":_vm.change},model:{value:(_vm.value.value),callback:function ($$v) {_vm.$set(_vm.value, "value", $$v);},expression:"value.value"}})};
var __vue_staticRenderFns__$3 = [];

  /* style */
  var __vue_inject_styles__$3 = undefined;
  /* scoped */
  var __vue_scope_id__$3 = undefined;
  /* module identifier */
  var __vue_module_identifier__$3 = "data-v-e58cb362";
  /* functional template */
  var __vue_is_functional_template__$3 = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$3 = normalizeComponent(
    { render: __vue_render__$3, staticRenderFns: __vue_staticRenderFns__$3 },
    __vue_inject_styles__$3,
    __vue_script__$3,
    __vue_scope_id__$3,
    __vue_is_functional_template__$3,
    __vue_module_identifier__$3,
    false,
    undefined,
    undefined,
    undefined
  );//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var script$4 = {
  name: 'ros-dynamic-reconfigure-double',
  props: ['value'],
  data: function data () {
    var this$1 = this;

    return {
      valid: false,
      rules: [
        function (value) { return value >= this$1.value.min || 'Minumum is ' + this$1.value.min; },
        function (value) { return value <= this$1.value.max || 'Maximum is ' + this$1.value.max; },
        function (value) { return value == "" || (!isNaN(value) && parseFloat(Number(value)) == value) || 'Only numbers are allowed'; }
      ]
    }
  },
  methods: {
    change: function change() {
      if (this.valid) { this.$emit("change", this.value); }
    }
  }
};/* script */
var __vue_script__$4 = script$4;

/* template */
var __vue_render__$4 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"ros-dynamic-reconfigure-slider"},[_vm._ssrNode("<span"+(_vm._ssrClass(null,['name', 'pa-0', _vm.valid ? '' : 'error--text']))+">"+_vm._ssrEscape(_vm._s(_vm.value.name))+"</span> "),_c('v-layout',{staticStyle:{"position":"relative"},attrs:{"row":"","wrap":""}},[_c('v-flex',{staticClass:"pr-3",attrs:{"xs10":""}},[_c('v-slider',{attrs:{"step":(_vm.value.max - _vm.value.min) / 100,"min":_vm.value.min,"max":_vm.value.max,"error":!_vm.valid,"persistent-hint":true},on:{"change":_vm.change},model:{value:(_vm.value.value),callback:function ($$v) {_vm.$set(_vm.value, "value", $$v);},expression:"value.value"}})],1),_vm._v(" "),_c('v-flex',{attrs:{"xs2":""}},[_c('v-form',{ref:"form",model:{value:(_vm.valid),callback:function ($$v) {_vm.valid=$$v;},expression:"valid"}},[_c('v-text-field',{ref:"input",staticClass:"mt-0",attrs:{"type":"number","min":_vm.value.min,"max":_vm.value.max,"placeholder":_vm.value.default.toString(),"hint":_vm.value.description,"persistent-hint":true,"rules":_vm.rules},on:{"change":_vm.change},model:{value:(_vm.value.value),callback:function ($$v) {_vm.$set(_vm.value, "value", _vm._n($$v));},expression:"value.value"}})],1)],1)],1),_vm._ssrNode(" <span class=\"description\">"+_vm._ssrEscape(_vm._s(_vm.value.description))+"</span>")],2)};
var __vue_staticRenderFns__$4 = [];

  /* style */
  var __vue_inject_styles__$4 = function (inject) {
    if (!inject) { return }
    inject("data-v-1bcfeed2_0", { source: ".ros-dynamic-reconfigure-slider{margin-top:-12px;margin-bottom:-20px}.ros-dynamic-reconfigure-slider .v-text-field__details{position:absolute;left:0;top:75%}.ros-dynamic-reconfigure-slider .name{font-size:12px;font-weight:400;position:relative;top:12px}.ros-dynamic-reconfigure-slider .description{font-size:12px;top:-12px;opacity:0}.ros-dynamic-reconfigure-slider .theme--light .description,.ros-dynamic-reconfigure-slider .theme--light .name{color:rgba(0,0,0,.54)}.ros-dynamic-reconfigure-slider .theme--dark .description,.ros-dynamic-reconfigure-slider .theme--dark .name{color:rgba(255,255,255,.7)}", map: undefined, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__$4 = undefined;
  /* module identifier */
  var __vue_module_identifier__$4 = "data-v-1bcfeed2";
  /* functional template */
  var __vue_is_functional_template__$4 = false;
  /* style inject shadow dom */
  

  
  var __vue_component__$4 = normalizeComponent(
    { render: __vue_render__$4, staticRenderFns: __vue_staticRenderFns__$4 },
    __vue_inject_styles__$4,
    __vue_script__$4,
    __vue_scope_id__$4,
    __vue_is_functional_template__$4,
    __vue_module_identifier__$4,
    false,
    undefined,
    createInjectorSSR,
    undefined
  );//

var script$5 = {
  name: 'ros-dynamic-reconfigure-node',
  components: {
    RosDynamicReconfigureEnum: __vue_component__,
    RosDynamicReconfigureStr: __vue_component__$1,
    RosDynamicReconfigureInt: __vue_component__$2,
    RosDynamicReconfigureBool: __vue_component__$3,
    RosDynamicReconfigureDouble: __vue_component__$4
  },
  props: {
    ros: {
      type: Object,
      require: true
    },
    node: {
      type: String,
      require: true
    }
  },
  watch: {
    topic: function topic() {
      this.$nextTick(this.reload);
    }
  },
  data: function () { return ({
    groups: []
  }); },
  mounted: function mounted() {
    this.reload();
  },
  methods: {
    reload: function reload() {
      if (this.parameterUpdatesTopic) {
        this.parameterUpdatesTopic.unsubscribe();
        this.parameterUpdatesTopic = undefined;
      }

      this.parameterUpdatesTopic = new ROSLIB.Topic({
        ros: this.ros,
        name: this.node + "/parameter_updates",
        messageType: "dynamic_reconfigure/Config",
      });

      this.reconfigureClient = new ROSLIB.Service({
        ros : this.ros,
        name : this.node + '/set_parameters',
        serviceType : 'dynamic_reconfigure/Reconfigure'
      });

      this.parameterUpdatesTopic.subscribe(this.parameterUpdateFeedback);
    },
    getParameterDescriptions: function getParameterDescriptions(values) {
      var this$1 = this;

      if (this.node != "") {
        this.parameterDescriptionsTopic = new ROSLIB.Topic({
          ros: this.ros,
          name: this.node + "/parameter_descriptions",
          messageType: "dynamic_reconfigure/ConfigDescription"
        });

        this.parameterDescriptionsTopic.subscribe(function (parameterDescriptions) {
          if (parameterDescriptions && parameterDescriptions.groups) {
            // Add min / max / default to groups description
            for (var g in parameterDescriptions.groups) {
              var group = parameterDescriptions.groups[g];
              for (var param in group.parameters) {
                var parameter = group.parameters[param];

                // Parse enum definition
                if (parameter.edit_method != "") {
                  parameter.edit_method = JSON.parse(parameter.edit_method.replace(/'/g, '"'));
                }

                // Max
                for (var ma in parameterDescriptions.max[parameter.type + "s"]) {
                  var max = parameterDescriptions.max[parameter.type + "s"][ma];
                  if (max.name == parameter.name) {
                    parameter.max = max.value;
                  }
                }
                
                // Min
                for (var mi in parameterDescriptions.min[parameter.type + "s"]) {
                  var min = parameterDescriptions.min[parameter.type + "s"][mi];
                  if (min.name == parameter.name) {
                    parameter.min = min.value;
                  }
                }
                
                // Default
                for (var df in parameterDescriptions.dflt[parameter.type + "s"]) {
                  var dflt = parameterDescriptions.dflt[parameter.type + "s"][df];
                  if (dflt.name == parameter.name) {
                    parameter.default = dflt.value;
                  }
                }

                // Finally add the value (if there is one)
                for (var e in values[parameter.type + "s"]) {
                  var entry = values[parameter.type + "s"][e];
                  if (entry.name == parameter.name) {
                    parameter.value = entry.value;
                  }
                }
              }
            }
            this$1.groups = parameterDescriptions.groups;
          }
          else {
            this$1.groups = {};
          }

          // Directly unsubscribe again, we don't need this anymore
          this$1.parameterDescriptionsTopic.unsubscribe();
          this$1.parameterDescriptionsTopic = undefined;
        });
      }
    },
    parameterUpdateFeedback: function parameterUpdateFeedback(parameters) {
      if (this.groups.length == 0) {
        this.getParameterDescriptions(parameters);
      }
      else {
        for (var g in this.groups) {
          var group = this.groups[g];
          for (var p in group.parameters) {
            var parameter = group.parameters[p];

            for (var e in parameters[parameter.type + "s"]) {
              var entry = parameters[parameter.type + "s"][e];
              if (parameter.name == entry.name) {
                parameter.value = entry.value;
              }
            }
          }
        }
      }
    },
    change: function change(parameter) {
      var this$1 = this;

      var request = new ROSLIB.ServiceRequest({
        config: {
          bools: [],
          ints: [],
          strs: [],
          doubles: [],
          groups: [],
        }
      });

      request.config[parameter.type + "s"].push({
        name: parameter.name,
        value: parameter.value
      });

      this.reconfigureClient.callService(request, function (result) {
        this$1.parameterUpdateFeedback(result.config);
      });
    }
  },
  beforeDestroy: function beforeDestroy() {
    if (this.parameterUpdatesTopic) {
      this.parameterUpdatesTopic.unsubscribe();
      this.parameterUpdatesTopic = undefined;
    }
  }
};/* script */
var __vue_script__$5 = script$5;

/* template */
var __vue_render__$5 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('v-card',[(_vm.groups)?_c('v-form',_vm._l((_vm.groups),function(group,index){return _c('v-container',{key:index},[_c('v-layout',{attrs:{"row":"","wrap":""}},[(_vm.groups.length > 1)?_c('v-subheader',[_vm._v(_vm._s(group.name))]):_vm._e(),_vm._v(" "),_vm._l((group.parameters),function(parameter,index){return _c('v-flex',{key:index,attrs:{"xs12":"","sm12":"","px-3":""}},[(parameter.edit_method != '')?_c('ros-dynamic-reconfigure-enum',{on:{"change":_vm.change},model:{value:(group.parameters[index]),callback:function ($$v) {_vm.$set(group.parameters, index, $$v);},expression:"group.parameters[index]"}}):_c('ros-dynamic-reconfigure-' + parameter.type,{tag:"div",on:{"change":_vm.change},model:{value:(group.parameters[index]),callback:function ($$v) {_vm.$set(group.parameters, index, $$v);},expression:"group.parameters[index]"}})],1)})],2)],1)}),1):_vm._e()],1)};
var __vue_staticRenderFns__$5 = [];

  /* style */
  var __vue_inject_styles__$5 = undefined;
  /* scoped */
  var __vue_scope_id__$5 = undefined;
  /* module identifier */
  var __vue_module_identifier__$5 = "data-v-5dbfa6ba";
  /* functional template */
  var __vue_is_functional_template__$5 = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$5 = normalizeComponent(
    { render: __vue_render__$5, staticRenderFns: __vue_staticRenderFns__$5 },
    __vue_inject_styles__$5,
    __vue_script__$5,
    __vue_scope_id__$5,
    __vue_is_functional_template__$5,
    __vue_module_identifier__$5,
    false,
    undefined,
    undefined,
    undefined
  );//

var script$6 = {
  name: 'ros-dynamic-reconfigure-list',
  components: {
    RosDynamicReconfigureNode: __vue_component__$5
  },
  props: {
    ros: {
      type: Object,
      require: true,
    }
  },
  data: function () { return ({
    nodes: []
  }); },
  mounted: function mounted() {
    this.getNodes();
  },
  methods: {
    getNodes: function getNodes() {
      var this$1 = this;

      this.ros.getTopicsForType("dynamic_reconfigure/ConfigDescription", function (topics) {
        this$1.nodes = topics.map(function (topic) { return topic.replace("/parameter_descriptions", ""); });
      });
    },
  }
};/* script */
var __vue_script__$6 = script$6;

/* template */
var __vue_render__$6 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('v-expansion-panel',{attrs:{"popout":""}},_vm._l((_vm.nodes),function(node,index){return _c('v-expansion-panel-content',{key:index,scopedSlots:_vm._u([{key:"header",fn:function(){return [_c('div',[_vm._v(_vm._s(node))])]},proxy:true}],null,true)},[_vm._v(" "),_c('v-card',[_c('ros-dynamic-reconfigure-node',{attrs:{"node":node,"ros":_vm.ros}})],1)],1)}),1)};
var __vue_staticRenderFns__$6 = [];

  /* style */
  var __vue_inject_styles__$6 = undefined;
  /* scoped */
  var __vue_scope_id__$6 = undefined;
  /* module identifier */
  var __vue_module_identifier__$6 = "data-v-1a00ef38";
  /* functional template */
  var __vue_is_functional_template__$6 = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__$6 = normalizeComponent(
    { render: __vue_render__$6, staticRenderFns: __vue_staticRenderFns__$6 },
    __vue_inject_styles__$6,
    __vue_script__$6,
    __vue_scope_id__$6,
    __vue_is_functional_template__$6,
    __vue_module_identifier__$6,
    false,
    undefined,
    undefined,
    undefined
  );/* eslint-disable import/prefer-default-export */var components=/*#__PURE__*/Object.freeze({__proto__:null,RosDynamicReconfigureList: __vue_component__$6,RosDynamicReconfigureNode: __vue_component__$5});// Import vue components

// install function executed by Vue.use()
function install(Vue) {
  if (install.installed) { return; }
  install.installed = true;
  Object.keys(components).forEach(function (componentName) {
    Vue.component(componentName, components[componentName]);
  });
}

// Create module definition for Vue.use()
var plugin = {
  install: install,
};

// To auto-install when vue is found
/* global window global */
var GlobalVue = null;
if (typeof window !== 'undefined') {
  GlobalVue = window.Vue;
} else if (typeof global !== 'undefined') {
  GlobalVue = global.Vue;
}
if (GlobalVue) {
  GlobalVue.use(plugin);
}exports.RosDynamicReconfigureList=__vue_component__$6;exports.RosDynamicReconfigureNode=__vue_component__$5;exports.default=plugin;