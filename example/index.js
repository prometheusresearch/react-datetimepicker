/**
 * @copyright 2014 Quri, Loïc CHOLLIER
 * @copyright 2015 Prometheus Research, LLC
 */

import 'normalize.css';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';

import moment from 'moment';
import React from 'react';
import {create as createStylesheet} from 'react-stylesheet';
import {style as styleHostComponent} from 'react-dom-stylesheet';
import {DatePicker, TimePicker, DateField} from '../src';

let colors = {
  brand0: 'rgb(1, 60, 154)',
  brand1: 'rgba(1, 60, 154, 0.18)',

  base0: 'rgb(248, 248, 248)',
  base1: 'rgb(255, 255, 255)',

};

let styled = createStylesheet({

  root: {
    height: '100%',
    backgroundColor: colors.base0,
    overflow: 'hidden',
  },

  pane: {
    width: 600,
    margin: '0 auto',
    padding: '10px 0px',
  },

  content: {
    height: 'calc(100% - 80px)',
    overflow: 'auto',
  },

  header: {
    marginTop: 30,
    marginBottom: 30,
    fontSize: '24pt',
    Component: 'h1',
    fontWeight: 'bold',
    color: colors.brand0,
  },

  footer: {
    boxShadow: '0px 3px 10px rgba(58, 58, 58, 0.39)',
    height: 80,
    backgroundColor: colors.base1,
    position: 'relative',
  },

  footerLine: {
    Component: 'span',
    marginRight: 2,
    fontSize: '80%',
    color: '#999',
    position: 'relative',
    top: 7,
  },

  demo: {
    marginBottom: 20,
    paddingBottom: 20,
    borderBottom: '1px solid #ccc',
    lastChild: {
      borderBottom: 'none',
    }
  },

  code: {
    Component: 'pre',
    borderRadius: 0,
    backgroundColor: '#fefefe',
    border: 'none',
    borderBottom: `1px solid ${colors.brand1}`,
    borderTop: `1px solid ${colors.brand1}`,
    fontSize: '80%',
    color: '#888',
    padding: 10,
    marginBottom: 10
  }
}, {styleHostComponent});

export default class Example extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: moment(),
      dateMode: 'days',
      viewDate: moment(),
    };
  }

  render() {
    return (
      <styled.root>
        <styled.content>
          <styled.pane>

            <styled.header>DatePicker</styled.header>

            <styled.demo>
              <p>
                Basic usage:   
              </p>
              <styled.code>{'<DateField />'}</styled.code>
              <pre>{JSON.stringify(this.state.value, null, 2)}</pre>
              <DatePicker
                value={this.state.value}
                viewDate={this.state.viewDate}
                onViewDate={viewDate => this.setState({viewDate})}
                onChange={value => this.setState({value})}
                mode={this.state.dateMode}
                onMode={dateMode => this.setState({dateMode})}
                />
            </styled.demo>

            <styled.header>TimePicker</styled.header>

            <styled.demo>
              <p>
                Basic usage:
              </p>
              <styled.code>{'<DateField />'}</styled.code>
              <pre>{JSON.stringify(this.state.value, null, 2)}</pre>
              <TimePicker
                value={this.state.value}
                onChange={value => this.setState({value})}
                />
            </styled.demo>

            <styled.header>DateField</styled.header>

            <styled.demo>
              <p>
                Basic usage:   
              </p>
              <styled.code>{'<DateField />'}</styled.code>
              <pre>{JSON.stringify(this.state.value, null, 2)}</pre>
              <DateField
                value={this.state.value}
                onChange={value => this.setState({value})}
                />
            </styled.demo>

          </styled.pane>
        </styled.content>
        <styled.footer>
          <styled.pane>
            <styled.footerLine>
              Open Source project by 
            </styled.footerLine>
            <a href="http://prometheusresearch.com">
              <img height={50} src={require('./logo.png')} />
            </a>
          </styled.pane>
        </styled.footer>
      </styled.root>
    );
  }
}
