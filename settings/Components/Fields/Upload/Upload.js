
import { MediaUpload } from "@wordpress/media-utils";
import React, { useEffect, useState } from 'react';
import BTextControl from "../BTextControl/BTextControl";
import Button from "../Button/Button";
import "./style.scss";
const Upload = ({ value, onChange = () => { }, preview = false, url = true, library = 'image', placeholder, button_title = "Upload", ...props }) => {
    const [data, setData] = useState(value || "")
    useEffect(() => {
        onChange(data)
    }, [data])
    const videoIcon = <svg xmlns="http://www.w3.org/2000/svg" width="48" height="64" viewBox="0 0 120 160" fill="#888888"><path d="M80 0H0v160h120V40L80 0zm-10 120c0 3-1 5-3 7s-4 3-7 3H30c-3 0-5-1-7-3S20 123 20 120v-30c0-3 1-5 3-7s4-3 7-3h30c3 0 5 1 7 3s3 4 3 7v30zm30 0v10l-20-20v-10l20-20v40zm-20-80V10l30 30h-30z" /></svg>
    const audioIcon = <svg xmlns="http://www.w3.org/2000/svg" width="48" height="64" viewBox="0 0 120 160" fill="#888888"><path d="M80 0H0v160h120V40L80 0zm10 72v40c0 4-1 7-4 10s-6 4-10 4-7-1-10-4-4-6-4-10 1-7 4-10 6-4 10-4c2 0 4 0 6 1V76l-35 8v34c0 5-2 8-5 10-2 2-5 3-8 3-4 0-7-1-10-4-2-3-4-6-4-10s1-7 4-10 6-4 10-4c2 0 4 0 6 1V72c0-1 0-2 1-2 1-1 2-1 3-1l43-8c1 0 2 0 3 1v10zm-10-32V10l30 30h-30z" /></svg>
    return (
        <div className="bPl-inlineMedia-upload-wrapper">
            {value && preview && <div className="bPl-inlineMedia-upload-preview">
                {library === "image" && <img src={value} alt="" />}
                {library === "video" && videoIcon}
                {library === "audio" && audioIcon}
                <svg className="bPl-media-preview-deleteBtn" onClick={() => setData("")} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-320c0-35.3-28.7-64-64-64L64 32zm79 143c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z" /></svg>
            </div>}
            <div style={{ display: "flex", alignItems: "center", gap: "5px", width: "100%" }}>
                {
                    url && <div style={{ width: "100%" }}>
                        <BTextControl placeholder={placeholder} style={{ borderRadius: "3px" }} value={value} onChange={val => setData(val)} />
                    </div>
                }
                <div>

                    <MediaUpload
                        allowedTypes={[library]}
                        gallery={false}
                        multiple={false}
                        addToGallery={false}
                        onSelect={(val) => setData(val.url)}
                        value={{url:value}}
                        render={({ open }) => (
                            <Button onClick={open}>{button_title}</Button>
                        )}
                    />
                </div>
                {!preview && value && <Button variant="warning" onClick={() => setData("")}>Remove</Button>}
            </div>
        </div>
    );
};

export default Upload;