;(function (define) {
    'use strict';

    define(['backbone',
            'jquery',
            'underscore',
            'gettext',
            'js/learner_dashboard/views/program_header_view',
            'text!../../../templates/learner_dashboard/program_details_view.underscore'
           ],
         function(Backbone, $, _, gettext, HeaderView, pageTpl) {
            return Backbone.View.extend({
                el: '.js-program-details-wrapper',

                tpl: _.template(pageTpl),

                initialize: function(options) {
                    this.programModel = new Backbone.Model(options);
                    this.render();
                },

                render: function() {
                    this.$el.html(this.tpl());
                    this.postRender();
                },

                postRender: function() {
                    this.headerView = new HeaderView({
                        model: this.programModel
                    });
                }
            });
        }
    );
}).call(this, define || RequireJS.define);
