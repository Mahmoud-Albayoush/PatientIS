import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { PatientsListComponent } from './patient/patients-list/patients-list.component';
import { ModalModule,BsModalService } from 'ngx-bootstrap/modal';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { NotFoundComponent } from './not-found/not-found.component';
import { HttpClientModule } from '@angular/common/http';
import {NgbPaginationModule, NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {ClipboardModule} from '@angular/cdk/clipboard';
import { LottieModule, LottieCacheModule } from 'ngx-lottie';
import { PatientDetailsComponent } from './patient/patient-details/patient-details.component';
import { AddPatientComponent } from './patient/add-patient/add-patient.component';
import { UpdatePatientComponent } from './patient/update-patient/update-patient.component';
import { DeletePatientComponent } from './patient/delete-patient/delete-patient.component';

export function playerFactory() {
  return import('lottie-web');
} 

@NgModule({
  declarations: [
    AppComponent,
    PatientsListComponent,
    NotFoundComponent,
    PatientDetailsComponent,
    AddPatientComponent,
    UpdatePatientComponent,
    DeletePatientComponent
  ],
  imports: [
    RouterModule.forRoot([
      /*
      {path: 'add-patient', component: AddPatientComponent},
      {path: 'update-patient', component: UpdatePatientComponent},
      */
      {path: 'patients-list', component: PatientsListComponent},
      {path: 'patient-details', component: PatientDetailsComponent},
      {path: '', redirectTo: '/patients-list', pathMatch: 'full'},
      {path: '**', component: NotFoundComponent},
    ]),
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatToolbarModule,
    MatIconModule,
    FormsModule,
    HttpClientModule,
    NgbPaginationModule,
    NgbAlertModule,
    ClipboardModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    LottieModule.forRoot({ player: playerFactory }),
    LottieCacheModule.forRoot(),
    NgbModule,
  ],
  providers: [BsModalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
