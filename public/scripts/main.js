var CardHero = React.createClass({
  render: function(){
    return(
      <div className="card blue-grey col m2 marginright">
        <p className="card-content white-text">
          {this.props.hero.firstName} {this.props.hero.lastName}
        </p>
      </div>
    );
  }
});

var CardList = React.createClass({
  render: function() {
    var cards = this.props.heros.map(function(hero){
      return( <CardHero hero={hero}/>);
    });
    return(<div className="row" >{cards}</div>);
  }
});

var CardContainer = React.createClass({
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  render: function(){
    return(<CardList heros={this.state.data}/>);
  }
});

ReactDOM.render(
  <CardContainer url="http://localhost:3000/contacts"/>,
  document.getElementById('content')
);
