import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css']
})
export class SearchFormComponent {

  model = new Search('star');

  submitted = false;
  @Output() messageEvent = new EventEmitter<string>();

  onSubmit() {
    this.submitted = true;
    console.log(JSON.stringify(this.model));
    this.messageEvent.emit(this.model.name)
  }

  showFormControls(form: any) {
    return form && form.controls['name'] &&
    form.controls['name'].value;
  }
}

export class Search {
  constructor(
    public name: string
  ) {  }
}
