import { Component, OnInit, Input} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-crumb',
  templateUrl: './crumb.component.html',
  styleUrls: ['./crumb.component.css']
})
export class CrumbComponent implements OnInit {

  @Input() url;

  data;

  constructor(private routeInfo: ActivatedRoute) { }

  ngOnInit() {
    // console.log(this.data)
    if (this.url) {
      this.data = this.url
    } else {
      this.data = this.routeInfo.snapshot.data.breadcrumb;
    }
  }

}
