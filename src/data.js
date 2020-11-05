const Data = [
  {
    tier: 0,
    color: 'blue',
    icon: "Car",
    title: 'Remote Access',
    subTitle: 'Lights out Management (LOM)',
    message: 'Connected',
    url: '/blue',
  },
  {
    tier: 1,
    color: 'green',
    icon: "System",
    title: 'System',
    subTitle: 'Sub-system and Devices',
    message: 'Composable System',
    url: '/green',
    query: {
      foo: "bar",
      baz: "boof"
    },
  },
  {
    tier: 2,
    color: 'red',
    icon: "User",
    title: 'User Sessions',
    subTitle: 'User Access on Server',
    message: '4 active sessions',
    url: '/red',
  },
  {
    tier: 2,
    color: 'purple',
    icon: "Tasks",
    title: 'Logs',
    subTitle: 'Events, Integration, and Status',
    message: '204,353',
    url: '/purple',
  },
  {
    tier: 3,
    color: 'orange',
    icon: "Location",
    title: 'Beacons',
    subTitle: 'Unique identification light',
    message: '24 beacons connected',
    url: '/orange',
  },
  {
    tier: 3,
    color: 'teal',
    icon: "ShieldSecurity",
    title: 'Security',
    subTitle: 'Trusted Platform Module',
    message: 'No Module Connected',
    url: '/teal',
  },
];


export default Data;