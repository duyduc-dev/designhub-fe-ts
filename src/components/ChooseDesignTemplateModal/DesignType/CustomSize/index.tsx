import { observer } from 'mobx-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import AppDropdown from '@/components/Dropdown';
import AppInput from '@/components/Input';
import AppInputLabel from '@/components/Input/InputLabel';
import toaster, { ToastId, ToastType } from '@/components/Toast/toaster';
import { AppRoutes } from '@/constants/index.ts';
import designApi from '@/services/design.ts';
import designStore from '@/stores/design/DesignStore';
import { dynamicRoute, sleep } from '@/utils/helpers.ts';

import style from './style.module.scss';
import { DesignSizeUnit } from '@/services/type/design.ts';
import AppButton from '@/components/Button';
import { HttpResponse } from '@/http/type.ts';

const CustomSizeDesign = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const [data, setData] = useState({
    width: 0,
    height: 0,
    unit: DesignSizeUnit.PIXEL,
  });

  const handleClickCreateDesign = async () => {
    let toastId: ToastId = -1;
    try {
      const { remove, id } = toaster({
        title: t`loading`,
        message: t`creatingNewDesign`,
        type: ToastType.LOADING,
      });
      toastId = id;
      await sleep(1000);
      const res = await designApi.createDesign(data);
      remove();
      toaster({
        title: t`designCreated`,
        message: t`letStartYourNewDesign`,
      });
      navigate(dynamicRoute(AppRoutes.DESIGN, { id: res?.id }));
    } catch (e) {
      toaster.close(toastId);
      toaster.catchError(e as HttpResponse);
    }
  };

  return (
    <div className={style.container}>
      <span className={style.label}>{t`customSize`}</span>
      <div className={style.content}>
        <div className={style.formControl}>
          <div className={style.wrapFormInput}>
            <AppInputLabel>{t`width`}</AppInputLabel>
            <AppInput
              fullWidth
              type="number"
              onChange={(e) =>
                setData((prev) => ({ ...prev, width: Number(e.target.value) }))
              }
              inputMode="numeric"
            />
          </div>
          <div className={style.wrapFormInput}>
            <AppInputLabel>{t`height`}</AppInputLabel>
            <AppInput
              fullWidth
              type="number"
              onChange={(e) =>
                setData((prev) => ({ ...prev, height: Number(e.target.value) }))
              }
            />
          </div>
          <div className={style.wrapFormInput}>
            <AppInputLabel>{t`units`}</AppInputLabel>
            <AppDropdown
              fullWidth
              placeholder="Choose units"
              showIconSelected
              value={designStore.unit}
              onSelectValue={(value) =>
                setData((prev) => ({
                  ...prev,
                  unit: (value as DesignSizeUnit) || DesignSizeUnit.PIXEL,
                }))
              }
              labelField="title"
              valueField="value"
              options={[
                { id: 'px', title: 'px', value: DesignSizeUnit.PIXEL },
                { id: 'in', title: 'in', value: DesignSizeUnit.INCHES },
                { id: 'mm', title: 'mm', value: DesignSizeUnit.MILLIMETER },
                { id: 'cm', title: 'cm', value: DesignSizeUnit.CENTIMETER },
              ]}
            />
          </div>
        </div>
      </div>
      <AppButton
        onClick={handleClickCreateDesign}
        className={style.btnCreateNewDesign}
        size="large"
        disabled={!data.width || !data.height}
        fullWidth
      >
        {t`createNewDesign`}
      </AppButton>
    </div>
  );
};

export default observer(CustomSizeDesign);
