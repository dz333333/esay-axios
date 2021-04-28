export default class Interceptor {
  constructor() {
    this.handlers = [];
  }
  use(fulfilled, rejected) {
    this.handlers.push({
      fulfilled: fulfilled,
      rejected: rejected,
    });
    return this.handlers.length - 1;
  }
}
