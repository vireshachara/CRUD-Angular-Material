import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MatDialogRef } from '@angular/material/dialog';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
  freshnessList = ['Brand New', 'Second Hand', 'Refurbished'];

  productForm!: FormGroup;

  constructor(
    private formbuilder: FormBuilder,
    private api: ApiService,
    private dialogRef: MatDialogRef<DialogComponent>
  ) {}

  ngOnInit(): void {
    this.productForm = this.formbuilder.group({
      productName: ['', Validators.required],
      category: ['', Validators.required],
      freshness: ['', Validators.required],
      price: ['', Validators.required],
      comment: ['', Validators.required],
      date: ['', Validators.required],
    });
  }


  postProduct() {
    if (this.productForm.valid) {
      this.api.postProduct(this.productForm.value)
      .subscribe({
        next: (res) => {
          alert('Product Added Successfully');
          this.productForm.reset();
          // MatDialogRef import required 
          this.dialogRef.close('Save');
          console.log(this.productForm);
        },
        error: () => {
          alert('Error While adding the product');
          // MatDialogRef import required 
          this.dialogRef.close('close');
          this.productForm.reset();
        },
      });
    }
  }
}
