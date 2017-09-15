import { 
	Component,
	Input, 
	Output, 
	EventEmitter }     from '@angular/core';
import { OnChanges } from '@angular/core';

@Component({
	selector: 'pagination',
    template: `
    <nav aria-label="Page navigation" *ngIf="totalRecords > pageSize">
        <ul class="pagination">
            <li class="page-item" [class.disabled]="currentPage == 1">
                <a class="page-link" [routerLink]="['/product']" (click)="first()" aria-label="First">
                <span aria-hidden="true">First</span>
                </a>
            </li>
            <li class="page-item" [class.active]="currentPage == page" *ngFor="let page of pages" (click)="changePage(page)">
                <a class="page-link" [routerLink]="['/product']">{{ page }}</a>
            </li>
            <li class="page-item" [class.disabled]="currentPage == pages.length">
                <a class="page-link" [routerLink]="['/product']" (click)="last()" aria-label="Last">
                <span aria-hidden="true">Last</span>
                </a>
            </li>
        </ul>
    </nav>  
`
})
export class PaginationComponent implements OnChanges {
    @Input('total-records') totalRecords: number;
	@Input('page-size') pageSize = 10;
	@Output('page-changed') pageChanged = new EventEmitter();
	pages: any[];
	currentPage = 1; 

	ngOnChanges(){
        this.currentPage = 1;
        
        var pagesCount = Math.ceil(this.totalRecords / this.pageSize); 
		    this.pages = [];
		    for (var i = 1; i <= pagesCount; i++)
			    this.pages.push(i);
	}

	changePage(page: number){
		this.currentPage = page; 
		this.pageChanged.emit(page);
	}

	previous(){
		if (this.currentPage == 1)
			return;

		this.currentPage--;
		this.pageChanged.emit(this.currentPage);
	}

	next(){
		if (this.currentPage == this.pages.length)
			return; 
		
		this.currentPage++;
        console.log("next", this);
		this.pageChanged.emit(this.currentPage);
    }

    first() {
        this.currentPage = 1;
        this.pageChanged.emit(this.currentPage);
    }

    last() {
        this.currentPage = this.pages.length;
        this.pageChanged.emit(this.currentPage);
    }
}