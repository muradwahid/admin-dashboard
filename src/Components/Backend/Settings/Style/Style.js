import { __ } from '@wordpress/i18n';
import { PanelBody, PanelRow, TextControl, ToggleControl, __experimentalNumberControl as NumberControl } from '@wordpress/components';
import { produce } from 'immer';

import { Label, ItemsPanel, BtnGroup, Background } from '../../../../../../bpl-tools/Components';
import { BControlPro, BtnGroupPro, SelectControlPro } from '../../../../../../bpl-tools/ProControls';
import { layouts } from '../../../../utils/options';

const Style = props => {
    const { attributes, setAttributes } = props;
    return <>
        <PanelBody className='bPlPanelBody' title={__('Style', 'b-blocks')} initialOpen={false}>
            
        </PanelBody>
    </>
}
export default Style;