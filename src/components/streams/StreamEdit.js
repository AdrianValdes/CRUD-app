import React from 'react';
import { connect } from 'react-redux';
import { fetchStream, editStream } from '../../actions';
import StreamFrom from './StreamForm';

class StreamEdit extends React.Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchStream(id);
  }

  onSubmit = (formValues) => {
    const { id } = this.props.match.params;
    this.props.editStream(id, formValues);
  };

  filterObject(...args) {
    const toKeep = args;

    const filteredObject = Object.keys(this.props.stream)
      .filter((key) => toKeep.includes(key))
      .reduce((object, item) => {
        object[item] = this.props.stream[item];
        return object;
      }, {});

    return filteredObject;
  }

  render() {
    if (!this.props.stream) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <h3>Edit a Stream</h3>
        <StreamFrom
          onSubmit={this.onSubmit}
          initialValues={this.filterObject('title', 'description')}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] };
};
export default connect(mapStateToProps, { fetchStream, editStream })(
  StreamEdit
);
