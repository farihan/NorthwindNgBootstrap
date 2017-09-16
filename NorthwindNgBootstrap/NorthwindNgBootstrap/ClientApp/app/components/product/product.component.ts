import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/Observable/forkJoin';

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { NotificationService } from './../../services/notification.service';
import { Product } from './../../models/product';
import { ProductService } from './../../services/product.service';
import { CategoryService } from './../../services/category.service';
import { SupplierService } from './../../services/supplier.service';

@Component({
    selector: 'productlist',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.css']

})

export class ProductComponent implements OnInit {

    private readonly PAGE_SIZE = 10;

    public queryResult: any = {};
    public query: any = {
        pageSize: this.PAGE_SIZE
    };
    public columns = [
        { title: 'ID', key: 'productid', isSortable: true },
        { title: 'Name', key: 'productname', isSortable: true },
        { title: 'Quantity', key: 'quantityperunit', isSortable: true },
        { title: 'Price', key: 'unitprice', isSortable: true },
        { title: 'In Stock', key: 'unitsinstock', isSortable: true },
        { title: 'Order', key: 'unitsonorder', isSortable: true },
        { title: 'Reorder Level', key: 'reorderlevel', isSortable: true },
        { title: 'Discontinued', key: 'discontinued', isSortable: true },
        { title: '', key: '', isSortable: false }
    ];

    public suppliers: any[];
    public categories: any[];

    constructor(private notificationService: NotificationService,
        private productService: ProductService,
        private categoryService: CategoryService,
        private supplierService: SupplierService,
        private loadingBarService: SlimLoadingBarService,
        private modalService: NgbModal) { }

    ngOnInit() {
        this.populateProducts();

        var sources = [
            this.supplierService.getSuppliers(),
            this.categoryService.getCategories(),
        ];

        Observable.forkJoin(sources).subscribe(data => {
            this.suppliers = data[0];
            this.categories = data[1];
        }, error => {
            this.notificationService.error(error);
        });
    }

    private populateProducts() {
        this.loadingBarService.start();
        this.productService.getProducts(this.query)
            .subscribe(result => {
                this.queryResult = result;
                this.loadingBarService.complete();
                this.notificationService.info('Products list loaded');
            }, error => {
                this.loadingBarService.complete();
                this.notificationService.error(error);
            });
    }

    sortBy(columnName: any) {
        if (this.query.sortBy === columnName) {
            this.query.isSortAscending = !this.query.isSortAscending;
        } else {
            this.query.sortBy = columnName;
            this.query.isSortAscending = true;
        }

        this.populateProducts();
    }

    onPageChange(page: number) {
        this.query.page = page;
        this.populateProducts();
    }

    onFilterChange() {
        this.query.page = 1;
        this.populateProducts();
    }

    // details    
    public productDetails: any;

    openProductDetails(content: any, productId: number) {
        this.loadingBarService.start();

        this.productService.getProduct(productId)
            .subscribe(result => {
                this.productDetails = result;
                this.loadingBarService.complete();
                this.notificationService.info('Product details loaded');

                this.modalService.open(content);
            },
            error => {
                this.notificationService.error(error);
            });
    }

    // update
    public productUpdate: any;

    openProductUpdate(content: any, productId: number) {
        this.loadingBarService.start();

        this.productService.getProduct(productId)
            .subscribe(result => {
                this.productUpdate = result;
                this.loadingBarService.complete();
                this.notificationService.info('Product update loaded');

                this.modalService.open(content);
            },
            error => {
                this.loadingBarService.complete();
                this.notificationService.error(error);
            });
    }
}