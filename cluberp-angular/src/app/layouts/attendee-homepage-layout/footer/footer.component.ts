import {Component, OnInit} from '@angular/core';
import {ConfigurationService} from '../../../core/services/dashboard/configuration.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  configList: any;

  constructor(
    private configService: ConfigurationService
  ) {
  }

  ngOnInit() {
    this.configService.getConfigurationKeyValuePairs().subscribe(response => {
      this.configList = response['data'];

    });
  }

  openExternalLink(url) {
    window.open(url, '_blank');
  }
}
