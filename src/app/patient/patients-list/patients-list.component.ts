import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { PatientService } from '../../services/patient.service';
import { Patient } from '../../models/patient.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-patients-list',
  templateUrl: './patients-list.component.html',
  styleUrls: ['./patients-list.component.css']
})
export class PatientsListComponent implements OnInit {

  public modalRef?: BsModalRef;
  patients!: Patient[] | null;
  patient!: Patient ;
  currentIndex = -1;
  name: any;
  fileNo: any;
  phone: any;
  page = 1;
  count = 0;
  itemsPP : number = 3;
  pageSizes = [3, 5, 7];

  constructor(private modalService: BsModalService, public patientService: PatientService) {}

  pager: any = {};
  ngOnInit(): void {
    this.receivePatients();
  }

  selectPage(page: string) {
    this.page = parseInt(page, 10) || 1;
  }

  openAddPatientModal(addPatientTemplate: TemplateRef<any>) {
    this.modalRef = this.modalService.show(addPatientTemplate,
      {
        class: 'modal-dialogue-centered modal-md',
        backdrop: 'static',
        keyboard: true
      }
    );
  }

  search() {
    this.page = 1;
    this.receivePatients();
  }

  delete( id : string){
    let con=confirm("Are you sure to delete?");
      if (con) {
        this.patientService.deletePatient(id).subscribe({
          next: (v) => {},
          error: (e) => {
          },
          complete: () => {
            this.receivePatients();
          },
        });   
      }
  }
  openPatientDetailsModal(patientDetailsTemplate: TemplateRef<any>) {
    this.modalRef = this.modalService.show(patientDetailsTemplate,
      {
        class: 'modal-dialogue-centered modal-md',
        backdrop: 'static',
        keyboard: true,
      }
    );
  }
  clearSearch() {
    this.name = null;
    this.fileNo = null;
    this.phone = null;
    this.page = 1;
    this.receivePatients();
  }

  receivePatients() {
    this.patientService.getAllPatients(
      this.name,
      this.fileNo,
      this.phone,
      this.page,
      this.itemsPP
    )?.subscribe((response) => {
      this.patients = response.body;
      this.pager = JSON.parse(response.headers.get('X-pagermetadata') as string);
    });
    this.count = this.patientService.pager.TotalCount;
  }

  changePage(pageNo: number) {
    this.page = pageNo;
    this.receivePatients();
  }

}
