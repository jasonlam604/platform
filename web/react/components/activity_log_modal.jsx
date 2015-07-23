// Copyright (c) 2015 Spinpunch, Inc. All Rights Reserved.
// See License.txt for license information.

var UserStore = require('../stores/user_store.jsx');
var Client = require('../utils/client.jsx');
var AsyncClient = require('../utils/async_client.jsx');

function getStateFromStoresForSessions() {
    return {
        sessions: UserStore.getSessions(),
        server_error: null,
        client_error: null
    };
}

module.exports = React.createClass({
    submitRevoke: function(altId) {
        var self = this;
        Client.revokeSession(altId,
            function(data) {
                AsyncClient.getSessions();
            }.bind(this),
            function(err) {
                state = getStateFromStoresForSessions();
                state.server_error = err;
                this.setState(state);
            }.bind(this)
        );
    },
    componentDidMount: function() {
        UserStore.addSessionsChangeListener(this._onChange);
        AsyncClient.getSessions();

        var self = this;
        $(this.refs.modal.getDOMNode()).on('hidden.bs.modal', function(e) {
            self.setState({ moreInfo: [] });
        });
    },
    componentWillUnmount: function() {
        UserStore.removeSessionsChangeListener(this._onChange);
    },
    _onChange: function() {
        this.setState(getStateFromStoresForSessions());
    },
    handleMoreInfo: function(index) {
        var newMoreInfo = this.state.moreInfo;
        newMoreInfo[index] = true;
        this.setState({ moreInfo: newMoreInfo });
    },
    getInitialState: function() {
        var initialState = getStateFromStoresForSessions();
        initialState.moreInfo = [];
        return initialState;
    },
    render: function() {
        var activityList = [];
        var server_error = this.state.server_error ? this.state.server_error : null;

        for (var i = 0; i < this.state.sessions.length; i++) {
            var currentSession = this.state.sessions[i];
            var lastAccessTime = new Date(currentSession.last_activity_at);
            var firstAccessTime = new Date(currentSession.create_at);
            var devicePicture = "";

            if (currentSession.props.platform === "Windows") {
                devicePicture = "fa fa-windows";
            }
            else if (currentSession.props.platform === "Macintosh" || currentSession.props.platform === "iPhone") {
                devicePicture = "fa fa-apple";
            }

            activityList[i] = (
                <div className="activity-log__table">
                    <div className="activity-log__report">
                        <div className="report__platform"><i className={devicePicture} />{currentSession.props.platform}</div>
                        <div className="report__info">
                            <div>{"Last activity: " + lastAccessTime.toDateString() + ", " + lastAccessTime.toLocaleTimeString()}</div>
                            { this.state.moreInfo[i] ?
                            <div>
                                <div>{"First time active: " + firstAccessTime.toDateString() + ", " + lastAccessTime.toLocaleTimeString()}</div>
                                <div>{"OS: " + currentSession.props.os}</div>
                                <div>{"Browser: " + currentSession.props.browser}</div>
                                <div>{"Session ID: " + currentSession.alt_id}</div>
                            </div>
                            :
                            <a href="#" onClick={this.handleMoreInfo.bind(this, i)}>More info</a>
                            }
                        </div>
                    </div>
                    <div className="activity-log__action"><button onClick={this.submitRevoke.bind(this, currentSession.alt_id)} className="btn btn-primary">Logout</button></div>
                </div>
            );
        }

        return (
            <div>
                <div className="modal fade" ref="modal" id="activity-log" tabIndex="-1" role="dialog" aria-hidden="true">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                <h4 className="modal-title" id="myModalLabel">Active Devices</h4>
                            </div>
                            <div ref="modalBody" className="modal-body">
                                <form role="form">
                                { activityList }
                                </form>
                                { server_error }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});
