import { useBlockProps } from '@wordpress/block-editor';
import { produce } from 'immer';
import { useState } from 'react';

import { compose } from '@wordpress/compose';
import { withSelect } from '@wordpress/data';
import { useEffect } from 'react';
import { useWPAjax } from "../../../../bpl-tools/hooks";
import Style from '../Common/Style';
import Settings from './Settings/Settings';

const Edit = props => {
	const { attributes, setAttributes, clientId, getSite } = props;
	const { items } = attributes;
	const [data, setData] = useState({})

	const [activeIndex, setActiveIndex] = useState(0);
	const nonce = window.wpApiSettings.nonce;

	// const { data: utils } = useWPOptionQuery('prefixUtils');

	const { data: dbData = null, saveData, isLoading, refetch, error } = useWPAjax('bPlSettingsOptions', { _wpnonce: nonce, id: "admin-dashboard" });

	// console.log(nonce);

	useEffect(() => {
		refetch()
	}, [nonce]);
	useEffect(() => {
		if (!isLoading && dbData) {
			setData(dbData || []);
		}
	}, [dbData, isLoading, error]);

	useEffect(() => {
		console.log(dbData);
	}, [dbData])

	// const [nonce, setNonce] = useState('');
	// useEffect(() => {
	// 	if (getSite?.prefixUtils) {
	// 		setNonce(JSON.parse(getSite?.prefixUtils)?.nonce || '');
	// 	}
	// }, [getSite?.prefixUtils]);
	// console.log(select('core').getSite()?.prefixUtils);


	const updateItem = (type, val, childType = false) => {
		const newItems = produce(items, draft => {
			if (childType) {
				draft[activeIndex][type][childType] = val;
			} else {
				draft[activeIndex][type] = val;
			}
		});
		setAttributes({ items: newItems });
	}

	const isPremium = false;

	return <>
		<Settings {...{ attributes, setAttributes, isPremium, updateItem, activeIndex, setActiveIndex }} />

		<div {...useBlockProps()}>
			<Style attributes={attributes} id={`block-${clientId}`} />

			<div>
				Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae quisquam sunt provident perferendis deserunt at molestias incidunt eum voluptas veritatis cumque molestiae saepe nam eligendi temporibus aperiam autem, numquam odit.
			</div>
		</div>
	</>;
}
export default Edit