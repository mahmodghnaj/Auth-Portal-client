import { TypeOptions, toast } from "react-toastify";

function useNotification() {
  const showNotification = (message: string, type: TypeOptions) => {
    toast(message, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000,
      type: type,
    });
  };

  const handleErrorResponse = (error: any) => {
    if (error.response) {
      const { status, data } = error.response;
      if (status === 401) {
        showNotification("Unauthorized", "error");
      } else if (data.errors) {
        const errorMessages = Object.values(data.errors).join(", ");
        showNotification(errorMessages, "error");
      } else if (data.message) {
        showNotification(data.message, "error");
      }
    } else {
      showNotification("An unexpected error occurred", "error");
    }
  };

  const showSuccess = (message: string) => {
    showNotification(message, "success");
  };

  const showError = (message: string) => {
    showNotification(message, "error");
  };

  const showInfo = (message: string) => {
    showNotification(message, "info");
  };

  return {
    showSuccess,
    showError,
    showInfo,
    handleErrorResponse,
  };
}

export default useNotification;
