import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-provider',
  templateUrl: './add-provider.component.html',
  styleUrls: ['./add-provider.component.scss']
})
export class AddProviderComponent implements OnInit {
  public breakpoint!: number; 
  wasFormChanged = false;
  addProviderForm!: FormGroup;
  data: any;
  fname:string = '';
  lname:string = '';
  npi:string = '';
  phone:string = '';
  email:string = '';

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private dialogRef: MatDialogRef<AddProviderComponent>
  ) { }


  public ngOnInit(): void {
    this.addProviderForm = this.fb.group({
      firstname: [this.fname, [Validators.required, Validators.pattern('[a-zA-Z]+([a-zA-Z ]+)*')]],
      lastname: [ this.lname, [Validators.required, Validators.pattern('[a-zA-Z]+([a-zA-Z ]+)*')]],
      npi: [this.npi, [Validators.required, Validators.pattern('[0-9]+')]],
      email: [this.email, [Validators.required, Validators.email]],
      phone: [this.phone, [Validators.required, Validators.pattern('[- +()0-9]+')]],
    });
  }

  public onAddCus(): void {
    this.data = {
      'first_name': this.addProviderForm.get('firstname')?.value,
      'last_name': this.addProviderForm.get('lastname')?.value,
      'npi_number': this.addProviderForm.get('npi')?.value,
      'email': this.addProviderForm.get('email')?.value,
      'phone': this.addProviderForm.get('phone')?.value
    };
  }

  close(): void {
    

    this.dialogRef.close(this.data); //on close pass data to parent
   }

  formChanged() {
    this.wasFormChanged = true;
  }
}
