import { createRoot } from 'react-dom/client';

import './style.scss';
import Style from './Components/Common/Style';
import AdminDashboard from './Components/Frontend/AdminDashboard';

document.addEventListener('DOMContentLoaded', () => {
	const blockNameEls = document.querySelectorAll('.wp-block-b-blocks-blockname');
	blockNameEls.forEach(blockNameEl => {
		const attributes = JSON.parse(blockNameEl.dataset.attributes);
		const data = JSON.parse(blockNameEl.dataset.dashboard);
		createRoot(blockNameEl).render(<>
			<Style attributes={attributes} id={blockNameEl.id} />

			<AdminDashboard attributes={attributes} data={data} />
		</>);

		blockNameEl?.removeAttribute('data-attributes');
	});
});