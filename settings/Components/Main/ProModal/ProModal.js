import { AiOutlineShoppingCart } from '../../../utils/icons';
import './style.scss';
const ProModal = () => {
  return <>
    <input type="checkbox" id="bPl-settings-pro-modal-toggle" />
    <div className="bPl-settings-pro-modal">
      <div className="bPl-settings-pro-modal-content">
        <label htmlFor="bPl-settings-pro-modal-toggle" className="bPl-settings-pro-close-btn">&times;</label>
        <p>This Feature is available on Premium Version. If you want to use this feature, Please upgrade to pro version.</p>
        <a href="https://bplugins.com/products/voice-feedback/#pricing" target='_blank' rel='noreferrer'><button className={`bPl-settings-pro-modal-upgrade-btn`} ><AiOutlineShoppingCart />Upgrade Now</button></a>
      </div>
    </div>
  </>
}

export default ProModal;