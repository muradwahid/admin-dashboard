import { useState } from 'react';
import { __ } from '@wordpress/i18n';
import { PanelBody, PanelRow, TextControl, ToggleControl, __experimentalNumberControl as NumberControl } from '@wordpress/components';
import { produce } from 'immer';

import { Label, ItemsPanel, BtnGroup, HelpPanel, IconControl, HexColorControl, ColorControl, InlineMediaUpload, InlineDetailMediaUpload, MediaPlaceholder, MultiSelectControl, PanelSelectControl, MediaArea } from '../../../../../../bpl-tools/Components';
import { BControlPro, BtnGroupPro, SelectControlPro } from '../../../../../../bpl-tools/ProControls';

import { layouts, sampleOptions } from '../../../../utils/options';

const General = (props) => {
	return <>
		<HelpPanel slug='b-blocks' docsLink='https://bplugins.com/docs/content-slider-block/guides/general' />
	</>
}
export default General;

const ItemSettings = ({ attributes, setAttributes, arrKey, index, setActiveIndex = null, premiumProps }) => {
	const items = attributes[arrKey];
	const { number, text } = items[index];

	const updateItem = (type, val, childType = null) => {
		const newItem = produce(items, draft => {
			if (null !== childType) {
				draft[index][type][childType] = val;
			} else {
				draft[index][type] = val;
			}
		});
		setAttributes({ items: newItem });
		setActiveIndex && setActiveIndex(index);
	}

	return <>
		<NumberControl label={__('Number:', 'b-blocks')} labelPosition='left' value={number} onChange={val => updateItem('number', val)} />

		<TextControl className='mt20' label={__('Text:', 'b-blocks')} value={text} onChange={val => updateItem('text', val)} />
	</>
}