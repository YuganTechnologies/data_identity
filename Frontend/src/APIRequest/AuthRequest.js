//Internal Import
import ToastMessage from "../helpers/ToastMessage";
import { SetLogin } from "../redux/slices/AuthSlice";
import { SetUserDetails } from "../redux/slices/UserSlice";
import store from "../redux/store/store";
import RestClient from "./RestClient";

class AuthRequest {
  static async LoginUser(postBody) {
    const data = await RestClient.postRequest("/login", postBody);

    if (data) {
      store.dispatch(SetLogin(data.data?.token));
      store.dispatch(SetUserDetails(data.data?.UserId));
      ToastMessage.successMessage("User Login Successfull");
    } else {
      ToastMessage.errorMessage("Invalid Credentials");
    }
  }

  static async Getstudent(postBody) {
    const data = await RestClient.postRequest("/get-student", postBody);

    if (data) {
      ToastMessage.successMessage("User Fetched Successfull");
      return data;
    } else {
      ToastMessage.errorMessage("Invalid User ID");
    }
  }

  static async AddStudent(postBody) {
    const data = await RestClient.postRequest("/create-student", postBody);

    if (data) {
      ToastMessage.successMessage("Student Added Successfull");
      window.location.reload();
    } else {
      ToastMessage.errorMessage("Error in Adding");
    }
  }
}

export default AuthRequest;
