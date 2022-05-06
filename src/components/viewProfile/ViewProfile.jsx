/* eslint-disable no-console */
/* eslint-disable no-shadow */
/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useContext } from 'react';
import { toast } from 'react-toastify';
import Navbar from '../Navbar';
import './viewProfile.css';
import { userContext } from '../../pages/Home';

function ViewProfile() {
  const currentuser = useContext(userContext);
  console.log('vew', currentuser);
  const [email, setEmail] = useState();
  const [data, setData] = useState([]);
  const [firstName, setFirstName] = useState();
  const [lastName, setlastName] = useState();
  const [designation, setDesignation] = useState();
  const [dob, setDob] = useState();
  const [gender, setGender] = useState();
  const [getCountry, setCountry] = useState();
  const [getState, setState] = useState([]);
  const [selectedState, setSelectedState] = useState();
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState();
  const [bio, setBio] = useState();
  const [selectedFile, setSelectedFile] = useState(null);
  const [profileImg, setProfileImg] = useState(
    'https://media.istockphoto.com/vectors/user-icon-flat-isolated-on-white-background-user-symbol-vector-vector-id1300845620?k=20&m=1300845620&s=612x612&w=0&h=f4XTZDAv7NPuZbG0habSpU0sNgECM0X7nbKzTUta3n8=',
  );
  useEffect(() => {
    getUserProfile();
  }, []);

  const getUserProfile = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/userprofile', {
        method: 'GET',
      });
      const userData = await response.json();
      console.log(userData);
      const dob = userData.dob.split('-');
      const date = dob[2].substring(0, 2);
      const month = dob[1];
      const year = dob[0];
      const formattedDate = `${year}-${month}-${date}`;

      setEmail(userData.email);
      setFirstName(userData.firstname);
      setlastName(userData.lastname);
      setProfileImg(userData.profile_img);
      setDesignation(userData.designation);
      setDob(formattedDate);
      setGender(userData.gender);
      setBio(userData.bio);
      setCountry(userData.country);
    } catch (err) {
      toast.error('Something went wrong');
    }
  };
  return (
    <>
      <Navbar />
      <div className="row py-5 px-4">
        <div className="col-md-7 mx-auto">
          <div className="bg-white shadow rounded overflow-hidden">
            <div className="px-4 pt-0 pb-4 cover">
              <div className="media align-items-end profile-head">
                <div className="mr-3">
                  <img
                    src={profileImg}
                    alt="..."
                    width="130"
                    className="rounded mb-2 img-thumbnail profile"
                  />
                </div>
                <div className="media-body mb-5 text-white">
                  <h4 className="mt-0 mb-0">
                    {firstName}
&nbsp;
                    {lastName}
                  </h4>
                  <p className="small mb-4">
                    {' '}
                    <i className="fa fa-map-marker mr-2" aria-hidden="true" />
                    {getCountry}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-light p-4 d-flex justify-content-end text-center">
              <ul className="list-inline mb-0">
                <li className="list-inline-item">
                  <h5 className="font-weight-bold mb-0 d-block">215</h5>
                  <small className="text-muted">
                    {' '}
                    <i className="fas fa-image mr-1" />
                    Friends
                  </small>
                </li>
                <li className="list-inline-item">
                  <h5 className="font-weight-bold mb-0 d-block">745</h5>
                  <small className="text-muted">
                    {' '}
                    <i className="fas fa-user mr-1" />
                    Followers
                  </small>
                </li>
                <li className="list-inline-item">
                  <h5 className="font-weight-bold mb-0 d-block">340</h5>
                  <small className="text-muted">
                    {' '}
                    <i className="fas fa-user mr-1" />
                    Following
                  </small>
                </li>
              </ul>
            </div>
            <div className="px-4 py-3">
              <h5 className="mb-0">About</h5>
              <div className="p-4 rounded shadow-sm bg-light">
                <p className="font-italic mb-0">Web Developer</p>
                <p className="font-italic mb-0">Lives in New York</p>
                <p className="font-italic mb-0">Photographer</p>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="col-md-5">eferfg</div> */}
      </div>
    </>
  );
}

export default ViewProfile;
