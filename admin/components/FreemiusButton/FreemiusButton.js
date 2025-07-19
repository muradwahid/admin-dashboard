import "./js/fs.js";
import "./style.scss";
const FreemiusButton = ({ freemius, title, buttonText = "Buy Now" }) => {
  const { product_id, plan_id, public_key, ...rest } = freemius;

  const onUpgrade = (e) => {
    e.preventDefault();
    // eslint-disable-next-line no-undef
    const checkoutConfig = new FS.Checkout({
      product_id,
      plan_id,
      public_key
    });
    checkoutConfig.open({
      title,
      ...rest
    });
    e.preventDefault();
  };
  return <div className="bpl-freemius-button-wrapper" onClick={onUpgrade}>
    {buttonText}
  </div>
};

export default FreemiusButton;