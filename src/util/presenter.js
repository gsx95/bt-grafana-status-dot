import _ from 'lodash'

export class Presenter {
  constructor (panel, kbn) {
    this.panel = panel
    this.kbn = kbn
  }

  call (dotsObject) {
    if (dotsObject.hasData) {
      var dots = dotsObject.dots
      dots.forEach(dot => (dot.color = this._color(dot.colorValue)))
      dots.forEach(dot => (dot.textColor = this._textColor(dot.colorValue)))
      dots.forEach(dot => (dot.tooltip = this._tooltip(dot)))
      dots.forEach(dot => (dot.titleInDot = this._titleInDot(dot)))
      dots.forEach(dot => (dot.valueInDot = this._valueInDot(dot)))
    } else {
      dotsObject.hasData = true
      dotsObject.dots = [{
        color: this.panel.defaultColor,
        textColor: this.panel.defaultTextColor,
        tooltip: 'no data received',
        title: 'no',
        formattedValue: 'value'
      }]
    }
  }

  _valueInDot (dot) {
    return this.panel.showValueInDot ? this._format(dot.displayValue) : ''
  }

  _titleInDot (dot) {
    return this.panel.showValueInDot ? dot.name : ''
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
