import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  categoryId!: string | null;
  userName!: string | null;
  products: any[] = [];
  displayedProducts: any[] = []; // Filtered products for search dropdown
  searchTerm: string = ''; // Search input value
  currentPage = 1;
  pageSize = 10;
  totalItems = 0;
  totalPages = 0;
  isAvatarMenuOpen = false;

  constructor(private http: HttpClient, private router: ActivatedRoute, private route: Router) {}

  ngOnInit() {
    if (!localStorage.getItem('token')) {
      this.route.navigate(['home']); // Redirect to home if not logged in
      return;
    }
    this.categoryId = this.router.snapshot.paramMap.get('name');
    this.userName = this.router.snapshot.paramMap.get('userName');

    if (this.categoryId) {
      this.loadProducts();
    }
  }

  loadProducts() {
    const url = `https://localhost:7116/api/Product/Category/${this.categoryId}?page=${this.currentPage}&pageSize=${this.pageSize}`;
    this.http.get<any>(url).subscribe(
      (response) => {
        this.products = response.products;
        this.displayedProducts = [...this.products]; // Initialize search list
        this.totalItems = response.totalCount;
        this.totalPages = Math.ceil(this.totalItems / this.pageSize);
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }

  productfunction(product: any) {
    this.route.navigate(['product-detail', product.name, this.userName]);
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadProducts();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadProducts();
    }
  }

  Home() {
    this.route.navigate(['category', this.userName]);
  }

  carthistory() {
    this.route.navigate(['cart', this.userName]);
  }

  // 🔹 Search Filtering Function
  onSearch() {
    if (!this.searchTerm.trim()) {
      this.displayedProducts = [...this.products]; // Reset search results
    } else {
      this.displayedProducts = this.products.filter((product) =>
        product.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }

  // 🔹 When clicking a product from search results
  selectProduct(product: any) {
    this.searchTerm = ''; // Clear search box
    this.displayedProducts = []; // Hide search results
    this.productfunction(product); // Navigate to product details page
  }

  toggleAvatarMenu() {
    this.isAvatarMenuOpen = !this.isAvatarMenuOpen;
    console.log('Avatar menu toggled:', this.isAvatarMenuOpen);
  }

  goToProfile() {
    // Navigate to the user's profile page
    this.route.navigate(['profile',this .userName]);
  }
  logoClicked(){
    this.route.navigate(['category',this .userName]);
  }
  logout() {
    this.http.post('https://localhost:7116/api/Auth/logout', {}).subscribe(() => {
      localStorage.removeItem('token'); // Remove token
      // this.categories = []; // Clear categories immediately
      // this.filteredCategories = [];
      this.route.navigate(['home']).then(() => {
        window.location.reload(); // Force UI update
      });
    });
  }
}
