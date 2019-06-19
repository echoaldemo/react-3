import React, { Component } from 'react';

import './Search.css';

import { MdSearch } from 'react-icons/md';

//////////////////////////////////////////////////////// THIS COMPONENT IS BEING RENDERED IN THE *HEADER* COMPONENT

export default class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: ''
    };
  }

  updateText(value) {
    var encoded = encodeURI(value)
    this.setState({ text: encoded });
  }


  render() {
    return (
      <section className="Search__parent">
        <div className="Search__content">
          <input placeholder="Search Your Feed" onChange={e => this.updateText(e.target.value)}/>

          <MdSearch id="Search__icon" onClick={e => this.props.searchFn(this.state.text)} />
        </div>
      </section>
    );
  }
}
