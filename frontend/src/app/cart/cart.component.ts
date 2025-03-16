import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  productName!: string | null;
  userName!: string | null;
  product:any;
  products: any = [];
  productCart: any;
  isAvatarMenuOpen:any = false;
  constructor(private http: HttpClient, private router: ActivatedRoute, private route: Router) {}
  fg : any = 0;
  ngOnInit() {
    if (!localStorage.getItem('token')) {
      this.route.navigate(['home']); // Redirect to home if not logged in
      return; // Stop further execution
    }
    this.productName = this.router.snapshot.paramMap.get('name');
    this.userName = this.router.snapshot.paramMap.get('userName');
    console.log("id "+this.productName + " " + this.userName);
    this.productCart = {
      userName : this.userName,
      productName : this.productName,
      quantity : "1",
      productDetails : this.product
     };
     console.log(this.fg);
    if(this.productName != null && this.fg != 1){
    this.http.get<any>('https://localhost:7116/api/Product/' + this.productName).subscribe((response: any) => {
      console.log("hello" + response);
      this.product = response;
      this.productCart.productDetails = this.product;
     
      this.http.post('https://localhost:7116/api/Cart', this.productCart).subscribe({
        next: (response: any) => {
          alert('Product added to Cart successfully!');
          this.productName = null;
          this.loadCart();
          
        },
        error: (err) =>  alert('Register failed'),
      });

    });
  }
  else{
    this.http.get<any>('https://localhost:7116/api/Cart/' + this.userName).subscribe((response: any) => {
      console.log(response);
      this.products = response;


      this.products.forEach((item: any) => {
        const cleanedPrice = item.productDetails.price.replace(/[^0-9.]/g, '');
        item.productDetails.price = parseFloat(cleanedPrice);
        item.quantity = parseInt(item.quantity, 10);
        item.netPrice = item.productDetails.price * item.quantity; 
      });

    });
  }

  }
 loadCart() {
  this.http.get<any>('https://localhost:7116/api/Cart/' + this.userName).subscribe((response: any) => {
    console.log(response);
    this.products = response;


    this.products.forEach((item: any) => {
      const cleanedPrice = item.productDetails.price.replace(/[^0-9.]/g, '');
      item.productDetails.price = parseFloat(cleanedPrice);
      item.quantity = parseInt(item.quantity, 10);
      item.netPrice = item.productDetails.price * item.quantity; 
    });

  });
 }
 orderfunction(){
  
  this.route.navigate(['order',this.product.name, this.userName]);
 }

 Home() {
  this.route.navigate(['category',this .userName]);
} 
   
   getTotalPrice() {
    let total = 0;
    this.products.forEach((item: any) => {
      total+= item.netPrice;
    });
    
    return total;
  }

  decreaseQuantity(product: any) {
    if (product.quantity > 1) {
      product.quantity--;
      this.http.post('https://localhost:7116/api/Cart/cart', { 
        userName: this.userName, 
        productName: product.productDetails.name, 
        quantity: "-1" 
      }).subscribe({
        next: (response: any) => console.log('Quantity decreased'),
        error: (err) => alert('Failed to update cart'),
      });
    } else {
     
      this.removeFromCart(product.id);
    }
   
  }
  
  removeFromCart(cartid : any) {
    this.http.delete('https://localhost:7116/api/Cart/' + cartid).subscribe({
      next: (response: any) => {
        alert('Product removed from Cart successfully!');
        this.products = this.products.filter((item: any) => item.id !== cartid);
      },
      error: (err) => alert('Failed to remove product from cart'),
    });
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
  carthistory(){
    this.route.navigate(['cart',this.userName]);
   }

   
  
}
