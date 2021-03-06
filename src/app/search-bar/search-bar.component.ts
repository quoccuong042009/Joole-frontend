import { SubCategory } from './../model/SubCategory';
import { Category } from './../model/Category';
import { SubCategoryService } from './../service/sub-category/sub-category.service';
import { CategoryService } from './../service/category/category.service';
import { UserService } from './../service/user/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {
  categories: Category[];
  subCategories: SubCategory[];
  selectedCategoryId = '-1';
  selectedSubCategoryId = '-1';

  isDisable = true;

  constructor(
    private userService: UserService,
    private categoryService: CategoryService,
    private subCategoryService: SubCategoryService,
    private router: Router
  ) {}

  ngOnInit() {
    if (this.userService.loggedIn()) {
      this.getCategories();
    }
  }

  getCategories() {
    this.categoryService
      .getCategories()
      .subscribe(response => (this.categories = response));
  }

  onCategoryChange(id) {
    this.selectedCategoryId = id;
    this.subCategoryService
      .getSubCategoriesByCategoryId(id)
      .subscribe(response => (this.subCategories = response));
  }

  onSubCategoryChange(id) {
    this.selectedSubCategoryId = id;
  }

  onSearch() {
    this.router.navigate([
      'front-page/products',
      this.selectedCategoryId,
      this.selectedSubCategoryId
    ]);
  }

  isDisableSearch() {
    return !(
      this.selectedCategoryId !== '-1' && this.selectedSubCategoryId !== '-1'
    );
  }
}
