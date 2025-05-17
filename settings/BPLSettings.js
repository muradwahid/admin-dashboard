import _ from 'lodash';
import { useEffect, useState } from 'react';
import './bpl-settings.scss';
import Main from './Components/Main/Main';
import useWPAjax from './hooks/useWPAjax';
const BPLSettings = props => {
	const { options, nonce } = props;

	const { data: dbData = null, saveData, isLoading, refetch } = useWPAjax('bPlSettingsOptions', { _wpnonce: nonce, id: options.id });
	const [data, setData] = useState({});
	const [isEqual, setIsEqual] = useState(false)
	const [isSaved, setIsSaved] = useState(false)
	// First Fetch

	useEffect(() => {
		if (!isLoading && dbData) {
			setData(data => _.merge(data, dbData))
		}

	}, [dbData, isLoading]);


	const onSaveData = () => {
		// setIsEqual(false)
		if (!isLoading) {
			saveData({ jsdata: JSON.stringify(data) });

			setTimeout(() => {
				setIsSaved(false);
			}, 2000);
		}
	}

	useEffect(() => {
		if (!isLoading) {
			if (_.isEqual(dbData, data)) {
				setIsEqual(false);
			} else if (!_.isEqual(dbData, data)) {
				setIsEqual(true);
			}
		}
	}, [isLoading, dbData, data])

	// const options = {
	// 	'id': 'prefixData',
	// 	'title': 'bPlugins Settings',
	// 	// 'saveType': '', // 'serialized' : 'nested'
	// 	sections: [
	// 		{
	// 			'name': 'overview',
	// 			'title': 'Overview',
	// 			'icon': faRocket,
	// 			fields: [
	// 				{
	// 					'id': 'overviewName',
	// 					'label': 'Overview Name',
	// 					'help': 'Enter your Overview name here',
	// 					'field': 'text',
	// 				}
	// 			]
	// 		},
	// 		{
	// 			'name': 'editor',
	// 			'title': 'Editor',
	// 			'description': 'Editor description',
	// 			'icon': faRocket,
	// 			children: [
	// 				{
	// 					'name': 'code',
	// 					'title': 'Code',
	// 					'icon': faRocket,
	// 					fields: [
	// 						{
	// 							'id': 'codeEditorName',
	// 							'label': 'Code Editor Name',
	// 							'help': 'Enter your code editor name here',
	// 							'field': 'text',
	// 						}
	// 					]
	// 				},
	// 				{
	// 					'name': 'wp',
	// 					'title': 'WP',
	// 					'icon': faRocket,
	// 					fields: [
	// 						{
	// 							'id': 'wpEditorName',
	// 							'label': 'WP Editor Name',
	// 							'help': 'Enter your wp editor name here',
	// 							'field': 'textarea',
	// 						}
	// 					]
	// 				}
	// 			]
	// 		}
	// 	]
	// }
	// window.onload = () => {
	// 	refetch();
	// };


	useEffect(() => {
		if (document.readyState === 'complete' || document.readyState === 'interactive') {
			refetch();
		}
	}, [document.readyState])


	const handleResetData = () => {
		const newData = Object.keys(dbData)?.map((key) => dbData[key] = {});

		saveData({ jsdata: JSON.stringify(newData) })
		// setData(null)
		location.reload()
	}

	window.onload = (e) => {
		let timeout
		if (e.isTrusted) {
			timeout = setTimeout(() => refetch(), 500)
		}
		return () => clearTimeout(timeout)
	}

	document.addEventListener("DOMContentLoaded", () => {
		refetch();
	})

	return <Main {...{ isEqual, setIsEqual, options, saveData: () => { }, data, setData, onSaveData, isLoading, refetch, isSaved, setIsSaved, handleResetData, dbData }} />;
}
export default BPLSettings;