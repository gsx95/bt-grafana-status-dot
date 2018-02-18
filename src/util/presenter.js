import _ from 'lodash'

export class Presenter {
  constructor (panel, kbn) {
    this.panel = panel
    this.kbn = kbn
  }

  call (dots) {
    dots.forEach(dot => (dot.color = this._color(dot.colorValue)))
    dots.forEach(dot => (dot.textColor = this._textColor(dot.colorValue)))
    dots.forEach(dot => (dot.tooltip = this._tooltip(dot)))
    dots.forEach(dot => (dot.title = this._title(dot)))
  }

  _title (dot) {
    return dot.displayValue
  }

  _tooltip (dot) {
    return dot.name + '<br>' + this._format(dot.displayValue)
  }

  _textColor (value) {
    var ts = _.sortBy(this.panel.thresholds, t => this._value(t))
    var threshold = _.find(_.reverse(ts), t => value >= this._value(t))
    return threshold ? threshold.textColor : this.panel.defaultTextColor
  }

  _color (value) {
    var ts = _.sortBy(this.panel.thresholds, t => this._value(t))
    var threshold = _.find(_.reverse(ts), t => value >= this._value(t))
    return threshold ? threshold.color : this.panel.defaultColor
  }

  _format (value) {
    var formatFunc = this.kbn.valueFormats[this.panel.format]
    return formatFunc(value, this.panel.decimals, null)
  }

  _value (threshold) {
    return parseFloat(threshold.value)
  }
}
