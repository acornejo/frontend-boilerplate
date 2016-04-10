import React from 'react';
import { browserHistory } from 'react-router';

class About extends React.Component {
  handleClick() {
    browserHistory.push("/");
  }

  render() {
    return (
      <div onClick={this.handleClick.bind(this)}>
        Just needed an excuse for another route
        <br/>
        Click here to go back.
      </div>
    );
  }
};

export default About;
