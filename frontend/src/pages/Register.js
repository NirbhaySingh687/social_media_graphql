import React, {useState} from "react";
import { Form, Button } from "semantic-ui-react"
import { useMutation } from "@apollo/react-hooks"
import gql from "graphql-tag"

function Register(){
    const [ errors, setErrors ] = useState({})
    const [ value, setValue ] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    })
    const [ addUser, { data, loading }] = useMutation(REGISTER_USER, {
        onError(err) {
            setErrors(err.graphQLErrors[0].extensions.errors)
        }
    })
    console.log(`######`,data)
    const onSubmit = (e) => {
        e.preventDefault()
        addUser({ variables: value })
    }


    const onChange =(events)=>{
        setValue({ ...value, [events.target.name]: events.target.value})
    }
    return (
        <div className="form-container">
            <Form onSubmit={onSubmit} noValidate className={loading ? "loading": ""}>
                <h1>Register</h1>
                <Form.Input
                    label="Username"
                    placeholder="Username..."
                    name="username"
                    type="text"
                    value={value.username}
                    onChange={onChange}
                />
                <Form.Input
                    label="Email"
                    placeholder="Email..."
                    name="email"
                    type="email"
                    value={value.email}
                    onChange={onChange}
                />
                <Form.Input
                    label="Password"
                    placeholder="Password..."
                    name="password"
                    type="password"
                    value={value.password}
                    onChange={onChange}
                />
                <Form.Input
                    label="Confirm Password"
                    placeholder="confirm..."
                    name="confirmPassword"
                    type="password"
                    value={value.confirmPassword}
                    onChange={onChange}
                />
                <Button type="submit" primary>Register</Button>
            </Form>
            {
                Object.keys(errors).length > 0 && <div className="ui error message">
                    <ul className="list">
                        {
                            Object.values(errors).map((value, index)=>(
                                <li key={index}>{value}</li>
                            ))
                        }
                    </ul>
                </div>
            }
        </div>
    )
}

const REGISTER_USER = gql`
    mutation register(
        $username: String!
        $email: String!
        $password: String!
        $confirmPassword: String!
    ){
        register(
            registerInput: {
                username: $username
                email: $email
                password: $password
                confirmPassword: $confirmPassword
            }
        ){
            id 
            email 
            username 
            createdAt 
            token
        }
    }
`



export default Register;