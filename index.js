var Index = React.createClass({
  getInitialState: function() {
    return {value: 'SessionID'};
  },
  joinSession: function() {
    window.location = "meeting/" + this.state.value;
  },
  startNewSession: function() {
    window.location = "meeting/" + shortid.gen();
  },
  updateValue: function(e) {
    this.setState({value: e.target.value});
  },
	render: function() {
		return (
      <form>
        <div className="form-group row">
          <label HTMLfor="exampleShortID" className="col-xs-1 col-form-label">Meeting ID</label>
          <div className="col-xs-5">
            <input id="sess-join" type="text" className="form-control" value={this.state.value} onChange={this.updateValue}/>
          </div>
          <button className="btn btn-primary" type="button" onClick={() => this.joinSession()}>Join</button>
        </div>
        <button type="button" className="btn btn-primary" onClick={() => this.startNewSession()}>Start new session</button>
        </form>
		);
	}
});

ReactDOM.render(
        <Index />,
        document.getElementById('index-wrap')
);
