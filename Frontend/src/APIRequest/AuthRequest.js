//Internal Import
import ToastMessage from "../helpers/ToastMessage";
import { SetLogin } from "../redux/slices/AuthSlice";
import { SetUserDetails, SetUserRole } from "../redux/slices/UserSlice";
import store from "../redux/store/store";
import RestClient from "./RestClient";

class AuthRequest {
  static async LoginUser(postBody) {
    const data = await RestClient.postRequest("/login", postBody);

    if (data) {
      store.dispatch(SetLogin(data.data?.token));
      store.dispatch(SetUserDetails(data.data?.UserId));
      store.dispatch(SetUserRole(data.data?.role));
      
      ToastMessage.successMessage("User Login Successfull");
    } else {
      ToastMessage.errorMessage("Invalid Credentials");
    }
  }

  static async Getstudent(postBody) {
    const data = await RestClient.postRequest("/get-student", postBody);

    if (data) {
     // ToastMessage.successMessage("Student Details Fetched Successfull");
      return data;
    } else {
     // ToastMessage.errorMessage("Invalid Student ID");
    }
  }

  static async Getallstudent() {
    const data = await RestClient.postRequest("/getall-student");

    if (data) {
   
      return data;
    } else {
     
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

  static async AddMissingID(postBody) {
    const data = await RestClient.postRequest("/add-missing-id", postBody);

    if (data) {
      ToastMessage.successMessage("Student Added Successfull");
      window.location.reload();
    } else {
      ToastMessage.errorMessage("Error in Adding");
    }
  }
}

export default AuthRequest;
