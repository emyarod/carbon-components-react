import React from 'react';
import { settings } from 'carbon-components';
import { iconCloseSolid, iconCheckmarkSolid } from 'carbon-icons';
import { shallow, mount } from 'enzyme';
import FileUploadStatus from './FileUploadStatus';
import CloseFilled16 from '@carbon/icons-react/lib/close--filled/16';
import CheckmarkFilled16 from '@carbon/icons-react/lib/checkmark--filled/16';
import Icon from '../Icon';
import { componentsX } from '../../internal/FeatureFlags';

const { prefix } = settings;
const rand3 = () => {
  const n = Math.random();
  switch (n) {
    case n < 0.33:
      return 0;
    case 0.33 < n < 0.66:
      return 1;
    default:
      return 2;
  }
};

const possibleProps = {
  classNames: ['bx--loading', 'bx--file-close', 'bx--file-complete'],
  icons: [
    <div
      className={`${prefix}--loading`}
      style={{ width: '1rem', height: '1rem' }}>
      <svg className={`${prefix}--loading__svg`} viewBox="-42 -42 84 84">
        <circle cx="0" cy="0" r="37.5" />
      </svg>
    </div>,
    componentsX ? CloseFilled16 : iconCloseSolid,
    componentsX ? CheckmarkFilled16 : iconCheckmarkSolid,
  ],
  statuses: ['uploading', 'edit', 'complete'],
};

describe('FileUploadStatus', () => {
  describe('Renders as expected', () => {
    const n = rand3();
    const element = (
      <FileUploadStatus
        iconDescription="Upload complete"
        status={possibleProps.statuses[n]}
      />
    );
    const shallowWrapper = shallow(element);

    it('renders upload status icon as expected', () => {
      expect(shallowWrapper.length).toBe(1);
      switch (n) {
        case 0:
          expect(shallowWrapper.find(`div.${prefix}--loading`).length).toBe(1);
          break;
        case 1:
          expect(
            shallowWrapper.find(componentsX ? CloseFilled16 : Icon).length
          ).toBe(1);
          break;
        case 2:
          expect(
            shallowWrapper.find(componentsX ? CheckmarkFilled16 : Icon).length
          ).toBe(1);
          break;
        default:
          break;
      }
    });

    it('has the expected classes', () => {
      expect(possibleProps.classNames).toContain(
        shallowWrapper.props().className
      );
    });
  });

  describe('Check that functions passed in as props are called', () => {
    const onClick = jest.fn();
    const onKeyDown = jest.fn();
    const wrapper = mount(
      <FileUploadStatus
        onClick={onClick}
        onKeyDown={onKeyDown}
        status="complete"
      />
    );

    it('should call onClick', () => {
      wrapper.simulate('click');
      expect(onClick).toBeCalled();
    });

    it('should call onKeyDown', () => {
      wrapper.simulate('keydown');
      expect(onKeyDown).toBeCalled();
    });
  });
});
