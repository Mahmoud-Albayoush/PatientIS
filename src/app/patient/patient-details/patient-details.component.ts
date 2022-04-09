import { Component, Input, NgZone, OnInit } from '@angular/core';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-patient-details',
  templateUrl: './patient-details.component.html',
  styleUrls: ['./patient-details.component.css']
})
export class PatientDetailsComponent implements OnInit {

  @Input() patient: any;

  private animationItem!: AnimationItem;
  constructor(private ngZone: NgZone) { }

  ngOnInit(): void {
  }

}