import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-spinner-overlay',
  templateUrl: './spinner-overlay.component.html',
  styleUrls: ['./spinner-overlay.component.css']
})
export class SpinnerOverlayComponent implements OnInit {

  @Input() isLoading = false;

  constructor() {
  }

  public ngOnInit(): void {
  }

}
