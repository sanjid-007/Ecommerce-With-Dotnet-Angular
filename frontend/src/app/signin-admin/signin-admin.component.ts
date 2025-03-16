import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin-admin',
  templateUrl: './signin-admin.component.html',
  styleUrl: './signin-admin.component.css'
})
export class SigninAdminComponent {
   username = '';
      password = '';
      constructor(private http: HttpClient , private router: Router) {}
       submit() {
          this.http.post('https://localhost:7116/api/Auth/login/Admin', {Name: this.username, Password: this.password},{observe: 'response', responseType: 'text'}).subscribe((response: any) => {
            console.log(response);
            console.log(response.body);
            if (response.status === 200) {
              localStorage.setItem('token', response.body);
              this.router.navigate(['admin-control']);
            } else {
              alert('Register failed');
            }
          })
            
       }
}
