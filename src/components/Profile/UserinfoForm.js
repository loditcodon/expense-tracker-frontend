// UserinfoForm.js
import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { useGlobalContext } from '../../context/globalContext';
import Button from '../Button/Button';
import { storage } from "./Firebase";
import AuthService from "../../services/auth.service";
import avatar from '../../img/avatar.png'
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
function UserinfoForm() {
    
    const { userinfo, getUserinfo, editUserinfo, error, setError, editPassword } = useGlobalContext();
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
    const [validationErrors, setValidationErrors] = useState({
        user_name: '',
        email: '',
        phone_number: '',
        nickname: '',
    });
    const [validationPasswordErrors, setValidationPasswordErrors] = useState({
        oldPassword: '',
        newPassword: '',
    });
    const validateFormPassowrd = () => {
        const errors = {};

        // Validate oldPassword (optional: add more complex validation)
        if (!oldPassword.trim()) {
            errors.oldPassword = 'Old Password is required';
            NotificationManager.error('Failed to add expense. Please try again.', 'Error');
        }

        // Validate newPassword (optional: add more complex validation)
        if (newPassword.trim().length < 6) {
            errors.newPassword = 'New Password must be at least 6 characters';
        }

        setValidationPasswordErrors(errors);
        return Object.keys(errors).length === 0; // Return true if there are no errors
    };
    const validateForm = () => {
        const errors = {};

        // Validate user_name
        if (!user_name.trim()) {
            errors.user_name = 'Username is required';
        }

        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            errors.email = 'Invalid email address';
        }

        // Validate phone_number
        const phoneRegex = /^\d{10}$/;
        if (!phoneRegex.test(phone_number)) {
            errors.phone_number = 'Invalid phone number (10 digits)';
        }

        // Validate nickname
        if (!nickname.trim()) {
            errors.nickname = 'Nickname is required';
        }


        setValidationErrors(errors);
        return Object.keys(errors).length === 0; // Return true if there are no errors
    };

    const handleProfileUpdate = async (e) => {
        if (validateForm()) {
            NotificationManager.success('Profile updated successfully!', 'Success');
        }
        // NotificationManager.success('Profile updated successfully!', 'Success');
        e.preventDefault();

        if (validateForm()) {
            if (error === 'Successfully updated'){
                setError('');
            }
            await editUserinfo(inputState);

            const updatedUserinfo = await getUserinfo();
            
            setInputState({
                user_name: updatedUserinfo.user_name,
                email: updatedUserinfo.email,
                phone_number: updatedUserinfo.phone_number,
                nickname: updatedUserinfo.nickname,
            });
            
        }
    };

    const handleChangePassword = async (e) => {
        e.preventDefault();

        if (validateFormPassowrd()) {
            await editPassword(passwordState);
        }
    };
    const currentUser = AuthService.getCurrentUser();
    const [photo, setPhoto] = useState(null);
    const [photoURL, setPhotoURL] = useState(null);
    useEffect(() => {
        const imageRef = ref(storage, currentUser);
        getDownloadURL(imageRef)
            .then((url) => {
                setPhotoURL(url);
            })
            .catch((error) => {
                console.error('Error fetching photo URL:', error);
            });
    }, [currentUser]); // Run this effect when `currentUser` changes

    const handleChange = async (e) => {
        if (e.target.files[0]) {
            setPhoto(e.target.files[0]);
            const temporaryPhotoURL = URL.createObjectURL(e.target.files[0]);
            setPhotoURL(temporaryPhotoURL);
        }
    };
    const handleClick = async (e) => {
        e.preventDefault(); // Add this line to prevent default form submission behavior
        const imageRef = ref(storage, currentUser);
        
        try {
            await uploadBytes(imageRef, photo);
            const url = await getDownloadURL(imageRef);
            setPhotoURL(url);
            NotificationManager.success('Photo uploaded successfully!', 'Success');
            setTimeout(() => {
                setError(null);
            }, 3000);
            setPhoto(null)
        } catch (error) {
            console.error('Error uploading photo:', error);
        }
    };
    return (
        <div>
        <UserFormStyled>
            {/* {error && <p className="error">{error}</p>} */}
            {validationPasswordErrors.oldPassword && <p className="error">{validationPasswordErrors.oldPassword}</p>}
            {validationPasswordErrors.newPassword && <p className="error">{validationPasswordErrors.newPassword}</p>}
            {validationErrors.user_name && <p className="error">{validationErrors.user_name}</p>}
            {validationErrors.email && <p className="error">{validationErrors.email}</p>}
            {validationErrors.phone_number && <p className="error">{validationErrors.phone_number}</p>}
            {validationErrors.nickname && <p className="error">{validationErrors.nickname}</p>}
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
                        readOnly
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
            <div className="submit-btn">
                <Button
                    name={'Update Profile'}
                    bPad={'.8rem 1.6rem'}
                    bRad={'30px'}
                    bg={'var(--color-accent'}
                    color={'#fff'}
                    onClick={handleProfileUpdate}
                />
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
                    name={'Change Password'}
                    bPad={'.8rem 1.6rem'}
                    bRad={'30px'}
                    bg={'var(--color-accent'}
                    color={'#fff'}
                    onClick={handleChangePassword}
                />
            </div>
            <div className="avatar-container">
                {currentUser && (
                    <div className="avatar-preview user-con">
                        <label htmlFor="avatarInput" className="avatar-label">
                            <img
                                src={photoURL || avatar}
                                alt="Avatar"
                            />
                            <div className="upload-overlay">
                                {!photo && (
                                    <>
                                        <span role="img" aria-label="Camera Emoji">
                                            📷
                                        </span>
                                        <p>Upload Photo</p>
                                    </>
                                )}
                                
                            </div>
                            <input
                                type="file"
                                id="avatarInput"
                                onChange={handleChange}
                                style={{ display: 'none' }}
                            />
                            
                        </label>
                        {photo && (
                                    <div className="submitupload-btn">
                                    <Button
                                        disabled={!photo}
                                        name={'Upload'}
                                        bPad={'.8rem 1.6rem'}
                                        bRad={'30px'}
                                        bg={'var(--color-accent'}
                                        color={'#fff'}
                                        onClick={handleClick}
                                    />
                                    </div>
                        )}
                    </div>
                )}
            </div>
        </UserFormStyled>
        <NotificationContainer />
        </div>
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
    .avatar-container {
        display: flex;
        justify-content: flex-end;
    }
    .user-con{
        height: 100px;
        position: absolute;
        top: 200px;
        right: 50px;
        display: flex;
        align-items: center;
        gap: 1rem;
        img{
            width: 300px;
            height: 300px;
            border-radius: 50%;
            object-fit: cover;
            background: #fcf6f9;
            border: 2px solid #FFFFFF;
            padding: .2rem;
            box-shadow: 0px 1px 17px rgba(0, 0, 0, 0.06);
        }
        h2{
            color: rgba(34, 34, 96, 1);
        }
        p{
            color: rgba(34, 34, 96, .6);
        }
    } 
    .avatar-label {
        position: relative;
        cursor: pointer;
        display: flex;
        flex-direction: column; /* Arrange the items vertically */
        align-items: center; /* Center items horizontally */
    }
    .avatar-container {
        display: flex;
        justify-content: flex-end;
    }
    .upload-overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: #fcf6f9; /* Match the background color */
        border-radius: 50%; /* Add border-radius for a circular shape */
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        opacity: 0; /* Set initial opacity to 0 */
        border: 2px solid #FFFFFF; /* Add border to match the border of user-con */
        padding: .2rem;
        box-shadow: 0px 1px 17px rgba(0, 0, 0, 0.06);
        transition: opacity 0.3s ease-in-out; /* Add transition for smooth opacity change */
    }

    .upload-overlay span,
    .upload-overlay p {
        margin: 0;
        color: rgba(34, 34, 96, 1); /* Match the text color of user-con */
    }

    .avatar-label:hover .upload-overlay {
        opacity: 1;
    }

    /* Add additional styling for the button if needed */
    .submitupload-btn {
        position: absolute;
        align-items: center;
        left: 0;
        right: 0;
        margin-top: 400px; /* Adjust as needed */
        display: flex;
        opacity: 1;
        justify-content: center; /* Center the button horizontally */
    }

    .submitupload-btn button {
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        background: var(--color-green);
        color: #fff;
        opacity: 1;
        &:hover {
            background: var(--color-accent) !important; /* Change to your desired color */
        }
    }
`;

export default UserinfoForm;
