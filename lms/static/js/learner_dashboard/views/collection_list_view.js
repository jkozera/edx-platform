;(function (define) {
    'use strict';

    define(['backbone',
            'jquery',
            'underscore',
            'gettext',
            'text!../../../templates/learner_dashboard/empty_programs_list.underscore'
        ],
        function (Backbone,
                  $,
                  _,
                  gettext,
                  emptyProgramsListTpl) {
            return Backbone.View.extend({

                initialize: function(data) {
                    this.childView = data.childView;
                    this.context = data.context;
                    this.titleContext = data.titleContext;
                },

                render: function() {
                    var childList, tpl, titleHtml;

                    if (!this.collection.length) {
                        if (this.context.xseriesUrl) {
                            //Only show the xseries advertising panel if the link is passed in
                            tpl = _.template(emptyProgramsListTpl);
                            this.$el.html(tpl(this.context));
                        }
                    } else {        
                        childList = []; 

                        this.collection.each(function(model) {
                            var child = new this.childView({
                                model: model,
                                context: this.context
                            });
                            childList.push(child.el);
                        }, this);

                        if (this.titleContext){
                            this.$el.before(this.getTitleHtml())
                        }
                        this.$el.html(childList);

                    }
                },

                getTitleHtml: function(){
                    var $el = $('<' + this.titleContext.el + '>');
                    $el.addClass('sr-only');
                    $el.append(this.titleContext.title);
                    return $el[0];
                }
            });
        }
    );
}).call(this, define || RequireJS.define);
