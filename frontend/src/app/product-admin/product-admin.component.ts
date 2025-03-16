import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-product-admin',
  templateUrl: './product-admin.component.html',
  styleUrls: ['./product-admin.component.css'], 
})
export class ProductAdminComponent {
  product = {
    name: '',
    categoryName: '',
    price: '',
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
    formData.append('name', this.product.name);
    formData.append('categoryName', this.product.categoryName);
    formData.append('price', this.product.price);
    formData.append('image', this.selectedFile);

    
    this.http.post('https://localhost:7116/api/Product', formData).subscribe({
      next: () => {
        alert('Product added successfully!');
        this.resetForm();
      },
      error: (err) => console.error('Error:', err),
    });
  }

  
  private resetForm(): void {
    this.product = { name: '', categoryName: '', price: '' };
    this.selectedFile = null;
    const fileInput = document.getElementById('image') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  }
}
