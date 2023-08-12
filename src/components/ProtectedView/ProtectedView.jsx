import React from 'react';
import './ProtectedView.css'
const ProtectedView = ({children, isLoggedIn, isPublicPage}) => {
  return isPublicPage ? (
    isLoggedIn ? (
      <>{children}</>
    ) : (
      <div className={'center'}>
        <h1>У вас нет доступа к этой страничке</h1>
      </div>
    )
  ) : (
    <>{children}</>
  );
};

export default ProtectedView;
