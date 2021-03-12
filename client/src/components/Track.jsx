class Track extends React.Component {
  onClick = (e) => {
    myTracker.track(props.eventName);
  }

  render() {
    return React.Children.map(
      this.props.children,
      c => React.cloneElement(c, {
        onClick: this.onClick,
      }),
    );
  }
}

function Wrapper(props) {
  return props.children;
}

<Track eventName={'button 1 click'}>
  <button>Button 1</button>
</Track>

<Track eventName={'button 2 click'}>
  <Wrapper>
    <button>Button 2</button>
  </Wrapper>
</Track>