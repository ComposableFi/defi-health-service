import * as React from "react";
import { BridgeStatus } from "../pages";

const UpdateBridgeButton = ({ name, is_healthy }: BridgeStatus) => (
  <button
    disabled={false}
    type="button"
    className={
      "relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 hover:text-white rounded-lg group bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 group-hover:from-red-200 group-hover:via-red-300 group-hover:to-yellow-200 focus:ring-4 focus:ring-red-100 dark:focus:ring-red-400 hover:cursor-pointer"
    }
    onClick={() => {}}
  >
    <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0 ">
      {is_healthy ? `Disable ${name} Bridge` : `Enable ${name} Bridge`}
    </span>
  </button>
);
UpdateBridgeButton.displayName = "UpdateBridgesButton";
export default UpdateBridgeButton;
