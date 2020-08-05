import React from 'react';
import Swal from 'sweetalert2';

import { Link } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import validator from 'validator'
import { useDispatch, useSelector } from 'react-redux';
import { setError, removeError } from '../actions/ui';
import { startRegisterWithEmailPasswordName } from '../actions/auth';
export const RegisterScreen = () => {

    const dispatch = useDispatch();

    const { msgError } = useSelector(state => state.ui)
    console.log(msgError)

    const [formValues, handleInputChange] = useForm({
        name: 'Matias',
        email: 'matias@correo.cl',
        password: '12345',
        password2: '12345'
    })

    const { name, email, password, password2 } = formValues;

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(name, email, password, password2);
        if (isFormValue()) {
            dispatch(startRegisterWithEmailPasswordName(email, password, name))
        }
    }

    const isFormValue = () => {
        if (name.trim().length === 0) {
            console.log('Name is required')
            dispatch(setError('Name is required'))
            Swal.fire('fail', 'Name is required', 'error')
            return false;
        } else if (!validator.isEmail(email)) {
            console.log('Email is not valid');
            dispatch(setError('Email is not valid'))
            Swal.fire('fail', 'Email is not valid', 'error')
            return false;
        } else if (password !== password2 || password.length < 5) {
            console.log('Password should be at least 6 character and match each other')
            dispatch(setError('Password should be at least 6 character and match each other'))
            Swal.fire('fail', 'Password should be at least 6 character and match each other', 'error')
            return false;
        }
        dispatch(removeError())
        return true;
    }

    return (
        <>
            <h3 className="auth__title">Register</h3>

            <form
                className="animate__animated animate__pulse animate__faster"
                onSubmit={handleSubmit}>
                {/* {
                    msgError &&
                    (<div className="auth__alert-error">
                        {msgError}
                    </div>)
                } */}

                <input
                    type="text"
                    placeholder="Name"
                    name="name"
                    className="auth__input"
                    autoComplete="off"
                    value={name}
                    onChange={handleInputChange}
                />

                <input
                    type="text"
                    placeholder="Email"
                    name="email"
                    className="auth__input"
                    autoComplete="off"
                    value={email}
                    onChange={handleInputChange}
                />

                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    className="auth__input"
                    value={password}
                    onChange={handleInputChange}
                />

                <input
                    type="password"
                    placeholder="Confirm password"
                    name="password2"
                    className="auth__input"
                    value={password2}
                    onChange={handleInputChange}
                />


                <button
                    type="submit"
                    className="btn btn-primary btn-block mb-5"
                // onClick={handleSubmit}
                >
                    Register
                </button>



                <Link
                    to="/auth/login"
                    className="link"
                >
                    Already registered?
                </Link>

            </form>
        </>
    )
}
