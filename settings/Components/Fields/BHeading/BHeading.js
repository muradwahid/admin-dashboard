import "./style.scss";
const BHeading = ({ content }) => {
  return (
    <div className='bPl-heading-wrapper'>
      <div className="bPl-heading" dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
};

export default BHeading;