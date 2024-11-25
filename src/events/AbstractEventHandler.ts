import EventHelper from '@/utils/event.ts';

export type EventListenerCallback<T> = (data: T) => void;

export default abstract class AbstractEventHandler<D, T> {
  protected abstract getEventKey(): string;
  protected abstract handler(data: D): T;
  latestData: T | null = null;

  public dispatch(data: D): void {
    this.latestData = this.handler(data);
    EventHelper.dispatch(this.getEventKey(), this.latestData);
  }

  public dispatchIdle(data: D): void {
    requestIdleCallback(() => this.dispatch(data));
  }

  public listener(callback: EventListenerCallback<T>) {
    return EventHelper.subscriber<T>(this.getEventKey(), ({ detail }) =>
      callback(detail),
    );
  }
}
