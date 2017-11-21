export class Donate {

  amount = 5;
  methods = ['Cash', 'PayPal'];
  selectedMethod = 'Cash';

  makeDonation() {
    console.log(`Amount = ${this.amount}`);
    console.log(`Method = ${this.selectedMethod}`);
  }
}
