import Layout from '../../Layout/Layout';
import "./style.scss";
const prefix = 'freeTrialForm';
const FreeTrialForm = ({ freemius, }) => {
  const { product_id, plan_id, public_key: _, ...rest } = freemius;

  const params = Object.keys(rest).map(key => `${key}=${rest[key]}`).join('&');

  return <Layout>
    <div className={`${prefix}-wrapper`}>
      <iframe className={`${prefix}-iframe`} src={`https://checkout.freemius.com/plugin/${product_id}/plan/${plan_id}?${params}`}></iframe>
    </div>
  </Layout>
};

export default FreeTrialForm;