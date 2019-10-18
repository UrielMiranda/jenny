import React, { Component } from "react";
import firebase from "firebase";
import { connect } from "react-redux";
import { setSurveys } from "../../actions/surveys/setSurveys";
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  Grid
} from "@material-ui/core";

const db = firebase.firestore();
const classes = {
  card: {
    minWidth: 275,
    height: 200,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between"
    // width: 300
  },
  flex: {
    display: "flex"
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
};

function mapStateToProps(state) {
  return {
    surveys: state.surveys
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setSurveys: survey => {
      dispatch(setSurveys(survey));
    }
  };
}

class Surveys extends Component {
  constructor(props) {
    super(props);
    this.state = {
      surveys: null
    };
  }
  componentDidMount() {
    db.collection("surveys")
      .get()
      .then(querySnapshot => {
        let documents = [];
        querySnapshot.forEach(doc => {
          let { data, title, description } = doc.data();
          documents = [
            ...documents,
            { id: doc.id, data: data, title: title, description: description }
          ];
        });
        this.props.setSurveys(documents);
        this.setState({ surveys: documents });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    const { surveys } = this.state;
    if (surveys) {
      return surveys.map(item => {
        return (
          <Grid key={item.id} item xs={12} sm={3} style={classes.flex}>
            <Card style={classes.card}>
              <CardContent>
                <Typography variant="h5" component="h2">
                  {item.title}
                </Typography>
                <Typography style={classes.pos} color="textSecondary">
                  adjective
                </Typography>
                <Typography variant="body2" component="p">
                  {item.description}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Editar</Button>
              </CardActions>
            </Card>
          </Grid>
        );
      });
    } else {
      return <div>Loading...</div>;
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Surveys);
