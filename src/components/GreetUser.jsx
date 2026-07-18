import React from 'react'
import useAuth from '../hooks/useAuth'; 
import userImage from '../assets/img/illustrations/man-with-laptop.png';


const GreetUser = () => {
  const { user } = useAuth();

  const role = user?.roles?.length > 0 ? user.roles.join(', ') : 'User';

  return (
    <div className="card">
      <div className="d-flex align-items-start row">
        <div className="col-sm-7">
          <div className="card-body">
            <h5 className="card-title text-primary mb-3">
              Welcome {user?.name}! 👋
            </h5>

            <p className="mb-6">
              Role: <strong>{role}</strong>
              <br />
              Have a productive day ahead.
            </p>

          </div>
        </div>

        <div className="col-sm-5 text-center text-sm-left">
          <div className="card-body pb-0 px-0 px-md-6">
            <img
              src={userImage}
              height={175}
              alt="User"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default GreetUser