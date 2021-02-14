let balance = 500.00;

class Transcation {
  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }

  // isAllowed() {
  //   if (this.balance > 0 && Withdrawal.amount < this.balance) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }

  commit() {
    if (!this.isAllowed()) {
      return false;
    } else {
      // Keep track of the time of the transcation
      this.time = new Date();
      // Add the transcation to the account
      this.account.addTranscation(this);
      // this.account.balance += this.value; // old code
      return true;
    }
  }
}

class Withdrawal extends Transcation {
  get value() {
    return -this.amount;
  }

  isAllowed() {
    // note how it has access to this.account b/c of parents
    return (this.account.balance - this.amount >= 0);
  }
  // commit() {
  //   this.account.balance -= this.amount;
  // }

}

class Deposit extends Transcation {
  get value() {
    return this.amount;
  }

  isAllowed() {
    // deposit is always allowed thanks to capitalism
    return true;
  }
  // commit() {
  //   this.account.balance += this.amount;
  // }
}

class Account {
  constructor(username) {
    this.username = username;
    // Have the account balance start at $0 since that makes more sense.
    this.transcations = [];
  }

  get balance() {
    // Calculate the balance using the transcation objects
    let balance = 0;
    for (let t of this.transcations) {
      console.log(t.value);
      balance += t.value;
    }
    return balance;
  }

  addTranscation(transcation) {
    this.transcations.push(transcation);
  }
}

// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected

const myAccount = new Account('snow-patrol');

console.log('Starting Account Balance: ', myAccount.balance);

// Concept: Dependency Injection
// passing an object the things it needs,
// rather than having the object access them itself
console.log('Attempting to withdraw $50 should fail...');
let t1 = new Withdrawal(50, myAccount);
// t1.value; /// -50.25
console.log('Commit result: ', t1.commit());
// console.log('Transaction 1:', t1);
console.log('Account Balance: ', myAccount.balance);


console.log('Depositing should succeed...');
let t2 = new Deposit(9.99, myAccount);
console.log('Commit result: ', t2.commit());
console.log('Account Balance: ', myAccount.balance);

console.log('Withdrawal for $6.99 should be allowed now...');
let t3 = new Withdrawal(6.99, myAccount);
console.log('Commit result: ', t3.commit());
console.log('Account Balance: ', myAccount.balance);

console.log('Ending Account Balance:', myAccount.balance);
console.log('Looks like I\'m broke again');
