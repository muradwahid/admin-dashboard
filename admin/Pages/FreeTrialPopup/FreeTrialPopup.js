import FreemiusButton from "../../components/FreemiusButton/FreemiusButton";
import Layout from "../../Layout/Layout";
import "./style.scss";

const prefix = 'freeTrialPopup';
const FreeTrialPopup = (props) => {

  return <Layout>
    <div className={`${prefix}-wrapper`}>
      <FreemiusButton {...props} />
    </div>
  </Layout>
};

export default FreeTrialPopup;