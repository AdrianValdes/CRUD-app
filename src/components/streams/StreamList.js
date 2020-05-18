import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchStreams } from '../../actions';

class StreamList extends React.Component {
  componentDidMount() {
    this.props.fetchStreams();
  }

  renderAdmin(stream) {
    if (stream.userId === this.props.currentUserId) {
      return (
        <div>
          <Link to={`/streams/edit/${stream.id}`}>
            <button>Edit</button>
          </Link>
          <Link to={`/streams/delete/${stream.id}`}>
            <button>Delete</button>
          </Link>
        </div>
      );
    }
  }

  renderList() {
    const streamsArray = this.props.streams;

    return streamsArray.map((stream) => {
      return (
        <div className="small-container" key={stream.id}>
          <Link to={`/streams/${stream.id}`} className="header">
            <div>{stream.title}</div>
          </Link>
          <div>{stream.description}</div>
          {this.renderAdmin(stream)}
          <hr />
        </div>
      );
    });
  }

  renderCreate() {
    if (this.props.isSignedIn) {
      return (
        <div>
          <Link to="/streams/new">
            <button>Create Stream</button>
          </Link>
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        <h2>Streams</h2>
        <div>{this.renderList()}</div>
        {this.renderCreate()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    streams: Object.values(state.streams),
    currentUserId: state.auth.userId,
    isSignedIn: state.auth.isSignedIn,
  };
};
export default connect(mapStateToProps, { fetchStreams })(StreamList);
