import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { InnerLayout } from '../../styles/Layouts';
import { useGlobalContext } from '../../context/globalContext';
import UserinfoForm from './UserinfoForm';
import Form from '../Form/Form';
import { logout, trend } from '../../utils/Icons';

function Userinfo() {
    return (
        <UserProfileStyled>
            <InnerLayout>
                <h1>User Profile</h1>
                <br></br>
                <div className="profile-content">
                    <div className="user-form-container">
                        <UserinfoForm />
                    </div>
                    {/* Display additional user information here if needed */}
                </div>
            </InnerLayout>
        </UserProfileStyled>
    );
}

const UserProfileStyled = styled.div`

`;

export default Userinfo;
