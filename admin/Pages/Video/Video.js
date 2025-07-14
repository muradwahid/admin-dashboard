import { useState } from 'react';
import Layout from '../../Layout/Layout';
import { minus, plus } from '../../utils/icons';
import { changeLog, helpItem } from '../../utils/options';
import VideoPlayer from './VideoPlayer';
const Video = ({ videoUrl = "https://youtu.be/MKX1HXYqJU0?si=qxaWKy89lUrHYHIJ", isYoutube=true}) => {
  const [isChangeLog, setIsChangeLog] = useState(false);

  const handleCreateNewPage = (e) => {
    e.preventDefault();

    const baseUrl = window.location.origin;
    const adminPath =
      window.location.hostname === "localhost"
        ? "/wordpress/wp-admin/post-new.php?post_type=page"
        : "/wp-admin/post-new.php?post_type=page";
    window.location.href = baseUrl + adminPath;
  };
  return (
    <>
      <Layout>
        <div className="feature-section">
          <div className="feature-container">
            <div className="bblocks_welcome_container">
              <div className="bblocks_left_area">
                <div className="bblocks_left">
                  <h1>Welcome to bBlocks</h1>
                  <p>Check out our simple video tutorial that guides you through using this plugin step-by-step! It’s perfect for beginners, so you can get started quickly and unlock the full potential of every feature!</p>
                  <div className="img">
                    {/* <img src="https://ps.w.org/b-blocks/assets/banner-772x250.png?rev=3176079" alt="image" /> */}
                    <VideoPlayer src={videoUrl} width="100%" height="100%" isYoutube={isYoutube} />
                    {/* <video width="100%" height="100%" controls>
                      <source src="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-720p.mp4" type="video/mp4"/>
                        <source src="movie.ogg" type="video/ogg"/>
                          Your browser does not support the video tag.
                        </video> */}
                    {/* https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-720p.mp4 */}
                  </div>
                  <div className="logo_title">

                    <div className="logo">
                      <img src="https://ps.w.org/b-blocks/assets/icon-128x128.png?rev=2473946" alt="logo_image" />
                    </div>
                    <div className="title">
                      <h3>B Blocks – The ultimate block collection</h3>
                      <span>by</span>
                      <a href="https://bplugins.com" target="_blank" rel="noopener noreferrer">
                        bPlugins
                      </a>
                    </div>
                  </div>
                </div>
                <div className="bblocks_left_btn">
                  <a className='action-button' href="#" onClick={handleCreateNewPage}>
                    Create New Page
                  </a>
                  <a className='action-button' href="https://bplugins.com" target="_blank" rel="noopener noreferrer">
                    Visit Our Website
                  </a>
                </div>
              </div>

              <div className="bblocks_right">
                {helpItem?.map((item, index) => {
                  return (
                    <div key={index} className="item">
                      <h2>{item?.title}</h2>
                      <p>{item?.description}</p>
                      <a className='action-button' href={item?.link} target="_blank" rel="noopener noreferrer">
                        {item?.linkText}
                      </a>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </Layout>
      <div className="changelog">
        <div className="toggleArea">
          <div className="headerArea" onClick={() => setIsChangeLog(!isChangeLog)}>
            <div className="text">
              Get updates on our new blocks and features by checking out the changelog
            </div>
            <div className="icon">{isChangeLog ? minus : plus}</div>
          </div>

          {isChangeLog && changeLog.map((log, index) => {
            return <div key={index} className="item">
              <div className="changelog_title">
                {/* {log?.title} */}
                <span className='date'>{log?.date}</span>
              </div>

              <ul className='list'>
                {
                  log?.list.map((item, token) => { return <li key={token}>{item?.title}</li> })
                }

              </ul>
            </div>
          })
          }
        </div>
      </div>
    </>
  );
};

export default Video;