import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent {
  productName!: string | null;
  userName!: string | null;
  isAvatarMenuOpen = false;
  constructor(private http: HttpClient, private router: ActivatedRoute, private route: Router) {}
  
  ngOnInit() {
    if (!localStorage.getItem('token')) {
      this.route.navigate(['home']); // Redirect to home if not logged in
      return; // Stop further execution
    }
    this.productName = this.router.snapshot.paramMap.get('name');
    this.userName = this.router.snapshot.paramMap.get('userName');
    console.log("id "+this.productName, this.userName);
    
  }

  onSubmit() {
   
     this.route.navigate(['/payment']);
  }
 

  orderfunction(){
    this.route.navigate(['order']);
   }

   Home() {
    this.route.navigate(['category',this .userName]);
  } 
   addtocart(){
   // console.log(this.product.name);
    this.route.navigate(['cart',this.productName, this.userName]);
   }
   carthistory(){
    this.route.navigate(['cart',this.userName]);
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
