import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";

function mapStateToProps(state) {
  return {
    items: state.items
  };
}

class Save extends Component {
  constructor(props) {
    super(props);
    this.save = this.save.bind(this);
  }

  save(e) {
    e.preventDefault();
    axios
      .post(
        "https://us-central1-jenny-hpawmv.cloudfunctions.net/surveysClient/survey",
        {
          data: this.props.items
        }
      )
      .then(response => {
        console.log(response);
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    const { items } = this.props;
    return (
      <button color="inherit" onClick={this.save} disabled={!items.length}>
        Save
      </button>
    );
  }
}

export default connect(mapStateToProps)(Save);
