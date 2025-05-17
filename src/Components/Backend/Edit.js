import { useBlockProps } from '@wordpress/block-editor';
import { withSelect } from '@wordpress/data';
import { produce } from 'immer';
import { useState } from 'react';

import { useEffect } from 'react';
import Style from '../Common/Style';
import Settings from './Settings/Settings';
import { select } from '@wordpress/data';

const Edit = props => {
	const { attributes, setAttributes, clientId, getSite } = props;
	const { items } = attributes;
	const [data, setData] = useState({})

	const [activeIndex, setActiveIndex] = useState(0);

	const { data: utils } = useWPOptionQuery('prefixUtils');

	// const { data: dbData = null, saveData, isLoading, refetch ,error} = useWPAjax('bPlSettingsOptions', { _wpnonce: utils?.nonce, id: options.id });

	console.log(utils?.nonce);

	useEffect(() => {
		refetch()
	}, [utils?.nonce]);
	useEffect(() => {
		if (!isLoading && data) {
			setData(data || []);
		}
	}, [data, isLoading, error]);

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
export default Edit;