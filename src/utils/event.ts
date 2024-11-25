export const EventKeys = {
  PAGE_SCROLLING: 'MAIN_PAGE_SCROLLING',
};

class EventHelperUtil {
  dispatch<T = unknown>(key: string, detail: T) {
    window.dispatchEvent(new CustomEvent(key, { detail }));
  }

  subscriber<T>(key: string, handler: ({ detail }: { detail: T }) => any) {
    window.addEventListener(key, handler as any);

    return () => this.remove(key, handler);
  }

  remove(key: string, handler: any) {
    window.removeEventListener(key, handler);
  }
}
const EventHelper = new EventHelperUtil();
export default EventHelper;
