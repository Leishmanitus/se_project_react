export const modalOptions = {
  formOptions: {
    formName: "garment",
    formTitle: "New Garment",
    formButtonText: "Add garment",
    formLoadingText: "...Saving",
  },
  previewOptions: {
    previewFormName: "preview",
    previewDeleteButton: "Delete item",
  },
  confirmationOptions: {
    confirmFormName: "confirm",
    confirmMessage:
      "Are you sure you want to delete this item? This action is irreversible.",
    confirmText: "Yes, delete item",
    confirmCancelText: "Cancel",
    confirmLoadingText: "...Deleting",
  },
  loginOptions: {
    loginFormName: "signin",
    signupFormName: "signup",
    loginTitle: "Log In",
    loginButton: "Log In",
    signupTitle: "Sign Up",
    signupButton: "Sign Up",
    loginLoadingText: "...Logging in",
    signupLoadingText: "...Registering"
  },
  editProfileOptions: {
    editProfileFormName: "signin",
    editProfileTitle: "Change profile data",
    editProfileButton: "Save Changes",
    editProfileLoading: "...Saving",
  }
};

export const prefferedLocation = {
  name: "Lake Charles",
  latitude: 30.212942,
  longitude: -93.21891,
};

export const url = process.env.NODE_ENV === "production" 
? "https://alphazoo.crabdance.com"
: "http://localhost:3001";
