import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.css']
})
export class MainContentComponent implements OnInit {

  constructor(
    private router: Router
  ) {
  }

  ngOnInit() {
    for (let i = 0; i < this.router.config.length; i++) {
      // const routePath: string = this.router.config[i].path;
      const route = this.router.config[i];
      // console.log(parent + '/' + route.path);
      if (route.children) {
        const currentPath = route.path ? parent + '/' + route.path : parent;
        console.log(currentPath, route.children);
      }
    }
  }

}
