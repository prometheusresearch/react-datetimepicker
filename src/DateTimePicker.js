/**
 * @copyright 2014 Quri, Loïc CHOLLIER
 * @copyright 2015 Prometheus Research, LLC
 */

import autobind                      from 'autobind-decorator';
import * as Icon from './Icon';
import React, {PropTypes}            from 'react';
import keyMirror                     from 'keymirror';
import DatePicker                    from './datepicker/DatePicker';
import TimePicker                    from './timepicker/TimePicker';
import {Button} from './ui';
import {style as styleHostComponent} from 'react-dom-stylesheet';

let Mode = keyMirror({
  date: null,
  time: null,
  datetime: null,
});

export default class DateTimePicker extends React.Component {

  static Mode = Mode;

  static propTypes = {
    activeMode: PropTypes.object.isRequired,
    onActiveMode: PropTypes.func.isRequired,

    viewDate: PropTypes.object.isRequired,
    onViewDate: PropTypes.func.isRequired,

    selectedDate: PropTypes.object.isRequired,
    onSelectedDate: PropTypes.func.isRequired,

    onFocus: PropTypes.func,
    onBlur: PropTypes.func,

    mode: PropTypes.oneOf([
      Mode.date,
      Mode.time,
      Mode.datetime
    ]),
  }

  static stylesheet = Stylesheet.create({
    Self: {
      focus: {
        outline: 'none'
      }
    },
    DatePicker: DatePicker,
    TimePicker: TimePicker,
  }, {styleHostComponent});

  render() {
    let {
      activeMode, mode,
      viewDate, onViewDate, selectedDate, onSelectedDate,
    } = this.props;
    let {Self, DatePicker, TimePicker} = this.constructor.stylesheet;
    return (
      <Self
        tabIndex={0}
        onFocus={this.props.onFocus}
        onBlur={this.props.onBlur}>
        {activeMode.self === Mode.date &&
          <DatePicker
            activeMode={activeMode.date}
            onActiveMode={this._onActiveDateMode}
            viewDate={viewDate}
            onViewDate={onViewDate}
            selectedDate={selectedDate}
            onSelectedDate={onSelectedDate}
            />}
        {mode === Mode.datetime &&
          <Button
            width={7}
            icon={activeMode.self === Mode.date ? <Icon.Clock /> : <Icon.Calendar />}
            onClick={this._onActiveMode}
            />}
        {activeMode.self === Mode.time &&
          <TimePicker
            activeMode={activeMode.time}
            onActiveMode={this._onActiveTimeMode}
            viewDate={viewDate}
            onViewDate={onViewDate}
            selectedDate={selectedDate}
            onSelectedDate={onSelectedDate}
            />}
      </Self>
    );
  }

  @autobind
  _onActiveMode() {
    let {activeMode} = this.props;
    let self = activeMode.self === Mode.date ?  Mode.time : Mode.date;
    this.props.onActiveMode({...activeMode, self});
  }

  @autobind
  _onActiveDateMode(date) {
    let {activeMode} = this.props;
    this.props.onActiveMode({...activeMode, date});
  }

  @autobind
  _onActiveTimeMode(time) {
    let {activeMode} = this.props;
    this.props.onActiveMode({...activeMode, time});
  }
}
