import React, { useCallback, useState, useEffect } from "react";
import { TextField } from "../components/UIkit";
import { ConfirmButton } from "../components/UIkit";
import { useDispatch } from "react-redux";
import { push } from "connected-react-router";
import { CustomDivider } from "./Login";
import { signUp } from "../reducs/users/oparation";

const SignUp = () => {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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

  const inputConfirmPassword = useCallback(
    (event) => {
      setConfirmPassword(event.target.value);
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
    [setConfirmPassword]
  );

  return (
    <section class="container">
      <main class="signin-wrapper">
        <div className="main-box">
          <div className="sigin-in-box-header">
            <h2>?????????????????????????????????</h2>
          </div>
          <div class="text-field">
            <TextField
              label={"?????????????????????"}
              type={"text"}
              class={"input-info mail"}
              onChange={inputMail}
            />
            <TextField
              label={"???????????????"}
              type={"password"}
              class={"input-info password"}
              onChange={inputPassword}
            />
            <TextField
              label={"*????????????????????????"}
              type={"password"}
              class={"input-info password"}
              onChange={inputConfirmPassword}
            />

            <ConfirmButton
              label={"????????????"}
              onClick={() => signUp(mail, password, confirmPassword)}
            />
          </div>
          <CustomDivider />
          <div className="third-box">
            <p>
              ????????????????????????????????????
              <span>
                <a href="" onClick={() => dispatch(push("/"))}>
                  ?????????
                </a>
              </span>
            </p>
          </div>
        </div>
      </main>
    </section>
  );
};

export default SignUp;
