import Content from '../Parts/Content';
import Header from '../Parts/Header';

const Layout = ({ children }) => {
  const navigation = [
    { name: 'Welcome', href: '/welcome' },
    { name: 'Blocks', href: '/blocks' },
    { name: 'In Dev', href: '/inDev' },
    { name: 'Popular Plugin', href: '/popularPlugin' },
    { name: 'Settings', href: '/settings' },
    { name: 'Demo', href: '/demo' },
    { name: 'Demo Second', href: '/demo2' },
    { name: 'Video', href: '/video' },
    { name: 'Free Trial Form', href: '/free-trial-form' },
    { name: 'Free Trial Popup', href: '/free-trial-popup' }
  ]

  return <>
      <div className="bplContainer">
        <Header navigation={navigation} />
        <Content>{children}</Content>
      </div>
    </>
}

export default Layout;