interface EventsInterface  { [key: string]: any };

export const GlobalEventEmitter = {
  _events: {} as EventsInterface,
  dispatch(event: Events, data: any) {
    if (!this._events[event]) return;
    this._events[event].forEach((callback: any) => callback(data))
  },
  subscribe(event: Events, callback: (data: any) => any) {
    if (!this._events[event]) this._events[event] = [];
    this._events[event].push(callback);
  },
  unsubscribe(event: Events) {
    if (!this._events[event]) return;
    delete this._events[event];
  }
};

export enum Events {
  SET_PROGRESS = 'SET_PROGRESS'
};