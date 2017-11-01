// 服务器地址
let url = window.location.origin
// 是否是开发环境
let isLocalhost = url.indexOf('localhost') >= 0 || url.indexOf('192.168') >= 0

export default{
  //是否打印日志
  isPrintLog: isLocalhost,
  //请求间隔时间(毫秒)
  //ajax_http locals
  requestHttp:'https://service.xuxuepu.com/api',
  //ajax_http请求url
  api:{
    login: '/account/login',
    isLogin:  '/account/is_login',
    logOut: '/account/logout',
    getEssayList: '/essay/list',
    getEssayDetail: '/essay/detail',
    addEssay: '/essay/add',
    editEssay: '/essay/edit',
    deleteEssay: '/essay/delete',
    getResumeDetail: '/resume/detail',
    editResume: '/resume/edit'
  }
}
