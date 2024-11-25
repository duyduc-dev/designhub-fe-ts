import AbstractEventHandler from '@/events/AbstractEventHandler.ts';
import { SidebarType } from '@/layouts/DesignLayout/partials/ToolSidebarDesign';

class DesignSidebarTypeEvent extends AbstractEventHandler<
  SidebarType | undefined,
  SidebarType | undefined
> {
  protected getEventKey(): string {
    return 'DesignSidebarTypeEvent:type';
  }

  protected handler(data: SidebarType | undefined): SidebarType | undefined {
    return data;
  }
}

export default new DesignSidebarTypeEvent();
