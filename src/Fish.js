import React, { Component } from 'react';
import { Box, Button, Card, CardBody, CardFooter, Grid, Grommet, Text } from 'grommet';
import Icon from './Icon';


const Identifier = ({ children, title, subTitle, size, ...rest }) => (
  <Box gap="small" align="center" {...rest}>
    {children}
    <Box>
      <Text size={size} weight="bold">
        {title}
      </Text>
      <Text size={size}>{subTitle}</Text>
    </Box>
  </Box>
);

export class Fish extends Component {
  constructor(props) {
    super(props);
    this.state = {words: "", date: new Date()};
    this.url = props.url;
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    fetch(this.url)
      .then(res => res.json())
      .then((bacon) => {
        console.log("got bacon:" + bacon)
        this.setState({
          words: bacon.text,
          date: new Date()
        })
      })
      .catch(console.log)
  }

  render() {
    return(
      <Card basis="auto" background={this.props.color} key={this.props.message}>
        <CardBody pad="small">
          <Identifier
            pad="small"
            title={this.props.title}
            subTitle={this.props.subTitle}
            size="small"
            align="start"
          >
            <Icon name={this.props.icon}/>
            <Text>{this.state.words}</Text>
            <Text>It is {this.state.date.toLocaleTimeString()}.</Text>
          </Identifier>
        </CardBody>
        <CardFooter pad={{ horizontal: 'medium', vertical: 'small' }}>
          <Text size="xsmall">{this.props.message}</Text>
        </CardFooter>
      </Card>
    )
  }
}

export default Fish;