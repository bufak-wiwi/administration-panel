import sidebarBgImage from 'assets/img/sidebar/sidebar-4.jpg';
import logoImage from 'assets/img/logo/logo_full_white.png';
import SourceLink from 'components/SourceLink';
import React from 'react';
import {
  MdHome,
  MdAssignment,
  MdKeyboardArrowDown,
  MdSettings,
  MdReport,
  MdAssignmentInd,
  MdPerson,
  MdGroup,
  MdRecordVoiceOver,
  MdSpeakerNotes,
  MdSecurity,
  MdBusiness,
  MdPoll,
  MdTrain
} from 'react-icons/md';
import { NavLink } from 'react-router-dom';
import {
  Nav,
  Navbar,
  NavItem,
  NavLink as BSNavLink,
  Collapse,
} from 'reactstrap';
import bn from 'utils/bemnames';
import { isAdministrator, IsSuperAdmin } from '../PrivateRoute'

const sidebarBackground = {
  backgroundImage: `url("${sidebarBgImage}")`,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
};

const navItems = [
  { to: '/', name: 'Start', exact: true, Icon: MdHome },
  { to: '/abstimmung', name: 'Abstimmung', exact: false, Icon: MdPoll},
  { to: '/anmeldung', name: 'Anmeldung', exact: true, Icon: MdAssignment},
  { to: '/reiseinfos', name: 'Reiseinfos', exact: true, Icon: MdTrain},
  { to: '/ws-einreichen', name: 'WS einreichen', exact: true, Icon: MdRecordVoiceOver},
  { to: '/workshop', name: 'Workshop', exact: true, Icon: MdSpeakerNotes},
  { to: '/profile', name: 'Profil', exact: true, Icon: MdPerson},
];

const navAdminItems = [
  { to: '/phasen', name: "Einstellungen", exact: true, Icon: MdSettings},
  { to: '/application', name: "Anmeldungen", exact: false, Icon: MdAssignmentInd},
  { to: '/workshop-list', name: "Workshop-Liste", exact: false, Icon: MdGroup},
];

const navSuperAdminItems = [
  { to: '/conference', name: "Konferenz", exact: false, Icon: MdBusiness},
  { to: '/question', name: "Abstimmungen", exact: false, Icon: MdPoll},
  { to: '/questionresult', name: "Ergebnisse", exact: false, Icon: MdPoll},
]


const bem = bn.create('sidebar');

class Sidebar extends React.Component {
  state = {
    isOpenAdministrator: true,
    isOpenSuperAdmin: true,
  };

  handleClick = name => () => {
    this.setState(prevState => {
      const isOpen = prevState[`isOpen${name}`];

      return {
        [`isOpen${name}`]: !isOpen,
      };
    });
  };

  render() {
    return (
      <aside className={bem.b()} data-image={sidebarBgImage}>
        <div className={bem.e('background')} style={sidebarBackground} />
        <div className={bem.e('content')}>
        <Navbar>
            <SourceLink>
              <span className="text-white">
                <img src={logoImage} alt="BuFaK WiWi" width="100%"></img>
              </span>
            </SourceLink>
          </Navbar>
          <Nav vertical>
            {navItems.map(({ to, name, exact, Icon }, index) => (
              <NavItem key={index} className={bem.e('nav-item')}>
                <BSNavLink
                  id={`navItem-${name}-${index}`}
                  className="text-uppercase"
                  tag={NavLink}
                  to={to}
                  activeClassName="active"
                  exact={exact}
                >
                  <Icon className={bem.e('nav-item-icon')} />
                  <span className="">{name}</span>
                </BSNavLink>
              </NavItem>
            ))}
            { isAdministrator() && 
              <div>
                <NavItem
                    className={bem.e('nav-item')}
                    onClick={this.handleClick('Administrator')}
                  >
                    <BSNavLink className={bem.e('nav-item-collapse')}>
                      <div className="d-flex">
                        <MdReport className={bem.e('nav-item-icon')} />
                        <span className="text-uppercase align-self-start">Ausrichter</span>
                      </div>
                      <MdKeyboardArrowDown
                        className={bem.e('nav-item-icon')}
                        style={{
                          padding: 0,
                          transform: this.state.isOpenAdministrator
                            ? 'rotate(0deg)'
                            : 'rotate(-90deg)',
                          transitionDuration: '0.3s',
                          transitionProperty: 'transform',
                        }}
                      />
                  </BSNavLink>
                </NavItem>
                <Collapse isOpen={this.state.isOpenAdministrator}>
                {navAdminItems.map(({ to, name, exact, Icon }, index) => (
                  <NavItem key={index} className={bem.e('nav-item')}>
                    <BSNavLink
                      id={`navItem-${name}-${index}`}
                      className="text-uppercase"
                      tag={NavLink}
                      to={to}
                      activeClassName="active"
                      exact={exact}
                    >
                      <Icon className={bem.e('nav-item-icon')} />
                      <span className="">{name}</span>
                    </BSNavLink>
                  </NavItem>
                ))}
              </Collapse>
            </div>
            }
            { IsSuperAdmin() &&
              <div>
                <NavItem
                  className={bem.e('nav-item')}
                  onClick={this.handleClick('SuperAdmin')}
                >
                  <BSNavLink className={bem.e('nav-item-collapse')}>
                    <div className="d-flex">
                      <MdSecurity className={bem.e('nav-item-icon')} />
                      <span className=" align-self-start">Admin</span>
                    </div>
                    <MdKeyboardArrowDown
                      className={bem.e('nav-item-icon')}
                      style={{
                        padding: 0,
                        transform: this.state.isOpenSuperAdmin
                          ? 'rotate(0deg)'
                          : 'rotate(-90deg)',
                        transitionDuration: '0.3s',
                        transitionProperty: 'transform',
                      }}
                    />
                </BSNavLink>
              </NavItem>
              <Collapse isOpen={this.state.isOpenSuperAdmin}>
              {navSuperAdminItems.map(({ to, name, exact, Icon }, index) => (
                <NavItem key={index} className={bem.e('nav-item')}>
                  <BSNavLink
                    id={`navItem-${name}-${index}`}
                    className="text-uppercase"
                    tag={NavLink}
                    to={to}
                    activeClassName="active"
                    exact={exact}
                  >
                    <Icon className={bem.e('nav-item-icon')} />
                    <span className="">{name}</span>
                  </BSNavLink>
                </NavItem>
                ))}
              </Collapse>
              </div>
            }
          </Nav>
        </div>
      </aside>
    );
  }
}

export default Sidebar;
