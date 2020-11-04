import React from 'react';

import { Grommet, Box, Diagram, Stack } from 'grommet';
import { grommet } from 'grommet/themes';

const Node = ({ id, ...rest }) => (
  <Box
    id={id}
    basis="xxsmall"
    margin="small"
    pad="medium"
    round="small"
    background="dark-3"
    {...rest}
  />
);

const connection = (fromTarget, toTarget, { color, ...rest } = {}) => ({
  fromTarget,
  toTarget,
  anchor: 'vertical',
  color,
  thickness: 'xsmall',
  round: true,
  type: 'rectilinear',
  ...rest,
});

export const Progressing = () => {
  const connections = [
    connection('1', '5'),
    connection('1', '9'),
    connection('2', '6', { anchor: 'horizontal', color: 'brand' })
  ];

  connections.push(connection('1', '2', { anchor: 'horizontal' }));
  connections.push(connection('3', '5', { anchor: 'horizontal', color: 'brand' }));

  return (
    <Grommet theme={grommet}>
      <Box align="start" pad="large">
        <Stack>
          <Box>
            <Box direction="row">
              {[1, 2, 3].map(id => (
                <Node key={id} id={id}/>
              ))}
            </Box>
            <Box direction="row">
              {[4, 5, 6].map(id => (
                <Node key={id} id={id} background="dark-2" />
              ))}
            </Box>
            <Box direction="row">
              {[7, 8, 9].map(id => (
                <Node key={id} id={id} background="dark-3" />
              ))}
            </Box>
          </Box>
          <Diagram connections={connections} />
        </Stack>
      </Box>
    </Grommet>
  );
};

export default Progressing;