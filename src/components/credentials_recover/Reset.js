// reset password

import React from 'react';
import { useFormik } from "formik";
import { resetPasswordSchema } from '../../schemas/schemas.js';
import { useNavigate } from 'react-router-dom';

const Reset = () => {
    const navigate = useNavigate();

    // submit reset password, go back to login
    const onSubmit = async (actions) => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        navigate("/reset-success");
        actions.resetForm();
    };

    // formik properties
    const { values, errors, touched, isSubmitting, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: {
            reset_password: "",
            confirm_password: "",
        },
        validationSchema: resetPasswordSchema,
        onSubmit,
    });



    return (
        <div className="reset-password">

            {/* enter the new password and confirm it */}
            <form onSubmit={handleSubmit} autoComplete="off" className='d-flex justify-content-center align-items-center mb-3'>
                <div className='form-group p-4 p-sm-3 myform'>
                    <h2>Reset Password</h2>
                    <div className='form-group mb-3'>
                        <label htmlFor="reset_password" className='control-label labels'>Enter your new password: </label>
                        <input type="password" value={values.reset_password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            id="recover-email"
                            className={errors.reset_password && touched.reset_password ? "input-error form-control" : "form-control"}
                            name="reset_password" />
                        {errors.reset_password && touched.reset_password && <p className="error">{errors.reset_password}</p>}
                    </div>

                    <div className='form-group mb-3'>
                        <label htmlFor="confirm_password" className='control-label labels'>Confirm password: </label>
                        <input type="password" value={values.confirm_password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            id="confirm_password"
                            className={errors.confirm_password && touched.confirm_password ? "input-error form-control" : "form-control"}
                            name="confirm_password" />
                        {errors.confirm_password && touched.confirm_password && <p className="error">{errors.confirm_password}</p>}
                    </div>

                    <input type="submit" className='btn btn-primary' disabled={isSubmitting} value="Submit" />

                    {/* discard changes */}
                    <input type="button" className='btn btn-danger m-3' onClick={() => {
                        navigate("/login");
                    }} value="Cancel" />
                </div>
            </form>
        </div>
    );
}

// #endregion

export default Reset;