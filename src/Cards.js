import React, { Component } from 'react';
import Fish from './Fish';

import {
  Add,
  Location,
  System,
  ShieldSecurity,
  Tasks,
  User,
  Wifi,
} from 'grommet-icons';
import { Box, Button, Card, CardBody, CardFooter, Grid, Grommet, Text } from 'grommet';

const data = [
  {
    color: 'blue',
    icon: <Wifi size="large" />,
    title: 'Remote Access',
    subTitle: 'Lights out Management (LOM)',
    message: 'Connected',
    url: '/blue',
  },
  {
    color: 'green',
    icon: <System size="large" />,
    title: 'System',
    subTitle: 'Sub-system and Devices',
    message: 'Composable System',
    url: '/green',
  },
  {
    color: 'red',
    icon: <User size="large" />,
    title: 'User Sessions',
    subTitle: 'User Access on Server',
    message: '4 active sessions',
    url: '/red',
  },
  {
    color: 'purple',
    icon: <Tasks size="large" />,
    title: 'Logs',
    subTitle: 'Events, Integration, and Status',
    message: '204,353',
    url: '/purple',
  },
  {
    color: 'orange',
    icon: <Location size="large" />,
    title: 'Beacons',
    subTitle: 'Unique identification light',
    message: '24 beacons connected',
    url: '/orange',
  },
  {
    color: 'teal',
    icon: <ShieldSecurity size="large" />,
    title: 'Security',
    subTitle: 'Trusted Platform Module',
    message: 'No Module Connected',
    url: '/teal',
  },
];

const theme = {
  global: {
    font: {
      family: `-apple-system,
         BlinkMacSystemFont, 
         "Segoe UI"`,
    },
    colors: {
      blue: '#00C8FF',
      green: '#17EBA0',
      teal: '#82FFF2',
      purple: '#F740FF',
      red: '#FC6161',
      orange: '#FFBC44',
      yellow: '#FFEB59',
    },
  },
  card: {
    footer: {
      pad: { horizontal: 'medium', vertical: 'small' },
      background: '#FFFFFF27',
    },
  },
};

export class Themed extends Component {
  constructor(props) {
    super(props);
    this.state = {data: []};
    this.next = 1;
  }

  // componentDidMount() {
  //   this.timerID = setInterval(
  //     () => this.tick(),
  //     1000
  //   );
  // }
  //
  // componentWillUnmount() {
  //   clearInterval(this.timerID);
  // }
  //
  // tick() {
  //   this.setState({
  //     date: new Date()
  //   });
  // }

  render() {
    return(
      <Grommet theme={theme} full>
        <Box pad="large">
          {/* Responsive Grid */}
          <Box align="center" pad="large">
            <Box round="full" overflow="hidden" background="neutral-1">
              <Button icon={<Add />} hoverIndicator onClick={() => {
                console.log("here, " + this.next);
                let newData = [];
                for (let i = 0; i < this.next; i++) {
                  newData.push(data[i%data.length])
                }
                this.setState({
                    data: newData,
                })
                this.next++;
              }} />
            </Box>
          </Box>
          <Grid gap="medium" rows="f" columns={{ count: 'fit', size: 'small' }}>
            {this.state.data.map(value => (
              <Fish url={value.url} color={value.color} icon={value.icon} subTitle={value.subTitle} message={value.message} />
            ))}
          </Grid>
        </Box>
      </Grommet>
    )
  }
}

export default Themed;