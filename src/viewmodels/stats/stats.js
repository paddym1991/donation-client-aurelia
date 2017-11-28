/**
 * This is a revised implementation of stats.js, which handles the attached event.
 * This is triggered when the component becomes active.
 * We retrieve the current value from the donation-service at this this point.
 * In particular, the attached event/method.
 */
import {inject} from 'aurelia-framework';
import {TotalUpdate} from '../../services/messages';
import {EventAggregator} from 'aurelia-event-aggregator';
import DonationService from '../../services/donation-service';

@inject(EventAggregator, DonationService)
export class Stats {

  total = 0;

  constructor(ea, ds) {
    this.ds = ds;
    ea.subscribe(TotalUpdate, msg => {
      this.total = msg.total;
    });
  }

  attached() {
    this.total = this.ds.total;
  }
}
