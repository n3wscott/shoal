import React, {Component} from "react";

import {
  Box,
  Button,
  Collapsible,
  Heading,
  Grid,
  Grommet,
  Layer,
  Header,
  ResponsiveContext,
  Form, FormField, TextInput, Select,
} from 'grommet';

import {Add, Dashboard, View} from 'grommet-icons';

import {FormClose, Notification} from 'grommet-icons';

import {Fab, Action} from 'react-tiny-fab';
import 'react-tiny-fab/dist/styles.css';

import Graph from './Graph';
import Fish from './Fish';
import data from './data'


const theme = {
  global: {
    font: {
      family: 'Roboto',
      size: '18px',
      height: '20px',
    },
    colors: {
      brand: '#228BE6',
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
      pad: {horizontal: 'medium', vertical: 'small'},
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
    pad={{left: 'medium', right: 'small', vertical: 'small'}}
    elevation='medium'
    style={{zIndex: '1'}}
    {...props}
  />
);

const TierFish = (props) => (
  <>
    {props.fish.tier === props.tier && <Fish params={props.fish}/>}
  </>
);

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSidebar: false,
      showAdd: false,
      cards: data,
    }
    this.next = 1;
  }

  handleAdd() {
    console.log("here on handle click add")
    this.add(data[this.next % data.length])
  }

  add(entry) {
    this.setState(state => {
      const list = [...state.cards, entry];
      return {
        cards: list
      };
    });
    this.next++;
  }

  handleView() {
    console.log("here on handle click view")
    this.setState({showAdd: true})
  }


  render() {
    var boundClickAdd = this.handleAdd.bind(this);
    var boundClickView = this.handleView.bind(this);

    const fish = this.state.cards;
    const { showSidebar } = this.state;

    return (
      <Grommet theme={theme} full>
        <ResponsiveContext.Consumer>
          {size => (
            <Box flex>
              <AppBar>
                <Heading level='3' margin='none'>My App</Heading>
                <Button
                  icon={<Notification/>}
                  onClick={() => {console.log("here" + this.state.showSidebar);
                    this.setState({showSidebar: !this.state.showSidebar}) }}
                />
              </AppBar>
              <Box direction='row' flex overflow={{horizontal: 'hidden'}}>
                <Box direction='column' flex pad="medium">

                  {[0, 1, 2, 3].map(tier => {
                    return (
                      <Box direction='row' flex pad="medium">
                        <Header background="light-4" pad="small">
                          <Heading level="2" size="small">P{tier}</Heading>
                        </Header>
                        <Box flex pad="small">
                          <Grid gap="medium" rows="f" columns={{count: 'fit', size: 'small'}}>
                            {fish.map(f => (
                              <TierFish tier={tier} fish={f}/>
                            ))}
                          </Grid>
                        </Box>
                      </Box>
                    )
                  })}
                </Box>

                {(!this.state.showSidebar || size !== 'small') ? (
                  <Collapsible direction="horizontal" open={this.state.showSidebar}>
                    <Box
                      flex
                      width='medium'
                      background='light-2'
                      elevation='small'
                      align='center'
                      justify='top'
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



              {(!this.state.showAdd && (!this.state.showSidebar || size !== 'small')) && (
                <Fab
                  mainButtonStyles={{backgroundColor: theme.global.colors.brand}}
                  style={{bottom: 10, right: 10}}
                  onClick={boundClickAdd}
                  icon={<Dashboard color="white"/>}
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
              )}
            </Box>
          )}
        </ResponsiveContext.Consumer>



        {this.state.showAdd && (
          <Layer
            onEsc={() => this.setState({showAdd: false})}
            onClickOutside={() => this.setState({showAdd: false})}
          >
            <Button label="close" onClick={() => this.setState({showAdd: false})}/>
            <Box pad="large">
              <Form onSubmit={({value}) => {
                console.log("hey, got a form post: ");
                console.log(value);
                this.add(value);
              }}>
                <FormField label="Title">
                  <TextInput name="title"/>
                </FormField>
                <FormField label="Color">
                  <Select
                    name="color"
                    options={['blue', 'green', 'teal', 'purple', 'red', 'orange', 'yellow',]}
                  />
                </FormField>
                <FormField label="Icon">
                  <Select name="icon"
                          options={['Add', 'Location', 'System', 'ShieldSecurity', 'Tasks', 'User', 'Wifi', 'Car', 'Bar', 'Cloud',]}
                  />
                </FormField>
                <FormField label="Sub-Title">
                  <TextInput name="subTitle"/>
                </FormField>
                <FormField label="Message">
                  <TextInput name="message"/>
                </FormField>
                <FormField label="URL">
                  <TextInput name="url"/>
                </FormField>

                <Box direction="row" gap="medium">
                  <Button type="submit" primary label="Submit"/>
                  <Button type="reset" label="Reset"/>
                </Box>
              </Form>
            </Box>
          </Layer>
        )}

      </Grommet>
    );
  }
}

export default App;
