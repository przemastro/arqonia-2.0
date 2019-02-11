import { Component, OnInit } from '@angular/core';

declare var $:any;

@Component({
selector: 'app-home',
templateUrl: './home.component.html',
styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

constructor() { }

ngOnInit(){
    var $polystar = $('.polystar');

    $polystar.on('mouseenter focus', function() {
      $polystar.get(0).currentTime = 0;
      $polystar.get(0).play();
      $polystar.prop('muted', true);
    });

    $polystar.on('mouseout blur', function() {
      $polystar.get(0).currentTime = 0;
      $polystar.get(0).pause();
      $polystar.prop('muted', true)
      $polystar.get(0).load();
    });
  }

}
