import React from 'react';
import Button from './common/Button';

const ProgressSection = ({ stats, onCancel }) => {
  const { deleted, total, inProgress, elapsedSeconds } = stats;
  const progressPercentage = total > 0 ? Math.min((deleted / total) * 100, 100) : 0;
  
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
  const elapsedSecs = Math.floor(elapsedSeconds % 60);
  
  // Determine status message and icon
  let statusMessage = "Initializing...";
  let statusIcon = "fa-circle-notch fa-spin text-purple-500";
  
  if (inProgress) {
    if (deleted > 0) {
      statusMessage = `Deleting content (${progressPercentage.toFixed(1)}% complete)`;
      statusIcon = "fa-spinner fa-spin text-purple-500";
    } else {
      statusMessage = "Scanning content...";
      statusIcon = "fa-search fa-pulse text-purple-500";
    }
  } else if (!inProgress && deleted > 0) {
    if (deleted === total) {
      statusMessage = "Deletion Complete!";
      statusIcon = "fa-check-circle text-green-500";
    } else {
      statusMessage = "Process Stopped";
      statusIcon = "fa-stop-circle text-yellow-500";
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center text-gray-800 mb-4">
        <i className="fas fa-tasks text-purple-500 mr-2"></i>
        <h2 className="text-xl font-semibold">Cleanup Progress</h2>
      </div>

      <div className="bg-gray-50 p-6 rounded-xl">
        <div className="mb-4">
          <div className="relative pt-1">
            <div className="overflow-hidden h-4 flex rounded-full bg-gray-200">
              <div 
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500 ease-in-out relative"
                style={{ width: `${progressPercentage}%` }}
              >
                {progressPercentage > 15 && (
                  <span className="absolute inset-0 flex items-center justify-center text-xs font-bold">
                    {progressPercentage.toFixed(0)}%
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="flex justify-between text-sm text-gray-600 mt-2 font-medium">
            <span>{deleted} deleted</span>
            <span>of {total} total</span>
          </div>
        </div>

        <div className="text-center py-6 space-y-3">
          <div className="text-4xl">
            <i className={`fas ${statusIcon}`}></i>
          </div>
          <div className="text-lg font-semibold text-gray-800">
            {statusMessage}
          </div>
          <div className="flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-4 text-sm text-gray-500">
            <span className="flex items-center justify-center">
              <i className="far fa-clock mr-1"></i>
              {elapsedMins}m {elapsedSecs}s
            </span>
            {etaMessage && (
              <span className="flex items-center justify-center">
                <i className="far fa-hourglass mr-1"></i>
                {etaMessage}
              </span>
            )}
          </div>
        </div>
      </div>

      <Button 
        variant="danger"
        onClick={onCancel}
        disabled={!inProgress}
        className={!inProgress ? "opacity-50 cursor-not-allowed" : ""}
      >
        <i className="fas fa-stop-circle mr-2"></i>
        <span>Stop Process</span>
      </Button>
      
      {!inProgress && (
        <Button 
          variant="secondary"
          onClick={() => window.location.reload()}
        >
          <i className="fas fa-home mr-2"></i>
          <span>Return to Dashboard</span>
        </Button>
      )}
    </div>
  );
};

export default ProgressSection;