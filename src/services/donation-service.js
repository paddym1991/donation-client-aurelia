export default class DonationService {

  donations = [];
  methods = ['Cash', 'PayPal'];

  candidates = [
    {
      firstName: 'Lisa',
      lastName: 'Simpson'
    },
    {
      firstName: 'Bart',
      lastName: 'Simpson'
    }
  ];
  selectedCandidate = this.candidates[0];

  donate(amount, method, candidate) {
    let donation = {
      amount: amount,
      method: method,
      candidate: candidate
    };
    this.donations.push(donation);
    console.log(amount + ' donated to ' + candidate.firstName + ' ' + candidate.lastName + ': ' + method);
  }
}
