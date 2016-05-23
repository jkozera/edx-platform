;(function (define) {
    'use strict';

    define(['backbone',
            'jquery',
            'text!../../../templates/learner_dashboard/program_header_view.underscore',
            'picturefill'
           ],
         function(Backbone, $, pageTpl, picturefill) {
            return Backbone.View.extend({
                breakpoints: {
                    min: {
                        'medium': '768px',
                        'large': '1180px',
                        'x-large': '1440px'
                    }
                },

                el: '.js-program-header',

                tpl: _.template(pageTpl),

                initialize: function() {
                    this.render();
                },

                render: function() {
                    var data = $.extend(this.model.toJSON(), {
                        breakpoints: this.breakpoints
                    });

                    if ( !!this.model.get('name') ) {
                        this.$el.html(this.tpl(data));
                        this.postRender();
                    }
                },

                postRender: function() {
                    if (navigator.userAgent.indexOf('MSIE') !== -1 ||
                        navigator.appVersion.indexOf('Trident/') > 0){
                        /* Microsoft Internet Explorer detected in. */
                        window.setTimeout( function() {
                            this.reEvaluatePicture();
                        }.bind(this), 100);
                    }
                },

                reEvaluatePicture: function(){
                    picturefill({
                        reevaluate: true
                    });
                }
            });
        }
    );
}).call(this, define || RequireJS.define);
