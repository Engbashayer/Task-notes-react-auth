import instance from ".";
import jwt_decode from "jwt-decode";
const login = async (userInfo) => {
  const { data } = await instance.post("/auth/login", userInfo);

  console.log(data);
  storeToken(data.token);
  return data;
};

const logout = () => {
  localStorage.removeItem("token");
};
const storeToken = (token) => {
  localStorage.setItem("token", token);
};

const checkToken = () => {
  const token = localStorage.getItem("token");
  if (token) {
    const decode = jwt_decode(token);
    const currentTime = Date.now() / 1000;
    if (decode.exp < currentTime) {
      localStorage.removeItem("token");
      return false;
    }
    return true;
  }
  return false;
};
const register = async (userInfo) => {
  const formData = new FormData();
  for (const key in userInfo) formData.append(key, userInfo[key]);

  const { data } = await instance.post("/auth/register", formData);
  storeToken(data.token);
  return data;
};

const me = async () => {
  const { data } = await instance.get("/auth/me");
  return data;
};

const getAllUsers = async () => {
  const { data } = await instance.get("/auth/users");
  return data;
};

export { storeToken, checkToken, logout, login, register, me, getAllUsers };
