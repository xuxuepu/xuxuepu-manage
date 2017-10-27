export default{
  //是否打印日志
  isPrintLog: false,
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
