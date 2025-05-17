/* eslint-disable no-console */
/* eslint-disable no-undef */

import { useState, useEffect } from "react";
import Layout from "../Layout/Layout";
import { loadingIcon } from '../utils/icons';


const PopularPlugin = () => {
    const [installedPlugins, setInstalledPlugins] = useState([]);
    const [pluginslug, setPluginslug] = useState(null);
    const [popularPlugins, setPopularPlugins] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {

        const fetchPopularPlugins = async () => {
            try {
                setLoading(true);
                const res = await fetch(`${pluginAction.ajaxUrl}?action=get_popular_plugins&nonce=${pluginAction.nonce}`);
                const response = await res.json();

                const allowedPlugins = ['html5-audio-player', 'html5-video-player', 'pdf-poster', '3d-viewer'];
                const filteredPlugins = response?.data?.filter(plugin => allowedPlugins?.includes(plugin?.slug));
                setPopularPlugins(filteredPlugins);
                setLoading(false);

            } catch (error) {
                console.log("No data", error);
                setLoading(false);
            }
        }
        fetchPopularPlugins();

    }, []);

    console.log(popularPlugins);


    useEffect(() => {

        const fetchActivePlugins = async () => {
            try {
                const res = await fetch(
                    `${pluginAction.ajaxUrl}?action=get_active_plugins&nonce=${pluginAction.nonce}`
                );
                const response = await res.json();
                if (response.success) {
                    console.log(response.data);

                    setInstalledPlugins(response.data); // Set the list of installed plugins
                } else {
                    console.error("Error fetching installed plugins:", response.message);
                }
            } catch (error) {
                console.error("Error fetching installed plugins:", error);
            }
        };
        fetchActivePlugins();


    }, []);

    const actionHooks = async (pluginName) => {
        setPluginslug(pluginName); // Set the loading state to the plugin name

        try {
            const res = await fetch(`${pluginAction.ajaxUrl}?action=activated_block&plugin_name=${pluginName}&nonce=${pluginAction.nonce}`);
            const responseText = await res.text();

            const jsonStart = responseText.indexOf("{");
            if (jsonStart !== -1) {
                const jsonString = responseText.slice(jsonStart);
                const response = JSON.parse(jsonString);
                console.log(response);

                window.location.href = response.data.redirectUrl;
            } else {
                console.error("No JSON found in the response.");
            }
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setPluginslug(null); // Reset the loading state
        }
    };

    return (
        <Layout>
            <div className="headerArea">
                <h2>Most Popular Plugin</h2>
                <a className="action-button" href="https://profiles.wordpress.org/abuhayat/#content-plugins" target="_blank" rel="noopener noreferrer" >  Our All Plugins </a>
            </div>


            <div className="feature-section">
                <div className="feature-container">
                    <div className="popular-section">
                        {!loading ? <div className="pluginArea">
                            {popularPlugins?.map((singlePlugin, index) => {
                                const isInstalled = installedPlugins.some(
                                    (pluginSlug) =>
                                        pluginSlug === `${singlePlugin?.slug}/${singlePlugin?.slug}.php`
                                );
                                return (
                                    <div className="item" key={index}>
                                        <div className="img">
                                            <img
                                                src={singlePlugin?.icons["1x"]}
                                                alt={singlePlugin?.slug}
                                            />
                                        </div>
                                        <div className="title">
                                            <h3 dangerouslySetInnerHTML={{ __html: singlePlugin?.name }}></h3>
                                        </div>

                                        <div className="desc">
                                            <p>{singlePlugin?.short_description}</p>
                                        </div>
                                        <div className="btn_area">
                                            <button className={` ${isInstalled ? 'installedSuccess' : 'action-button'}  ${pluginslug === singlePlugin?.slug ? "installing..." : ""}`}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    if (!isInstalled)
                                                        actionHooks(singlePlugin?.slug);
                                                }}
                                                disabled={isInstalled || pluginslug === singlePlugin?.slug}
                                            >
                                                {pluginslug === singlePlugin?.slug
                                                    ? "Installing..."
                                                    : isInstalled
                                                        ? "Installed"
                                                        : "Install"}
                                            </button>
                                            <a className="action-button" href={singlePlugin?.download_link} target="_blank" rel="noopener noreferrer"> Download </a>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                            : <div className="loading">
                                {loadingIcon}
                            </div>}

                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default PopularPlugin;
