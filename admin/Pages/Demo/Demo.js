import { useState } from 'react';
import { BButtonGroup } from "../../../../bpl-tools/Components";
import { data } from "./data";
import ImageModal from './ImageModal';
import "./style.scss";
import { AiOutlineShoppingCart } from '../../utils/icons';
const adds = "admin-dashboard";
const options = [
    { label: "All", value: "all" },
    { label: "Hero", value: "hero" },
    { label: "Ticker", value: "ticker" },
    { label: "FAQ", value: "faq" },
    { label: "Call To Actions", value: "call-to-actions" },
    { label: "Testimonial", value: "testimonial" },
    { label: "Info List", value: "info-list" },
    { label: "About", value: "about" },
    { label: "Timeline", value: "timeline" },
    { label: "Team", value: "team" },
]
const Demo = ({ upgradeLink }) => {
    const [section, setSection] = useState("all");
    const [activeIdx, setActiveIdx] = useState(0);
    const [isOpen, setIsOpen] = useState(false)
    const sectionsData = section === "all" ? Object.keys(data).map(key => data[key]?.items).flat() : data[section]?.items ? data[section]?.items : [];

    const isSet = v => v !== undefined && v !== null;

    const handleModalClose = () => {
        setIsOpen(false)
    };
    const getSectionValue = (key) => {
        if (section === "all") return data?.[key];
        return data[section]?.[key];
    };

    const col = getSectionValue("col");
    const height = getSectionValue("height");

    const dynamicStyle = {
        ...(isSet(col) && { "--bpl-admin-demo-col": col }),
        ...(isSet(height) && { "--bpl-admin-demo-item-height": height }),
    };
    return (
        <div className={`${adds}-demo-wrapper`}>
            {isOpen ? <ImageModal upgradeLink={upgradeLink} image={sectionsData[activeIdx]?.img} handleModalClose={handleModalClose} data={sectionsData} activeIdx={activeIdx} /> : null}
            <div className={`${adds}-navigation-wrapper`}>
                <BButtonGroup style={{marginBottom:"0"}} label='' fontSize='16px' options={options} activeBg='#146EF5' wrap={true} value={section} onChange={value => setSection(value)} />
                <a src={upgradeLink} className={`${adds}-upgrade-btn-wrapper`}><button className={`${adds}-upgrade-btn`} ><AiOutlineShoppingCart/>Upgrade Now</button></a>
            </div>
            <div className={`${adds}-demo-items-container`} style={dynamicStyle}>
                {sectionsData.map((item, i) => (
                    <div className={`${adds}-demo-item`} key={i}>
                        <img className={`${adds}-demo-item-img`} src={item.img} alt={item.title} onClick={() => {
                            setActiveIdx(i)
                            setIsOpen(true)
                        }} />
                        <p>{item.title}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Demo;