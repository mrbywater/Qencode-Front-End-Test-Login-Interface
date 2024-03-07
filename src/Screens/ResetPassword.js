import './ResetPassword.scss'
import {Label} from "../Components/Label";
import {Input} from "../Components/Input";
import {InteractionButton} from "../Components/InteractionButton";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {authenticationApiAxios} from "../requests";

const ResetPassword = () => {

    const navigate  = useNavigate();

    const [passwordValue, setPasswordValue] = useState('')
    const [confirmPasswordValue, setConfirmPasswordValue] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    const handleInputChange = () => {
        authenticationApiAxios.post('/v1/auth/password-set', {
            token: "string",
            secret: "string",
            password: passwordValue,
            password_confirm: confirmPasswordValue
        })
            .then(function (res) {
                if (!!res.response.data.detail[0].error) {
                    setErrorMessage(res.response.data.detail[0].error)
                } else if (passwordValue === confirmPasswordValue) {
                    alert('Password reset successfully')
                    navigate('/');
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
        <>
            <Label
                title='Create new Password?'
            />
            <div className='inputsContainer'>
                {errorMessage &&
                    <span className='passwordErrorReset'>{errorMessage}</span>
                }
                <Input
                    placeholder='Password'
                    margin={{marginTop: '40px'}}
                    inputLabel='Password'
                    inputType='password'
                    setValue={setPasswordValue}
                    value={passwordValue}
                />
                <Input
                    placeholder='Password'
                    margin={{marginTop: '25px'}}
                    inputLabel='Confirm Password'
                    inputType='password'
                    setValue={setConfirmPasswordValue}
                    value={confirmPasswordValue}
                />
            </div>
            <InteractionButton
                title='Reset Password'
                styles={{marginTop: '30px'}}
                onClickHandler={handleInputChange}
            />
        </>
    )
}

export {ResetPassword}