import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Patient } from '../models/patient.model';
import { addPatient } from '../patient/add-patient/add-patient.model';
import { updatePatient } from '../patient/update-patient/update-patient.model';

const endpoint = 'https://localhost:44374/api/PatintIS';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  pager: any = {};
  headerProps : any;
  
  constructor(private http: HttpClient) { }

  getAllPatients(Name: any = null, FileNo: any = null, PhoneNumber: any = null, Page = 1, PageSize = 5){
    let geturl = endpoint + '/all' + '?';
    geturl += 'pageSize=' + PageSize;

    geturl += '&Page=' + Page;

    if (Name != null) {
      geturl += '&name=' + Name;
    }
    if (FileNo != null) {
      geturl += '&File=' + FileNo;
    }
    if (PhoneNumber != null) {
      geturl += '&Phone=' + PhoneNumber;
    }
      
      
    return this.http.get<Patient[]>(geturl, { observe: 'response' });;
  }

  
  addPatient(p: addPatient) {
    return this.http.post(endpoint, p);
  }
  
  updatePatient(p: updatePatient) {
    return this.http.put(endpoint, p);
  }

  deletePatient(id: string) {
    return this.http.delete(endpoint + '/' + id);
  }
  
}
