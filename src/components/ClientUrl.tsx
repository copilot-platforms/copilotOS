"use client";
import { initFlowbite } from "flowbite";
import { useState } from "react";
import { MdLink } from "react-icons/md";
export function ClientUrl({ name }: { name: string }) {
  let defaulMsg = "Copy to clipboard";
  const url = `${window.location.origin}/view?name=${name}`;
  const [tooltipMsg, setMsg] = useState(defaulMsg);
  const copy = () => {
    initFlowbite();
    navigator.clipboard.writeText(url);
    setMsg(`Copied ${url} to clipboard`);
    setTimeout(() => {
      setMsg(defaulMsg);
    }, 1500);
  };
  return (
    <>
      <button
        onClick={copy}
        data-tooltip-target="tooltip-default"
        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
      >
        <MdLink/>
      </button>
      <div
        id="tooltip-default"
        role="tooltip"
        className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
      >
        {tooltipMsg}
      </div>
    </>
  );
}
