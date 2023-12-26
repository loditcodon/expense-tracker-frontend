import React, { useContext, useState } from "react";
import { BoldLink, BoxContainer, FormContainer, Input, LineText, MutedLink, SubmitButton } from "./common";
import { Marginer } from "../Marginer";
import { AccountContext } from './accountContext';
import AuthService from "../../services/auth.service"; // Import AuthService
import { isEmail } from "validator";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

export function SignupForm(props) {
  const { switchToSignin } = useContext(AccountContext);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [nickname, setNickname] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");

  const onChangeUsername = (e) => setUsername(e.target.value);
  const onChangeEmail = (e) => setEmail(e.target.value);
  const onChangePassword = (e) => setPassword(e.target.value);
  const onChangePhoneNumber = (e) => setPhoneNumber(e.target.value);
  const onChangeNickname = (e) => setNickname(e.target.value);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleSignup = async (e) => {
    e.preventDefault();
  
    // Validate input fields
    if (!username || !email || !password || !nickname || !phoneNumber) {
      setMessage("All fields are required.");
      return;
    }
  
    if (!isEmail(email)) {
      setMessage("Invalid email address.");
      return;
    }
  
    if (password.length < 6 || password.length > 40) {
      setMessage("Password must be between 6 and 40 characters.");
      return;
    }
  
    if (username.length < 3 || username.length > 20) {
      setMessage("Username must be between 3 and 20 characters.");
      return;
    }
  
    if (nickname.length < 3 || nickname.length > 20) {
      setMessage("Nickname must be between 3 and 20 characters.");
      return;
    }
  
    if (phoneNumber && !/^\d{10}$/.test(phoneNumber)) {
      setMessage("Please enter a valid 10-digit phone number.");
      return;
    }
  
    setMessage("");
    setLoading(true);
      AuthService.register(email, phoneNumber, username, password, nickname).then(
        () => {
          navigate("/");
          window.location.reload();
          NotificationManager.success('Signup successfully!', 'Success');
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
    <>
        <NotificationContainer />
    <BoxContainer>
      <FormContainer onSubmit={handleSignup}>
      <Input
                  type="text"
                  className="form-control"
                  name="username"
                  value={username}
                  onChange={onChangeUsername}
                  placeholder="Username"
                />
        <Input
                  type="text"
                  className="form-control"
                  name="email"
                  value={email}
                  onChange={onChangeEmail}
                  placeholder="Email"
                />
        <Input
                  type="password"
                  className="form-control"
                  name="password"
                  value={password}
                  onChange={onChangePassword}
                  placeholder="Password"
                />
        <Input
                  type="text"
                  className="form-control"
                  name="phoneNumber"
                  value={phoneNumber}
                  onChange={onChangePhoneNumber}
                  placeholder="Phone Number"
                />
        <Input
                  type="text"
                  className="form-control"
                  name="nickname"
                  value={nickname}
                  onChange={onChangeNickname}
                  placeholder="Nick Name"
                />
                <BoxContainer>
                  <SubmitButton type="submit" disabled={loading}>
                    {loading && <span className="spinner-border spinner-border-sm"></span>}
                    <span>Signup</span>
                  </SubmitButton>
        </BoxContainer>
      </FormContainer>
      <Marginer direction="vertical" margin={10} />
      {message && (
        <div className="form-group">
          <div
            className="alert alert-danger"
            role="alert"
          >
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
    </>
  );
}
