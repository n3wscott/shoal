import React, { Component } from "react";

import {
 Box,
 Button,
 Collapsible,
 Heading,
 Grid,
 Grommet,
 Layer,
 ResponsiveContext,
} from 'grommet';

import { Add, Dashboard, View } from 'grommet-icons';

import { FormClose, Notification } from 'grommet-icons';

import { Fab, Action } from 'react-tiny-fab';
import 'react-tiny-fab/dist/styles.css';

import Graph from './Graph';
import Fish from './Fish';
import data from './data'


const theme = {
  global: {
    colors: {
      brand: '#228BE6',
    },
    font: {
      family: 'Roboto',
      size: '18px',
      height: '20px',
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

const AppBar = (props) => (
  <Box
    tag='header'
    direction='row'
    align='center'
    justify='between'
    background='brand'
    pad={{ left: 'medium', right: 'small', vertical: 'small' }}
    elevation='medium'
    style={{ zIndex: '1' }}
    {...props}
  />
);

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSidebar: false,
      cards: data,
    }
    this.next = 1;
  }

  handleAdd() {
    console.log("here on handle click add")
    let newCards = [];
    for (let i = 0; i < this.next; i++) {
      newCards.push(data[i%data.length])
    }
    this.setState({
        cards: newCards,
    })
    this.next++;
  }

  handleView() {
    console.log("here on handle click view")
  }
  

  render() {
  var boundClickAdd = this.handleAdd.bind(this);
  var boundClickView = this.handleView.bind(this);
  
    return (
      <Grommet theme={theme} full>
        <ResponsiveContext.Consumer>
          {size => (
            <Box fill>
              <AppBar>
                <Heading level='3' margin='none'>My App</Heading>
                <Button
                  icon={<Notification />}
                  onClick={() => this.setState({ showSidebar: !this.state.showSidebar })}
                />
              </AppBar>
              <Box direction='row' flex overflow={{ horizontal: 'hidden' }}>
                  
                  
                    <Box fill pad="large">
                      <Grid gap="medium" rows="f" columns={{ count: 'fit', size: 'small' }}>
                        {this.state.cards.map(value => (
                          <Fish url={value.url} color={value.color} icon={value.icon} subTitle={value.subTitle} message={value.message} />
                        ))}
                      </Grid>
                    </Box>

                {(!this.state.showSidebar || size !== 'small') ? (
                  <Collapsible direction="horizontal" open={this.state.showSidebar}>
                    <Box
                      flex
                      width='medium'
                      background='light-2'
                      elevation='small'
                      align='center'
                      justify='center'
                    >
                      <Graph />
                    </Box>
                  </Collapsible>
                 ): (
                    <Layer>
                      <Box
                        background='light-2'
                        tag='header'
                        justify='end'
                        align='center'
                        direction='row'
                      >
                        <Button
                          icon={<FormClose />}
                          onClick={() => this.setState({ showSidebar: false})}
                        />
                      </Box>
                      <Box
                        fill
                        background='light-2'
                        align='center'
                        justify='center'
                      >
                        <Graph />
                      </Box>
                    </Layer>

                )}
              </Box>
            </Box>
          )}
        </ResponsiveContext.Consumer>
        <Fab
          mainButtonStyles={{
            backgroundColor: theme.global.colors.brand,
                        }}
                        style={{
                          bottom: 10,
                          right: 10,
                        }}
          icon=<Dashboard color="white"/>
          onClick={boundClickAdd}
        >
          <Action
              text="Add"
              onClick={boundClickAdd}
            >
            <Add color="white"/>
          </Action>
          <Action
            text="View"
            onClick={boundClickView}
          >
            <View color="white"/>
          </Action>
        </Fab>
      </Grommet>
    );
  }
}

export default App;
