import _ from 'lodash'
import $ from 'jquery'
const dom = $('div')
dom.html(_.join(['dell', 'lee', 'hello'], '----1--'))
$('body').append(dom)
