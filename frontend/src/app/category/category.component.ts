import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent {
  categories: any = [];
  userName!: string | null;
  filteredCategories: any[] = [];
  searchTerm: string = '';
  currentPage = 1;
  pageSize = 10;
  totalItems = 0; 
  totalPages = 0; 
  isAvatarMenuOpen = false;
  constructor(private http: HttpClient , private router: Router, private route: ActivatedRoute) {}
  ngOnInit() {
    if (!localStorage.getItem('token')) {
      this.router.navigate(['home']); // Redirect to home if not logged in
      return; // Stop further execution
    }

    this.userName = this.route.snapshot.paramMap.get('name');
    
   
    // this.http.get<any[]>('https://localhost:7116/api/Category').subscribe((response: any) => {
    //   console.log(response);
    //   this.categories = response;
    //   this.filteredCategories = [...this.categories];
    // });
    // this.http.get<any[]>('https://localhost:7116/api/Category').subscribe({
    //   next: (response: any) => {
    //     console.log(response);
    //     this.categories = response;
    //     this.filteredCategories = [...this.categories];
    //   },
    //   error: (error) => {
    //     if (error.status === 401) {
    //       console.log('Unauthorized access');
    //       this.categories = [];
    //       this.filteredCategories = [];
    //     }
    //   }
    // });
    if (this.userName) {
      this.loadCategories();
    }
    
  }   
  filterCategories() {
    
    if (this.searchTerm.trim()) {
      this.filteredCategories = this.categories.filter((category: { name: string }) =>
        category.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredCategories = [...this.categories]; 
    }
  } 
  onSelect(category: any) {
    console.log(category.name);
    if(category.name != null) {
      
    this.router.navigate(['product', category.name,this.userName]);
  }
  } 
  Home() {
    this.router.navigate(['category',this .userName]);
  } 
  // logout() {
  //   this.http.post('https://localhost:7116/api/Auth/logout', {}).subscribe(() => {
  //     localStorage.removeItem('token'); // Remove JWT from local storage
  //     this.router.navigate(['home']); // Redirect to login
  //   });
  // }    
 
  carthistory(){
    this.router.navigate(['cart',this.userName]);
   }
  

   loadCategories() {
   
    const url = `https://localhost:7116/api/Category/${this.userName}?page=${this.currentPage}&pageSize=${this.pageSize}`;
    this.http.get<any>(url).subscribe(
      (response) => {
        this.categories = response.categories;
        this.totalItems = response.totalCount; 
        this.totalPages = Math.ceil(this.totalItems / this.pageSize); 
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }

 

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadCategories(); 
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadCategories(); 
    }
  }
  
  toggleAvatarMenu() {
    this.isAvatarMenuOpen = !this.isAvatarMenuOpen;
    console.log('Avatar menu toggled:', this.isAvatarMenuOpen);
  }

  goToProfile() {
    // Navigate to the user's profile page
    this.router.navigate(['profile',this .userName]);
  }
  logoClicked(){
    this.router.navigate(['category',this .userName]);
  }
  logout() {
    this.http.post('https://localhost:7116/api/Auth/logout', {}).subscribe(() => {
      localStorage.removeItem('token'); // Remove token
      this.categories = []; // Clear categories immediately
      this.filteredCategories = [];
      this.router.navigate(['home']).then(() => {
        window.location.reload(); // Force UI update
      });
    });
  }

                                      
}
      