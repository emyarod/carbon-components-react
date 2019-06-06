import React from 'react';
import PropTypes from 'prop-types';
import { settings } from 'carbon-components';
import CloseFilled16 from '@carbon/icons-react/lib/close--filled/16';
import CheckmarkFilled16 from '@carbon/icons-react/lib/checkmark--filled/16';
import InlineLoading from '../InlineLoading';

const { prefix } = settings;

export default function FileUploadStatus({
  iconDescription,
  status,
  style,
  ...other
}) {
  switch (status) {
    case 'uploading':
      return <InlineLoading />;
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

FileUploadStatus.propTypes = {
  /**
   * Provide a description of the SVG icon to denote file upload status
   */
  iconDescription: PropTypes.string,
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
   * Provide a custom tabIndex value for the <FileUploadStatus>
   */
  tabIndex: PropTypes.string,
};
FileUploadStatus.defaultProps = {
  iconDescription: 'Uploading file',
  onKeyDown: () => {},
  status: 'uploading',
  style: {},
  tabIndex: '0',
};
