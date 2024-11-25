import { useTranslation } from 'react-i18next';

import AppTextarea from '@/components/Input/AppTextarea.tsx';
import SidebarWrapper from '@/layouts/DesignLayout/partials/SidebarWrapper';
import designStore from '@/stores/design/DesignStore.ts';

const SidebarTextEditableShape = () => {
  const { t } = useTranslation();
  return (
    <SidebarWrapper label={t`textEditable`} showIconClose>
      <AppTextarea
        defaultValue={designStore.shapeSelected?.text}
        onChange={(e) => {
          if (designStore.shapeSelected) {
            designStore.shapeSelected.text = e.target.value;
          }
        }}
      />
    </SidebarWrapper>
  );
};

export default SidebarTextEditableShape;
