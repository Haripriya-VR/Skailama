import React, { useState } from 'react';
import Sidebar from '../components/sidebar/Sidebar';
import BreadCrumps from '../components/breadcrumps/BreadCrumps';
import Arrow from '../components/icons/Arrow';
import Language from '../components/icons/Language';
import Notifications from '../components/icons/Notifications';
import { useLocation } from 'react-router-dom';
import GeneralWidget from '../components/forms/GeneralWidget';
import DisplayWidget from '../components/forms/DisplayWidget';

function WidgetGeneral() {

  const location = useLocation();
  const projectName = location.state;

  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleClick = (index) => {
    setSelectedIndex(index);
  };

  const items = ['General', 'Display', 'Advanced'];
  const breadcrumbTitle = items[selectedIndex];

  return (
    <div className='flex'>
      <Sidebar className=" h-dvh" />
      <div className='flex-1 p-4  m-8'>
        {/* Header */}
        <div className="flex justify-between items-center h-16 mb-4">
          <div className='pb-4'>
            <BreadCrumps projectName={'Widget Configuration'} secondName={breadcrumbTitle} />
          </div>
          <div className='flex items-center'>
            <Arrow />
            <p className='font-bold text-3xl pt-1 pe-2 '>EN</p>
            <Language />
            <Notifications />
          </div>
        </div>

        <div className='bg-lightgray py-2 rounded-lg'>
          <h1 className='theamColor font-bold text-5xl '>Configuration</h1>
        </div>

        {/* Tab Selection */}
        <div className="flex border-b-4 borderColor">
          {items.map((item, index) => (
            <p
              key={index}
              onClick={() => item === 'Advanced' ? null : handleClick(index)} 
              className={`px-10 py-2 text-xl cursor-pointer transition-colors duration-200 ${selectedIndex === index ? 'border-b-4 theamBorder font-bold theamColor' : 'Widget_title'} ${item === 'Advanced' ? 'cursor-not-allowed' : ''}`} 
            >
              {item}
            </p>
          ))}
        </div>

        {/* input form */}
        <div>
          {selectedIndex === 0 && <GeneralWidget />}
          {selectedIndex === 1 && <DisplayWidget />}
        </div>

      </div>
    </div>
  );
}

export default WidgetGeneral;
