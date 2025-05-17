import React, { useEffect, useState } from 'react';

import Body from './Body/Body';
import SearchBodyFields from './Body/SearchBodyFields/SearchBodyFields';
import Footer from './Footer/Footer';
import './Main.scss';
import Navbar from './Navbar/Navbar';
import Sidebar from './SideBar/SideBar';

const Main = ({ options, data, dbData, setData, onSaveData, isLoading, saveData, refetch, isEqual, setIsEqual, isSaved, setIsSaved, handleResetData }) => {
  const { sections, saveType = 'nested' } = options;
  // console.log(options);

  // const items = [
  //   {
  //     title: "Overview",
  //     name: "overview",
  //     icon: faRocket,
  //     Component: Overview,
  //   },
  //   {
  //     title: "Basic Fields",
  //     name: "basic-fields",
  //     icon: circlePlus,
  //     Component: <p>Basic Fields</p>,
  //     children: [
  //       { title: "Text", name: "text", icon: rectangle },
  //       { title: "Textarea", name: "textarea", icon: rectangle },
  //       { title: "Select", name: "select", icon: faList },
  //       { title: "Checkbox", name: "checkbox", icon: faCheckbox },
  //       { title: "Radio", name: "radio", icon: faRadio },
  //     ]
  //   },
  //   {
  //     title: "Repeater Fields",
  //     name: "repeaterFields",
  //     icon: faClone,
  //     Component: <p>Color</p>,
  //     children: [
  //       {
  //         title: "Repeater",
  //         name: "repeater",
  //         // Component: Sample,
  //       },
  //       {
  //         title: "Group",
  //         name: "group",
  //         // Component: Sample,
  //       },
  //     ],
  //   },
  //   {
  //     title: "Combine Fields",
  //     icon: faBar,
  //     children: [
  //       { title: "Accordion", name: "accordion" },
  //       { title: "Tabbed", name: "tabbed" },
  //       { title: "Fieldset", name: "fieldset" },
  //     ]
  //   },
  //   {
  //     title: "Media and Upload Fields",
  //     icon: faUpload,
  //     name: "mediauploadfields",
  //     children: [
  //       { title: "Media", name: "media" },
  //       { title: "Upload", name: "upload" },
  //       { title: "Gallery", name: "gallery" },
  //     ]
  //   },
  //   {
  //     title: "Editor Fields",
  //     name: "editorFields",
  //     icon: faCode,
  //     children: [
  //       { title: "Code Editor", name: "codeeditor" },
  //       { title: "WP Editor", name: "wpeditor" },
  //     ]
  //   },
  //   {
  //     title: "Color Fields",
  //     name: "colorFields",
  //     icon: faDroplet,
  //     children: [
  //       { title: "Color", name: "color" },
  //       { title: "Link Color", name: "linkColor" },
  //       { title: "Color Group", name: "colorGroup" },
  //       { title: "Color Palette", name: "color-palette" },
  //     ]
  //   },
  //   {
  //     title: "Design Fields",
  //     name: "designFields",
  //     icon: circleHalfStroke,
  //     children: [
  //       { title: "Background", name: "background" },
  //       { title: "Typography", name: "typography" },
  //       { title: "Dimension", name: "dimension" },
  //       { title: "Spacing", name: "Spacing" },
  //       { title: "Border", name: "border" },
  //       { title: "Spinner", name: "spinner" },
  //       { title: "Number", name: "number" }
  //     ]
  //   },
  //   {
  //     title: "Additional Fields", name: "additionalFields",
  //     icon: faAsterisk,
  //     children: [
  //       { title: "Slider", name: "slider", icon: faSliders },
  //       { title: "Sorter", name: "sorter", icon: sortNumericDown },
  //       { title: "Sortable", name: "sortable", icon: arrowAlt },
  //       { title: "Switcher", name: "switcher", icon: faSwitch },
  //       { title: "Icons", name: "icons", icon: faStar },
  //       { title: "Map", name: "map", icon: faMap },
  //       { title: "Link", name: "link", icon: faLink },
  //       { title: "Date", name: "date", icon: faCalender },
  //       { title: "Date and Time", name: "dateAndTime", icon: faCalender },
  //       { title: "Image Select", name: "imageSelect", icon: faGrid },
  //       { title: "Button Set", name: "buttonSet", icon: faEllipsis },
  //     ]
  //   },
  //   {
  //     title: "Dependencies",
  //     name: "dependencies",
  //     icon: faBranch,
  //   },
  //   {
  //     title: "Validate",
  //     name: "validate",
  //     icon: faCircleCheck,
  //   },
  //   {
  //     title: "Sanitize",
  //     name: "sanitize",
  //     icon: faRotateRight,
  //   },
  //   {
  //     title: "Backup",
  //     name: "backup",
  //     icon: faShieldHalf,
  //   },
  //   {
  //     title: "Other",
  //     name: "other",
  //     icon: faBold,
  //   },
  // ];

  const [isHidden, setIsHidden] = useState(false);
  const [search, setSearch] = useState("");

  const parent = localStorage.getItem('activeSection')
  const child = localStorage.getItem('activeChild')

  const [activeSection, setActiveSection] = useState(parent || sections[0].name);
  const [activeChild, setActiveChild] = useState(child || (sections[0].children ? sections[0].children[0].name : ''));
  // const [activeSection, setActiveSection] = useState(sections[0].name);
  // const [activeChild, setActiveChild] = useState(sections[0].children ? sections[0].children[0].name : '');
  useEffect(() => {
    localStorage.setItem('activeSection', activeSection)
    localStorage.setItem('activeChild', activeChild)
  }, [activeChild, activeSection])
  const activeProps = { activeSection, setActiveSection, activeChild, setActiveChild };

  const updateData = (id, val) => {
    if (!isLoading) {
      if (saveType === 'serialized') {
        setData(prev => ({
          ...prev,
          [id]: val
        }));
      } else {
        if (activeChild !== "null" && activeChild) {
          setData((prev) => ({
            ...prev,
            [activeSection]: {
              ...prev[activeSection],
              [activeChild]: {
                ...(prev[activeSection] && prev[activeSection][activeChild]) ? prev[activeSection][activeChild] : {},
                [id]: val
              }
            }
          }));
        } else {
          setData((prev) => ({
            ...prev,
            [activeSection]: {
              ...(prev[activeSection] || {}),
              [id]: val
            }
          }));
        }
      }
    }
  }





  useEffect(() => {
    window.scrollTo(0, 0)
  }, [parent, child])
  const searchFieldUpdateData = (id, val, parent, child) => {
    if (child) {
      setData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: {
            ...(prev[parent] && prev[parent][child]) ? prev[parent][child] : {},
            [id]: val
          }
        }
      }));
    } else {
      setData((prev) => ({
        ...prev,
        [parent]: {
          ...(prev[parent] || {}),
          [id]: val
        }
      }));
    }
  }


  useEffect(() => {
    if (search.length > 3) {
      setIsHidden(true);
    } else {
      setIsHidden(false);
    }
  }, [search])

  const handleResetSection = () => {
    if (activeSection && (activeChild && activeChild !== 'null')) {
      // saveData({ jsdata: JSON.stringify({ ...data, [activeSection]: { ...data[activeSection], [activeChild]: null} }) })
      // setData({ ...data, [activeSection]: { ...data[activeSection], [activeChild]: null } })
      const newData = { ...data };
      Object.keys(newData?.[activeSection]?.[activeChild]).forEach((key) => {
        newData[activeSection][activeChild][key] = '';

      })
      saveData({ jsdata: JSON.stringify(newData) })


      location.reload()
    } else if (!activeChild || activeChild === 'null') {
      // saveData({ jsdata: JSON.stringify({ ...data, [activeSection]: null }) })
      // setData({ ...data, [activeSection]: null })

      const newData = { ...data };
      Object.keys(newData?.[activeSection]).forEach((key) => {
        newData[activeSection][key] = '';

      })
      saveData({ jsdata: JSON.stringify(newData) })

      location.reload()
    }
  }

  return (
    <div className='bPlSettings'>
      <Navbar {...{ search, setSearch, saveData, isLoading, isHidden, setIsHidden, options, onSaveData, setData, data, activeSection, activeChild, isEqual, setIsEqual, isSaved, setIsSaved, handleResetData, handleResetSection }} />
      <div className='bPlSettingsSection'>
        {(search.length < 4 && sections?.length>1) && <Sidebar sections={sections} {...activeProps} isHidden={isHidden} refetch={refetch} />}
        <div className={`bPlSettingsBody ${isHidden ? "bPlWidthFull" : "bPlBodyWidth"}`} >
          {
            search.length > 3 ?
              <SearchBodyFields {...{ search, setSearch, options, sections, data, setData, isLoading, activeSection, activeChild }} updateData={searchFieldUpdateData} />
              :
              <Body dbData={dbData} search={search} setSearch={setSearch} options={options} {...activeProps} updateData={updateData} sections={sections} data={data} setData={setData} isLoading={isLoading} refetch={refetch} />
          }
        </div>
      </div>
      <Footer setIsSaved={setIsSaved} saveData={saveData} isLoading={isLoading} onSaveData={onSaveData} handleResetData={handleResetData} handleResetSection={handleResetSection} />
    </div>
  );
};

export default Main;