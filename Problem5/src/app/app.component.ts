import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AddProviderComponent } from './add-provider/add-provider.component';

export interface Provider {
  first_name: string;
  last_name: string;
  npi_number: string;
  phone: string;
  email: string;
}

const PROVIDER_DATA: Provider[] = [
  {first_name: 'Jenny', last_name: 'Doe', npi_number: '1234567890', phone: "1-555-867-5309", email: 'jane.doe@example.com' },
  {first_name: 'John', last_name: 'Doe', npi_number: '0123456789', phone: "1-555-649-2568", email: 'john.doe@example.com' }
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'provider-registration';
  displayedColumns: string[] = ['first_name', 'last_name', 'npi_number', 'phone', 'email'];
  dataSource = PROVIDER_DATA;
  addedProvider: any;



  constructor(
    public dialog: MatDialog
  ) { }


  public ngOnInit(): void {

  }

  openAddModal(): void {
    const dialogRef = this.dialog.open(AddProviderComponent, {
      width: '340px',
    });

    dialogRef.afterClosed().subscribe(res => {
      console.log("value from dialog",res) //data from dialog
          this.addedProvider = res;
          let provider = res as Provider;
          this.dataSource = [...this.dataSource, provider];
          });
  }

}
