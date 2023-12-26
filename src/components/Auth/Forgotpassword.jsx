import React, { useContext, useState, useRef } from "react";
import { BoldLink, BoxContainer, FormContainer, Input, LineText, MutedLink, SubmitButton } from "./common";
import { Marginer } from "../Marginer";
import { AccountContext } from './accountContext';
import AuthService from "../../services/auth.service"; // Import AuthService
import CheckButton from "react-validation/build/button";
import { useNavigate } from "react-router-dom";
const required = (value) => {
  if (!value) {
    return (
      <div className="invalid-feedback d-block">
        This field is required!
      </div>
    );
  }
};
export function ForgotpasswordForm(props) {
  const { switchToSignin } = useContext(AccountContext);
  const checkBtn = useRef();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };
  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);

      AuthService.login(username, email).then(
        () => {
          navigate("/");
          window.location.reload();
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.response.data ||
            error.message.toString();

          setLoading(false);
          setMessage(resMessage);
        }
      );
      setLoading(false);
  };

  return (
    <BoxContainer>
      <FormContainer onSubmit={handleLogin}>
        <Input
          type="text"
          placeholder="Username"
          value={username}
          onChange={onChangeUsername}
          validations={[required]}
        />
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={onChangeEmail}
          validations={[required]}
        />
        <BoxContainer>
        <SubmitButton type="submit" disabled={loading}>
          {loading && <span className="spinner-border spinner-border-sm"></span>}
          <span>Reset Password</span>
        </SubmitButton>
        </BoxContainer>
      </FormContainer>
      <Marginer direction="vertical" margin={10} />
      {message && (
        <div className="form-group">
          <div className="alert alert-danger" role="alert">
            {message}
          </div>
        </div>
      )}
      <LineText>
        Already have an account?{" "}
        <BoldLink onClick={switchToSignin} href="#">
          Signin
        </BoldLink>
      </LineText>
    </BoxContainer>
  );
}
