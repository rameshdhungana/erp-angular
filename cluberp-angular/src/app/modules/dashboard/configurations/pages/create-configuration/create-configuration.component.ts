import {Component, OnInit} from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-create-configuration',
  templateUrl: './create-configuration.component.html',
  styleUrls: ['./create-configuration.component.css']
})
export class CreateConfigurationComponent implements OnInit {
  public Editor = ClassicEditor;

  constructor() {
  }

  ngOnInit() {
  }
}
