/**
 * Model for Course Card.
 */
(function (define) {
    'use strict';
    define([
            'backbone'
        ], 
        function (Backbone) {
        return Backbone.Model.extend({
            initialize: function(data) {
                if (data){
                    this.set({
                        name: data.display_name,
                        courseStart: data.course_start,
                        courseEnd: data.course_end,
                        enrollmentStatus: data.enrollment_status,
                        organizations: data.organization,
                        marketingUrl: data.marketing_url,
                        runModes: data.run_modes,
                        courseKey: data.course_key,
                        coursewareUrl: data.courseware_url,
                        imageUrl: data.image_url
                    });
                }
            }
        });
    });
}).call(this, define || RequireJS.define);
