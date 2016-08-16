var AgendaItem = React.createClass({
	render: function() {
		return (
			<div className="item" id={this.props.data.id} key={this.props.data.id}><div className="content" contentEditable="true">{this.props.data.text}</div><button id={this.props.data.id} className="delete" onClick={() => this.props.onDelete(this.props.data.id)}>X</button></div>
                );
        }
});

var Agenda = React.createClass({
  componentWillMount: function() {
    var ws = new Ws("ws://" + window.location.hostname + ":8080/ws");
    ws.OnConnect(function () {
            console.log("Websocket connection enstablished");
    });
  },
	getInitialState: function() {
		return {data: [{id: 1, text: "Example."}], deleted: [], sort: []};
	},
	addNew: function() {
		var newId = Math.max.apply(Math,this.state.data.map(function(o){return o.id;}));
		var newId = newId + 1;
		var newText = "Agenda Item Number: " + newId;
		var newData = this.state.data.concat([{id: newId, text: newText}]);
		this.setState({data: newData});
	},
	onDelete: function (id) {
		console.log(id)
		this.setState({ deleted: this.state.deleted.concat([id]) });
	},
	deleteItem: function(idToDel) {
		var idMatch = function(id) {
			return this.id != id;
		}
		var objDeleted = this.state.data.filter(idMatch(idToDel));
		this.setState({data: objDeleted});
	},
	render: function() {
		var Items = this.state.data
			.filter(item => this.state.deleted.indexOf(item.id) === -1)
			.map(item => {
				return (
					<AgendaItem data={item} onDelete={id => this.onDelete(id)}></AgendaItem>
				);
			});
		return (
			<div id="item-wrap" class="item-wrap">
				<div id="agenda" class="agenda">{Items}</div>
				<button className="add" onClick={this.addNew}>Add a new item</button>
			</div>
		);
	}
});

ReactDOM.render(
        <Agenda />,
        document.getElementById('list-wrap')
);

var el = document.getElementById('agenda');
var sortable = Sortable.create(el, {
			animation: 200,
});
