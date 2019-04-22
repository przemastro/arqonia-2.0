import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NewObservationModalComponent } from '../new-observation-modal/new-observation-modal.component';
import { EditObservationModalComponent } from '../edit-observation-modal/edit-observation-modal.component';
import { RemoveObservationModalComponent } from '../remove-observation-modal/remove-observation-modal.component';
import { TimeSeriesModalComponent } from '../time-series-modal/time-series-modal.component';

import { NgModule } from '@angular/core';


@Component({
selector: 'app-observations',
templateUrl: './observations.component.html',
styleUrls: ['./observations.component.css']
})
export class ObservationsComponent {

constructor(private modalService: NgbModal) {}

observations = [
{ObjectName: 'Aldebaran', Date: '2016-12-12 00:00:00',
Observation: 'True', Owner: 'Jonh J. Rambo'}];
headObservations = ['Object Name', 'Date', 'Time Series', 'Owner'];

openNewObservation() {
    const modalRef = this.modalService.open(NewObservationModalComponent);
    modalRef.componentInstance.title = 'NewObservation';
  }

editObservation() {
    const modalRef = this.modalService.open(EditObservationModalComponent);
    modalRef.componentInstance.title = 'EditObservation';
  }

removeObservation() {
    const modalRef = this.modalService.open(RemoveObservationModalComponent);
    modalRef.componentInstance.title = 'RemoveObservation';
  }

editTimeSeries() {
    const modalRef = this.modalService.open(TimeSeriesModalComponent);
    modalRef.componentInstance.title = 'EditTimeSeries';
  }
}
