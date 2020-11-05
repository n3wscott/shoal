import React, { Component } from 'react';
import {
  Add,
  Location,
  System,
  ShieldSecurity,
  Tasks,
  User,
  Wifi,
  Car,
  Bar,
  Cloud,
} from 'grommet-icons';


const icons = {
  "Add": Add,
  "Location": Location,
  "System": System,
  "ShieldSecurity": ShieldSecurity,
  "Tasks": Tasks,
  "User": User,
  "Wifi": Wifi,
  "Car": Car,
  "Bar": Bar,
  "Cloud": Cloud,
};

export class IconWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {icon: props.name};
  }

  render() {
    const Icon = icons[this.state.icon];
    return(
      <Icon />
    )
  }
}

export default IconWrapper;
