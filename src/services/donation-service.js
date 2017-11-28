import {inject} from 'aurelia-framework';
import Fixtures from './fixtures';
import {TotalUpdate} from './messages';
import {EventAggregator} from 'aurelia-event-aggregator';

@inject(Fixtures, EventAggregator)
export default class DonationService {

  donations = [];
  methods = [];
  candidates = [];
  total = 0;
  users = [];

  constructor(data, ea) {
    this.users = data.users;
    this.donations = data.donations;
    this.candidates = data.candidates;
    this.methods = data.methods;
    this.ea = ea;
  }

  donate(amount, method, candidate) {
    const donation = {
      amount: amount,
      method: method,
      candidate: candidate
    };
    this.donations.push(donation);
    console.log(amount + ' donated to ' + candidate.firstName + ' ' + candidate.lastName + ': ' + method);

    this.total = this.total + parseInt(amount, 10);
    console.log('Total so far ' + this.total);
    this.ea.publish(new TotalUpdate(this.total));
  }

  addCandidate(firstName, lastName, office) {
    const candidate = {
      firstName: firstName,
      lastName: lastName,
      office: office
    };
    this.candidates.push(candidate);
  }

  login(email, password) {
    const status = {
      success: false,
      message: ''
    };

    if (this.users[email]) {
      if (this.users[email].password === password) {
        status.success = true;
        status.message = 'logged in';
      } else {
        status.message = 'Incorrect password';
      }
    } else {
      status.message = 'Unknown user';
    }

    return status;
  }
}
