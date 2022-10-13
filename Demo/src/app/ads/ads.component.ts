import { Component, Input } from '@angular/core';
import { AdvComponent } from '../ad/adv.component';

@Component({
  selector: 'app-ads',
  templateUrl: './ads.component.html',
  styleUrls: ['./ads.component.css']
})
export class AdsComponent implements AdvComponent {

  @Input() data: any;

}
