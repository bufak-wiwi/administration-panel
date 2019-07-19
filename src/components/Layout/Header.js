import React from 'react';
import { connect } from 'react-redux'
import AuthActions from '../../redux/authRedux'
import {
  MdClearAll,
} from 'react-icons/md';
import {
  Button,
  Nav,
  Navbar,
  NavItem,
  NavLink,
} from 'reactstrap';
import { Redirect } from 'react-router-dom';
import bn from 'utils/bemnames';

const bem = bn.create('header');

class Header extends React.Component {
  state = {
    isOpenNotificationPopover: false,
    isNotificationConfirmed: false,
    isOpenUserCardPopover: false,
    logout: false,
  };

  toggleNotificationPopover = () => {
    this.setState({
      isOpenNotificationPopover: !this.state.isOpenNotificationPopover,
    });

    if (!this.state.isNotificationConfirmed) {
      this.setState({ isNotificationConfirmed: true });
    }
  };

  toggleUserCardPopover = () => {
    this.setState({
      isOpenUserCardPopover: !this.state.isOpenUserCardPopover,
    });
  };

  handleSidebarControlButton = event => {
    event.preventDefault();
    event.stopPropagation();

    document.querySelector('.cr-sidebar').classList.toggle('cr-sidebar--open');
  };

  handleLogout() {
    this.setState({ logout: true})
    this.props.logout()
  }

  render() {
    if (this.state.logout) {
      return (
        <Redirect to="/login" />
      )
    }
    return (
      <Navbar light expand className={bem.b('bg-white')}>
        <Nav navbar className="mr-2">
          <Button outline onClick={this.handleSidebarControlButton}>
            <MdClearAll size={25} />
          </Button>
        </Nav>

        <Nav navbar className={bem.e('nav-right')}>
          <NavItem className="d-inline-flex">
            <NavLink id="Popover1" className="position-relative">
            <Button onClick={() => this.handleLogout()}>Logout</Button>
            </NavLink>
          </NavItem>
        </Nav>
      </Navbar>
    );
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(AuthActions.logout()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
