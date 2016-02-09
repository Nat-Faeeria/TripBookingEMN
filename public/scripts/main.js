var ButtonSend = React.createClass({
    render(){
        return(
            <div className="row">
                <button type="submit" className="btn waves-effect waves-light col s6 offset-s3 m4 offset-m4">Book me up, Scotty !</button>
            </div>
        );
    }
});

var Card = React.createClass({
    handleClick(){
        this.props.onUserInput(this.props.value);
    },
    render: function () {
        return (
            <div className="left-margin card cyan darken-2 hoverable col s6 m2" value={JSON.stringify(this.props.value)} onClick={this.handleClick}>
                <p className="card-content white-text">
                    {this.props.value.content}
                </p>
            </div>
        );
    }
});

var CardList = React.createClass({
    getInitialState(){
        return{selected:""};
    },
    handleSelect(selectedValue){
        if (this.state.selected!=="") {
            ReactDOM.findDOMNode(this.refs[this.state.selected.id]).setAttribute('class', "left-margin card cyan darken-2 hoverable col s6 m2");
        }
        this.setState({selected: selectedValue});
        this.props.onUserInput(selectedValue);
        ReactDOM.findDOMNode(this.refs[selectedValue.id]).setAttribute('class',"left-margin card cyan darken-4 hoverable col s6 m2");
    },
    render: function () {
        let callback = this.handleSelect;
        var cards = this.props.data.map(function (value) {
            return ( <Card value={value} key={value.id} ref={value.id} onUserInput={callback}/>);
        });
        return (
            <div className="row">
                <input type="hidden" ref={this.props.name} value={this.state.selected}/>
                <h5 className="light">{this.props.name}</h5>
                {cards}
            </div>);
    }
});

var ButtonSearch = React.createClass({
    getInitialState(){
        return {clicked: false, volData: [], hotelData: [], selectedVol:"", selectedHotel:"", person: "", hotelWanted: false};
    },
    setSelectedVol(vol){
        this.setState({selectedVol: vol});
    },
    setSelectedHotel(hotel){
        this.setState({selectedHotel: hotel});
    },
    wantHotel(){
        return this.state.hotelWanted;
    },
    toReturn(){
        return {person: this.state.person, vol: this.state.selectedVol, hotel: this.state.selectedHotel};
    },
    handleClick(){
        let data = this.props.onUserInput();
        //this.setState({formData: data.person, hotelWanted: data.wantHotel,clicked: true});
        //this.setState({});
        this.setState({formData: data.person, hotelWanted: data.wantHotel,clicked: true, volData: [{id:1, content:"Vol1"},{id:2, content:"Vol2"}]});
        /*$.ajax({
            url: "/url/vols",
            dataType: 'json',
            cache: false,
            success: function (data) {
                this.setState({volData: data});
            }.bind(this),
            error: function (xhr, status, err) {
                console.error("/url/vols", status, err.toString());
            }.bind(this)
        });*/
        if (data.wantHotel){
            this.setState({hotelData: [{id: 1, content:"Hotel1"},{id: 2, content:"Hotel2"}]});
            /*$.ajax({
                url: "/url/hotels",
                dataType: 'json',
                cache: false,
                success: function (data) {
                    this.setState({hotelData: data});
                }.bind(this),
                error: function (xhr, status, err) {
                    console.error("/url/hotels", status, err.toString());
                }.bind(this)
            });*/
        }
    },
    render(){
        if (this.state.clicked) {
            if (this.wantHotel()){
                return (
                    <div>
                        <div className="row">
                            <button onClick={this.handleClick}
                                    className="btn waves-effect waves-light col s6 offset-s3 m2 offset-m5">Search</button>
                        </div>
                        <CardList name="Vols" data={this.state.volData} onUserInput={this.setSelectedVol} />
                        <CardList name="Hotels" data={this.state.hotelData} onUserInput={this.setSelectedHotel} />
                        <ButtonSend onUserInput={this.toReturn()}/>
                    </div>
                );
            }else {
                return (
                    <div>
                        <div className="row">
                            <button onClick={this.handleClick}
                                    className="btn waves-effect waves-light col s6 offset-s3 m2 offset-m5">Search</button>
                        </div>
                        <CardList name="Vols" data={this.state.volData} onUserInput={this.setSelectedVol}/>
                        <ButtonSend onUserInput={this.toReturn()}/>
                    </div>
                );
            }
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
    getFormData(){
        return {wantHotel: this.refs['wantHotel'].checked, person: {firstName: this.refs['firstName'].value,
            lastName:this.refs['lastName'].value,tel:this.refs['tel'].value,email:this.refs['email'].value}};
    },
    render(){
        return (
            <div>
                <form ref="search-form">
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
                    <div className="row">
                        <SelectCity first="true" val="depart" data={this.state.fullData} onUserInput={this.handleChange}/>
                        <div class="col s0 m1"></div>
                        <SelectCity first="false" val="destination" data={this.state.partialData}/>
                        <div className="input-field col s12 m1">
                            <input type="checkbox" id="wantHotel" ref="wantHotel"/>
                            <label htmlFor="wantHotel">Hotel?</label>
                        </div>
                    </div>
                </form>
                <ButtonSearch onUserInput={this.getFormData} />
            </div>
        );
    }
});

var Page = React.createClass({
    render(){
        return (
        <div className="container center">
            <h4 className="light">Trip Booking EMN</h4>
            <SelectionPanel url="urlToCities"/>
        </div>);
    }
});

ReactDOM.render(
    <Page />,
    document.getElementById('content')
);
