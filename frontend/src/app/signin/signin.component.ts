import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent {
  username = '';
    password = '';
    constructor(private http: HttpClient , private router: Router) {}
     submit() {
        this.http.post('https://localhost:7116/api/Auth/login/Customer', {Name: this.username, Password: this.password},{observe: 'response', responseType: 'text'}).subscribe((response: any) => {
          console.log(response);
          console.log(response.body);
          console.log(response.status);
          if (response.status === 200) {
            alert('signin Successfull');
            localStorage.setItem('token', response.body);
            this.router.navigate(['category',this.username]);
          } else {
            alert('signin failed');
          }
        },
        (error) => {
          console.log(error);
          alert('signin failed');
        }
      )
          
     }
     Home() {
      this.router.navigate(['home']);
    } 
}
