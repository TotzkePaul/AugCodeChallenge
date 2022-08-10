import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule  } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from "@angular/material/form-field";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddProviderComponent } from './add-provider/add-provider.component';

@NgModule({
  declarations: [
    AppComponent,
    AddProviderComponent
  ],
  imports: [ BrowserModule, FormsModule, MatInputModule, MatDialogModule, MatGridListModule, MatFormFieldModule, BrowserAnimationsModule, MatTableModule, FormsModule, ReactiveFormsModule, AppRoutingModule ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
