import React from 'react';
import { FaGitAlt, FaPlus } from 'react-icons/fa';
import { Container, Form, SubmitButton } from './styles';

function Main() {
    return(
        <Container>
            <h1><FaGitAlt/>Repositórios</h1>

            <Form onSubmit={() => {}}>
                <input 
                    type="text" 
                    placeholder="Adicionar repositório"  
                />
                <SubmitButton disable>
                    <FaPlus fontSize={14} color="#fafafa" />
                </SubmitButton>
            </Form>
        </Container>
    )
}

export default Main;