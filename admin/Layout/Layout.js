import React from 'react';
import Content from '../Parts/Content';
import Header from '../Parts/Header';

const Layout = ({ children }) => {
  const navigation = [
    { name: 'Welcome', href: '/welcome' },
    { name: 'Blocks', href: '/blocks' },
    { name: 'In Dev', href: '/inDev' },
    { name: 'Popular Plugin', href: '/popularPlugin' },
    { name: 'Settings', href: '/settings' },
  ]

  return (
    <>
      <div className="bplContainer">
        <Header navigation={navigation} />
        <Content>{children}</Content>
      </div>
    </>
  )
}

export default Layout;