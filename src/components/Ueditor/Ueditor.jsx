import React from 'react';
import base from './../../services/base';
import config from './../../utils/config';
import {Modal} from 'antd';
import ueditorPng from './../../assets/img/ueditor.png';
import styles from './Ueditor.less';

let editor;
let T;

const Ueditor = React.createClass({
    //初始化
    getInitialState(){
        T = this;
        return {
            qiniuToken: '',
            qiniuKey: ''
        }
    },
    //初始化富文本编辑器
    initEditor(){
        editor = UE.getEditor(this.props.id, {
            //工具栏
            toolbars: [[
                'undo',//撤销
                'source',//代码
                'bold', 'italic', 'underline', 'removeformat', 'formatmatch', '|',
                'forecolor', 'backcolor', 'insertorderedlist', 'insertunorderedlist',
                'customstyle', 'paragraph', 'fontfamily', 'fontsize',
                'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|',
                'horizontal', 'date', 'time', 'cleardoc','link'
            ]],
            lang: "zh-cn",
            //字体
            'fontfamily': [
                {label: '', name: 'songti', val: '宋体,SimSun'},
                {label: '', name: 'kaiti', val: '楷体,楷体_GB2312, SimKai'},
                {label: '', name: 'yahei', val: '微软雅黑,Microsoft YaHei'},
                {label: '', name: 'heiti', val: '黑体, SimHei'},
                {label: '', name: 'lishu', val: '隶书, SimLi'},
                {label: '', name: 'andaleMono', val: 'andale mono'},
                {label: '', name: 'arial', val: 'arial, helvetica,sans-serif'},
                {label: '', name: 'arialBlack', val: 'arial black,avant garde'},
                {label: '', name: 'comicSansMs', val: 'comic sans ms'},
                {label: '', name: 'impact', val: 'impact,chicago'},
                {label: '', name: 'timesNewRoman', val: 'times new roman'}
            ],
            //字号
            'fontsize': [16, 18, 20, 24, 36, 38, 40, 42, 48, 54, 64, 72],
            maximumWords: 1000,
            enableAutoSave: false,
            autoHeightEnabled: false,
            initialFrameHeight: 350,
            elementPathEnabled: false,
            readonly: false
        });
        editor.ready(function (ueditor) {
            if (!ueditor) {
                //如果初始化后ueditor不存在删除后重新调用
                UE.delEditor(T.props.id);
                T.initEditor();
            }
        });
        /*editor.addListener("blur", function () {
            T.props.callback();
        })*/
    },

    //组件渲染完成
    componentDidMount(){
        T.initEditor();
    },
    //组件将要接受值
    componentWillReceiveProps(nextdata){
        if(nextdata.value == '') {
            setTimeout(function () {
                let dom = document.getElementById('content');
                if(dom){
                    editor.setContent('<p></p>');
                }
            }, 1000);
        }else{
            setTimeout(function () {
                let dom = document.getElementById('content');
                if(dom) {
                    editor.setContent(nextdata.value);
                }
            }, 1000);
        }
    },

    //点击图片
    clickPic(){
        return document.getElementById('upfile').click();
    },

    uploadFile(event){
        let files = event.target.files;
        let imgHtml = '<p>';
        for (let i = 0; i < files.length; i++) {
            if (!(files[i].type == 'image/png' || files[i].type == 'image/jpeg' || files[i].type == 'image/gif' || files[i].type == 'image/webp' )) {
                Modal.error({
                    title: '错误',
                    content: (
                        <div>
                            <p>只能上传jpg、png、gif、webp图片哦</p>
                        </div>
                    )
                });
                return;
            }
            let isLt1M = files[i].size / 1024 / 500 <= 1;
            if (!isLt1M) {
                Modal.error({
                    title: '错误',
                    content: (
                        <div>
                            <p>图片大小不能超过500kb</p>
                        </div>
                    )
                });
                return;
            }
            base.getQiniuToken({module: 'tayond'}, null, function (return_data) {
                if (Number(return_data.code) == 0) {
                    let datas = return_data.data;
                    base.uploadToQiniu(datas, files[i], function (return_data) {
                        imgHtml += `<img src=${config.qiniu_path + datas.key} width="100%"/>`;
                        editor.execCommand('inserthtml', imgHtml+'</p>');
                    });
                } else {
                    Modal.error({
                        title: '错误',
                        content: (
                            <div>
                                <p>{return_data.message}</p>
                            </div>
                        )
                    });
                }
            });
        }
        //let nowhtml = editor.getContent();
        //let text = nowhtml+imgHtml+'</p>';
        //editor.execCommand('cleardoc');
        //清空再添加
    },

    render: function () {
        return (
            <div>
                <script id={this.props.id} name="content" type="text/plain"></script>
                <a title="插入图片" onClick={T.clickPic} className={styles.ueditor}>
                    <img src={ueditorPng}/>
                </a>
                <input type="file" id="upfile" multiple onChange={T.uploadFile}
                       style={{visibility: 'hidden', position: 'absolute'}}/>
            </div>
        )
    }
});


export default Ueditor;
