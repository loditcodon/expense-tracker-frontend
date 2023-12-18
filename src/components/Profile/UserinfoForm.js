// UserinfoForm.js
import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { useGlobalContext } from '../../context/globalContext';
import Button from '../Button/Button';

function UserinfoForm() {
    const { userinfo, getUserinfo, editUserinfo, error, setError } = useGlobalContext();
    const [inputState, setInputState] = useState({
        user_name: userinfo.user_name,
        email: userinfo.email,
        phone_number: userinfo.phone_number,
        nickname: userinfo.nickname,
        oldPassword: '',
        newPassword: '',
    });
    const [passwordState, setPasswordState] = useState({
        oldPassword: '',
        newPassword: '',
    });

    const { user_name, email, phone_number, nickname } = inputState;
    const { newPassword, oldPassword } = passwordState;
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const handleInput = (name) => (e) => {
        setInputState({ ...inputState, [name]: e.target.value });
        setPasswordState({ ...passwordState, [name]: e.target.value });
        setError('');
    };
    const handleToggleOldPassword = () => {
        setShowOldPassword(!showOldPassword);
    };
    const handleToggleNewPassword = () => {
        setShowNewPassword(!showNewPassword);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        await editUserinfo(inputState)
        const updatedUserinfo = await getUserinfo();
        
        setInputState({
            user_name: updatedUserinfo.user_name,
            email: updatedUserinfo.email,
            phone_number: updatedUserinfo.phone_number,
            nickname: updatedUserinfo.nickname,
        });
    };
    return (
        <UserFormStyled onSubmit={handleSubmit}>
            {error && <p className="error">{error}</p>}
            <div className="input-control">
                
                <div className="input-wrapper">
                <label htmlFor="user_name">Username</label>
                    <input
                        type="text"
                        value={user_name}
                        name={'user_name'}
                        id="user_name"
                        placeholder="Username"
                        onChange={handleInput('user_name')}
                    />
                </div>
            </div>
            <div className="input-control">
                <div className="input-wrapper">
                <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        value={email}
                        name={'email'}
                        id="email"
                        placeholder="Email"
                        onChange={handleInput('email')}
                    />
                </div>
            </div>
            <div className="input-control">
                <div className="input-wrapper">
                <label htmlFor="phone_number">Phone Number</label>
                    <input
                        type="text"
                        value={phone_number}
                        name={'phone_number'}
                        id="phone_number"
                        placeholder="Phone Number"
                        onChange={handleInput('phone_number')}
                    />
                </div>
            </div>
            <div className="input-control">
                
                <div className="input-wrapper">
                <label htmlFor="nickname">Nickname</label>
                    <input
                        type="text"
                        value={nickname}
                        name={'nickname'}
                        id="nickname"
                        placeholder="Nickname"
                        onChange={handleInput('nickname')}
                    />
                </div>
            </div>
            <div className="input-control">
                <div className="input-wrapper">
                    <label htmlFor="oldPassword">Old Password</label>
                    <div className="password-input-wrapper">
                        <input
                            type={showOldPassword ? "text" : "password"}
                            value={oldPassword}
                            name={'oldPassword'}
                            id="oldPassword"
                            placeholder="Old Password"
                            onChange={handleInput('oldPassword')}
                        />
                        <span className="eye-icon" onClick={handleToggleOldPassword}>
                            {showOldPassword ? "👁️" : "👁️‍🗨️"}
                        </span>
                    </div>
                </div>
            </div>
            <div className="input-control">
                <div className="input-wrapper">
                    <label htmlFor="newPassword">New Password</label>
                    <div className="password-input-wrapper">
                        <input
                            type={showNewPassword ? "text" : "password"}
                            value={newPassword}
                            name={'newPassword'}
                            id="newPassword"
                            placeholder="New Password"
                            onChange={handleInput('newPassword')}
                        />
                        <span className="eye-icon" onClick={handleToggleNewPassword}>
                            {showNewPassword ? "👁️" : "👁️‍🗨️"}
                        </span>
                    </div>
                </div>
            </div>
            <div className="submit-btn">
                <Button
                    name={'Save'}
                    bPad={'.8rem 1.6rem'}
                    bRad={'30px'}
                    bg={'var(--color-accent'}
                    color={'#fff'}
                />
            </div>
        </UserFormStyled>
    );
}

const UserFormStyled = styled.form`
    display: flex;
    flex-direction: column;
    gap: 2rem;

    label {
        font-size: 1.3rem;
        margin-right: 0.3rem;
    }

    .input-control {
        display: flex;
        flex-direction: column;
        gap: 1rem; /* Đặt khoảng cách giữa các ô input */
    }
    
    .input-wrapper {
        display: flex;
        align-items: center;
        gap: 1rem; /* Đặt khoảng cách giữa nhãn và ô input */
        width: 500px;
    }
    
    .input-control label {
        flex-basis: 150px; /* Đặt kích thước cố định cho nhãn */
        flex-shrink: 0;
    }
    
    .input-control input,
    .input-control textarea,
    .input-control select {
        flex: 1; /* Mở rộng ô input để lấp đầy phần còn lại của không gian */
    }

    input,
    textarea,
    select {
        font-family: inherit;
        font-size: inherit;
        outline: none;
        border: none;
        padding: 0.5rem 1rem;
        border-radius: 5px;
        border: 2px solid #fff;
        background: transparent;
        resize: none;
        box-shadow: 0px 1px 20px rgba(0, 0, 0, 0.06);
        color: rgba(34, 34, 96, 0.9);
        &::placeholder {
            color: rgba(34, 34, 96, 0.4);
        }
        width: 100%;
    }

    .submit-btn {
        margin-top: 0.5rem;
        button {
            box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
            &:hover {
                background: var(--color-green) !important;
            }
        }
    }
    .password-input-wrapper {
        width: 500px;
        position: relative;
    }

    .eye-icon {
        position: absolute;
        top: 50%;
        right: 10px;
        transform: translateY(-50%);
        cursor: pointer;
        font-size: 1.5rem; /* Tùy chỉnh kích thước của biểu tượng */
    }   
`;

export default UserinfoForm;
