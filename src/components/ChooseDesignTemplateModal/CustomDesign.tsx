import CustomSizeDesign from '@/components/ChooseDesignTemplateModal/DesignType/CustomSize';

export enum DesignType {
  CUSTOM_SIZE = 'CUSTOM_SIZE',
}

type Props = {
  type?: DesignType;
};

const CustomDesign = ({ type = DesignType.CUSTOM_SIZE }: Props) => {
  const designType = {
    [DesignType.CUSTOM_SIZE]: <CustomSizeDesign />,
  };

  return designType[type] ?? <></>;
};

export default CustomDesign;
