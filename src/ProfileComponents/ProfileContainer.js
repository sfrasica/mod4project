import React, { Component } from 'react';
// import Digimon from './Snack'

class ProfileContainer extends Component {

  render() {
    let {username} = this.props.user

    return (
      <div>
        <h2>{username}&apos;s Profile</h2>
        {/* <h3>Digimon Team {userDigimons}</h3> */}

        {/* <ol>
          {
            snacks.map((snack) => {
              return <Snack key={snack.id} snack={snack}/>
            })
          }
        </ol> */}

        {/* <NewSnackForm token={this.props.token} /> */}

      </div>
    );
  }

}

export default ProfileContainer;