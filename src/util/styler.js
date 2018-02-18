export class Styler {
  constructor (panel) {
    this.panel = panel
  }

  call (dots) {
    dots.forEach(this._style.bind(this))
    dots.forEach(this._style2.bind(this))
  }

  _style (dot) {
    dot.style = { }
    dot.style['background'] = dot.color
    dot.style['width'] = this.panel.radius
    dot.style['height'] = this.panel.radius
  }

  _style2 (dot) {
    dot.style2 = { }
    dot.style2['color'] = dot.textColor
  }
}
