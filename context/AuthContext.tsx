import {
  ReactNode,
  createContext,
  useState,
  useContext,
  useEffect,
} from "react";
import {
  createUser,
  verifyUser,
  verifyUserWithToken,
} from "../services/AuthService";

const AuthContextInitialData = {
  isLoggedIn: false,
  errMessage: "",
  logout: (): void => {},
  login: async (
    email: string | undefined,
    password: string | undefined
  ): Promise<void> => {},
  register: async (
    name: string,
    email: string,
    password: string
  ): Promise<void> => {},
  userDetails: { name: "", email: "", user_id: "" },
};
export const AuthContext = createContext<typeof AuthContextInitialData>(
  AuthContextInitialData
);

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  // if (!context) throw new Error("There must be some errror in useAuthContext");
  return context;
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [errMessage, setErrMessage] = useState("");
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    user_id: "",
  });

  //Initial check for authToken
  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (authToken) {
      const authTokenJson = JSON.parse(authToken);
      // console.log(authTokenJson.token);
      verifyUserWithToken(authTokenJson.token)
        .then((res) => {
          const user_id = res.data._id;
          const email = res.data.email;
          const name = res.data.name;
          console.log({ user_id, email, name });
          setUserDetails({ name, email, user_id });
          setLoggedIn(true);
        })
        .catch((err) => {});
    }
  }, [isLoggedIn]);

  function logout(): void {
    // console.log("Logging Out");
    localStorage.removeItem("authToken");
    setLoggedIn(false);
  }

  function errorMessageTimer(msg: string) {
    setErrMessage(msg);
    setTimeout(() => {
      setErrMessage("");
    }, 5 * 1000);
  }

  async function login(
    email: string | undefined,
    password: string | undefined
  ): Promise<void> {
    try {
      const res = await verifyUser(email, password);
      localStorage.setItem("authToken", JSON.stringify(res.data));
      setLoggedIn(true);
    } catch (err: any) {
      errorMessageTimer("Wrong username or password");
      console.log("Error: ", err);
    }
  }

  async function register(
    name: string,
    email: string,
    password: string
  ): Promise<void> {
    try {
      console.log({ name, email, password });
      if (!name || !email || !password) {
        errorMessageTimer("Some of the fields have wrong info or are empty");
        return;
      }
      const res = await createUser(name, email, password);
      localStorage.setItem("authToken", JSON.stringify(res.data));
      setLoggedIn(true);
    } catch (err: any) {
      console.log("Error registering : ", err);
    }
  }

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, errMessage, userDetails, logout, login, register }}
    >
      {children}
    </AuthContext.Provider>
  );
}
