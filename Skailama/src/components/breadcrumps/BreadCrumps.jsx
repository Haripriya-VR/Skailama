import React from 'react';

function BreadCrumps({ projectName ,secondName}) {

    return (
        <nav className="flex" aria-label="Breadcrumb">
            <ol className="flex items-end space-x-1 md:space-x-2 rtl:space-x-reverse">
                <li className="inline-flex items-center">
                    <a href="#" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
                        <svg width="45" height="45" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M26.0002 13.4116L36.8335 23.1616V40.0833H32.5002V27.0833H19.5002V40.0833H15.1668V23.1616L26.0002 13.4116ZM26.0002 7.58325L4.3335 27.0833H10.8335V44.4166H23.8335V31.4166H28.1668V44.4166H41.1668V27.0833H47.6668L26.0002 7.58325Z" fill="#7E22CE" />
                        </svg>
                    </a>
                </li>
                <li>
                    <div className="flex items-end text-2xl dark:text-gray-400">
                        /
                        <a href="#" className="ms-1 text-2xl font-medium text-gray-700  md:ms-2 dark:text-gray-400 ">{projectName}</a>
                    </div>
                </li>
                <li>
                    <div className="flex items-end text-2xl dark:text-gray-400">
                        /
                        <a href="#" className="ms-1 text-2xl font-medium theamColor  md:ms-2 ">{secondName}</a>
                    </div>
                </li>
               
            </ol>
        </nav>
    );
}

export default BreadCrumps;