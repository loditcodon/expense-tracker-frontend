import { React, useState } from 'react';
import styled from 'styled-components';
import { LoginForm } from './loginForm';
import { SignupForm } from './signupForm';
import { ForgotpasswordForm } from './Forgotpassword';
import { motion } from 'framer-motion';
import { AccountContext } from './accountContext'

const BoxContainer = styled.div`
  width: 380px;
  min-height: 550px;
  display: flex;
  flex-direction: column;
  border-radius: 30px;
  background-color: #fff;
  box-shadow: 0 0 2px rgba(15, 15, 15, 0.28);
  position: relative;
  overflow: hidden;
`;

const TopContainer = styled.div`
  width: 100%;
  height: 250px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 0 1.8em;
  padding-bottom: 5em;
`;

const BackDrop = styled(motion.div)`
  position: absolute;
  width: 160%;
  height: 550px;
  display: flex;
  flex-direction: column;
  border-radius: 50%;
  top: -290px;
  left: -70px;
  transform: rotate(60deg);
  background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(255,0,0,1) 0%, rgba(244,135,135,1) 100%);
`;

const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const HeaderText = styled.div`
  font-size: 30px;
  font-weight: 600;
  line-height: 1.24;
  color: #fff;
  z-index: 10;
`;

const SmallText = styled.div`
  font-size: 11px;
  font-weight: 500;
  color: #fff;
  margin-top: 7px;
  z-index: 10;
`;

const InnerContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0px 20px;
`;

const backdropVariants = {
  expanded: {
    width: "233%",
    height: "1050px",
    borderRadius: "20%",
    transform: "rotate(60deg)"
  },
  collapsed: {
    width: "130%",
    height: "550px",
    borderRadius: "50%",
    transform: "rotate(60deg)"
  }
}

const expandingTransition = {
  type: "spring",
  duration: 2.3,
  stiffness: 30,
}

export default function AccountBox(props) {
  const [isExpanded, setExpanded] = useState(false);
  const [active, setActive] = useState('signin');

  const playExpandingAnimation = () => {
    setExpanded(true);
    setTimeout(() => {
      setExpanded(false);
    }, expandingTransition.duration * 1000 - 1500);
  }

  const switchToSignup = () => {
    playExpandingAnimation();
    setTimeout(() => {
      setActive("signup");
    }, 400);
  }

  const switchToSignin = () => {
    playExpandingAnimation();
    setTimeout(() => {
      setActive("signin");
    }, 400);
  }
  const switchToForgot = () => {
    playExpandingAnimation();
    setTimeout(() => {
      setActive("forgot");
    }, 400);
  }
  const contextValue = {switchToSignup, switchToSignin, switchToForgot};
  
  return (
  <AccountContext.Provider value={contextValue}>
  <BoxContainer>
    <TopContainer>
      <BackDrop 
        initial={false}
        animate={isExpanded ? "expanded" : "collapsed"}
        variants={backdropVariants}
        transition={expandingTransition}
      />
      {active === "signin" && <HeaderContainer>
        <HeaderText>Welcome</HeaderText>
        <HeaderText>Back</HeaderText>
        <SmallText>Please sign-in to continue!</SmallText>
      </HeaderContainer>}
      {active === "signup" && <HeaderContainer>
        <HeaderText>Create</HeaderText>
        <HeaderText>Account</HeaderText>
        <SmallText>Please sign-up to continue!</SmallText>
      </HeaderContainer>}
      {active === "forgot" && <HeaderContainer>
        <HeaderText>Forget</HeaderText>
        <HeaderText>Password</HeaderText>
        <SmallText>Please enter email and username!</SmallText>
      </HeaderContainer>}
    </TopContainer>
    <InnerContainer>
      {active === "signin" && <LoginForm />}
      {active === "signup" && <SignupForm />}
      {active === "forgot" && <ForgotpasswordForm />}
    </InnerContainer>
  </BoxContainer>
  </AccountContext.Provider>  
  );
}