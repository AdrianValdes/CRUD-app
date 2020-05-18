import React from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';

class GoogleAuth extends React.Component {
  constructor(props) {
    super(props);

    this.renderAuthButton = this.renderAuthButton.bind(this);
    this.onAuthChange = this.onAuthChange.bind(this);

    this.onSignInClick = this.onSignInClick.bind(this);
    this.onSignOutClick = this.onSignOutClick.bind(this);
  }

  componentDidMount() {
    window.gapi.load('client:auth2', () => {
      window.gapi.client
        .init({
          clientId:
            '519968374882-vmpjmsni8dq59ibctdbphu6r17ka2o83.apps.googleusercontent.com',
          scope: 'email',
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          this.onAuthChange(this.auth.isSignedIn.get());
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  onAuthChange(isSignedIn) {
    if (isSignedIn) {
      this.props.signIn(this.auth.currentUser.get().getId());
    } else {
      this.props.signOut();
    }
  }

  onSignInClick() {
    this.auth.signIn();
  }

  onSignOutClick() {
    this.auth.signOut();
  }

  renderAuthButton() {
    if (this.props.isSignedIn === null) {
      return null;
    } else if (this.props.isSignedIn) {
      return <button onClick={this.onSignOutClick}>Sign out</button>;
    } else {
      return <button onClick={this.onSignInClick}>Sign in with Google</button>;
    }
  }
  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    isSignedIn: state.auth.isSignedIn,
  };
};
export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);
//519968374882-vmpjmsni8dq59ibctdbphu6r17ka2o83.apps.googleusercontent.com
