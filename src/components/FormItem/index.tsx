import React, { CSSProperties } from "react";
import {
  Form as AntdForm,
  Input,
  Checkbox,
  Switch,
  InputNumber,
  Select,
  Radio,
  Row,
  Col,
} from "antd";
import { LabelTooltipType } from "antd/lib/form/FormItemLabel";
import { ColProps } from "antd/lib/grid/col";

const { Option } = Select;
export interface IOptionsProps {
  label: string;
  value: string | number;

  // 下拉选择框的label右侧提示
  labelTips?: string;
}

interface WrapperComponentProps {
  onChange: any;
  placeholder?: string;
  disabled?: boolean;
  autoComplete?: string;
  maxLength?: number;
  onPressEnter?: (e: any) => void;
}

// 去除输入框空格的高阶组件，可用于 Input 和 Texteare
const createNoSpace = (WrapperComponent: any) => {
  // eslint-disable-next-line react/display-name
  return ({
    onChange,
    placeholder,
    onPressEnter,
    disabled,
    maxLength,
    autoComplete,
    ...props
  }: WrapperComponentProps) => {
    const handleBlur = (e: React.FocusEvent<HTMLInputElement>): void => {
      e.target.value = e.target.value.trim();
      if (typeof onChange === "function") {
        onChange(e.target.value);
      }
    };
    return (
      <WrapperComponent
        {...props}
        placeholder={placeholder}
        disabled={disabled}
        maxLength={maxLength}
        autoComplete={autoComplete}
        onPressEnter={onPressEnter}
        onChange={onChange}
        onBlur={handleBlur}
      />
    );
  };
};

const NoSpaceInput = createNoSpace(Input);

interface FormItemComponentProps {
  type: string;
  placeholder?: string;
  disabled?: boolean;
  // input
  autoComplete?: string;
  // input.number
  min?: number;
  max?: number;
  // input.textarea
  rows?: number;
  maxLength?: number;
  // select
  mode?: "multiple" | "tags";
  options?: Array<IOptionsProps>;
  labelInValue?: boolean;
  onDropdownVisibleChange?: (e: any) => void;
  allowClear?: boolean;
  // radio
  radios?: Array<IOptionsProps>;
  optionType?: "default" | "button";
  // checkboxs
  checkboxs?: Array<IOptionsProps>;
  onChange?: (e: any) => void;
  // switch
  unCheckedChildren?: any;
  checkedChildren?: any;
  onPressEnter?: (e: any) => void;
}
export interface IFormItemProps extends FormItemComponentProps {
  label?: string;
  name: string;
  rules?: Array<any>;
  hide?: boolean;
  tooltip?: LabelTooltipType;
  wrapperCol?: ColProps;
  style?: CSSProperties;
  initialValue?: any;
  onChange?: (e: any) => void;
}

interface IFormProps {
  formItemArray: Array<IFormItemProps>;
}

export default function FormItem({ formItemArray }: IFormProps) {
  return (
    <>
      {formItemArray.map((formItem) => {
        const {
          hide,
          name,
          label,
          rules,
          type,
          tooltip,
          wrapperCol,
          style,
          initialValue,
          ...rest
        } = formItem;
        if (hide) {
          return null;
        }
        if (type === "title") {
          return (
            <h3 style={style} key={name}>
              {label}
            </h3>
          );
        } else {
          const {
            disabled,
            autoComplete = "off",
            mode,
            options,
            min,
            max,
            rows,
            maxLength,
            radios,
            optionType,
            checkboxs,
            placeholder,
            labelInValue,
            onChange,
            onDropdownVisibleChange,
            onPressEnter,
            allowClear,
            unCheckedChildren,
            checkedChildren,
            ...restProps
          } = rest;
          if (type === "switch") {
            return (
              <AntdForm.Item
                key={name}
                label={label}
                name={name}
                rules={rules}
                tooltip={tooltip}
                wrapperCol={wrapperCol}
                style={style}
                initialValue={initialValue}
                valuePropName="checked"
              >
                <Switch
                  disabled={disabled}
                  onChange={onChange}
                  checkedChildren={checkedChildren}
                  unCheckedChildren={unCheckedChildren}
                />
              </AntdForm.Item>
            );
          }
          return (
            <AntdForm.Item
              key={name}
              label={label}
              name={name}
              rules={rules}
              tooltip={tooltip}
              wrapperCol={wrapperCol}
              style={style}
              initialValue={initialValue}
            >
              {type === "input.password" ? (
                <Input.Password
                  placeholder={placeholder}
                  {...restProps}
                  disabled={disabled}
                  autoComplete={autoComplete}
                  onChange={onChange}
                />
              ) : type === "input.number" ? (
                <InputNumber
                  placeholder={placeholder}
                  {...restProps}
                  max={max}
                  min={min}
                  disabled={disabled}
                  autoComplete={autoComplete}
                  onChange={onChange}
                />
              ) : type === "input.textarea" ? (
                <Input.TextArea
                  placeholder={placeholder}
                  {...restProps}
                  disabled={disabled}
                  maxLength={maxLength}
                  rows={rows}
                  autoComplete={autoComplete}
                  onChange={onChange}
                />
              ) : type === "select" ? (
                <Select
                  mode={mode}
                  allowClear={allowClear}
                  placeholder={placeholder}
                  disabled={disabled}
                  onChange={onChange}
                  labelInValue={labelInValue}
                  onDropdownVisibleChange={onDropdownVisibleChange}
                >
                  {options &&
                    options.map((option) => (
                      <Option key={option.value} value={option.value}>
                        {option.labelTips ? (
                          <div className="form-select-label">
                            <span>{option.label}</span>
                            <span className="gray">{option.labelTips}</span>
                          </div>
                        ) : (
                          option.label
                        )}
                      </Option>
                    ))}
                </Select>
              ) : type === "checkbox" ? (
                <Checkbox.Group disabled={disabled} onChange={onChange}>
                  <Row>
                    {checkboxs &&
                      checkboxs.map((option) => (
                        <Col key={option.value} span={8}>
                          <Checkbox
                            value={option.value}
                            style={{ lineHeight: "32px" }}
                          >
                            {option.label}
                          </Checkbox>
                        </Col>
                      ))}
                  </Row>
                </Checkbox.Group>
              ) : type === "radio" ? (
                <Radio.Group disabled={disabled} onChange={onChange}>
                  {radios &&
                    radios.map((option) =>
                      optionType && optionType === "button" ? (
                        <Radio.Button key={option.value} value={option.value}>
                          {option.label}
                        </Radio.Button>
                      ) : (
                        <Radio key={option.value} value={option.value}>
                          {option.label}
                        </Radio>
                      )
                    )}
                </Radio.Group>
              ) : (
                <NoSpaceInput
                  placeholder={placeholder}
                  disabled={disabled}
                  maxLength={maxLength}
                  autoComplete={autoComplete}
                  onChange={onChange}
                  onPressEnter={onPressEnter}
                  {...restProps}
                />
              )}
            </AntdForm.Item>
          );
        }
      })}
    </>
  );
}
