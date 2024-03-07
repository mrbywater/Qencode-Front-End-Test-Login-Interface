import './ForgotPassword.scss'
import {Label} from "../Components/Label";
import {Input} from "../Components/Input";
import {InteractionButton} from "../Components/InteractionButton";
import {useState} from "react";
import { useNavigate  } from "react-router-dom";
import {authenticationApiAxios} from "../requests";
import {EMAIL_REGEXP} from "./Login";

const cancelButtonStyle = {
    color: '#060E1E',
    backgroundColor: '#FFFFFF',
    marginTop: '20px',
    border: '1.2px solid #D3D8DC',
    letterSpacing: '-0.24%'
}

const ForgotPassword = () => {

    const navigate  = useNavigate();

    const [emailValue, setEmailValue] = useState('')
    const [emailError, setEmailError] = useState('')

    const handleInputChange = () => {
        authenticationApiAxios.post('/v1/auth/password-reset', {
            email: emailValue
        })
            .then(function (res) {
                if (!!res.response.data.detail[0].error) {
                    setEmailError(res.response.data.detail[0].error)
                } else if (EMAIL_REGEXP.test(emailValue)) {
                    alert(`Please check your email ${emailValue} to complete the password reset`)
                    navigate('/reset_password')
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const cancelButtonHandler = () => navigate('/')

    return (
        <>
            <Label
                title='Forgot Password?'
            />
            <div className='emailContainer'>
                {emailError &&
                    <span className='emailError'>{emailError}</span>
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
