import {inject} from 'aurelia-framework';
import Fixtures from './fixtures';
import {TotalUpdate, LoginStatus} from './messages';
import {EventAggregator} from 'aurelia-event-aggregator';
import AsyncHttpClient from './async-http-client';

@inject(Fixtures, EventAggregator, AsyncHttpClient)
export default class DonationService {

  donations = [];
  methods = [];
  candidates = [];
  users = [];
  total = 0;

  /**
   * First modify the constructor to load the async-client we have just introduced + remove the loading of data from the fixtures
   * @param data
   * @param ea
   * @param ac
   */
  constructor(data, ea, ac) {
    this.methods = data.methods;
    this.ea = ea;
    this.ac = ac;
    this.getCandidates();
    this.getUsers();
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

  register(firstName, lastName, email, password) {
    const newUser = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password
    };
    this.users[email] = newUser;
  }

  /**
   * the login method no longer returns a success object - but publish as equivalent LoginStatus object on the event system.
   * authenticate using the retrieved users list.
   * @param email
   * @param password
   */
  login(email, password) {
    const status = {
      success: false,
      message: 'Login Attempt Failed'
    };
    for (let user of this.users) {
      if (user.email === email && user.password === password) {
        status.success = true;
        status.message = 'logged in';
      }
    }
    this.ea.publish(new LoginStatus(status));
  }

  /**
   * a new logout method, which also publishes an appropriate event.
   */
  logout() {
    const status = {
      success: false,
      message: ''
    };
    this.ea.publish(new LoginStatus(status));
  }

  /**
   * This will retrieve the candidates list from donation-web
   */
  getCandidates() {
    this.ac.get('/api/candidates').then(res => {
      this.candidates = res.content;
    });
  }

  /**
   * These will retrieve the users list from donation-web
   */
  getUsers() {
    this.ac.get('/api/users').then(res => {
      this.users = res.content;
    });
  }
}
