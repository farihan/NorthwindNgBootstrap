﻿import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/Observable/forkJoin';

import { NgbModal, NgbModalRef, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

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

    // crud
    private closeResult: string;
    private modalProduct: NgbModalRef;

    private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return `with: ${reason}`;
        }
    }
    
    private showModal(content: any) {
        this.modalProduct = this.modalService.open(content);
        this.modalProduct.result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }

    close() {
        this.modalProduct.close();
    }

    // details    
    public productDetails: any = {};

    openProductDetails(content: any, productId: number) {
        this.loadingBarService.start();

        this.productService.getProduct(productId)
            .subscribe(result => {
                this.productDetails = result;
                this.loadingBarService.complete();
                this.notificationService.info('Product details loaded');
                this.showModal(content);
            },
            error => {
                this.loadingBarService.complete();
                this.notificationService.error(error);
            });
    }

    // update
    public productUpdate: any = {};

    openProductUpdate(content: any, productId: number) {
        this.loadingBarService.start();

        this.productService.getProduct(productId)
            .subscribe(result => {
                this.productUpdate = result;
                this.loadingBarService.complete();
                this.notificationService.info('Product update loaded');
                this.showModal(content);
            },
            error => {
                this.loadingBarService.complete();
                this.notificationService.error(error);
            });
    }

    onUpdate(productUpdate: Product, isValid: boolean) {
        if (isValid) {
            this.loadingBarService.start();
            this.productService.update(this.productUpdate)
                .subscribe(result => {
                    this.loadingBarService.complete();
                    this.notificationService.success('Product updated');
                    this.populateProducts();
                    this.modalProduct.close(); // somehow not able to close with close()
                }, error => {
                    this.loadingBarService.complete();
                    this.notificationService.error(error);
                });
        }
        else {
            this.notificationService.error('Invalid product');
        }
    }

    // create
    public productCreate: any = { discontinued: false, supplierId: '', categoryId: '' };

    openProductCreate(content: any) {
        this.showModal(content);
    }

    onCreate(productCreate: Product, isValid: boolean) {
        if (isValid) {
            this.loadingBarService.start();
            this.productService.create(this.productCreate)
                .subscribe(result => {
                    this.loadingBarService.complete();
                    this.notificationService.success('Product created');
                    this.populateProducts();
                    // somehow not able to close with close()
                    this.modalProduct.close(); 
                    // clear textboxes
                    this.productCreate = { discontinued: false, supplierId: '', categoryId: '' };
                }, error => {
                    this.loadingBarService.complete();
                    this.notificationService.error(error);
                });
        }
        else {
            this.notificationService.error('Invalid product');
        }
    }

    // delete
    public productDelete: any = {};

    openProductDelete(content: any, productId: number) {
        this.loadingBarService.start();

        this.productService.getProduct(productId)
            .subscribe(result => {
                this.productDelete = result;
                this.loadingBarService.complete();
                this.notificationService.info('Product delete loaded');
                this.showModal(content);
            },
            error => {
                this.loadingBarService.complete();
                this.notificationService.error(error);
            });
    }

    onDelete(productDelete: Product, isValid: boolean) {
        if (isValid) {
            this.loadingBarService.start();
            this.productService.delete(this.productDelete)
                .subscribe(result => {
                    this.loadingBarService.complete();
                    this.notificationService.success('Product deleted');
                    this.populateProducts();
                    this.modalProduct.close(); // somehow not able to close with close()
                }, error => {
                    this.loadingBarService.complete();
                    this.notificationService.error(error);
                });
        }
        else {
            this.notificationService.error('Invalid product');
        }
    }

}