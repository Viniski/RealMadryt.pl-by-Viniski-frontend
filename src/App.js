import { useEffect, useReducer, lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useCookies } from "react-cookie";
import AuthContext from "./context/authContext";
import ReducerContext from "./context/reducerContext";
import axios from "axios";
import { axiosInstance } from "./axios";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import LoadingIcon from "./components/UI/LoadingIcon/BouncingBalls";
import Searchbar from "./components/UI/Searchbar/Searchbar";
import Layout from "./components/Layout/Layout";
import Nav from "./components/Header/Nav/Nav";
import Champions from "./components/Header/Champions/Champions";
import Home from "./pages/Home/Home";
import Article from "./pages/Article/Article";
import Search from "./pages/Search/Search";
import WelcomeUser from "./pages/Auth/WelcomeUser/WelcomeUser";
import NotFound from "./pages/NotFound/NotFound";
import Login from "./pages/Auth/Login/Login";
import Registration from "./pages/Auth/Registration/Registration";
import { reducer } from "./reducer";
import ErrorBoundary from "./hoc/ErrorBoundary";
import "./App.css";

const AuthenticatedRoute = lazy(() => import("./hoc/AuthenticatedRoute"));

function App() {
  const initialState = {
    articles: [],
    isAuthenticated: false,
    user: null,
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  const [cookies] = useCookies();

  useEffect(() => {
    async function getData() {
      const res = await axiosInstance.get("/articles");
      dispatch({ type: "set-articles", articles: res.data });
    }

    async function getUserSocialAuth() {
      fetch(`${process.env.REACT_APP_API_URL}/auth/login/success`, {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      })
        .then((response) => {
          if (response.status === 200) return response.json();
          throw new Error("Social authentication has been failed!");
        })
        .then((data) => {
          const user = {
            userName: data.user.displayName || `github${data.user.id}`,
            id: data.user.id,
            authenticationMethod: "social",
          };
          dispatch({ type: "login", user });
        })
        .catch((error) => {
          console.error(error);
        });
    }

    let authAxios = axios.create({
      baseURL: process.env.REACT_APP_API_URL,
      headers: {
        Authorization: `Bearer ${cookies.jwt}`,
      },
      withCredentials: true,
    });

    let refreshAuthAxios = axios.create({
      baseURL: process.env.REACT_APP_API_URL,
      headers: {
        Authorization: `Bearer ${cookies.refreshjwt}`,
      },
      withCredentials: true,
    });

    const unverifiedRefreshToken = () => {
      dispatch({ type: "logout" });
    };

    const verifiedRefreshToken = async (newAccessToken) => {      
      try {
        authAxios = axios.create({
          baseURL: process.env.REACT_APP_API_URL,
          headers: {
            Authorization: `Bearer ${newAccessToken}`,
          },
          withCredentials: true,
        });
        const dataUser = await authAxios.post("/authorization");
        dispatch({ type: "login", user: dataUser });
      } catch (error) {
        console.error(error.message);
      }
    };

    const unverifiedAccessToken = async () => {
      try {
        const newAccessToken = await refreshAuthAxios.post("/refresh-token");
        authAxios = axios.create({
          baseURL: process.env.REACT_APP_API_URL,
          headers: {
            Authorization: `Bearer ${newAccessToken}`,
          },
          withCredentials: true,
        });
        try {
          const dataUser = await authAxios.post("/authorization");
          dispatch({ type: "login", user: dataUser });
        } catch (error) {
          console.error(error.message, "nie powiodło się z refreshTokenem, wylogowany");
        }
      } catch (error) {
        console.error(error.message,"nie powiodło się z refreshTokenem, wylogowany");
        dispatch({ type: "logout" });
      }
    };

    const verifiedAccessToken = (dataUser) => {
      const authUser = {
        email: dataUser.data.email,
        userName: dataUser.data.user,
        authenticationMethod: "default",
      };
      dispatch({ type: "login", user: authUser });
    };

    const noRefreshToken = () => {
      dispatch({ type: "logout" });
    };

    const onlyRefreshToken = async () => {
      try {
        const newAccessToken = await refreshAuthAxios.post("/refresh-token");
        verifiedRefreshToken(newAccessToken);
      } catch (error) {
        console.error(error.message);
        unverifiedRefreshToken();
      }
    };

    const haveAccessAndRefreshToken = async () => {
      try {
        const dataUser = await authAxios.post("/authorization");
        verifiedAccessToken(dataUser);
      } catch (error) {
        console.error(error.message);
        unverifiedAccessToken();
      }
    };

    const getUserDefaultAuth = async () => {
      let jwt = cookies?.jwt;
      let refreshjwt = cookies?.refreshjwt;
      if (!refreshjwt) {
        noRefreshToken();
      } else {
        if (!jwt) {
          onlyRefreshToken();
        } else {
          haveAccessAndRefreshToken();
        }
      }
    };

    getUserDefaultAuth();
    getUserSocialAuth();
    getData();
  }, []);

  return state.articles.length ? (
    <Router>
      <AuthContext.Provider
        value={{
          isAuthenticated: state.isAuthenticated,
          user: state.user,
          login: (user) => dispatch({ type: "login", user }),
          logout: () => dispatch({ type: "logout" }),
        }}
      >
        <ReducerContext.Provider
          value={{
            state: state,
            dispatch: dispatch,
          }}
        >
          <Layout
            header={
              <Header>
                <Nav />
                <Champions />
                <Searchbar targetDevice={"deskop"} />
              </Header>
            }
            content={
              <ErrorBoundary>
                <Routes>
                  <Route
                    path="/profil"
                    element={
                      <Suspense fallback={<p>Ładowanie...</p>}>
                        <AuthenticatedRoute />
                      </Suspense>
                    }
                  />
                  <Route path="/news/:id" element={<Article />} />
                  <Route path="/wyszukaj/:term" element={<Search />} />
                  <Route
                    path="/wyszukaj/:term/news/:id"
                    element={<Article />}
                  />
                  <Route path="/zaloguj" element={<Login />} />
                  <Route path="/rejestracja" element={<Registration />} />
                  <Route
                    path="/rejestracja/powitanie"
                    element={<WelcomeUser />}
                  />
                  <Route path="/" exact element={<Home />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </ErrorBoundary>
            }
            footer={<Footer />}
          />
          ;
        </ReducerContext.Provider>
      </AuthContext.Provider>
    </Router>
  ) : (
    <LoadingIcon />
  );
}

export default App;
