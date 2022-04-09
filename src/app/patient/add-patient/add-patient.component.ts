import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbModal, NgbModalConfig, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
//import { ToastrService } from 'ngx-toastr';
import { PatientService } from 'src/app/services/patient.service';
import { addPatient } from './add-patient.model';

@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.css'],
  providers: [NgbModalConfig, NgbModal,],
})
export class AddPatientComponent implements OnInit {

  addPatientModal!: NgbModalRef;
  constructor(Modalconfig: NgbModalConfig, private modalService: NgbModal, public patientService: PatientService, /*private toastr: ToastrService */) {
    Modalconfig.backdrop = 'static';
    Modalconfig.keyboard = false;
  }

  error!: string;
  @Output() refreshList = new EventEmitter();

  //initialize the add patient form
  addPatientFrom = new FormGroup({
    name: new FormControl(),
    gender: new FormControl(0, { initialValueIsDefault: true }),
    fileNo: new FormControl(0, { initialValueIsDefault: true }),
    firstVisitDate: new FormControl(this.formatDate(new Date()), {initialValueIsDefault: true,}),
    citizenId: new FormControl(),
    natinality: new FormControl(),
    birthdate: new FormControl(this.formatDate(new Date()), {initialValueIsDefault: true,}),
    phoneNumber: new FormControl(),
    email: new FormControl(),
    country: new FormControl(),
    city: new FormControl(),
    street: new FormControl(),
    address1: new FormControl(),
    address2: new FormControl(),
    contactPerson: new FormControl(),
    contactPhone: new FormControl(),
    contactRelation: new FormControl(),
  });
  formatDate(date: Date): string {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    let full = year + '-';
    if (month < 10) {
      full += '0' + month + '-';
    } else {
      full += month + '-';
    }
    if (day < 10) {
      full += '0' + day;
    } else {
      full += day;
    }
    return full;
  }

  //submit the add patient form
  addFromSubmit() {
    console.log(this.addPatientFrom.value as addPatient);
    this.patientService.addPatient(this.addPatientFrom.value as addPatient).subscribe({
      next: (v) => {},
      error: (e) => {
        this.error = 'Error in :\n';
        console.error(e.error.errors);

        for (let error in e.error.errors) {
          this.error += ' - ' + error + '\n';
        }
        /*this.toastr.error('', 'Error while create the patient', {
          timeOut: 3000,
        });*/
      },

      complete: () => {
        //this.toastr.success('Patient was created successfuly !');
        this.error = '';
        this.addPatientModal.close();
        this.refreshList.emit();
        this.addPatientFrom.reset();
      },
    });
  }

  open(content: any) {
    this.addPatientModal = this.modalService.open(content, {
      scrollable: true,
      size: 'lg',
    });
  }

  clearForm() {
    this.error = '';
    this.addPatientFrom.reset();
  }

  ngOnInit(): void {
  }

}