/* eslint-disable max-len */
/* eslint-disable no-use-before-define */
/* eslint-disable consistent-return */
/* eslint-disable no-plusplus */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable react/react-in-jsx-scope */
import { useState } from 'react';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import './signup.css';

export default function Signup() {
  const [state, setState] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    country: '',
    state: '',
    city: '',
    gender: '',
    dob: '',
  });
  const navigate = useNavigate();
  const formdata = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const [showpassword, setShowpassword] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (state.firstname.length < 3) { return handleError('firstname'); }
    if (state.lastname.length < 3) { return handleError('lastname'); }
    if (!state.password || !/(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#%])/.test(state.password)) { return handleError('password'); }
    if (validateDate()) { register(); }
  };
  const validateDate = () => {
    const dob = state.dob.split('-');
    const date = dob[2];
    const month = dob[1];
    const year = dob[0];
    const presentdate = new Date();
    let age = presentdate.getFullYear() - year;
    if (presentdate.getMonth() - month < 0) { age--; } else if (+presentdate.getMonth() - month === 0 && +presentdate.getDate() - date < 0) { age--; }
    if (age < 14) {
      handleError('dob');
      return false;
    }
    return true;
  };
  async function register() {
    try {
      const response = await fetch('http://localhost:3000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(state),
      });
      const data = await response.json();
      if (response.status === 201) {
        toast.success(data.message);
        navigate('/home');
      } else { toast.error(`${data.message}`); }
    } catch (err) {
      toast.error('Something went wrong');
    }
  }
  const handleError = (idname) => {
    const a = document.getElementById(idname);
    a.style.display = 'block';
    setTimeout(() => { a.style.display = 'none'; }, 2000);
  };
  return (
    <div className="vh-100" style={{ backgroundColor: '#eee' }}>
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-12 col-xl-11">
            <div className="card " style={{ borderRadius: '25px' }}>
              <div className="card-body p-md-5">
                <div className="row justify-content-center">
                  <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                    <p className="text-center h2 fw-bold  mx-1 mx-md-5 mb-4 ">Sign Up</p>
                    <form className="mx-1 mx-md-4" onSubmit={handleSubmit}>
                      <div className="d-flex flex-row align-items-center mb-2">
                        <i className="fa fa-user fa-lg me-3 fa-fw" />
                        <div className="form-outline flex-fill mb-0">
                          <input name="firstname" type="text" className=" form-control border-top-0 border-left-0 border-right-0" placeholder="First Name" onChange={(e) => { formdata(e); }} required />
                          <p id="firstname" style={{ display: 'none' }} className="  text-center text-danger font-italic  mx-1 mx-md-5  ">First name must be greater than 2</p>
                        </div>
                      </div>
                      <div className="d-flex flex-row align-items-center mb-2">
                        <i className="fa fa-user fa-lg me-3 fa-fw" />
                        <div className="form-outline flex-fill mb-0">
                          <input name="lastname" type="text" className=" form-control border-top-0 border-left-0 border-right-0 " placeholder="Last Name" onChange={(e) => { formdata(e); }} required />
                          <p id="lastname" style={{ display: 'none' }} className=" text-center text-danger font-italic  mx-1 mx-md-5  ">Last name must be greater than 2</p>
                        </div>
                      </div>
                      <div className="d-flex flex-row align-items-center mb-2">
                        <i className="fa fa-envelope fa-lg me-3 fa-fw" />
                        <div className="form-outline flex-fill mb-0">
                          <input name="email" type="email" className="form-control border-top-0 border-left-0 border-right-0" placeholder="Email" onChange={(e) => { formdata(e); }} required />
                        </div>
                      </div>
                      <div className="d-flex flex-row align-items-center mb-2">
                        <i className="fa fa-lock fa-lg me-3 fa-fw" />
                        <div className="form-outline flex-fill mb-0">
                          <input name="password" type={showpassword ? 'text' : 'password'} id="form3Example4c" style={{ boxShadow: 'none' }} className=" form-control border-top-0 border-left-0 border-right-0" placeholder="password" onChange={(e) => { formdata(e); }} required />
                        </div>
                        <i onClick={() => { setShowpassword(!showpassword); }} className="d-inline fa fa-eye " />
                      </div>
                      <p id="password" style={{ display: 'none' }} className="text-center text-danger font-italic  mx-1 mx-md-5  "> Password must be min 8 and max 15 characters long , have atleast one uppercase letter,number and atleast have one special character</p>
                      <div className="d-flex flex-row align-items-center mb-2">
                        <i className="fa fa-flag fa-lg me-3 fa-fw" />
                        <div className="form-outline flex-fill mb-0">
                          <input name="country" type="text" id="form3Example1c" style={{ boxShadow: 'none' }} className="form-control border-top-0 border-left-0 border-right-0" placeholder="Country" onChange={(e) => { formdata(e); }} required />
                        </div>
                      </div>
                      <div className="d-flex flex-row align-items-center mb-2">
                        <i className="fa fa-circle fa-lg me-3 fa-fw" />
                        <div className="form-outline flex-fill mb-0">
                          <input name="state" type="text" className="form-control border-top-0 border-left-0 border-right-0" placeholder="State" onChange={(e) => { formdata(e); }} required />
                        </div>
                      </div>
                      <div className="d-flex flex-row align-items-center mb-2">
                        <i className="fa fa-building fa-lg me-3 fa-fw" />
                        <div className="form-outline flex-fill mb-0">
                          <input name="city" type="text" className="form-control border-top-0 border-left-0 border-right-0" placeholder="City" onChange={(e) => { formdata(e); }} required />
                        </div>
                      </div>
                      <div className="d-flex flex-row align-items-center mb-2 mx-sm-4">
                        <div className="form-outline flex-fill mb-0 ">
                          <input name="dob" type="date" className="form-control border-top-0 border-left-0 border-right-0 " onChange={(e) => { formdata(e); }} required />
                          <p id="dob" style={{ display: 'none' }} className="  text-center text-danger font-italic  mx-1 mx-md-5  ">Min age should be 14</p>
                        </div>
                      </div>
                      <div className="mb-4 ml-2 mt-3 ml-4 ">
                        <h6 className="d-inline ml-2 ">Gender: </h6>
                        <div className="form-check form-check-inline  ">
                          <input className="form-check-input" type="radio" name="gender" id="inlineRadio1" value="Male" onChange={(e) => { formdata(e); }} required />
                          <label className="form-check-label" htmlFor="inlineRadio1">Male</label>
                        </div>
                        <div className="form-check form-check-inline ">
                          <input className="form-check-input" type="radio" name="gender" id="inlineRadio2" value="Female" onChange={(e) => { formdata(e); }} />
                          <label className="form-check-label" htmlFor="inlineRadio2">Female</label>
                        </div>
                        <div className="form-check form-check-inline ">
                          <input className="form-check-input" type="radio" name="gender" id="inlineRadio3" value="Other" onChange={(e) => { formdata(e); }} />
                          <label className="form-check-label" htmlFor="inlineRadio3">Other</label>
                        </div>
                      </div>
                      <div className=" row   justify-content-around mx-4 mb-3 mb-lg-4">
                        <button type="submit" style={{ fontWeight: 'bold' }} className="btn m-2 col-xl-5 col-sm-12  btn-primary ">Register</button>
                        <a href="http://localhost:5000/auth/google" role="button" aria-pressed="true" className="btn m-2  col-xl-5 col-sm-12 btn-danger ">
                          {' '}
                          <i className="fa fa-google-plus fa-lg me-3 fa-fw text-white" />
                        </a>
                      </div>
                    </form>
                  </div>
                  <div className="d-flex flex-column  my-5 col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                    <img src="https://www.socialsamosa.com/wp-content/uploads/2013/09/image001-1.jpg" className="img-fluid rounded" alt="https://res.cloudinary.com/crunchbase-production/image/upload/c_lpad,f_auto,q_auto:eco,dpr_1/v1473843963/cdy69xpmmkjntymhbxpa.png" />
                    <p className="text-center h5 mt-5 mx-1 mx-md-5 mb-4 ">
                      Have an account?
                      <Link to="/login">Login</Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
