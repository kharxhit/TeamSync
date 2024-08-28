import React, { useEffect, useState } from 'react';
import './ProfilePage.css';

const Profile = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [imageURL, setImageURL] = useState('');

  useEffect(() => {
    const getOrg = async () => {
      const emaill = JSON.parse(localStorage.getItem('user')).email;
      setEmail(emaill);
      const namee = JSON.parse(localStorage.getItem('user')).name;
      setName(namee);
      const imageURL = JSON.parse(localStorage.getItem('user')).image;
      setImageURL(imageURL);
    }
    getOrg();
  }, [])

  const handleUpdate = () => {
    // Perform update logic here
    console.log('Update button clicked');
  };

  return (
    <>
      <div style={{ display: "flex", height: "10vh", alignItems: "center", backgroundColor: "#f1f1f1", boxShadow: "2px 2px 5px rgba(0,0,0,0.10)", }}>
        <div style={{ width: "0.7%", backgroundColor: "blue", marginRight: "8px", borderRadius: "20%" }}>.</div>
        <h4 style={{ fontWeight: "bolder" }}>Profile</h4>
      </div>
      <div className="profile-container">
        <div className="avatar-container">
          <img className="avatar" src={imageURL} alt="User Avatar" />

        </div>

        <div className="form-group">
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className='form-group'>
          <label>ImageURL:</label>
          <input
            type="text"
            placeholder="Image URL"
            value={imageURL}
            onChange={(e) => setImageURL(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Current Password:</label>
          <input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
        </div>
        <div className="form-group">
          <label>New Password:</label>
          <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
        </div>
        <button className="update-btn" onClick={handleUpdate}>Update</button>
      </div>
    </>
  );
};

export default Profile;
