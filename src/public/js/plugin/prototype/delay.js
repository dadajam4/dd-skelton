export default function delay(ammount) {
  let canceled  = false,
      canceller = () => { canceled = true };

  let promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!this._isDestroyed && !canceled) resolve();
      promise = null;
    }, ammount);
  });

  promise.cancel = canceller;

  return promise;
}