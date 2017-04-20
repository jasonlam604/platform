// Copyright (c) 2017 Mattermost, Inc. All Rights Reserved.
// See License.txt for license information.

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getUser} from 'mattermost-redux/actions/users';

import TeamMembersDropdown from 'components/team_members_dropdown.jsx';

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
            getUser
        }, dispatch)
    };
}

export default connect(makeMapStateToProps, mapDispatchToProps)(TeamMembersDropdown);
