// Copyright (c) 2017 Mattermost, Inc. All Rights Reserved.
// See License.txt for license information.

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getProfiles, getProfilesInTeam} from 'mattermost-redux/actions/users';

import MoreDirectChannels from 'components/more_direct_channels.jsx';

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
            getProfiles,
            getProfilesInTeam
        }, dispatch)
    };
}

export default connect(makeMapStateToProps, mapDispatchToProps)(MoreDirectChannels);
