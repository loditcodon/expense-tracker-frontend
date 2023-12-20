import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { InnerLayout } from '../../styles/Layouts';
import { useGlobalContext } from '../../context/globalContext';
import StatisticalForm from './StatisticalForm';
import Form from '../Form/Form';

function Statistical() {
    return (
        <UserProfileStyled>
            <InnerLayout>
                <h1>Statistical</h1>
                <br></br>
                <StatisticalForm />
                    
            </InnerLayout>
        </UserProfileStyled>
    );
}

const UserProfileStyled = styled.div`

`;

export default Statistical;
