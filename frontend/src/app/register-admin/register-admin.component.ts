import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-admin',
  templateUrl: './register-admin.component.html',
  styleUrl: './register-admin.component.css'
})
export class RegisterAdminComponent {
   username = '';
    password = '';
  
    constructor(private http: HttpClient , private router: Router) {}
     submit() {
     
      console.log(this.username);
        this.http.post('https://localhost:7116/api/Auth/register/Admin', {Name: this.username, Password: this.password}, { observe: 'response', responseType: 'text' }).subscribe((response : any) => {
          console.log(response);
          if (response.status === 200) {
            this.router.navigate(['/signin-admin']);
          } else {
            console.log(response.status);
            alert('Register failed');
          }
        });
          
     }
}
