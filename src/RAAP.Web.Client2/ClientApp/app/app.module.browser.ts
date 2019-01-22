import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, RequestOptions } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FileUploadModule, FileSelectDirective } from 'ng2-file-upload';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ChartsModule } from "ng2-charts";

import {
    MatButtonModule,
    MatDatepickerModule,
    MatButtonToggleModule,
    MatCardModule,
    MatTabsModule,
    MatChipsModule,
    MatToolbarModule,
    MatCheckboxModule,
    MatDialogModule,
    MatGridListModule,
    MatIconModule,
    MatSlideToggleModule,
    MatInputModule,
    MatSliderModule,
    MatListModule,
    MatMenuModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatNativeDateModule,
    MatExpansionModule,
    MatTableModule,
    MatAutocompleteModule,
    MAT_DATE_LOCALE,
    MatSnackBarModule
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import 'hammerjs';

import { CovalentLayoutModule, CovalentDialogsModule, CovalentStepsModule, CovalentFileModule, CovalentExpansionPanelModule, CovalentMediaModule, CovalentLoadingModule, CovalentDataTableModule } from '@covalent/core';
import { CovalentHttpModule } from '@covalent/http';
import { CovalentHighlightModule } from '@covalent/highlight';
import { CovalentMarkdownModule } from '@covalent/markdown';
import { CovalentDynamicFormsModule } from '@covalent/dynamic-forms';
import { CustomRequestOptions } from './app.customrequestoptions';
import { AppComponent } from './components/app/app.component';
import { SecureLayoutComponent } from './components/secure/layout/layout.component';
import { PublicLayoutComponent } from './components/public/layout/layout.component';
import { ProcessdashboardComponent } from './components/secure/process/processdashboard/processdashboard.component';
// Dashboard
import { DashboardmainComponent } from './components/secure/dashboard/dashboardmain/dashboardmain.component';
import { DashboardsoaComponent } from './components/secure/dashboard/dashboardsoa/dashboardsoa.component';
import { InventorydashboardComponent } from './components/secure/inventory/inventorydashboard/inventorydashboard.component';
import { DashboardTreeComponent } from './components/secure/dashboard/dashboardtree/dashboardtree.component';
// Profile
import { MyProfileComponent } from './components/secure/profile/myProfile.component';
// Process
import { ProcessComponent } from './components/secure/inventory/process/process.component';
import { AddEditProcessComponent } from './components/secure/inventory/process/add-edit-process.component';
import { ProcessViewComponent } from './components/secure/process/processView/processView.component';
// Asset
import { AssetComponent } from './components/secure/inventory/asset/asset.component';
import { AddEditAssetComponent } from './components/secure/inventory/asset/add-edit-asset.component';
import { AssetViewComponent } from './components/secure/process/assetView/assetView.component';
// Control
import { ControlComponent } from './components/secure/inventory/control/control.component';
import { AddEditControlComponent } from './components/secure/inventory/control/add-edit-control.component';
// Threat
import { ThreatComponent } from './components/secure/inventory/threat/threat.component';
import { AddEditThreatComponent } from './components/secure/inventory/threat/add-edit-threat.component';
// Cause 
import { CauseComponent } from './components/secure/inventory/cause/cause.component';
import { AddEditCauseComponent } from './components/secure/inventory/cause/add-edit-cause.component';
// Origin
import { OriginOfThreatComponent } from './components/secure/inventory/originofthreat/originofthreat.component';
import { AddEditOriginOfThreatComponent } from './components/secure/inventory/originofthreat/add-edit-originofthreat.component';
// Administrative category
import { CompanyComponent } from './components/secure/inventory/administrative/company/company.component';
import { AddEditCompanyComponent } from './components/secure/inventory/administrative/company/add-edit-company.component';
import { UserComponent } from './components/secure/inventory/administrative/user/user.component';
import { AddEditUserComponent } from './components/secure/inventory/administrative/user/add-edit-user.component';
import { MainSoaComponent } from './components/secure/inventory/administrative/soa-chapters/main-soa.component';
import { FirstChapterLevelComponent } from './components/secure/inventory/administrative/soa-chapters/first-chapter-level/first-chapter-level.component';
import { SecondChapterLevelComponent } from './components/secure/inventory/administrative/soa-chapters/second-chapter-level/second-chapter-level.component';
import { ThirdChapterLevelComponent } from './components/secure/inventory/administrative/soa-chapters/third-chapter-level/third-chapter-level.component';
// Asset category
import { AssetCategoryComponent } from './components/secure/inventory/categories/assetCategory/assetCategory.component';
import { AddEditAssetSubCategoryComponent } from './components/secure/inventory/categories/assetCategory/add-edit-assetCategory.component';
// Process category
import { ProcessCategoryComponent } from './components/secure/inventory/categories/processCategory/processCategory.component';
import { AddEditProcessCategoryComponent } from './components/secure/inventory/categories/processCategory/add-edit-processCategory.component';
// Threat category
import { ThreatCategoryComponent } from './components/secure/inventory/categories/threatCategory/threatCategory.component';
import { AddEditThreatCategoryComponent } from './components/secure/inventory/categories/threatCategory/add-edit-threatCategory.component';
// Cause category
import { CauseCategoryComponent } from './components/secure/inventory/categories/causeCategory/causeCategory.component';
import { AddEditCauseCategoryComponent } from './components/secure/inventory/categories/causeCategory/add-edit-causeCategory.component';
// Control category
import { ControlCategoryComponent } from './components/secure/inventory/categories/controlCategory/controlCategory.component';
import { AddEditControlCategoryComponent } from './components/secure/inventory/categories/controlCategory/add-edit-controlCategory.component';
// Criticalit category
import { CriticalityCategoryComponent } from './components/secure/inventory/categories/criticalityCategory/criticalityCategory.component';
import { AddEditCriticalityCategoryComponent } from './components/secure/inventory/categories/criticalityCategory/add-edit-criticalityCategory.component';
// Risk Types
import { RiskCategoryComponent } from './components/secure/inventory/categories/riskCategory/riskCategory.component';
import { AddEditRiskCategoryComponent } from './components/secure/inventory/categories/riskCategory/add-edit-riskCategory.component';
// Origin of Threat category
import { OriginOfThreatCategoryComponent } from './components/secure/inventory/categories/originofthreatCategory/originofthreatCategory.component';
import { AddEditOriginOfThreatCategoryComponent } from './components/secure/inventory/categories/originofthreatCategory/add-edit-originofthreatCategory.component';
// Frontend pages
import { LoginComponent } from './components/public/login/login.component';
import { SecureComponent } from './app.secure';
import { FilesdashboardComponent } from './components/secure/files/filesdashboard/filesdashboard.component';
import { CentralfilesComponent } from './components/secure/files/centralfiles/centralfiles.component';
import { TemplatefilesComponent } from './components/secure/files/templatefiles/templatefiles.component';
import { ConfirmDialogComponent } from './components/secure/confirm-dialog/confirm-dialog.component';
import { AddAssetDialogComponent } from './components/secure/dialogs/add-asset-dialog/add-asset-dialog.component';
import { AddEvaluationDialogComponent } from './components/secure/dialogs/add-evaluation-dialog/add-evaluation-dialog.component';
import { AddOriginOfThreatDialogComponent } from './components/secure/dialogs/add-originofthreat-dialog/add-originofthreat-dialog.component';
import { AddBusinessContinuityDialogComponent } from './components/secure/dialogs/add-businessContinuity-dialog/add-businessContinuity-dialog.component';
import { AddThreatDialogComponent } from './components/secure/dialogs/add-threat-dialog/add-threat-dialog.component';
import { EditThreatDialogComponent } from './components/secure/dialogs/edit-threat-dialog/edit-threat-dialog.component';
import { AddControlsDialogComponent } from './components/secure/dialogs/add-controls-dialog/add-controls-dialog.component';
import { AddCauseDialogComponent } from './components/secure/dialogs/add-cause-dialog/add-cause-dialog.component';
import { AlertComponent } from './components/public/alert/alert.component';
import { AlertMessageComponent } from './components/public/alert/alert-message.component';
import { AuthService } from './services/auth.service';
import { DataService } from './shared/data.service';
import { UserService } from './services/user.service';
import { MenuService } from './services/menu.service';
import { AssetService } from './services/asset.service';
import { CategoriesService } from './services/categories.service';
import { ThreatService } from './services/threat.service';
import { ProcessService } from './services/process.service';
import { ControlService } from './services/control.service';
import { CompanyService } from './services/company.service';
import { SoaService } from './services/soa.service';
import { AttributeService } from './services/attribute.service';
import { DialogsService } from './shared/dialogs.service';
import { AlertService } from './services/alert.service';
import { registerLocaleData } from '@angular/common';
import localeNb from '@angular/common/locales/nb';
import { QuillModule } from 'ngx-quill';
import { RiskFilter, RiskFilterCalculated, AssetSliderFilter } from './components/secure/inventory/asset/asset-risk-filter.pipe';
import { TreeItemComponent } from './components/secure/layout/treeItem.component';
import { AssetsDataTable } from './shared/data-tables/assets-data-table.component';
import { ThreatsDataTable } from './shared/data-tables/threats-data-table.component';
import { SliderFilter, ExpandedFilter, SliderName } from './components/secure/dashboard/dashboardmain/dashboard-slider-filter';
import { ControlSliderFilter } from './components/secure/inventory/control/control-slider-filter';
import { D3Service } from 'd3-ng2-service';
import { TreeGraphComponent } from './shared/tree-graph/tree-graph.component';
import { TokenInterceptor } from './shared/token.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppDatePipe } from './pipes/app-date.pipe';
import { fileUploadService } from './services/fileUpload.service';
import { NotfoundComponent } from './components/secure/not-found/not-found.component'
import { HelpService } from './services/help.service';
import { ThreatViewComponent } from './components/secure/process/threatView/threatView.component';
import { ReportService } from './services/report.service';

registerLocaleData(localeNb);

@NgModule({
    declarations: [
        AppComponent,
        SecureLayoutComponent,
        PublicLayoutComponent,
        DashboardmainComponent,
        DashboardsoaComponent,
        InventorydashboardComponent,
        DashboardTreeComponent,
        // Profile
        MyProfileComponent,
        // Process
        ProcessComponent,
        AddEditProcessComponent,
        ProcessCategoryComponent,
        AddEditProcessCategoryComponent,
        ProcessViewComponent,
        // Asset
        AssetComponent,
        AssetCategoryComponent,
        AddEditAssetSubCategoryComponent,
        AddEditAssetComponent,
        AssetViewComponent,
        // Threat
        ThreatComponent,
        AddEditThreatComponent,
        ThreatCategoryComponent,
        AddEditThreatCategoryComponent,
        // Control
        ControlComponent,
        AddEditControlComponent,
        ControlCategoryComponent,
        AddEditControlCategoryComponent,
        // Criticality
        CriticalityCategoryComponent,
        AddEditCriticalityCategoryComponent,
        // Cause
        CauseComponent,
        AddEditCauseComponent,
        CauseCategoryComponent,
        AddEditCauseCategoryComponent,
        //Origin of threat
        OriginOfThreatComponent,
        AddEditOriginOfThreatComponent,
        // Risk
        RiskCategoryComponent,
        AddEditRiskCategoryComponent,
        // Origin Of Threat
        OriginOfThreatCategoryComponent,
        AddEditOriginOfThreatCategoryComponent,
        //Administrative
        CompanyComponent,
        AddEditCompanyComponent,
        UserComponent,
        AddEditUserComponent,
        MainSoaComponent,
        FirstChapterLevelComponent,
        SecondChapterLevelComponent,
        ThirdChapterLevelComponent,
        FilesdashboardComponent,
        CentralfilesComponent,
        TemplatefilesComponent,
        LoginComponent,
        ConfirmDialogComponent,
        AddAssetDialogComponent,
        AddEvaluationDialogComponent,
        AddOriginOfThreatDialogComponent,
        AddBusinessContinuityDialogComponent,
        AddThreatDialogComponent,
        EditThreatDialogComponent,
        AddControlsDialogComponent,
        AddCauseDialogComponent,
        AlertComponent,
        AlertMessageComponent,
        RiskFilter,
        RiskFilterCalculated,
        AssetSliderFilter,
        ProcessdashboardComponent,
        TreeItemComponent,
        AssetsDataTable,
        ThreatsDataTable,
        SliderFilter,
        ExpandedFilter,
        SliderName,
        ControlSliderFilter,
        TreeGraphComponent,
        AppDatePipe,
        NotfoundComponent,
        ProcessViewComponent,
        ThreatViewComponent,
    ],

    bootstrap: [AppComponent],
    imports: [
        FileUploadModule,
        NgxDatatableModule,
        NgxChartsModule,
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        HttpClientModule,
        MatButtonModule,
        MatDatepickerModule,
        MatButtonToggleModule,
        MatCardModule,
        MatChipsModule,
        MatCheckboxModule,
        MatDialogModule,
        MatGridListModule,
        MatIconModule,
        MatInputModule,
        MatSliderModule,
        MatListModule,
        MatMenuModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        MatRadioModule,
        MatToolbarModule,
        MatRippleModule,
        MatSlideToggleModule,
        MatSelectModule,
        MatTabsModule,
        MatExpansionModule,
        MatTableModule,
        BrowserAnimationsModule,
        MatNativeDateModule,
        FlexLayoutModule,
        CovalentLayoutModule,
        CovalentStepsModule,
        CovalentMediaModule,
        CovalentFileModule,
        CovalentLoadingModule,
        CovalentExpansionPanelModule,
        CovalentDataTableModule,
        CovalentDialogsModule,
        CovalentHttpModule.forRoot(),
        CovalentHighlightModule,
        CovalentMarkdownModule,
        CovalentDynamicFormsModule,
        QuillModule,
        ChartsModule,
        MatAutocompleteModule,
        MatSnackBarModule,
        RouterModule.forRoot([
            { path: '', redirectTo: 'dashboardmain', pathMatch: 'full' },
            {
                path: '', component: SecureLayoutComponent, children: [
                    { path: 'dashboardmain', component: DashboardmainComponent, canActivate: [SecureComponent], data: { title: "Dashboard" } },
                    { path: 'dashboardtree', component: DashboardTreeComponent, canActivate: [SecureComponent], data: { title: "Dashboard tree" } },
                    { path: 'dashboardsoa', component: DashboardsoaComponent, canActivate: [SecureComponent], data: { title: "SOA" } },
                    { path: 'inventorydashboard', component: InventorydashboardComponent, canActivate: [SecureComponent], data: { title: "Inventory" } },
                    // Profile
                    { path: 'profile', component: MyProfileComponent, canActivate: [SecureComponent], data: { title: "Profile" } },
                    // Process
                    { path: 'processes', component: ProcessComponent, canActivate: [SecureComponent], data: { title: "Processes" } },
                    { path: 'process/new', component: AddEditProcessComponent, canActivate: [SecureComponent], data: { title: "Create Process" } },
                    { path: 'process/edit/:id', component: AddEditProcessComponent, canActivate: [SecureComponent], data: { title: "Edit Process" } },
                    { path: 'process/view/:id', component: ProcessViewComponent, canActivate: [SecureComponent], data: { title: "View Process" } },
                    // Asset
                    { path: 'asset', component: AssetComponent, canActivate: [SecureComponent], data: { title: "Assets" } },
                    { path: 'asset/new/:type_id', component: AddEditAssetComponent, canActivate: [SecureComponent], data: { title: "Create asset" } },
                    { path: 'asset/edit/:id', component: AddEditAssetComponent, canActivate: [SecureComponent], data: { title: "Assets" } },
                    { path: 'asset/view/:id/:id', component: AssetViewComponent, canActivate: [SecureComponent], data: { title: "View Asset" } },
                    // Asset business/technical/physical/organisational
                    { path: 'asset/business/:id', component: AssetComponent, canActivate: [SecureComponent], data: { title: "Business assets" } },
                    { path: 'asset/technical/:id', component: AssetComponent, canActivate: [SecureComponent], data: { title: "Technical assets" } },
                    { path: 'asset/physical/:id', component: AssetComponent, canActivate: [SecureComponent], data: { title: "Physical assets" } },
                    { path: 'asset/organisational/:id', component: AssetComponent, canActivate: [SecureComponent], data: { title: "Organisational assets" } },
                    // Threat
                    { path: 'threat', component: ThreatComponent, canActivate: [SecureComponent], data: { title: "Threats" } },
                    { path: 'threat/new', component: AddEditThreatComponent, canActivate: [SecureComponent], data: { title: "Create threat" } },
                    { path: 'threat/edit/:id', component: AddEditThreatComponent, canActivate: [SecureComponent], data: { title: "Edit threat" } },
                    { path: 'threat/view/:id/:id', component: ThreatViewComponent, canActivate: [SecureComponent], data: { title: "View Threat" } },
                    // Control
                    { path: 'control', component: ControlComponent, canActivate: [SecureComponent], data: { title: "Controls" } },
                    { path: 'control/create', component: AddEditControlComponent, canActivate: [SecureComponent], data: { title: "Create control" } },
                    { path: 'control/edit/:id', component: AddEditControlComponent, canActivate: [SecureComponent], data: { title: "Edit control" } },
                    // Cause
                    { path: 'cause', component: CauseComponent, canActivate: [SecureComponent], data: { title: "Causes" } },
                    { path: 'cause/edit/:id', component: AddEditCauseComponent, canActivate: [SecureComponent], data: { title: "Edit cause" } },
                    { path: 'cause/create', component: AddEditCauseComponent, canActivate: [SecureComponent], data: { title: "Create cause" } },
                    //Origin of Threat
                    { path: 'originofthreat', component: OriginOfThreatComponent, canActivate: [SecureComponent], data: { title: "Origin of Threat" } },
                    { path: 'originofthreat/edit/:id', component: AddEditOriginOfThreatComponent, canActivate: [SecureComponent], data: { title: "Edit Origin of Threat" } },
                    { path: 'originofthreat/create', component: AddEditOriginOfThreatComponent, canActivate: [SecureComponent], data: { title: "Create Origin of Threat" } },
                    // Administrative Company/User/SoaChapters
                    { path: 'administrative/company', component: CompanyComponent, canActivate: [SecureComponent], data: { title: "Companies" } },
                    { path: 'administrative/company/new', component: AddEditCompanyComponent, canActivate: [SecureComponent], data: { title: 'Create company' } },
                    { path: 'administrative/company/edit/:id', component: AddEditCompanyComponent, canActivate: [SecureComponent], data: { title: 'Edit company' } }, 
                    { path: 'administrative/user', component: UserComponent, canActivate: [SecureComponent], data: { title: "Users" } },
                    { path: 'administrative/user/new', component: AddEditUserComponent, canActivate: [SecureComponent], data: { title: 'Create user' } },
                    { path: 'administrative/user/edit/:id', component: AddEditUserComponent, canActivate: [SecureComponent], data: { title: 'Edit user' } },
                    { path: 'administrative/soachapters/iso27001/edit/:id', component: MainSoaComponent, canActivate: [SecureComponent], data: { title: 'ISO27001 Chapters' } },
                    { path: 'administrative/soachapters/helsesoa/edit/:id', component: MainSoaComponent, canActivate: [SecureComponent], data: { title: 'HelseSOA Chapters' } },
                    { path: 'administrative/soachapters/gdpr/edit/:id', component: MainSoaComponent, canActivate: [SecureComponent], data: { title: 'GDPR Chapters' } },
                    { path: 'administrative/soachapters/legal/edit/:id', component: MainSoaComponent, canActivate: [SecureComponent], data: { title: 'Legal Chapters' } },
                    // Asset SubCategory
                    { path: 'categories/assetsubcategories', component: AssetCategoryComponent, canActivate: [SecureComponent], data: { title: "Asset Categories" } },
                    { path: 'categories/assetsubcategories/new', component: AddEditAssetSubCategoryComponent, canActivate: [SecureComponent], data: { title: "Create Asset Category" } },
                    { path: 'categories/assetsubcategorie/edit/:id', component: AddEditAssetSubCategoryComponent, canActivate: [SecureComponent], data: { title: "Edit Asset Category" } },
                    // Process Category
                    { path: 'categories/processcategories', component: ProcessCategoryComponent, canActivate: [SecureComponent], data: { title: "Process Categories" } },
                    { path: 'categories/processcategories/new', component: AddEditProcessCategoryComponent, canActivate: [SecureComponent], data: { title: "Create Process Category" } },
                    { path: 'categories/processcategory/edit/:id', component: AddEditProcessCategoryComponent, canActivate: [SecureComponent], data: { title: "Edit Process Category" } },
                    // Threat category
                    { path: 'categories/threatcategories', component: ThreatCategoryComponent, canActivate: [SecureComponent], data: { title: "Threat Categories" } },
                    { path: 'categories/threatcategories/new', component: AddEditThreatCategoryComponent, canActivate: [SecureComponent], data: { title: "Create Threat Category" } },
                    { path: 'categories/threatcategory/edit/:id', component: AddEditThreatCategoryComponent, canActivate: [SecureComponent], data: { title: "Edit Threat Category" } },
                    // Couse category
                    { path: 'categories/causecategories', component: CauseCategoryComponent, canActivate: [SecureComponent], data: { title: "Cause Categories" } },
                    { path: 'categories/causecategories/new', component: AddEditCauseCategoryComponent, canActivate: [SecureComponent], data: { title: "Create Cause Category" } },
                    { path: 'categories/causecategory/edit/:id', component: AddEditCauseCategoryComponent, canActivate: [SecureComponent], data: { title: "Edit Cause Category" } },
                    // Control category
                    { path: 'categories/controlcategories', component: ControlCategoryComponent, canActivate: [SecureComponent], data: { title: "Control Categories" } },
                    { path: 'categories/controlcategories/new', component: AddEditControlCategoryComponent, canActivate: [SecureComponent], data: { title: "Create Control Category" } },
                    { path: 'categories/controlcategory/edit/:id', component: AddEditControlCategoryComponent, canActivate: [SecureComponent], data: { title: "Edit Control Category" } },
                    // Criticality category
                    { path: 'categories/criticalitycategories', component: CriticalityCategoryComponent, canActivate: [SecureComponent], data: { title: "Criticality Categories" } },
                    { path: 'categories/criticalitycategories/new', component: AddEditCriticalityCategoryComponent, canActivate: [SecureComponent], data: { title: "Create Criticality Category" } },
                    { path: 'categories/criticalitycategory/edit/:id', component: AddEditCriticalityCategoryComponent, canActivate: [SecureComponent], data: { title: "Edit Criticality Category" } },
                    // Risk types
                    { path: 'categories/riskcategories', component: RiskCategoryComponent, canActivate: [SecureComponent], data: { title: "Risk Categories" } },
                    { path: 'categories/riskcategories/new', component: AddEditRiskCategoryComponent, canActivate: [SecureComponent], data: { title: "Create Risk Category" } },
                    { path: 'categories/riskcategory/edit/:id', component: AddEditRiskCategoryComponent, canActivate: [SecureComponent], data: { title: "Edit Risk Category" } },
                    // Origin of Threat category
                    { path: 'categories/originofthreatcategories', component: OriginOfThreatCategoryComponent, canActivate: [SecureComponent], data: { title: "Origin of Threat Categories" } },
                    { path: 'categories/originofthreatcategories/new', component: AddEditOriginOfThreatCategoryComponent, canActivate: [SecureComponent], data: { title: "Create Origin of Threat Category" } },
                    { path: 'categories/originofthreatcategory/edit/:id', component: AddEditOriginOfThreatCategoryComponent, canActivate: [SecureComponent], data: { title: "Edit Origin of Threat Category" } },
                    // Soa iso27001/helsesoa/gdpr/legal
                    { path: 'soa/iso27001/edit/:id', component: MainSoaComponent, canActivate: [SecureComponent], data: { title: "ISO27001" } },
                    { path: 'soa/helsesoa/edit/:id', component: MainSoaComponent, canActivate: [SecureComponent], data: { title: "HelseSOA" } },
                    { path: 'soa/gdpr/edit/:id', component: MainSoaComponent, canActivate: [SecureComponent], data: { title: "GDPR" } },
                    { path: 'soa/legal/edit/:id', component: MainSoaComponent, canActivate: [SecureComponent], data: { title: "Legal" } },
                    // Files
                    { path: 'filesdashboard', component: CentralfilesComponent, canActivate: [SecureComponent], data: { title: "Files" } },
                    { path: 'centralfiles', component: CentralfilesComponent, canActivate: [SecureComponent], data: { title: "Central files" } },
                    { path: 'templatefiles', component: TemplatefilesComponent, canActivate: [SecureComponent], data: { title: "Template files" } },

                    { path: 'processdashboard', component: ProcessdashboardComponent, canActivate: [SecureComponent], data: { title: "Business Processes" } },
                    { path: 'not-found', component: NotfoundComponent, canActivate: [SecureComponent], data: { title: "Page Not Found" } },
                ]
            },
            {
                path: '', component: PublicLayoutComponent, children: [
                    { path: 'login', component: LoginComponent },
                    { path: 'logout', component: LoginComponent },
                ]
            },
            { path: '**', redirectTo: '/not-found' }
        ])
    ],
    providers: [
        AuthService,
        SecureComponent,
        UserService,
        DatePipe,
        MenuService,
        DataService,
        AssetService,
        CategoriesService,
        ThreatService,
        ProcessService,
        ControlService,
        CompanyService,
        SoaService,
        AttributeService,
        DialogsService,
        AlertService,
        RiskFilter,
        RiskFilterCalculated,
        D3Service,
        fileUploadService,
        HelpService,
        ReportService,
        { provide: 'BASE_URL', useFactory: getBaseUrl },
        { provide: LOCALE_ID, useValue: 'nb-NO' },
        { provide: RequestOptions, useClass: CustomRequestOptions },
        SliderFilter,
        { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
        ExpandedFilter, SliderName,
        { provide: MAT_DATE_LOCALE, useValue: 'nb-NO' }
    ],
    entryComponents: [
        ConfirmDialogComponent,
        AddAssetDialogComponent,
        AddEvaluationDialogComponent,
        AddBusinessContinuityDialogComponent,
        AddThreatDialogComponent,
        EditThreatDialogComponent,
        AddControlsDialogComponent,
        AddCauseDialogComponent,
        AddOriginOfThreatDialogComponent,
        AlertMessageComponent,
    ],
 
})

export class AppModule {
}

export function getBaseUrl() {
    return "http://raap.dev.no/WebAPI/";
}
