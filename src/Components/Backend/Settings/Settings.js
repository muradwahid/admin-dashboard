import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';

const Settings = (props) => {

	return <>
		<InspectorControls>
			<div className='bPlInspectorInfo'>
				{/* <BBlocksAds /> */}
			</div>

			{/* <TabPanel className='bPlTabPanel' activeClass='activeTab' tabs={generalStyleTabs} onSelect={tabController}>{tab => <>
				{'general' === tab.name && <>
					
				</>}


				{'style' === tab.name && <>
					
				</>}
			</>}</TabPanel> */}
		</InspectorControls>

	</>;
};
export default Settings;