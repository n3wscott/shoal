import React, { Component, useRef, useState, useEffect, useLayoutEffect } from 'react';

import {
  Box,
  List,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Card,
  CardBody,
  CardFooter,
  Grid,
  Grommet,
  Text,
  ResponsiveContext
} from 'grommet';
import Icon from './Icon';

import {
  Alert,
  CircleInformation,
  Checkmark,
} from 'grommet-icons';

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

const Data = ({ children, states, ...rest }) => {
  const targetRef = useRef();
  const [dimensions, setDimensions] = useState({ width:0, height: 0 });

  useLayoutEffect(() => {
    console.log("here in useLayoutEffect")
    if (targetRef.current) {
      let size = "large";
      if (targetRef.current.offsetWidth > 1000 ) {
        size = "large";
      } else if (targetRef.current.offsetWidth > 400 ) {
        size = "medium";
      } else {
        size = "small";
      }

      setDimensions({
        size: size,
        width: targetRef.current.offsetWidth,
        height: targetRef.current.offsetHeight
      });
    }
  }, []);

  useEffect(() => {
    console.log("here in useEffect")
    if (targetRef.current) {
      let size = "large";
      if (targetRef.current.offsetWidth > 1000 ) {
        size = "large";
      } else if (targetRef.current.offsetWidth > 400 ) {
        size = "medium";
      } else {
        size = "small";
      }

      setDimensions({
        size: size,
        width: targetRef.current.offsetWidth,
        height: targetRef.current.offsetHeight
      });
    }
  }, [targetRef]);

  return (
    <Box gap="small" {...rest} ref={ targetRef }>
        <Table margin="xsmall" size="xxsmall">
          <TableHeader>
            <TableRow>
              <TableCell border="bottom">
                Type
              </TableCell>
              <TableCell scope="col" border="bottom">
                Status
              </TableCell>
              {(dimensions.size !== 'small') && (
                <TableCell scope="col" border="bottom">
                  Reason
                  <p>{dimensions.size}</p>
                  <p>{dimensions.width}</p>
                </TableCell>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {(typeof states === "undefined" || !states.length) ? (<></>) : (
              states.map(c => (
                <TableRow>
                  <TableCell>
                    {c.type}
                  </TableCell>
                  <TableCell>
                    {(c.status === "True") && (<Checkmark/>)}
                    {(c.status === "Unknown") && (<CircleInformation/>)}
                    {(c.status === "False") && (<Alert/>)}
                  </TableCell>
                  {(dimensions.size !== 'small') && (
                    <TableCell>{c.reason}</TableCell>
                  )}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
    {children}
  </Box>
);
};

export class Fish extends Component {
  constructor(props) {
    super(props);
    this.state = {words: "", date: new Date()};

    

    this.url = new URL(window.location.origin + props.params.url);
    if (typeof props.params.query !== "undefined") { 
      for (const [key, value] of Object.entries(props.params.query)) {
        this.url.searchParams.append(key, value);
      }
    }
    console.log(this.url)
    

//    myUrlWithParams.searchParams.append("city", "Rome");
//    myUrlWithParams.searchParams.append("price", "200");

//    console.log(myUrlWithParams.href);
    
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
        console.log("got bacon:");
        console.log(bacon);
        this.setState({
          title: bacon.title,
          message: bacon.message,
          conditions: bacon.conditions,
          date: new Date()
        });
      })
      .catch(console.log);
  }

  render() {
    return(
      <Card basis="auto" background={this.props.params.color} key={this.props.params.message}>
        <CardBody pad="small">
          <Identifier
            pad="small"
            title={this.state.title}
            subTitle={this.props.params.subTitle}
            size="small"
            align="start"
          >
            <Icon name={this.props.params.icon}/>
            <Text>It is {this.state.date.toLocaleTimeString()}.</Text>
          </Identifier>
          <Data states={this.state.conditions} />

        </CardBody>
        <CardFooter pad={{ horizontal: 'medium', vertical: 'small' }}>
          <Text size="xsmall">{this.props.params.message}</Text>
        </CardFooter>
      </Card>
    )
  }
}

export default Fish;