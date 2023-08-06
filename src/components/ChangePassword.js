import React,{useState} from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';


const ChangePassword = ()=>{
    const {register,handleSubmit,formState:{errors},reset} = useForm();

    const registerOptions = {
        oldPassword: {
          required: "Password is required",
          minLength: {
            value: 8,
            message: "Password must have at least 8 characters"
          }
        },
        newPassword: {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password must have at least 8 characters"
            }
        },
        rePassword: {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password must have at least 8 characters"
            }
        }

    };

    const helper = ()=>{

    }

    const handleError = ()=>{

    }


    const URL = "/users/change-password";

    return (
        <div className='change-password'>
            <h2>Change Password</h2>
            <form className='change-password-form' onSubmit={handleSubmit(helper,handleError)}>
              <div className='form-group'>
                  <label htmlFor='oldPassword'>Old Password:</label>
                  <input 
                    type='password'
                    name='oldPassword'
                    id='oldPassword'
                    {...register('oldPassword',registerOptions.oldPassword)}
                  />
                  <small className="text-danger">
                    {errors?.oldPassword && errors.oldPassword.message}
                  </small>
              </div>
              <div className='form-group'>
                  <label htmlFor='newPassword'>New Password:</label>
                  <input 
                    type='password'
                    name='newPassword'
                    id='newPassword'
                    {...register('newPassword',registerOptions.newPassword)}
                  />
                  <small className="text-danger">
                    {errors?.newPassword && errors.newPassword.message}
                  </small>
              </div>
              <div className='form-group'>
                  <label htmlFor='rePassword'>Re-Enter Password:</label>
                  <input 
                    type='password'
                    name='rePassword'
                    id='rePassword'
                    {...register('rePassword',registerOptions.rePassword)}
                  />
                  <small className="text-danger">
                    {errors?.rePassword && errors.rePassword.message}
                  </small>
              </div>
              <button type="submit">Submit</button>

            </form>
        </div>
    );
}

export default ChangePassword;