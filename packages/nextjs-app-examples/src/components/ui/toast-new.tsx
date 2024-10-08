import { re } from "mathjs";
import { toast } from "sonner";

const SuccessIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      className="mr-3"
    >
      <path
        d="M16 7.99936C16 12.4173 12.4183 15.9987 8 15.9987C3.58172 15.9987 0 12.4173 0 7.99936C0 3.58144 3.58172 0 8 0C12.4183 0 16 3.58144 16 7.99936ZM5.67322 7.35237C5.24469 6.90871 4.54991 6.90871 4.12138 7.35237C3.69286 7.79602 3.69286 8.51532 4.12138 8.95897L6.17552 11.0856C6.66695 11.5944 7.48225 11.5944 7.97368 11.0856L11.9786 6.93934C12.4071 6.49569 12.4071 5.77639 11.9786 5.33274C11.5501 4.88909 10.8553 4.88909 10.4268 5.33274L7.0746 8.80321L5.67322 7.35237Z"
        fill="#0FB657"
      />
    </svg>
  );
};

const ErrorIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      className="mr-3"
    >
      <path
        d="M16 7.99936C16 12.4173 12.4183 15.9987 8 15.9987C3.58172 15.9987 0 12.4173 0 7.99936C0 3.58144 3.58172 0 8 0C12.4183 0 16 3.58144 16 7.99936ZM8 9.76777L9.41422 11.182C9.90237 11.6701 10.6938 11.6701 11.182 11.182C11.6701 10.6938 11.6701 9.90237 11.182 9.41422L9.76777 8L11.182 6.58579C11.6701 6.09763 11.6701 5.30618 11.182 4.81802C10.6938 4.32987 9.90237 4.32987 9.41422 4.81802L8 6.23223L6.58579 4.81802C6.09763 4.32987 5.30618 4.32987 4.81802 4.81802C4.32987 5.30618 4.32987 6.09763 4.81802 6.58579L6.23223 8L4.81802 9.41422C4.32987 9.90237 4.32987 10.6938 4.81802 11.182C5.30618 11.6701 6.09763 11.6701 6.58579 11.182L8 9.76777Z"
        fill="#FF5628"
      />
    </svg>
  );
};

const WarningIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      className="mr-3"
    >
      <path
        d="M16 7.99936C16 12.4173 12.4183 15.9987 8 15.9987C3.58172 15.9987 0 12.4173 0 7.99936C0 3.58144 3.58172 0 8 0C12.4183 0 16 3.58144 16 7.99936ZM8.00003 3.5C7.18401 3.5 6.53419 4.18312 6.57494 4.99813L6.68761 7.25156C6.72258 7.95092 7.2998 8.5 8.00003 8.5C8.70026 8.5 9.27748 7.95091 9.31245 7.25156L9.42512 4.99813C9.46587 4.18312 8.81606 3.5 8.00003 3.5ZM8.00003 10C7.30968 10 6.75003 10.5596 6.75003 11.25C6.75003 11.9404 7.30968 12.5 8.00003 12.5C8.69039 12.5 9.25003 11.9404 9.25003 11.25C9.25003 10.5596 8.69039 10 8.00003 10Z"
        fill="#F4BE00"
      />
    </svg>
  );
};

const oldSuccess = toast.success;
const oldError = toast.error;
const oldWarning = toast.warning;

toast.success = (message, options = {}) => {
  return oldSuccess(message, {
    unstyled: true,
    style: {
      background: "#FFF",
      color: "#202334",
      border: "1px solid #8ADA47",
      borderRadius: "12px",
      display: "flex",
      padding: "8px 20px",
      alignItems: "center",
      boxShadow: "0px 0px 12px 0px rgba(196, 196, 196, 0.45)",
    },
    className: "text-sm",
    icon: <SuccessIcon />,
    ...options,
  });
};

toast.error = (message, options = {}) => {
  return oldError(message, {
    unstyled: true,
    style: {
      background: "#FFF",
      color: "#202334",
      border: "1px solid #FF9A7E",
      borderRadius: "12px",
      display: "flex",
      padding: "8px 20px",
      alignItems: "center",
      boxShadow: "0px 0px 12px 0px rgba(196, 196, 196, 0.45)",
    },
    icon: <ErrorIcon />,
    className: "text-sm",
    ...options,
  });
};

toast.warning = (message, options = {}) => {
  return oldWarning(message, {
    unstyled: true,
    style: {
      background: "#FFF",
      color: "#202334",
      border: "1px solid #F4BE00",
      borderRadius: "12px",
      display: "flex",
      padding: "8px 20px",
      alignItems: "center",
      boxShadow: "0px 0px 12px 0px rgba(196, 196, 196, 0.45)",
    },
    icon: <WarningIcon />,
    className: "text-sm",
    ...options,
  });
};

export { toast };
