import Layout from '../Layout/Layout';
import { inDevs } from './json-data/devBlocks';


const InDev = () => {
    return <Layout>
        <div className="feature-section">
            <div className="feature-container">
                <div className="allblocks">
                    <div className="blocks">
                        {inDevs?.map((item) => (
                            <div key={item.name} className={`feature-list`}>
                                <div className="icon">{item?.icon}</div>
                                <div className="title">{item?.title}</div>
                            </div>
                        ))}
                    </div>


                </div>
            </div>
        </div>
    </Layout>
}
export default InDev;