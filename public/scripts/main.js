var Card = React.createClass({
    getInitialState(){
        return {clicked: false};
    },
    handleClick(){
        this.setState({clicked: !this.state.clicked});
    },
    render: function () {
        return (
            <div className="card blue-grey col m2" onClick={this.handleClick}>
                <p className="card-content white-text">
                </p>
            </div>
        );
    }
});

var CardList = React.createClass({
    render: function () {
        var cards = this.props.data.map(function (value) {
            return ( <Card value={value}/>);
        });
        return (<div className="row">{cards}</div>);
    }
});

var CardContainer = React.createClass({
    getInitialState: function () {
        return {data: []};
    },
    componentDidMount: function () {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            cache: false,
            success: function (data) {
                this.setState({data: data});
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    render: function () {
        return (<CardList data={this.state.data}/>);
    }
});

var ButtonSearch = React.createClass({
    getInitialState(){
        return {clicked: false, volData: [], hotelData: []};
    },
    handleClick(){
        this.setState({clicked: true});
        $.ajax({
            url: "/url/vols",
            dataType: 'json',
            cache: false,
            success: function (data) {
                this.setState({volData: data});
            }.bind(this),
            error: function (xhr, status, err) {
                console.error("/url/vols", status, err.toString());
            }.bind(this)
        });
        if (ReactDOM.findDOMNode(this.refs.wantHotel).checked){
            $.ajax({
                url: "/url/hotels",
                dataType: 'json',
                cache: false,
                success: function (data) {
                    this.setState({hotelData: data});
                }.bind(this),
                error: function (xhr, status, err) {
                    console.error("/url/hotels", status, err.toString());
                }.bind(this)
            });
        }
    },
    render(){
        if (this.state.clicked) {
            return (
                <div>
                    <div className="row">
                        <button onClick={this.handleClick}
                                className="btn waves-effect waves-light col s6 offset-s3 m2 offset-m5">Search</button>
                    </div>
                    <CardList data={this.state.volData}/>
                    <CardList data={this.state.hotelData}/>
                </div>
            );
        }else {
            return (
                <div className="row">
                    <button onClick={this.handleClick}
                            className="btn waves-effect waves-light col s6 offset-s3 m2 offset-m5">Search</button>
                </div>
            );
        }
    }
});

var SelectCity = React.createClass({
    getInitialState(){
        return {selected:""};
    },
    handleChange() {
        if (this.props.first) {
            this.state.selected = ReactDOM.findDOMNode(this.refs.depart).value;
            this.props.onUserInput(this.state.selected);
        }
    },
    render(){
        let options = this.props.data.map(function (value) {
            return (<option value={value} key={value}>{value}</option>);
        });
        return (<div className="input-field col s12 m5">
            <select className="browser-default" id={this.props.val} ref={this.props.val} value={this.state.selected} onChange={this.handleChange} required>
                <option disabled value="">Choose a city</option>
                {options}
            </select>
        </div>);
    }
});

var PersonForm = React.createClass({
    render(){
        return(
            <div className="row">
                <div className="row">
                    <div className="input-field col s12 m6">
                        <input type="text" id="firstName" ref="firstName" className="validate" placeholder="First name"/>
                    </div>
                    <div className="input-field col s12 m6">
                        <input type="text" id="lastName" ref="lastName" className="validate" placeholder="Last name"/>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s12 m6">
                        <input type="tel" id="tel" ref="tel" className="validate" placeholder="Telephone" pattern="^((\+\d{1,3}(-| )?\(?\d\)?(-| )?\d{1,5})|(\(?\d{2,6}\)?))(-| )?(\d{3,4})(-| )?(\d{4})(( x| ext)\d{1,5}){0,1}$"/>
                    </div>
                    <div className="input-field col s12 m6">
                        <input type="email" id="email" ref="email" className="validate" placeholder="Email"/>
                    </div>
                </div>
            </div>
        );
    }
});

var SelectionPanel = React.createClass({
    getInitialState(){
        return {fullData:["Bordeaux","Paris","Tokyo","NYC"], partialData:["Bordeaux","Paris","Tokyo","NYC"]};
    },
    handleChange(selected){
        let array = this.getInitialState().partialData;
        let index = array.findIndex(function(obj){
            return (obj === selected);
        });
        array.splice(index, 1);
        this.setState({partialData: array});
    },
    render(){
        return (
            <div>
                <form ref="search-form">
                    <PersonForm />
                    <div className="row">
                        <SelectCity first="true" val="depart" data={this.state.fullData} onUserInput={this.handleChange}/>
                        <div class="col s0 m1"></div>
                        <SelectCity first="false" val="destination" data={this.state.partialData}/>
                        <div className="input-field col s12 m1">
                            <input className="browser-default" type="checkbox" id="wantHotel" ref="wantHotel"/>
                            <label htmlFor="wantHotel">Hotel ?</label>
                        </div>
                    </div>
                </form>
                <ButtonSearch />
            </div>
        );
    }
});

var Page = React.createClass({
    render(){
        return (<SelectionPanel url="urlToCities"/>);
    }
});

ReactDOM.render(
    <Page />,
    document.getElementById('content')
);
