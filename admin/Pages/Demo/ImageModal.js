// const adds = "admin-dashboard-image-modal";
// const ImageModal = ({ image, handleModalClose,data }) => {

//     return (
//         <div className={`${adds}-wrapper`}>
//             <div className={`${adds}-img-container`}>
//             <svg xmlns="http://www.w3.org/2000/svg" onClick={handleModalClose} viewBox="0 0 384 512"><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" /></svg>
//             <img src={image} alt="none" />
//             </div>
//         </div>
//     );
// };

// export default ImageModal;
import { useEffect, useState } from "react";
import { AiOutlineShoppingCart } from "../../utils/icons";
const adds = "admin-dashboard-image-modal";

const ImageModal = ({ image, handleModalClose, data, activeIdx, upgradeLink }) => {
    const [currentIndex, setCurrentIndex] = useState(activeIdx);

    // Find the initial index based on the passed image
    useEffect(() => {
        if (image && data) {
            const index = data.findIndex(item => item.img === image);
            if (index !== -1) {
                setCurrentIndex(index);
            }
        }
    }, [image, data]);

    const goToPrevious = () => {
        setCurrentIndex(prevIndex =>
            prevIndex === 0 ? data.length - 1 : prevIndex - 1
        );
    };

    const goToNext = () => {
        setCurrentIndex(prevIndex =>
            prevIndex === data.length - 1 ? 0 : prevIndex + 1
        );
    };

    return (
        <div className={`${adds}-wrapper`}>
            <div className={`${adds}-img-container`}>
                <svg
                    className={`${adds}-close`}
                    onClick={handleModalClose}
                    viewBox="0 0 384 512"
                >
                    <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                </svg>

                {data.length > 1 && (
                    <>
                        <button
                            className={`${adds}-nav ${adds}-prev`}
                            onClick={goToPrevious}
                            aria-label="Previous image"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" /></svg>
                        </button>

                        <button
                            className={`${adds}-nav ${adds}-next`}
                            onClick={goToNext}
                            aria-label="Next image"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z" /></svg>
                        </button>
                    </>
                )}

                <img
                    src={data[currentIndex]?.img}
                    alt={data[currentIndex]?.title || "Gallery image"}
                />

                {data[currentIndex]?.title && (
                    <div className={`${adds}-caption`}>
                        <p>{data[currentIndex].title}</p>
                        <a src={upgradeLink}><button className={`${adds}-upgrade-btn`} ><AiOutlineShoppingCart/>Upgrade Now</button></a>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ImageModal;