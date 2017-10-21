export default{
  //是否打印日志
  isShowLog:false,
  //请求间隔时间(毫秒)
  //ajax_http locals
  requestHttp:'https://service.xuxuepu.com/api',
  //ajax_http请求url
  api:{
    login:'/login',
    isLogin:'/is_login',
    logOut:'/m/logout',
    viewList:'/view/list',
    viewCreate:'/view/create',
    viewUpdate:'/view/update',
    viewDetails:'/view/detail',
    viewDelete:'/view/delete',
    viewCopy:'/view/copy',
    getQiniuToken:'/get_qiniu_token',
    sendCaptcha: '/send_captcha',
    bizSign: '/biz_sign'
  },
  //七牛地址
  qiniuPath:'http://imgout.sfc365.com/'
}
