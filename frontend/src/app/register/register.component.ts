import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  username = '';
  password = '';

  constructor(private http: HttpClient , private router: Router) {}
   submit() {
   
    console.log(this.username);
      this.http.post('https://localhost:7116/api/Auth/register/Customer', {Name: this.username, Password: this.password}, { observe: 'response', responseType: 'text' }).subscribe((response : any) => {
        console.log(response);
        if (response.status === 200) {
          alert('Register Successfull');
          this.router.navigate(['/signin']);
        } else {
          console.log(response.status);
          alert('Register failed');
        }
      },
      (error) => {
        console.log(error);
        alert('Register failed');
      }
    );
        
   }
   Home() {
    this.router.navigate(['home']);
  } 
   

}
