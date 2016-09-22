import React, { PropTypes } from 'react'
import { DrawerLayoutAndroid } from 'react-native'
import { PlayingContainer, HostingContainer, FriendsContainer } from '~/containers'
import Drawer from './Drawer'

export default function FooterTabs (props) {
  const closeDrawer = () => this.drawer.closeDrawer()
  const openDrawer = () => this.drawer.openDrawer()
  const showActiveView = () => {
    switch (props.activeFooterTab) {
      case 'playing' :
        return <PlayingContainer openDrawer={openDrawer} navigator={props.navigator}/>
      case 'hosting' :
        return <HostingContainer openDrawer={openDrawer} navigator={props.navigator}/>
      case 'friends' :
        return <FriendsContainer openDrawer={openDrawer} navigator={props.navigator}/>
    }
  }
  return (
    <DrawerLayoutAndroid
      ref={(drawer) => this.drawer = drawer}
      drawerWidth={290}
      renderNavigationView={() => (
        <Drawer
          close={closeDrawer}
          activeFooterTab={props.activeFooterTab}
          onTabSelect={props.onTabSelect} />)}>
      {showActiveView()}
    </DrawerLayoutAndroid>
  )
}

FooterTabs.propTypes = {
  activeFooterTab: PropTypes.string.isRequired,
  navigator: PropTypes.object.isRequired,
  onTabSelect: PropTypes.func.isRequired
}
