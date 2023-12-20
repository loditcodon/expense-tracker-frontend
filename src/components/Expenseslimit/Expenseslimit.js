import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { InnerLayout } from '../../styles/Layouts';
import { useGlobalContext } from '../../context/globalContext';
import ExpenseslimitForm from './ExpenseslimitForm';
import Form from '../Form/Form';

function Expenseslimit() {
    return (
        <UserProfileStyled>
            <InnerLayout>
                <h1>Expenses Limit</h1>
                <br></br>
                <div className="profile-content">
                    <div className="user-form-container">
                        <ExpenseslimitForm />
                    </div>
                    {/* Display additional user information here if needed */}
                </div>
            </InnerLayout>
        </UserProfileStyled>
    );
}

const UserProfileStyled = styled.div`

`;

export default Expenseslimit;
