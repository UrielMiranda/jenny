import React, { Component } from "react";
import { deleteItem } from "../../actions/items/deleteItem";
import { connect } from "react-redux";

function mapDispatchToProps(dispatch) {
  return {
    deleteItem: id => {
      dispatch(deleteItem(id));
    }
  };
}

class DeleteBtn extends Component {
  constructor(props) {
    super(props);
    this.remove = this.remove.bind(this);
  }
  remove() {
    const { id } = this.props;
    this.props.deleteItem(id);
  }
  render() {
    return <button onClick={this.remove}>X</button>;
  }
}

export default connect(
  null,
  mapDispatchToProps
)(DeleteBtn);
