


class Loan {
  constructor(loan) {
    console.log(loan);
    this.interest_rate = loan.interest_rate;
    this.id = loan.id;
    this.amount = loan.amount;
    this.default_likelihood = loan.default_likelihood;
    this.state = loan.state;
  }
}
