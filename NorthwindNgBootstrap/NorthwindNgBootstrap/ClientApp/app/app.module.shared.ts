import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { ToastyModule } from 'ng2-toasty';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';

import { AppComponent } from './components/app/app.component';
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';
import { FetchDataComponent } from './components/fetchdata/fetchdata.component';
import { CounterComponent } from './components/counter/counter.component';
import { FooterComponent } from './components/footer/footer.component';
import { PaginationComponent } from './components/shared/pagination.component';
import { ProductComponent } from './components/product/product.component';

import { NotificationService } from './services/notification.service';
import { ProductService } from './services/product.service';
import { CategoryService } from './services/category.service';
import { SupplierService } from './services/supplier.service';

@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
        CounterComponent,
        FetchDataComponent,
        HomeComponent,
        FooterComponent,
        PaginationComponent,
        ProductComponent
    ],
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        ToastyModule.forRoot(), 
        SlimLoadingBarModule.forRoot(),
        NgbModule.forRoot(), 
        RouterModule.forRoot([
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: 'counter', component: CounterComponent },
            { path: 'fetch-data', component: FetchDataComponent },
            { path: 'product', component: ProductComponent },
            { path: '**', redirectTo: 'home' }
        ])
    ],
    providers: [
        NotificationService,
        ProductService,
        CategoryService,
        SupplierService
    ]
})
export class AppModuleShared {
}
