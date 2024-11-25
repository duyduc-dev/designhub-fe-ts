import AbstractEventHandler from '@/events/AbstractEventHandler.ts';

class DesignRemoveShapeEvent extends AbstractEventHandler<string, string> {
  protected getEventKey(): string {
    return 'DesignRemoveShapeEvent:remove';
  }

  protected handler(data: string): string {
    return data;
  }
}

export default new DesignRemoveShapeEvent();
