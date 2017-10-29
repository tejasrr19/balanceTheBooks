# balanceTheBooks
Balance the Loan Books

## Setup and Run

```
$ git clone https://github.com/tejasrr19/balanceTheBooks.git
$ npm install
$ node app.js {param} // parameter can be either "small" or "large" based on the dataset you want to use.
```

> <b>NOTE</b>: This project uses ES7's Async/Await and hence requires Node version of 7.6.0 or above.

## Output

The `assignments.csv` and `yields.csv` are created in the `out` directory.

## Responses

1. I spent roughly around 4 hours to complete the assignment. The hardest part was implementing the facility matching for a given loan based on best yield.

2. I will have to update the facility datastore to highlight these new restrictions and change the loan matching algorithm to include these additional constraints.

3. 

4. The REST API to receive new Loans would include an endpoint wherein it can accept POST requests with the new loan information, assign it an id and run the matching algorithm accordingly. An Example,

```
POST /loan
{
  interest_rate: 
  amount:
  default_likelihood:
  state:
}
```

5. I would read a certain set of data records from the CSV and store them in memory and assign them to facilities as required. Since I have written this solution using NodeJS, the batch of loans are still going to be iterated over and assigned to facilities one after the other.

6. With the same interest rate, we can break the tie if we consider more constraints on the facility such as the same state or the geographically closest state of the bank gets the business. We can also consider the difference in default likelihood as another option to break the tie.

## TODO

* Data structures for bank and covenants can be changed to optimize the algorithm. Currently, these use Arrays(Θ(n)) instead of hashtables that can give us Θ(1) on searches.
* Add more comments.
* Write some unit tests.
* Dockerize for easier environment setup.
