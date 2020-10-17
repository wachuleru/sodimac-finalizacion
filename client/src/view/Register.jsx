import React,{useState} from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import HeaderSection from '../components/HeaderSection'
import { fetchRegister } from "../services/register.js";
//import Mail from '../services/mail/mail';

const Register = (props) =>{
    const [ user, setUser ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ message, setMessage ] = useState('');
    const [ loading, setLoading] = useState(false);
    const handleFormSubmit = async (e) =>  {

        setLoading(true)
        e.preventDefault();
        await fetchApi()
        
    }

    const fetchApi = async () =>{
        const body = {
            "username": user,
            "password": password,
            "email": email
        }

        await fetchRegister(body).then((res) => {
            console.log('res', res)
            
            if(res.data){
                
                res.data.message?
                    setMessage(res.data.message)
                    :props.history.push('login')

            }
            
            setLoading(false)

            // setTimeout(() => {
            //      setMessage(res.message? res.message: '');
            //      setLoading(false)
            // }, 2000)
            
        });
    }
    return(
        <>
            <HeaderSection 
                title='Registrate' 
                description='para juntar tus pokemones'
                view='register'
            />
            <Container>
                <Row>
                    <Col></Col>
                    <Col>
                        <Form onSubmit={ (e)=> handleFormSubmit(e) }>
                            <Form.Group controlId="formBasicUser">
                                <Form.Label>Usuario</Form.Label>
                                <Form.Control type="text" onChange={(e) => setUser(e.target.value) } 
                                    value={user}
                                    type="text"  placeholder="Enter Username" />
                                <Form.Text className="text-muted">
                                
                                </Form.Text>
                            </Form.Group>

                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" onChange={(e) => setEmail(e.target.value) } 
                                    value={email} placeholder="Enter email" />
                                <Form.Text className="text-muted">
                                Nunca compartiremos su correo electrónico con nadie más.
                                </Form.Text>
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" onChange={(e) => setPassword(e.target.value) } 
                                    value={password}  placeholder="Password" />
                            </Form.Group>

                            <Button variant="primary" type="submit">
                                Registrarse
                            </Button>
                        </Form>
                    
                    </Col>
                    
                </Row>
            
            </Container>

        </>      
    )

}

export default Register; 



