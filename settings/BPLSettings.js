import _ from 'lodash';
import { useEffect, useState } from 'react';
import './bpl-settings.scss';
import Main from './Components/Main/Main';
import useWPAjax from './hooks/useWPAjax';


const BPLSettings = props => {
	const { options } = props;
	const { data: dbData = null, isLoading, refetch, saveData } = useWPAjax('bPlSettingsOptions', { _wpnonce: window.wpApiSettings.nonce, id: options.id, });
	const [data, setData] = useState({});
	const [isEqual, setIsEqual] = useState(false)
	const [isSaved, setIsSaved] = useState(false)
	// First Fetch

	useEffect(() => {
		if (!isLoading && dbData) {
			setData(data => _.merge(data, dbData))
		}
	}, [dbData, isLoading]);

	useEffect(() => {

	},[])

	const onSaveData = () => {
		if (!isLoading) {
			saveData({ [options.id]: JSON.stringify(data) });

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

	useEffect(() => {
		if (document.readyState === 'complete' || document.readyState === 'interactive') {
			refetch();
		}
	}, [document.readyState])


	const handleResetData = () => {
		if (options?.saveType === 'nested') {
			const newData = Object.keys(dbData)?.map((key) => dbData[key] = {});
	
			saveData({ [options.id]: JSON.stringify(newData) })
			location.reload()
			
		} else { 
			const db = { ...dbData };
			Object.keys(db).forEach((key) => db[key] = '');
			saveData({ [options.id]: JSON.stringify(db) })
		}
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

	return <Main {...{ isEqual, setIsEqual, options, saveData, data, setData, onSaveData, isLoading, refetch, isSaved, setIsSaved, handleResetData, dbData }} />;
}
export default BPLSettings;