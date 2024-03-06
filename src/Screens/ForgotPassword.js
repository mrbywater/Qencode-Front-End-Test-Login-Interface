import './ForgotPassword.scss'
import {Label} from "../Components/Label";
import {Input} from "../Components/Input";
import {InteractionButton} from "../Components/InteractionButton";
import {useEffect, useState} from "react";
import {EMAIL_REGEXP} from "./Login";
import { useNavigate  } from "react-router-dom";
import {authenticationApiAxios} from "../requests";

const ForgotPassword = () => {

    const navigate  = useNavigate();

    const cancelButtonStyle = {
        color: '#060E1E',
        backgroundColor: '#FFFFFF',
        marginTop: '20px',
        border: '1.2px solid #D3D8DC',
        letterSpacing: '-0.24%'
    }

    const [emailValue, setEmailValue] = useState('')
    const [isEmailValid, setIsEmailValid] = useState(false)
    const [emailChecker, setEmailChecker] = useState(false)

    useEffect(() => {

        setIsEmailValid(EMAIL_REGEXP.test(emailValue))

    }, [emailValue])

    useEffect(() => {

        setEmailChecker(false)

    }, [isEmailValid])

    const handleInputChange = () => {
        if (isEmailValid) {
            navigate('/reset_password');
        } else {
            setEmailChecker(true)
        }

        if (isEmailValid) {
            authenticationApiAxios.post('/v1/auth/password-reset', {
                email: emailValue
            })
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }

    const cancelButtonHandler = () => navigate('/')

    return (
        <>
            <Label
                title='Forgot Password?'
            />
            <div className='emailContainer'>
                {emailChecker &&
                    <span className='emailError'>Your email is not correct</span>
                }
                <Input
                    placeholder='Enter your email'
                    margin={{marginTop: '40px'}}
                    inputType='email'
                    setValue={setEmailValue}
                    value={emailValue}
                />
            </div>
            <InteractionButton
                title='Send'
                styles={{marginTop: '25px'}}
                onClickHandler={handleInputChange}
            />
                <InteractionButton
                    title='Cancel'
                    styles={cancelButtonStyle}
                    onClickHandler={cancelButtonHandler}
                />
        </>
    )
}

export {ForgotPassword}
