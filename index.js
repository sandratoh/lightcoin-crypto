let balance = 500.00;

class Transcation {
  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }

  commit() {
    this.account.balance += this.value;
  }
}

class Withdrawal extends Transcation {
  get value() {
    return -this.amount;
  }
  // commit() {
  //   this.account.balance -= this.amount;
  // }

}

class Deposit extends Transcation {
  get value() {
    return this.amount;
  }
  // commit() {
  //   this.account.balance += this.amount;
  // }
}

class Account {
  constructor(username) {
    this.username = username;
    // Have the account balance start at $0 since that makes more sense.
    this.balance = 0;
  }
}

// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected

const myAccount = new Account('snow-patrol');

// Concept: Dependency Injection
// passing an object the things it needs,
// rather than having the object access them itself
let t1 = new Withdrawal(50.25, myAccount);
t1.value;
// t1.commit();
console.log('Transaction 1:', t1);

let t2 = new Withdrawal(9.99, myAccount);
t2.value;
// t2.commit();
console.log('Transaction 2:', t2);


let t3 = new Deposit(120.00, myAccount);
t3.value;
// t3.commit();
console.log('Transcation 3:', t3);

console.log('Balance:', myAccount.balance);
