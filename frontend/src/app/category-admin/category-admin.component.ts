import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-category-admin',
  templateUrl: './category-admin.component.html',
  styleUrl: './category-admin.component.css'
})
export class CategoryAdminComponent {
  category = {
      name: '',
      description: '',
      
    };
    selectedFile: File | null = null; 
  
    constructor(private http: HttpClient) {}
  
   
    onFileSelected(event: any): void {
      this.selectedFile = event.target.files[0];
    }
  
   
    onSubmit(): void {
      if (!this.selectedFile) {
        alert('Please select an image.');
        return;
      }
      const formData = new FormData();
      formData.append('name', this.category.name);
      formData.append('description', this.category.description);
      formData.append('image', this.selectedFile);
  
      
      this.http.post('https://localhost:7116/api/Category', formData).subscribe({
        next: () => {
          alert('Category added successfully!');
          this.resetForm();
        },
        error: (err) => console.error('Error:', err),
      });
    }
  
    
    private resetForm(): void {
      this.category = { name: '',description: '' };
      this.selectedFile = null;
      const fileInput = document.getElementById('image') as HTMLInputElement;
      if (fileInput) {
        fileInput.value = '';
      }
    }
}
