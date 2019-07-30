import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'home',
        loadChildren: './home/home.module#HomePageModule'
    },
    {
        path: 'list',
        loadChildren: './list/list.module#ListPageModule'
    },
    {
        path: 'platforms',
        loadChildren: './platforms/platforms.module#PlatformsPageModule'
    },
    {
        path: 'trademark',
        loadChildren: './trademark/trademark.module#TrademarkPageModule'
    },
    {
        path: 'garment',
        loadChildren: './garment/garment.module#GarmentPageModule'
    },
    {
        path: 'client',
        loadChildren: './client/client.module#ClientPageModule'
    },
    {
        path: 'sales',
        loadChildren: './sales/sales.module#SalesPageModule'
    },
    {
        path: 'settings',
        loadChildren: './settings/settings.module#SettingsPageModule'
    },
    {
        path: 'simulate',
        loadChildren: './simulate/simulate.module#SimulatePageModule'
    },
    {
        path: 'reports',
        loadChildren: './reports/reports.module#ReportsPageModule'
    },
    {
        path: 'products',
        loadChildren: './products/products.module#ProductsPageModule'
    },
    {   path: 'sale-search-client',
        loadChildren: './sale-search-client/sale-search-client.module#SaleSearchClientPageModule'
    },
  { path: 'sale-search-platform', loadChildren: './sale-search-platform/sale-search-platform.module#SaleSearchPlatformPageModule' },
  { path: 'sales-search-product', loadChildren: './sales-search-product/sales-search-product.module#SalesSearchProductPageModule' }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
