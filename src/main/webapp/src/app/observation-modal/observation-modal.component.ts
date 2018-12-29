import { Component, OnInit, Input } from '@angular/core';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-observation-modal',
  templateUrl: './observation-modal.component.html',
  styleUrls: ['./observation-modal.component.css']
})
export class ObservationModalComponent implements OnInit {

@Input() title = `Information`;

constructor(
    public activeModal: NgbActiveModal
  ) {}

  ngOnInit() {
  }

}
