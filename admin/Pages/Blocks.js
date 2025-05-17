
import { useState, useEffect } from "react";
import React from "react";
import Layout from "../Layout/Layout";
import useWPAjax from "../utils/useWPAjax";
import { closeIcon, demo, documention, searchIcon } from "../utils/icons";
import { blocks } from "./json-data/allblocks";

const dataFetched = new CustomEvent("dataFetched");

const Blocks = () => {
  const [isSaving, setIsSaving] = useState(false);
  const [disableBlockName, setDisableBlockName] = useState({});
  const [searchTerm, setSearchTerm] = useState(""); // State to store the search term
  const { blocksName = [] } = disableBlockName || {};
  const { data, saveData, isLoading } = useWPAjax("bblocks_identify_disable_block", { nonce: window.wpApiSettings.nonce }, true);

  useEffect(() => {
    if (!isLoading && data) {
      const initialBlocksName = data.blocksName || blocks.map((block) => block.name);
      setDisableBlockName({ ...data, blocksName: initialBlocksName });
      window.dispatchEvent(dataFetched);
    }
  }, [data, isLoading]);

  const handleCheckboxChange = (blockName, isChecked) => {
    const updatedBlocksName = isChecked
      ? blocksName.filter((name) => name !== blockName)
      : [...blocksName, blockName];

    setDisableBlockName({ ...disableBlockName, blocksName: updatedBlocksName });
    setIsSaving(true);

    saveData({ data: JSON.stringify({ ...disableBlockName, blocksName: updatedBlocksName }) })
      .finally(() => {
        setTimeout(() => setIsSaving(false), 1000); // Add a delay for better UX
      });
  };

  const handleActivateAll = () => {
    const updatedBlocksName = [];
    setDisableBlockName({ ...disableBlockName, blocksName: updatedBlocksName });
    setIsSaving(true);

    saveData({ data: JSON.stringify({ ...disableBlockName, blocksName: updatedBlocksName }) })
      .finally(() => {
        setTimeout(() => setIsSaving(false), 1000); // Add a delay for better UX
      });
  };

  const handleDeactivateAll = () => {
    const updatedBlocksName = blocks.map((block) => block.name);
    setDisableBlockName({ ...disableBlockName, blocksName: updatedBlocksName });
    setIsSaving(true);

    saveData({ data: JSON.stringify({ ...disableBlockName, blocksName: updatedBlocksName }) })
      .finally(() => {
        setTimeout(() => setIsSaving(false), 1000); // Add a delay for better UX
      });
  };

  // Filter blocks based on the search term
  const filteredBlocks = blocks.filter((block) =>
    block?.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout>
      <div className="feature-section">
        {isSaving && <div className="saving-notice">Saving changes...</div>}
        <div className="feature-container">
          <div className="allblocks">
            <div className="title_controlBtn">
              <div className="search_title">
                <h2>All Blocks</h2>
                <div className="search-bar">
                  {searchIcon}
                  <input type="text" placeholder="Search blocks..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="search-input" />
                  {searchTerm && <span onClick={() => setSearchTerm('')}>{closeIcon}</span>}
                </div>
              </div>

              <div className="actionBtn">
                <button className="action-button" onClick={handleActivateAll}>
                  Activate All
                </button>
                <button className="action-button" onClick={handleDeactivateAll}>
                  Deactivate All
                </button>
              </div>
            </div>

            <div className="blocks">
              {filteredBlocks.map((item) => (
                <div
                  key={item.name}
                  className={`feature-list ${blocksName.includes(item.name) ? "disabled" : ""}`}
                >
                  <div className="icon">{item?.icon}</div>
                  <div className="title">{item?.title}</div>
                  <div className="actions">
                    <a className="action-btn" href={item?.demo} target="_blank" rel="noopener noreferrer">
                      {demo}
                    </a>
                    <a className="action-btn" href={item?.docs} target="_blank" rel="noopener noreferrer">
                      {documention}
                    </a>
                    <label className="toggle-switch">
                      <input
                        type="checkbox"
                        checked={!blocksName.includes(item.name)}
                        onChange={(e) => handleCheckboxChange(item.name, e.target.checked)}
                      />
                      <span className="slider"></span>
                    </label>
                  </div>
                </div>
              ))}
            </div>

            {/* Message for no results */}
            {filteredBlocks.length === 0 && <div className="notFoundBlock"><h3>No blocks found matching your search.</h3></div>}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Blocks;
