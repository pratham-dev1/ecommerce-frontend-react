import axios from "axios";
import history from "../components/UnsavedChangesBlocker/History";


const axiosClient = axios.create({
  baseURL: "http://localhost:5000/",
  headers: {
    "Content-Type": "application/json",
  }
});


//request - interceptor
axiosClient.interceptors.request.use(
  (req: any) => {
    const token = localStorage.getItem("token");
    if (token) {
      req.headers["authorization"] = token;
    }
    return req;
  },
  (err) => {
    console.log(err)
     return Promise.reject(err);
  }
);


//response - interceptor
axiosClient.interceptors.response.use(
  (response: any) => {
    return response;
  },
  async (err) => {                                 // it is working with async await .... i used 'then catch' but not loading the data on page after generating new token
    // console.log("eeerrrr", err);
    if (err.response.status === 401) {
      const refreshToken = localStorage.getItem("refreshToken") || "";
      let result = await axiosClient.post("/refresh-token", {
        refreshToken: refreshToken,
      });

      console.log("Refresh", result.data.token);
      localStorage.setItem("token", result.data.token);
      localStorage.setItem("refreshToken", result.data.refreshToken);
      err.config.headers["authorization"] = result.data.token;       // this is for updating the header token 
      return axios(err.config);            // this helps us to re-call the failed api 
    } 
    else if(err.response.status === 500) {
      // window.location.replace("/error");
     history.replace("/error")
    }
    else {
      return Promise.reject(err);
    }
  }
);


export default axiosClient;
