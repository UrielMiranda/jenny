import React, { Component } from "react";
import { setSurveys } from "../../actions/surveys/setSurveys";
import { connect } from "react-redux";
import Save from "../Save/Save";
import firebase from "firebase";
const db = firebase.firestore();
import { Input, Button, Icon } from "@material-ui/core";

function mapStateToProps(state) {
  return {
    items: state.items,
    surveys: state.surveys
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setSurveys: surveys => {
      dispatch(setSurveys(surveys));
    }
  };
}

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentValue: null,
      surveys: this.props.surveys
    };
    this.onChange = this.onChange.bind(this);
    this.add = this.add.bind(this);
  }
  componentDidMount() {
    db.collection("surveys")
      .get()
      .then(querySnapshot => {
        let documents = [];
        querySnapshot.forEach(doc => {
          documents = [...documents, { id: doc.id, data: doc.data() }];
        });
        this.props.setSurveys({ surveys: documents });
      })
      .catch(err => {
        console.log(err);
      });
  }

  onChange(data) {
    this.setState({ currentValue: data.target.value });
  }

  add(e) {
    e.preventDefault();
    const { currentValue } = this.state;
    this.props.setItem({ id: Date.now(), question: currentValue });
    this.setState({ currentValue: "" });
  }

  render() {
    const { currentValue } = this.state;
    const { items } = this.props;
    return (
      <div style={{ padding: "20px" }}>
        <form onSubmit={this.add}>
          <Input
            placeholder={"Type your question"}
            onChange={this.onChange}
            value={currentValue ? currentValue : ""}
            type="text"
          />
          <Button type="submit" disabled={!currentValue}>
            <Icon>add</Icon>
            Add
          </Button>
        </form>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form);
