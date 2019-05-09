import { SubCategory } from './../model/SubCategory';
import { Category } from './../model/Category';
import { SubCategoryService } from './../service/sub-category/sub-category.service';
import { CategoryService } from './../service/category/category.service';
import { UserService } from './../service/user/user.service';
import { Component, OnInit } from '@angular/core';

import { CookieService } from 'ngx-cookie-service';


@Component({
    selector: 'app-search-bar',
    templateUrl: './search-bar.component.html',
    styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
    categories: Category[];
    subCategories: SubCategory[];
    selectedCategoryId;
    selectedSubCategoryId;

    constructor(
        private userService: UserService,
        private categoryService: CategoryService,
        private subCategoryService: SubCategoryService,
        ) { }

    ngOnInit() {
        if (this.userService.loggedIn()) {
            this.getCategories();
        }
    }

    getCategories() {
        this.categoryService.getCategories()
            .subscribe(
                response => this.categories = response
            );
    }

    onCategoryChange(id) {
        this.selectedCategoryId = id;
        this.subCategoryService.getSubCategoriesByCategoryId(id)
            .subscribe(
                response => this.subCategories = response
            );
    }

    onSubCategoryChange(id) {
        this.selectedSubCategoryId = id;
    }

    onSearch() {
        console.log(this.selectedCategoryId, this.selectedSubCategoryId);
    }

    onLogOut() {
        this.userService.logOut();
    }
}
