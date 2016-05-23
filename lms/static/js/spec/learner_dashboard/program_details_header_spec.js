define([
        'backbone',
        'jquery',
        'js/learner_dashboard/views/program_header_view'
    ], function (Backbone, $, SidebarView) {
        
        'use strict';
        
        describe('Program Details Header View', function () {
            var view = null,
                programModel,
                context = {
                    uuid: '12-ab',
                    name: 'Astrophysics',
                    subtitle: 'Learn contemporary astrophysics from the leaders in the field.',
                    category: 'xseries',
                    organizations: [
                        {
                            display_name: 'Australian National University',
                            img: 'https://edxuploads.s3.amazonaws.com/organization_logos/logo-anux.png',
                            key: 'ANUx'
                        }
                    ],
                    banner_image_urls: {
                        w1440h480: 'http://placehold.it/1440x480',
                        w726h242: 'http://placehold.it/726x242',
                        w435h145: 'http://placehold.it/435x145',
                        w348h116: 'http://placehold.it/348x116'
                    },
                    program_details_url: '/dashboard/programs'
                };

            beforeEach(function() {
                setFixtures('<div class="js-program-header"></div>');
                programModel = new Backbone.Model(context);
                view = new SidebarView({
                    model: programModel
                });
                view.render();
            });

            afterEach(function() {
                view.remove();
            });

            it('should exist', function() {
                expect(view).toBeDefined();
            });

            it('should render the header based on the passed in model', function() {
                expect(view.$('.title').html()).toEqual(context.name);
                expect(view.$('.subtitle').html()).toEqual(context.subtitle);
                expect(view.$('.org-logo').length).toEqual(context.organizations.length);
                expect(view.$('.org-logo').attr('src')).toEqual(context.organizations[0].img);
                expect(view.$('.org-logo').attr('alt')).toEqual(context.organizations[0].display_name + '\'s logo');
            });
        });
    }
);
