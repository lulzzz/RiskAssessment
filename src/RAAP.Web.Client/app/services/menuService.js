
(function(){

    'use strict';

    angular.module('raap').factory('menuService', [
        '$location',
        '$rootScope',
        function ($location) {

            var sections = [{
                name: 'Business Processes',
                state: 'app.processgrid',
                icon: 'business',
                roles: [],
                type: 'link'
            }];
           
            sections.push({
                name: 'Assets',
                type: 'toggle',
                icon: 'dns',
                roles: [],
                pages: [{
                    name: 'All assets',
                    type: 'link',
                    state: 'app.assetgrid',
                    roles: [],
                    icon: 'dns'
                }, {
                    name: 'Business assets',
                    state: 'app.assetgrid/category({categoryId:1})',
                    type: 'link',
                    roles: [],
                    icon: 'dns'
                }, {
                    name: 'Technical assets',
                    state: 'app.assetgrid/category({categoryId:2})',
                    type: 'link',
                    roles: [],
                    icon: 'dns'
                }, {
                    name: 'Physical assets',
                    state: 'app.assetgrid/category({categoryId:3})',
                    type: 'link',
                    roles: [],
                    icon: 'dns'
                }, {
                    name: 'Organizational assets',
                    state: 'app.assetgrid/category({categoryId:4})',
                    type: 'link',
                    roles: [],
                    icon: 'dns'
                }]
            });

            sections.push({
                name: 'Threats',
                state: 'app.threatgrid',
                icon: 'report_problem',
                roles: [],
                type: 'link'
            });

            sections.push({
                name: 'Causes',
                state: 'app.causegrid',
                icon: 'info',
                roles: ['Administrator', 'SystemAdministrator'],
                type: 'link'
            });

            sections.push({
                name: 'Origin of Threat',
                state: 'app.originofthreatgrid',
                icon: 'info',
                roles: ['Administrator', 'SystemAdministrator'],
                type: 'link'
            });

            sections.push({
                name: 'Controls',
                state: 'app.controlgrid',
                icon: 'event_available',
                roles: [],
                type: 'link'
            });

            sections.push({
                name: 'Categories',
                type: 'toggle',
                icon: 'list',
                roles: [],
                pages: [
                    {
                        name: 'Business Process Categories',
                        type: 'link',
                        state: 'app.processcategorygrid',
                        roles: [],
                        icon: 'filter_list'
                    },
                    {
                        name: 'Asset Categories',
                        state: 'app.assetsubcategorygrid',
                        type: 'link',
                        roles: [],
                        icon: 'filter_list'
                    },
                    {
                        name: 'Threat Categories',
                        state: 'app.threatcategorygrid',
                        type: 'link',
                        roles: [],
                        icon: 'filter_list'
                    },
                    {
                        name: 'Cause Categories',
                        state: 'app.causecategorygrid',
                        type: 'link',
                        roles: [],
                        icon: 'filter_list'
                    },
                    {
                        name: 'OoT Categories',
                        state: 'app.originofthreatcategorygrid',
                        type: 'link',
                        roles: [],
                        icon: 'filter_list'
                    },
                    {
                        name: 'Control Categories',
                        state: 'app.controlcategorygrid',
                        type: 'link',
                        roles: [],
                        icon: 'filter_list'
                    },
                    {
                        name: 'Criticality Categories',
                        state: 'app.criticalitycategorygrid',
                        type: 'link',
                        roles: [],
                        icon: 'filter_list'
                    }, 
                    {
                        name: 'Risk Types',
                        state: 'app.risktypegrid',
                        type: 'link',
                        roles: [],
                        icon: 'filter_list'
                    }]
            });

            sections.push({
                name: 'Administrative',
                type: 'toggle',
                icon: 'security',
                roles: ['Administrator', 'SystemAdministrator'],
                pages: [{
                    name: 'Companies',
                    type: 'link',
                    state: 'app.companygrid',
                    roles: ['Administrator', 'SystemAdministrator'],
                    icon: 'domain'
                },
                {
                    name: 'Users',
                    state: 'app.usergrid',
                    type: 'link',
                    roles: ['Administrator', 'SystemAdministrator'],
                    icon: 'people'
                },
                {
                    name: 'ISO27001 Chapters',
                    state: 'app.soachapteredit',
                    type: 'link',
                    roles: [],
                    icon: 'format_list_bulleted'
                },
                {
                    name: 'HelseSOA Chapters',
                    state: 'app.helsesoachapteredit',
                    type: 'link',
                    roles: [],
                    icon: 'format_list_bulleted'
                },
                {
                    name: 'GDPR Chapters',
                    state: 'app.gdprsoachapteredit',
                    type: 'link',
                    roles: [],
                    icon: 'format_list_bulleted'
                },
                {
                    name: 'Legal Chapters',
                    state: 'app.legalchapteredit',
                    type: 'link',
                    roles: [],
                    icon: 'format_list_bulleted'
                }]
            });

            var soasections = [{
                        name: 'ISO27001',
                        state: 'app.soaedit',
                        type: 'link',
                        roles: [],
                        icon: 'content_copy'
                    },
                    {
                        name: 'HelseSOA',
                        state: 'app.helsesoaedit',
                        type: 'link',
                        roles: [],
                        icon: 'content_copy'
                    },
                    {
                        name: 'GDPR',
                        state: 'app.gdpredit',
                        type: 'link',
                        roles: [],
                        icon: 'content_copy'
                    },
                    {
                        name: 'Legal',
                        state: 'app.legaledit',
                        type: 'link',
                        roles: [],
                        icon: 'content_copy'
                    }];

            var filesections = [{
                name: 'Central files',
                state: 'app.fileedit',
                type: 'link',
                roles: [],
                icon: 'content_copy'
            },
                    {
                        name: 'Templates',
                        state: 'app.filetemplateedit',
                        type: 'link',
                        roles: [],
                        icon: 'format_list_bulleted'
                    }];

            var dashboardsections = [{
                name: 'Dashboard',
                state: 'app.dashboard',
                icon: 'dashboard',
                roles: [],
                type: 'link'
            },
            {
                name: 'Tree',
                state: 'app.assettree',
                type: 'link',
                roles: [],
                icon: 'trending_down'
                },
            {
                name: 'SOA',
                state: 'app.soadashboard',
                type: 'link',
                roles: [],
                icon: 'donut_large'
            }];


            var self;

            return self = {
                sections: sections,

                toggleSelectSection: function (section) {
                    self.openedSection = (self.openedSection === section ? null : section);
                },
                isSectionSelected: function (section) {
                    return self.openedSection === section;
                },

                selectPage: function (section, page) {
                    page && page.url && $location.path(page.url);
                    self.currentSection = section;
                    self.currentPage = page;
                },

                soasections: soasections,

                toggleSelectSoaSection: function (section) {
                    self.openedSoaSection = (self.openedSoaSection === section ? null : section);
                },
                isSoaSectionSelected: function (section) {
                    return self.openedSoaSection === section;
                },

                selectSoaPage: function (section, page) {
                    page && page.url && $location.path(page.url);
                    self.currentSoaSection = section;
                    self.currentSoaPage = page;
                },

                filesections: filesections,

                toggleSelectFileSection: function (section) {
                    self.openedFileSection = (self.openedFileSection === section ? null : section);
                },
                isFileSectionSelected: function (section) {
                    return self.openedFileSection === section;
                },

                selectFilePage: function (section, page) {
                    page && page.url && $location.path(page.url);
                    self.currentFileSection = section;
                    self.currentFilePage = page;
                },

                dashboardsections: dashboardsections,

                toggleSelectDashboardSection: function (section) {
                    self.openedDashboardSection = (self.openedDashboardSection === section ? null : section);
                },
                isDashboardSectionSelected: function (section) {
                    return self.openedDashboardSection === section;
            },

                selectDashboardPage: function (section, page) {
                page && page.url && $location.path(page.url);
                self.currentDashboardSection = section;
                self.currentDashboardPage = page;
            }
            };

            function sortByHumanName(a, b) {
                return (a.humanName < b.humanName) ? -1 :
                  (a.humanName > b.humanName) ? 1 : 0;
            }

        }])
      
})();

                