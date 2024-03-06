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
    const [passwordsSame, setPasswordsSame] = useState(true)
    const [passwordTooShort, setPasswordTooShort] = useState(false)

    const handleInputChange = () => {

        passwordValue === confirmPasswordValue ? setPasswordsSame(true) : setPasswordsSame(false)
        passwordValue.length < 8 ? setPasswordTooShort(true) : setPasswordTooShort(false)

        if (passwordValue === confirmPasswordValue && passwordValue.length >= 8) {
            navigate('/');

            authenticationApiAxios.post('/v1/auth/password-set', {
                token: "string",
                secret: "string",
                password: passwordValue,
                password_confirm: confirmPasswordValue
            })
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }

    useEffect(() => {

        if (passwordValue.length >= 8) {
            setPasswordTooShort(false)
        }

        if (passwordValue === confirmPasswordValue) {
            setPasswordsSame(true)
        }

    }, [passwordValue, confirmPasswordValue])

    return (
        <>
            <Label
                title='Create new Password?'
            />
            <div className='inputsContainer'>
                {!passwordsSame && !passwordTooShort &&
                    <span className='passwordErrorReset'>Your passwords are not the same</span>
                }
                {passwordTooShort &&
                    <span className='passwordErrorReset'>Your password is too short</span>
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