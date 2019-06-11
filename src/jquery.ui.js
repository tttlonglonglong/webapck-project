// import $ from 'jquery' // 使用了垫片后，可以不引用 jqeury
export function ui() {
  $('body').css('background', _.join(['green'], ''))
  $('body').html(_join(['green'], ''))
}
