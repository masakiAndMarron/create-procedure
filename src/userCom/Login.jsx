import React, { useState, useCallback } from "react";
import { TextField, ProviderButton, ConfirmButton } from "../components/UIkit";
import LaunchIcon from "@mui/icons-material/Launch";
import GoogleIcon from "@mui/icons-material/Google";
import TwitterIcon from "@mui/icons-material/Twitter";
import { Divider } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useSelector, useDispatch } from "react-redux";
import { push } from "connected-react-router";
import { SignIn } from "../reducs/users/oparation";

export const CustomDivider = styled(Divider)({
  width: "80%",
  margin: "0 auto",
});

const Login = () => {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");

  const selector = useSelector((state) => state);
  const dispatch = useDispatch();

  const inputMail = useCallback(
    (event) => {
      setMail(event.target.value);
      if (event.target.value !== "") {
        return (
          event.target.classList.add("active"),
          event.target.previousElementSibling.classList.add("active")
        );
      } else {
        return (
          event.target.classList.remove("active"),
          event.target.previousElementSibling.classList.remove("active")
        );
      }
    },
    [setMail]
  );

  const inputPassword = useCallback(
    (event) => {
      setPassword(event.target.value);
      if (event.target.value !== "") {
        return (
          event.target.classList.add("active"),
          event.target.parentNode.firstChild.classList.add("active")
        );
      } else {
        return (
          event.target.classList.remove("active"),
          event.target.parentNode.firstChild.classList.remove("active")
        );
      }
    },
    [setPassword]
  );

  return (
    <body>
      <div class="container">
        <section>
          <main>
            <div class="main-box">
              <div class="box-header">
                <img src="" alt="" />
                <h2>サイトのロゴが入ります。</h2>
              </div>
              <div class="text-field">
                <TextField
                  label={"メールアドレス"}
                  type={"text"}
                  class={"input-info mail"}
                  onChange={inputMail}
                />
                <TextField
                  label={"パスワード"}
                  type={"password"}
                  class={"input-info password"}
                  onChange={inputPassword}
                />
                <div className="forget-pass">
                  <a href="#">
                    パスワードを忘れた方
                    <span>
                      <LaunchIcon />
                    </span>
                  </a>
                </div>
                <ConfirmButton
                  label={"ログイン"}
                  onClick={() => dispatch(SignIn(mail, password))}
                />
              </div>
              <CustomDivider />
              <div className="second-box">
                <div>または以下のアカウントでログイン</div>
                <div>
                  <ProviderButton img={<GoogleIcon />} label={"Google"} />
                  <ProviderButton img={<TwitterIcon />} label={"Twitter"} />
                </div>
              </div>
              <CustomDivider />
              <div className="third-box">
                <div>
                  <p>
                    アカウントをお持ちでない方は
                    <span>
                      <a href="" onClick={() => dispatch(push("/signup"))}>
                        こちら
                      </a>
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </main>
          <footer></footer>
        </section>
      </div>
    </body>
  );
};

export default Login;
