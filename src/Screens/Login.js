import {useEffect, useState} from 'react'
import './Login.scss'
import {Label} from "../Components/Label";
import {InteractionButton} from "../Components/InteractionButton";
import {Input} from "../Components/Input";
import {Link} from "react-router-dom";
import {authenticationApiAxios} from "../requests";

export const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

const Login = () => {

    const [emailValue, setEmailValue] = useState('')
    const [passwordValue, setPasswordValue] = useState('')
    const [error, setError] = useState('')
    const [errorType, setErrorType] = useState('')

    const authenticationHandler = () => {
        authenticationApiAxios.post('/v1/auth/login', {
            email: emailValue,
            password: passwordValue
        })
            .then(function (res) {
                if (!!res.response.data.detail[0].error) {
                    setError(res.response.data.detail[0].error)
                    setErrorType(res.response.data.detail[0].field_name)
                } else if (EMAIL_REGEXP.test(emailValue) && passwordValue.length >= 5) {
                    alert('Successful login')
                    setEmailValue('')
                    setPasswordValue('')
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    useEffect(() => {

        if (!EMAIL_REGEXP.test(emailValue)) {
            setPasswordValue('')
        }

        if (EMAIL_REGEXP.test(emailValue) && errorType === 'email') {
            setError('')
        }

        if (passwordValue.length >= 5 && errorType === 'password') {
            setError('')
        }

    }, [emailValue, passwordValue])

    return (
        <>
            <Label
                title='Log in to your account'
            />
            <div className='fastLoginContainer'>
                <div>
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18 9.20455C18 8.56636 17.9416 7.95273 17.833 7.36364H9.18367V10.845H14.1262C13.9133 11.97 13.2662 12.9232 12.2936 13.5614V15.8195H15.2616C16.9981 14.2527 18 11.9455 18 9.20455Z" fill="#4285F4"/>
                        <path d="M9.18367 18C11.6633 18 13.7421 17.1941 15.2616 15.8195L12.2936 13.5614C11.4712 14.1014 10.4193 14.4205 9.18367 14.4205C6.79174 14.4205 4.76716 12.8373 4.04499 10.71H0.976809V13.0418C2.48794 15.9832 5.59369 18 9.18367 18Z" fill="#34A853"/>
                        <path d="M4.04499 10.71C3.86132 10.17 3.75696 9.59318 3.75696 9C3.75696 8.40682 3.86132 7.83 4.04499 7.29V4.95818H0.97681C0.333952 6.21234 -0.000566571 7.5965 7.20323e-07 9C7.20323e-07 10.4523 0.354824 11.8268 0.976809 13.0418L4.04499 10.71Z" fill="#FBBC05"/>
                        <path d="M9.18367 3.57955C10.532 3.57955 11.7426 4.03364 12.6943 4.92545L15.3284 2.34409C13.7379 0.891818 11.6591 0 9.18367 0C5.59369 0 2.48794 2.01682 0.97681 4.95818L4.04499 7.29C4.76716 5.16273 6.79174 3.57955 9.18367 3.57955Z" fill="#EA4335"/>
                    </svg>
                    <span>Google</span>
                </div>
                <div>
                    <svg width="21" height="18" viewBox="0 0 21 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.5002 0C5.23789 0 0.970703 4.13135 0.970703 9.22785C0.970703 13.305 3.70119 16.764 7.48755 17.9841C7.9638 18.0696 8.13865 17.784 8.13865 17.5402C8.13865 17.3202 8.12981 16.5933 8.12571 15.8222C5.4746 16.3804 4.91518 14.7334 4.91518 14.7334C4.48169 13.6668 3.8571 13.3832 3.8571 13.3832C2.99249 12.8105 3.92228 12.8222 3.92228 12.8222C4.8792 12.8873 5.38307 13.7732 5.38307 13.7732C6.23301 15.1839 7.61237 14.7761 8.15617 14.5403C8.2417 13.9439 8.48866 13.5368 8.76119 13.3063C6.64456 13.073 4.41952 12.2818 4.41952 8.74589C4.41952 7.73842 4.79178 6.91524 5.40138 6.26901C5.30243 6.03658 4.97625 5.09803 5.49369 3.82696C5.49369 3.82696 6.29392 3.57895 8.11498 4.77285C8.87512 4.56839 9.69034 4.46586 10.5002 4.46234C11.31 4.46586 12.1259 4.56839 12.8875 4.77285C14.7063 3.57895 15.5054 3.82696 15.5054 3.82696C16.0241 5.09803 15.6978 6.03658 15.5989 6.26901C16.2099 6.91524 16.5796 7.73842 16.5796 8.74589C16.5796 12.2902 14.3503 13.0706 12.2283 13.299C12.5701 13.5854 12.8747 14.1469 12.8747 15.0079C12.8747 16.2426 12.8636 17.2363 12.8636 17.5402C12.8636 17.7858 13.0352 18.0735 13.5182 17.9829C17.3025 16.7614 20.0295 13.3036 20.0295 9.22785C20.0295 4.13135 15.763 0 10.5002 0ZM4.53981 13.1453C4.51882 13.1911 4.44434 13.2049 4.37648 13.1734C4.30736 13.1433 4.26854 13.0808 4.29095 13.0348C4.31146 12.9876 4.38611 12.9744 4.45507 13.0061C4.52434 13.0362 4.56379 13.0993 4.53981 13.1453ZM5.00855 13.5503C4.9631 13.5911 4.87426 13.5721 4.81398 13.5077C4.75165 13.4433 4.73997 13.3573 4.78605 13.3159C4.83292 13.2751 4.91908 13.2942 4.98157 13.3585C5.0439 13.4236 5.05605 13.509 5.00855 13.5503ZM5.33013 14.0685C5.27174 14.1078 5.17627 14.0709 5.11725 13.9889C5.05886 13.9068 5.05886 13.8084 5.11851 13.769C5.17769 13.7296 5.27174 13.765 5.33155 13.8465C5.38978 13.9299 5.38978 14.0283 5.33013 14.0685ZM5.87398 14.6686C5.82175 14.7244 5.7105 14.7094 5.62907 14.6333C5.54575 14.5589 5.52255 14.4533 5.57494 14.3976C5.62781 14.3416 5.73969 14.3574 5.82175 14.4329C5.90444 14.5071 5.92969 14.6135 5.87398 14.6686ZM6.57686 14.8713C6.55382 14.9435 6.44668 14.9764 6.33874 14.9457C6.23096 14.914 6.16042 14.8294 6.1822 14.7563C6.2046 14.6836 6.31223 14.6494 6.42095 14.6822C6.52858 14.7137 6.59927 14.7978 6.57686 14.8713ZM7.37677 14.9572C7.37945 15.0333 7.28793 15.0964 7.17462 15.0978C7.06069 15.1002 6.96853 15.0386 6.96727 14.9638C6.96727 14.8869 7.05674 14.8244 7.17068 14.8226C7.28398 14.8204 7.37677 14.8816 7.37677 14.9572ZM8.16259 14.928C8.17616 15.0023 8.09742 15.0785 7.9849 15.0989C7.87428 15.1184 7.77187 15.0726 7.75782 14.9989C7.74409 14.9228 7.82426 14.8466 7.93472 14.8269C8.04739 14.8079 8.14823 14.8525 8.16259 14.928Z" fill="#161614"/>
                    </svg>
                    <span>Github</span>
                </div>
            </div>
            <div className='separatorOR'>OR</div>
            <div  className='emailErrorContainer'>
                {emailValue && errorType === 'email' &&
                    <span className='errorEmail'>
                        {error}
                    </span>
                }
                <Input
                    placeholder='Work email'
                    margin={{marginTop: '30px'}}
                    inputType='email'
                    setValue={setEmailValue}
                    value={emailValue}
                />
            </div>
            <div className='showPasswordContainer' style={(EMAIL_REGEXP.test(emailValue)) ? {display: 'block'} : {}}>
                {passwordValue && errorType === 'password' &&
                    <span className='passwordError'>
                        {error}
                    </span>
                }
                <Input
                    placeholder='Password'
                    margin={{marginTop: '25px'}}
                    inputType='password'
                    setValue={setPasswordValue}
                    value={passwordValue}
                />
                <div className='forgotPasswordTitle'>
                    <Link to={'/forgot_password'} className='forgotPasswordLink' >Forgot your password?</Link>
                </div>
            </div>
            <InteractionButton
                title='Log in to Qencode'
                styles={{marginTop: '30px'}}
                onClickHandler={authenticationHandler}
            />
            <div className='singUpMessage'>
                <span>Is your company new to Qencode? </span>
                <span>Sign up</span>
            </div>
        </>
    )
}

export { Login }