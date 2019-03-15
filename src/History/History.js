import React, { Component } from 'react';
import './History.css';
import axios from 'axios';
import moment from 'moment';

class History extends Component{
  constructor(props){
    super(props);
    this.state = {
      todayPrice: {},
      yesterdayPrice: {},
      twoDaysPrice: {},
      threeDaysPrice: {},
      fourDaysPrice: {},
    }
    this.getBitcoinPrice = this.getBitcoinPrice.bind(this);
    this.getEtherPrice = this.getEtherPrice.bind(this);
    this.getLitecoinPrice = this.getLitecoinPrice.bind(this);
  }

  getBitcoinPrice(date){
    return axios.get(`https://min-api.cryptocompare.com/data/pricehistorical?fsym=BTC&tsyms=USD&ts=${date}`);
  }

  getEtherPrice(date){
    return axios.get(`https://min-api.cryptocompare.com/data/pricehistorical?fsym=ETH&tsyms=USD&ts=${date}`);
  }

  getLitecoinPrice(date){
    return axios.get(`https://min-api.cryptocompare.com/data/pricehistorical?fsym=LTC&tsyms=USD&ts=${date}`)
  }

  getTodayPrice(){
    let today = moment().unix();

    axios.all([
      this.getBitcoinPrice(today),
      this.getEtherPrice(today),
      this.getLitecoinPrice(today)
    ])
    .then(axios.spread((bitcoin, ether, lite) => {
      let todayPrice = {
        date: moment.unix(today).format("MMMM Do YYYY"),
        bitcoin: bitcoin.data.BTC.USD,
        ether: ether.data.ETH.USD,
        lite: lite.data.LTC.USD
      }
      this.setState({ todayPrice: todayPrice})
    }));
  }

  getYesterdayPrice(date){
    let yesterday = moment().subtract(1, 'days').unix();

    axios.all([
      this.getBitcoinPrice(yesterday),
      this.getEtherPrice(yesterday),
      this.getLitecoinPrice(yesterday)
    ])
    .then(axios.spread((bitcoin, ether, lite) => {
      let yesterdayPrice = {
        date: moment.unix(yesterday).format("MMMM Do YYYY"),
        bitcoin: bitcoin.data.BTC.USD,
        ether: ether.data.ETH.USD,
        lite: lite.data.LTC.USD
      }
      this.setState({ yesterdayPrice: yesterdayPrice});
    }));
  }

  getTwoDaysPrice(){
    let twoDays = moment().subtract(2, 'days').unix();

    axios.all([
      this.getBitcoinPrice(twoDays),
      this.getEtherPrice(twoDays),
      this.getLitecoinPrice(twoDays)
    ])
    .then(axios.spread((bitcoin, ether, lite) => {
      let twodaysprice = {
        date: moment.unix(twoDays).format("MMMM Do YYYY"),
        bitcoin: bitcoin.data.BTC.USD,
        ether: ether.data.ETH.USD,
        lite: lite.data.LTC.USD
      }
      this.setState({ twodaysprice: twodaysprice});
    }));
  }


  getThreeDaysPrice () {
    let threeDays = moment().subtract(3, 'days').unix();

    axios.all([
      this.getBitcoinPrice(threeDays),
      this.getEtherPrice(threeDays),
      this.getLitecoinPrice(threeDays)])
        .then(axios.spread((bitcoin, ether, lite) => {
            let threeDaysPrice = {
                date: moment.unix(threeDays).format("MMMM Do YYYY"),
                bitcoin: bitcoin.data.BTC.USD,
                ether: ether.data.ETH.USD,
                lite: lite.data.LTC.USD
            }

            this.setState({ threeDaysPrice: threeDaysPrice });
        }));
}

  getFourDaysPrice () {
      let fourDays = moment().subtract(4, 'days').unix();

    axios.all([
      this.getBitcoinPrice(fourDays),
      this.getEtherPrice(fourDays),
      this.getLitecoinPrice(fourDays)])
          .then(axios.spread((bitcoin, ether, lite) => {
              let fourDaysPrice = {
                  date: moment.unix(fourDays).format("MMMM Do YYYY"),
                  bitcoin: bitcoin.data.BTC.USD,
                  ether: ether.data.ETH.USD,
                  lite: lite.data.LTC.USD
              }
              this.setState({ fourDaysPrice: fourDaysPrice });
          }));
  }

  componentWillMount () {
    this.getTodayPrice();
    this.getYesterdayPrice();
    this.getTwoDaysPrice();
    this.getThreeDaysPrice();
    this.getFourDaysPrice();
  }

  render(){
    return(
      <div className="history--section container">
                    <h2>History (Past 5 days)</h2>
                    <div className="history--section__box">
                        <div className="history--section__box__inner">
                            <h4>{this.state.todayPrice.date}</h4>
                            <div className="columns">
                                <div className="column">
                                    <p>1 BTC = ${this.state.todayPrice.bitcoin}</p>
                                </div>
                                <div className="column">
                                    <p>1 ETH = ${this.state.todayPrice.ether}</p>
                                </div>
                                <div className="column">
                                    <p>1 LTC = ${this.state.todayPrice.lite}</p>
                                </div>
                            </div>
                        </div>
                        <div className="history--section__box__inner">
                            <h4>{this.state.yesterdayPrice.date}</h4>
                            <div className="columns">
                                <div className="column">
                                    <p>1 BTC = ${this.state.yesterdayPrice.bitcoin}</p>
                                </div>
                                <div className="column">
                                    <p>1 ETH = ${this.state.yesterdayPrice.ether}</p>
                                </div>
                                <div className="column">
                                    <p>1 LTC = ${this.state.yesterdayPrice.lite}</p>
                                </div>
                            </div>
                        </div>
                        <div className="history--section__box__inner">
                            <h4>{this.state.twoDaysPrice.date}</h4>
                            <div className="columns">
                                <div className="column">
                                    <p>1 BTC = ${this.state.twoDaysPrice.bitcoin}</p>
                                </div>
                                <div className="column">
                                    <p>1 ETH = ${this.state.twoDaysPrice.ether}</p>
                                </div>
                                <div className="column">
                                    <p>1 LTC = ${this.state.twoDaysPrice.lite}</p>
                                </div>
                            </div>
                        </div>
                        <div className="history--section__box__inner">
                            <h4>{this.state.threeDaysPrice.date}</h4>
                            <div className="columns">
                                <div className="column">
                                    <p>1 BTC = ${this.state.threeDaysPrice.bitcoin}</p>
                                </div>
                                <div className="column">
                                    <p>1 ETH = ${this.state.threeDaysPrice.ether}</p>
                                </div>
                                <div className="column">
                                    <p>1 LTC = ${this.state.threeDaysPrice.lite}</p>
                                </div>
                            </div>
                        </div>
                        <div className="history--section__box__inner">
                            <h4>{this.state.fourDaysPrice.date}</h4>
                            <div className="columns">
                                <div className="column">
                                    <p>1 BTC = ${this.state.fourDaysPrice.bitcoin}</p>
                                </div>
                                <div className="column">
                                    <p>1 ETH = ${this.state.fourDaysPrice.ether}</p>
                                </div>
                                <div className="column">
                                    <p>1 LTC = ${this.state.fourDaysPrice.lite}</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
    );
  }

}
export default History;
