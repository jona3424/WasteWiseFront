import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapaComponent } from './mapa/mapa.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { BubbleComponent } from './bubble/bubble.component';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule  } from "@angular/material/form-field";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {MatPaginatorIntl, MatPaginatorModule} from '@angular/material/paginator';
import paginatorTranslations from "../paginator_translations";
import { MatButtonModule } from "@angular/material/button";

@NgModule({
  declarations: [
    AppComponent,
    MapaComponent,
    BubbleComponent,
  ],
  imports: [
    BrowserModule,
    GoogleMapsModule,
    AppRoutingModule,
    CanvasJSAngularChartsModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatButtonModule
  ],
  providers: [
    { 
      provide: MatPaginatorIntl, 
      useValue: paginatorTranslations
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
