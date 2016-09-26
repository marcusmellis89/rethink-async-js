# Instructions

Create a promise that after a delay of 300ms, rejects with an Error object.
The Error object should be constructed with parameter 'REJECTED!', which is
the textual message of the error.

Create a function onReject to print error.message using console.log. Pass
this function as a rejection handler to the then method of your promise.

## Hint

As a review from last lesson, a promise's then function takes two callbacks:
the first to be called when the promise is fulfilled and the second when the
promise is rejected.
