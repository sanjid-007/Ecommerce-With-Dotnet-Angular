import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-control',
  templateUrl: './admin-control.component.html',
  styleUrl: './admin-control.component.css'
})
export class AdminControlComponent {
  constructor(private route : Router) {}
  ngOnInit() {
    if (!localStorage.getItem('token')) {
      this.route.navigate(['home']); // Redirect to home if not logged in
      return; // Stop further execution
  }
}
 
   category(){
    this.route.navigate(['category-admin']);
   }
    product(){
      this.route.navigate(['product-admin']);
    }
}
