import React from 'react';

const ProgressSection = ({ stats, onCancel }) => {
  const { deleted, total, inProgress, elapsedSeconds } = stats;
  const progressPercentage = total > 0 ? (deleted / total) * 100 : 0;
  
  // Calculate ETA
  let etaMessage = "";
  if (inProgress && deleted > 0 && total > 0) {
    const itemsRemaining = total - deleted;
    const secondsPerItem = elapsedSeconds / deleted;
    const etaSeconds = itemsRemaining * secondsPerItem;
    const etaMins = Math.floor(etaSeconds / 60);
    const etaSecs = Math.round(etaSeconds % 60);
    etaMessage = `ETA: ${etaMins}m ${etaSecs}s remaining`;
  }
  
  // Format elapsed time
  const elapsedMins = Math.floor(elapsedSeconds / 60);
  const elapsedSecs = elapsedSeconds % 60;
  
  // Determine status message
  let statusMessage = "Initializing...";
  if (inProgress) {
    statusMessage = `Deleting... (${progressPercentage.toFixed(1)}% complete)`;
  } else if (!inProgress && deleted > 0) {
    if (deleted === total) {
      statusMessage = "Deletion Complete!";
    } else {
      statusMessage = "Process Stopped";
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center text-gray-700">
        <i className="fas fa-tasks mr-2"></i>
        <h2 className="font-semibold">Deletion Progress</h2>
      </div>

      <div className="relative pt-1">
        <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
          <div 
            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-brand-purple to-brand-pink"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>{deleted} deleted</span>
          <span>of {total} total</span>
        </div>
      </div>

      <div className="text-center py-3">
        <div className="text-sm font-medium text-gray-700">
          {statusMessage}
          <br />
          <span className="text-xs">Elapsed: {elapsedMins}m {elapsedSecs}s</span>
        </div>
        <div className="text-xs text-gray-500 mt-1">{etaMessage}</div>
      </div>

      <button 
        className={`w-full py-3 font-medium rounded-lg flex items-center justify-center transition-colors ${
          inProgress 
            ? "bg-gray-700 text-white" 
            : "bg-gray-300 text-gray-600"
        }`}
        onClick={onCancel}
        disabled={!inProgress}
      >
        <i className="fas fa-stop-circle mr-2"></i>
        <span>Stop Process</span>
      </button>
    </div>
  );
};

export default ProgressSection;