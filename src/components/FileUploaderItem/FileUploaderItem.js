import React from 'react';
import PropTypes from 'prop-types';
import { settings } from 'carbon-components';
import CloseFilled16 from '@carbon/icons-react/lib/close--filled/16';
import CheckmarkFilled16 from '@carbon/icons-react/lib/checkmark--filled/16';

const { prefix } = settings;

export function FileUploaderItem({
  iconDescription,
  onKeyDown,
  status,
  style,
  tabIndex,
  ...other
}) {
  switch (status) {
    case 'uploading':
      return (
        <div
          className="bx--loading"
          style={{ ...style }}
          tabIndex={tabIndex}
          onKeyDown={onKeyDown}
          role="button"
          {...other}>
          <svg className={`${prefix}--loading__svg`} viewBox="-42 -42 84 84">
            <circle cx="0" cy="0" r="37.5" />
          </svg>
        </div>
      );
    case 'edit':
      return (
        <CloseFilled16
          className={`${prefix}--file-close`}
          aria-label={iconDescription}
          style={style}
          {...other}>
          {iconDescription && <title>{iconDescription}</title>}
        </CloseFilled16>
      );
    case 'complete':
      return (
        <CheckmarkFilled16
          className={`${prefix}--file-complete`}
          aria-label={iconDescription}
          style={style}
          {...other}>
          {iconDescription && <title>{iconDescription}</title>}
        </CheckmarkFilled16>
      );
    default:
      return null;
  }
}
FileUploaderItem.propTypes = {
  /**
   * Provide an optional `onKeyDown` hook that is called if Space or Return is
   * pressed while the component is focused
   */
  onKeyDown: PropTypes.func,
  /**
   * Specify an optional object of styles to be applied inline to the root
   * node
   */
  style: PropTypes.object,
  /**
   * Specify the status of the File Upload
   */
  status: PropTypes.oneOf(['edit', 'complete', 'uploading']),
  /**
   * Provide a custom tabIndex value for the <FileUploaderItem>
   */
  tabIndex: PropTypes.number,
};
FileUploaderItem.defaultProps = {
  onKeyDown: () => {},
  status: 'uploading',
  style: {},
  tabIndex: 0,
};
