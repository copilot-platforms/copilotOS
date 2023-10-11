'use client'
import {initFlowbite} from "flowbite";
import { useState } from 'react';

export function ClientUrl({ name }: { name: string }) {
    let defaulMsg = 'Copy to clipboard';
    const url = `https://copilot-qs46ep3wp-copilot-platforms.vercel.app/view?name=${name}`
    const [tooltipMsg, setMsg] = useState(defaulMsg); 
    const copy = () => {
        initFlowbite();
        navigator.clipboard.writeText(url);
        setMsg(`Copied ${url} to clipboard`);
        setTimeout(() => {
            setMsg(defaulMsg);
        }, 1500);
      }
    return (
        <div>
            <div>
                <button
                    onClick={copy} 
                    data-tooltip-target="tooltip-default"
                    className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                Copy Client URL
                </button>
            </div>
            <div id="tooltip-default" role="tooltip" className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                { tooltipMsg }
                <div className="tooltip-arrow" data-popper-arrow></div>
            </div>
        </div>
    );
  }