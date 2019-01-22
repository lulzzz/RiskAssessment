import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class MenuService {
    title: String;
    menuList: any;
    selected: any;

    private inventoryMenu: Object[] = [{
        icon: 'account_balance',
        route: 'processes',
        title: 'Business Processes',
        description: 'Business Processes',
    }, {
        icon: 'dns',
        title: 'Assets',
        route: '',
        description: 'Open Assets',
        subMenu: [
            {
                icon: "dns",
                route: 'asset',
                title: 'All Assets',
                description: 'All Assets',
            },
            {
                icon: "dns",
                route: 'asset/business/1',
                title: 'Busines Assets',
                description: 'Business Assets',
            },
            {
                icon: "dns",
                route: 'asset/technical/2',
                title: 'Technical assets',
                description: 'Technical assets',
            },
            {
                icon: "dns",
                route: 'asset/physical/3',
                title: 'Physical assets',
                description: 'Physical assets',
            },
            {
                icon: "dns",
                route: 'asset/organisational/4',
                title: 'Organisational Assets',
                description: 'Organisational Assets',
            }
        ],
    }, {
        icon: 'warning',
        route: 'threat',
        title: 'Threats',
        description: 'Treats',
    }, {
        icon: 'info',
        route: 'cause',
        title: 'Causes',
        description: 'Causes',
    },
    {
        icon: 'security',
        route: 'originofthreat',
        title: 'Origin of Threat',
        description: 'Origin of Threat',
    },
    {
        icon: 'local_hospital',
        route: 'control',
        title: 'Controls',
        description: 'Controls',
    },
    {
        icon: 'menu',
        route: 'categories',
        title: 'Categories',
        description: 'Categories',
        subMenu: [
            {
                icon: "label",
                route: 'categories/processcategories',
                title: 'Business Process',
                description: 'Business Process',
            },
            {
                icon: "label",
                route: 'categories/assetsubcategories',
                title: 'Asset Categories',
                description: 'Asset Categries',
            },
            {
                icon: "label",
                route: 'categories/threatcategories',
                title: 'Threat Categories',
                description: 'Threat Categories',
            },
            {
                icon: "label",
                route: 'categories/causecategories',
                title: 'Cause Categories',
                description: 'Cause Categories',
            },
            {
                icon: "label",
                route: 'categories/originofthreatcategories',
                title: ' OoT Categories',
                description: 'OoT Categories',
            },
            {
                icon: "label",
                route: 'categories/controlcategories',
                title: 'Control Categories',
                description: 'Control Categories',
            },
            {
                icon: "label",
                route: 'categories/criticalitycategories',
                title: 'Criticality Categories',
                description: 'Criticality Categories',
            },
            {
                icon: "label",
                route: 'categories/riskcategories',
                title: 'Risk Categories',
                description: 'Risk Categories',
            }

        ],
    }, {
        icon: 'security',
        title: 'Administrative',
        route: 'administrative',
        description: 'Administrative',
        subMenu: [
            {
                icon: "domain",
                route: 'administrative/company',
                title: 'Companies',
                description: 'Companies',
            },
            {
                icon: "people",
                route: 'administrative/user',
                title: 'Users',
                description: 'Users',
            },
           
             {
                icon: "menu",
                route: 'administrative/soachapters/iso27001/edit/1',
                title: 'ISO27001 Chapters',
                description: 'ISO27001 Chapters',
            },
            {
                icon: "menu",
                route: 'administrative/soachapters/helsesoa/edit/4',
                title: 'HelseSOA Chapters',
                description: 'HelseSOA Chapters',
            },
            {
                icon: "menu",
                route: 'administrative/soachapters/gdpr/edit/5',
                title: 'GDPR Chapters',
                description: 'GDPR Chapters',
            },
            {
                icon: "menu",
                route: 'administrative/soachapters/legal/edit/1',
                title: 'Legal Chapters',
                description: 'Legal Chapters',
            }
        ],
    }
    ];

    private soaMenu: Object[] = [{
        icon: 'content_copy',
        route: 'soa/iso27001/edit/1',
        title: 'ISO27001',
        description: 'ISO27001',
    }, {
        icon: 'content_copy',
        route: 'soa/helsesoa/edit/4',
        title: 'HelseSOA',
        description: 'HelseSOA',
    }, {
        icon: 'content_copy',
        route: 'soa/gdpr/edit/5',
        title: 'GDPR',
        description: 'GDPR',
    }, {
        icon: 'content_copy',
        route: 'soa/legal/edit/1',
        title: 'Legal',
        description: 'Legal',
    }];

    private filesMenu: Object[] = [{
        icon: 'note',
        route: 'centralfiles',
        title: 'Central files',
        description: 'Central files',
    }, {
        icon: 'note',
        route: 'templatefiles',
        title: 'Template Files',
        description: 'Template Files',
    }];

    private processMenu: Object[] = [{
        icon: 'note',
        route: 'newprocess',
        title: 'New Process',
        description: 'New Process',
    }, {
        icon: 'note',
        route: 'refreshprocess',
        title: 'Refresh Processes',
        description: 'Refresh Processes',
    }];

    private dashboardMenu: Object[] = [{
        icon: 'dashboard',
        route: 'dashboardmain',
        title: 'Dashboard',
        description: 'dashboard',
    }, {
        icon: 'clear_all',
        route: 'dashboardtree',
        title: 'Tree',
        description: 'Tree',
    }, {
        icon: 'book',
        route: 'dashboardsoa',
        title: 'SOA',
        description: 'Statement of Applicability',
    }];

    constructor() {

    }

    public getCategoryTitle(component: string): string {
        switch (component) {
            case "Inventory":
            case "Assets":
            case "Create asset":
            case "Edit asset":
            case "Business assets":
            case "Technical assets":
            case "Physical assets":
            case "Organisational assets":
            case "Processes":
            case "Threats":
            case "Create threat":
            case "Edit threat":
            case "Causes":
            case "Create cause":
            case "Edit cause":
            case "Origin of Threat":
            case "Edit Origin of Threat":
            case "Create Origin of Threat":
            case "Controls":
            case "Create control":
            case "Edit control":
            case "Asset Categories":
            case "Create Asset Category":
            case "Edit Asset Category":
            case "Process Categories":
            case "Create Process Category":
            case "Edit Process Category":
            case "Threat Categories":
            case "Create Threat Category":
            case "Edit Threat Category":
            case "Cause Categories":
            case "Create Cause Category":
            case "Edit Cause Category":
            case "Control Categories":
            case "Create Control Category":
            case "Edit Control Category":
            case "Criticality Categories":
            case "Create Criticality Category":
            case "Edit Criticality Category":
            case "Risk Categories":
            case "Create Risk Category":
            case "Edit Risk Category":
            case "Origin of Threat Categories":
            case "Create Origin of Threat Category":
            case "Edit Origin of Threat Category":
            case "Companies":
            case "Create company":
            case "Edit company":
            case "Users":
            case "Create user":
            case "Edit user":
                return "Inventory";
            case "Home":
                return "Dashboards";
            case "Central files":
            case "Template files":
            case "Files":
                return "Files";
            case "Process":
                return "Process";
            case "New Process":
            case "Refresh Processes":
            default: return "CRMAP";
        }
    }

    public getMenu(component: string, isProcess?: boolean): Object[] {

        if (isProcess) {
            return [];
        }

        switch (component) {
            case "Inventory":
            case "Assets":
            case "Create asset":
            case "Edit asset":
            case "Business assets":
            case "Technical assets":
            case "Physical assets":
            case "Organisational assets":
            case "Processes":
            case "Create Process":
            case "View Process":
            case "Edit Process":
            case "Threats":
            case "Create threat":
            case "Edit threat":
            case "Causes":
            case "Create cause":
            case "Edit cause":
            case "Origin of Threat":
            case "Edit Origin of Threat":
            case "Create Origin of Threat":
            case "Controls":
            case "Create control":
            case "Edit control":
            case "Asset Categories":
            case "Create Asset Category":
            case "Edit Asset Category":
            case "Process Categories":
            case "Create Process Category":
            case "Edit Process Category":
            case "Threat Categories":
            case "Create Threat Category":
            case "Edit Threat Category":
            case "Cause Categories":
            case "Create Cause Category":
            case "Edit Cause Category":
            case "Control Categories":
            case "Create Control Category":
            case "Edit Control Category":
            case "Criticality Categories":
            case "Create Criticality Category":
            case "Edit Criticality Category":
            case "Risk Categories":
            case "Create Risk Category":
            case "Edit Risk Category":
            case "Origin of Threat Categories":
            case "Create Origin of Threat Category":
            case "Edit Origin of Threat Category":
            case "Companies":
            case "Create company":
            case "Edit company":
            case "Users":
            case "Create user":
            case "Edit user":
            case "ISO27001 Chapters":
            case "HelseSOA Chapters":
            case "GDPR Chapters":
            case "Legal Chapters":
            case "Page Not Found":
                return this.inventoryMenu;
            case "ISO27001":
            case "HelseSOA":
            case "GDPR":
            case "Legal":
                return this.soaMenu;
            case "Dashboard":
            case "Dashboard tree":
            case "SOA":
            case "Profile":
                return this.dashboardMenu;
            case "Central files":
            case "Template files":
            case "Files":
                return this.filesMenu;
            case "New Process":
            case "Refresh Processes":
                return this.processMenu;

            default: return new Array<object>(); //Just to have something default for now...
        }
    }
}