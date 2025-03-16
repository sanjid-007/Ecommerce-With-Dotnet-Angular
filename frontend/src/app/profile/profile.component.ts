import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  passwordForm: FormGroup;
  isProfileUpdated = false;
  isPasswordChanged = false;
  username: string = '';
  editMode = false;
  private apiUrl = 'http://localhost:7116/api/profile';

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private fb: FormBuilder
  ) {
    this.profileForm = this.fb.group({
      name: [{ value: '', disabled: true }],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      phone: ['', Validators.required],
    });

    this.passwordForm = this.fb.group({
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.username = params['username'];
      console.log(this.username);
      this.loadProfile();
    });
  }

  loadProfile() {
    this.http.get(`${this.apiUrl}/${this.username}`).subscribe((data: any) => {
      this.profileForm.patchValue(data);
    });
  }

  updateProfile() {
    alert('Updated profile successfully!');
  }
  



  toggleEditMode() {
    this.editMode = !this.editMode;
  }
}
