import Swal from 'sweetalert2';

export const showModal = ({
  title,
  html,
  icon = 'info',
  showCancelButton = false,
  confirmButtonText = 'OK',
  cancelButtonText = 'Cancel',
  confirmButtonColor = 'primary',
  dangerMode = false,
  onConfirm = () => {},
  onCancel = () => {},
}) => {
  // Instagram-inspired gradient colors for buttons
  const colorClasses = {
    primary: 'bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600',
    danger: 'bg-gradient-to-r from-rose-500 to-red-600 hover:from-rose-600 hover:to-red-700',
    success: 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700',
    warning: 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600',
  };

  const confirmBtnColor = dangerMode ? colorClasses.danger : colorClasses[confirmButtonColor];

  // Instagram-inspired design system
  const customClasses = {
    popup: 'rounded-xl shadow-xl border border-gray-100',
    title: 'text-gray-800 font-bold text-xl md:text-2xl',
    htmlContainer: 'text-left text-gray-600 p-4',
    confirmButton: `${confirmBtnColor} text-white rounded-lg py-3 px-6 font-medium shadow-md transform transition-all duration-200 hover:shadow-lg hover:translate-y-[-2px]`,
    cancelButton: 'bg-gray-50 text-gray-700 border border-gray-200 rounded-lg py-3 px-6 font-medium transition-all duration-200 hover:bg-gray-100 hover:shadow-sm',
    actions: 'gap-3 p-4',
    icon: 'p-2',
  };

  return Swal.fire({
    title,
    html,
    icon,
    showCancelButton,
    confirmButtonText,
    cancelButtonText,
    position: 'center',
    customClass: customClasses,
    buttonsStyling: false,
    showClass: {
      popup: 'animate__animated animate__fadeIn animate__faster'
    },
    hideClass: {
      popup: 'animate__animated animate__fadeOut animate__faster'
    },
    backdrop: `
      rgba(0,0,0,0.5)
      backdrop-filter: blur(3px)
    `,
    focusConfirm: false,
    allowOutsideClick: true
  }).then((result) => {
    if (result.isConfirmed) {
      onConfirm();
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      onCancel();
    }
  });
};

export const showSuccessModal = (title, message) => {
  return showModal({
    title,
    html: `
      <div class="p-2">
        <p class="text-green-600">${message}</p>
      </div>
    `,
    icon: 'success',
    confirmButtonText: 'Great!',
    confirmButtonColor: 'success'
  });
};

export const showErrorModal = (title, message) => {
  return showModal({
    title,
    html: `
      <div class="p-2">
        <p class="text-red-600">${message}</p>
      </div>
    `,
    icon: 'error',
    confirmButtonText: 'OK',
    confirmButtonColor: 'danger'
  });
};

export const showConfirmModal = (title, message, onConfirm) => {
  return showModal({
    title,
    html: `
      <div class="p-2">
        <p>${message}</p>
      </div>
    `,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Confirm',
    cancelButtonText: 'Cancel',
    dangerMode: true,
    onConfirm
  });
};

export const showDeleteConfirmModal = (itemType, details, onConfirm) => {
  return showModal({
    title: `Confirm ${itemType} Deletion`,
    html: `
      <div class="space-y-4 p-2">
        <!-- Animated warning icon -->
        <div class="flex justify-center mb-2">
          <div class="rounded-full bg-amber-50 p-4 border border-amber-200 animate-pulse">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
        </div>
        
        <div class="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
          </svg>
          <p>You're about to delete your Instagram ${itemType.toLowerCase()}.</p>
        </div>
        
        <div class="border-l-4 border-red-500 bg-red-50 p-3 text-red-600 font-semibold rounded-r-md">
          This action cannot be undone!
        </div>
        
        ${details ? `<p class="text-gray-600 text-sm border-l-4 border-gray-300 pl-3 py-1">${details}</p>` : ''}
      </div>
      
      <style>
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.05); opacity: 0.9; }
        }
        .animate-pulse {
          animation: pulse 2s infinite;
        }
      </style>
    `,
    icon: null, // Using custom icon in the HTML
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it',
    cancelButtonText: 'Keep it',
    dangerMode: true,
    onConfirm
  });
};

// New Instagram-specific function for Instagram cleanup
export const showInstagramCleanupModal = (postCount, onConfirm) => {
  return Swal.fire({
    title: 'Confirm posts Deletion',
    html: `
      <div class="space-y-4 px-2 py-3">
        <!-- Instagram-branded header (already included in the modal) -->
        <div class="flex items-center justify-center mb-2">
          <div class="rounded-full bg-amber-50 p-4 border border-amber-200">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
        </div>
        
        <div class="flex items-center gap-2 justify-center mb-1">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
            <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
            <path fill-rule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clip-rule="evenodd" />
          </svg>
          <p class="text-gray-700">You're about to delete your Instagram posts.</p>
        </div>
        
        <div class="border-l-4 border-red-500 bg-red-50 p-3 text-red-600 font-semibold rounded-r-md text-center">
          This action cannot be undone!
        </div>
      </div>
    `,
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it',
    cancelButtonText: 'Keep it',
    customClass: {
      popup: 'rounded-xl shadow-2xl border border-gray-200',
      title: 'text-gray-800 font-bold text-xl',
      confirmButton: 'bg-gradient-to-r from-rose-500 to-red-600 hover:from-rose-600 hover:to-red-700 text-white rounded-lg py-3 px-6 font-medium shadow-md transform transition-all duration-200 hover:shadow-lg hover:translate-y-[-2px]',
      cancelButton: 'bg-gray-50 text-gray-700 border border-gray-200 rounded-lg py-3 px-6 font-medium transition-all duration-200 hover:bg-gray-100 hover:shadow-sm',
      actions: 'gap-3 p-4',
    },
    buttonsStyling: false,
    showClass: {
      popup: 'animate__animated animate__fadeIn animate__faster'
    },
    hideClass: {
      popup: 'animate__animated animate__fadeOut animate__faster'
    },
    backdrop: `
      rgba(0,0,0,0.5)
      backdrop-filter: blur(3px)
    `,
  }).then((result) => {
    if (result.isConfirmed) {
      onConfirm();
    }
  });
};

// Loading state with spinner
export const showLoadingModal = (message = 'Processing...') => {
  return Swal.fire({
    title: '',
    html: `
      <div class="flex flex-col items-center p-4">
        <div class="spinner w-12 h-12 mb-4 rounded-full border-4 border-r-transparent border-purple-600 animate-spin"></div>
        <p class="text-gray-700">${message}</p>
      </div>
    `,
    showConfirmButton: false,
    allowOutsideClick: false,
    customClass: {
      popup: 'rounded-xl shadow-xl border border-gray-100',
    }
  });
};

// Toast notifications (smaller, less intrusive alerts)
export const showToast = (message, type = 'success') => {
  const iconMap = {
    success: `<svg class="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>`,
    error: `<svg class="w-5 h-5 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>`,
    warning: `<svg class="w-5 h-5 text-amber-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>`,
    info: `<svg class="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`,
  };

  const bgColorMap = {
    success: 'bg-green-50 border-l-4 border-green-500',
    error: 'bg-red-50 border-l-4 border-red-500',
    warning: 'bg-amber-50 border-l-4 border-amber-500',
    info: 'bg-blue-50 border-l-4 border-blue-500',
  };

  return Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    customClass: {
      popup: `rounded-md shadow-lg ${bgColorMap[type]} p-3`,
    },
  }).fire({
    html: `
      <div class="flex items-center">
        ${iconMap[type]}
        <span>${message}</span>
      </div>
    `
  });
};