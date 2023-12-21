import { useSelector, useDispatch } from "react-redux";
import "./index.css";
import { authActions } from "../../store/auth";
import { useEffect } from "react";
import { fetchApi } from "../../utilities/fetch";

const Header = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.auth.isAuthenticated);

  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch(authActions.logout());
  };
  useEffect(() => {
    if (isAuth) {
      const verify = async () => {
        const response = await fetchApi("auth/verify", "get");
        console.log(await response);
        if (response.status == 200) {
          dispatch(authActions.updateUserId(response.data._id));
          if (response.data.isAdmin) {
            dispatch(authActions.setAdmin());
          }
          dispatch(authActions.login());
        } else {
          dispatch(authActions.logout());
        }
      };
      verify();
    }
  }, []);

  return (
    <header className="header">
      {isAuth && (
        <nav>
          <ul>
            <li>
              <button className="red" onClick={logoutHandler}>
                Log Out
              </button>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;
