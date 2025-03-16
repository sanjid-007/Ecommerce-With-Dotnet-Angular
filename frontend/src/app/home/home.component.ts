import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private http: HttpClient , private router: Router) {}
   submit() {
     this.router.navigate(['register']);
   }
   submitlogin() {
    this.router.navigate(['signin']);
  }
}
