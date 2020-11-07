package api


/*
  {
    tier: 0,
    color: 'blue',
    icon: "Car",
    title: 'Remote Access',
    subTitle: 'Lights out Management (LOM)',
    message: 'Connected',
    url: '/blue',
  },
*/

type State struct {
    Title string `json:"title"`
    Message string `json:"message"`
    Conditions []Conditions `json:"conditions"`
}

type Conditions struct {
    Status string `json:"status"` // True, False, Unknown
    Type string `json:"type"`
    Reason string `json:"reason"`
}