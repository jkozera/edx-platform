;(function (define) {
    'use strict';

    define(['backbone',
            'jquery',
            'underscore',
            'gettext',
            'text!../../../templates/learner_dashboard/course_card.underscore'
           ],
         function(
             Backbone,
             $,
             _,
             gettext,
             pageTpl
         ) {
            return Backbone.View.extend({
                className: 'course-card card',

                tpl: _.template(pageTpl),

                initialize: function(data) {
                    this.render();
                },

                render: function() {
                    var filledTemplate = this.tpl(this.model.toJSON());
                    this.$el.html(filledTemplate);
                }
            });
        }
    );
}).call(this, define || RequireJS.define);