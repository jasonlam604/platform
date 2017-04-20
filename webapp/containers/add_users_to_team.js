// Copyright (c) 2017 Mattermost, Inc. All Rights Reserved.
// See License.txt for license information.

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getProfilesNotInTeam} from 'mattermost-redux/actions/users';

import AddUsersToTeam from 'components/add_users_to_team.jsx';

function makeMapStateToProps() {
    return function mapStateToProps(state, ownProps) {
        return {
            ...ownProps
        };
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            getProfilesNotInTeam
        }, dispatch)
    };
}

export default connect(makeMapStateToProps, mapDispatchToProps)(AddUsersToTeam);
