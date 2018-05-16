let editor = document.createElement('div');
editor.id = 'editor';
let codePre = document.createElement('pre');
codePre.id = 'code';
editor.appendChild(codePre);
document.body.appendChild(editor);

let styleTag = document.createElement('style');
document.head.appendChild(styleTag);


let CssCode = `/* 
* 大家好，我是周硕。
* 我最近在找一份前端的工作，
* 在网上看到了有趣的简历，
* 自己也尝试做一个。 
*/

/* 先来点样式 */
body{
    background-color: rgb(0,43,54);
    color: rgb(222,222,222);
}
#editor{
    border: 1px solid #ccc;
    margin: 1em;
    padding: 0.5em;
    width: 45vw;
    height: 90vh;
    overflow: auto;
}

/* 代码高亮 */
.token.comment{ color: slategray }
.token.selector { color: #a6e22e }
.token.punctuation { color: #f8f8f2 }
.token.property { color: #f92672 }
.token.function { color: #e6db74 }

/* 来点3D效果 */
html { perspective: 1000px }
#editor {
    position: fixed;
    left: 0; top: 0; 
    transform: rotateY(8deg) translateZ(-80px);
}

/* 接下来准一个编辑器写简历 */
`

let CssCode2 = `#paper{
    position: fixed;
    right: 0; top: 0;
    width: 48vw;
    height: 90vh;
    background: white;
    margin: 1em;
    padding: 0.5em;
    color: #222;
    overflow: auto;
}

/* 好了，我开始写简历了 */
`
let CssCode3 = `
/* 
* 好像还少点什么
* 对了，这是markdown格式的，用开源工具翻译成HTML。
*/
`
let CssCode4 = `
/* 给HTML加点样式 */
#paper {
    padding: 2em;
}
#paper h2 {
    display: inline-block;
    margin: .5em 0;
}
#paper p{
    line-height: 1.5em;
}
#paper ul, #paper ol {
    list-style: none;
}
#paper ul > li{
    line-height: 1.2em
}
#paper ul > li::before {
    content: '•';
    margin-right: .5em;
}
`

let md = `## 个人简介
我叫周硕，一名前端开发工程师，
年龄21岁，坐标郑州，学历大专，计算机专业，
热爱编程，热爱前端，代码强迫症患者。

## 联系方式
- 电话：18703868792
- 邮箱：zhoushuozh@gmail.com

## 技能
有扎实的HTML和CSS功底，熟悉流式布局和弹性盒子布局，能处理PC和移动端各主流浏览器的兼容问题。
熟练使用原生javascript及jQuery、Vue, 了解nodejs。
熟悉WEB开发中HTTP协议，以及熟悉运用Ajax通过JSON数据接口与后台数据接口进行数据交互。
能熟练使用Photoshop进行的图片处理和平面设计。

## 工作经历
- 2017.06 —— 2018.04 郑州锐拓科技有限公司 前端开发 & UI设计

## 项目经验
- [键盘网址导航](https://zhoushuo.me/start/)
- [canvas画板](https://zhoushuozh.github.io/drawingborad)
- [萌一点食品微信商城](http://jiamingwx.xiuyuewang.com/)
- [金鹏装饰企业站](http://jinpengzhuangshi.xiuyuewang.com/)
- [米喜鱼餐饮企业站](http://mixiyu.xiuyuewang.com/)

## 链接
- [Github](https: //github.com/zhoushuozh/)
- [个人博客](https: //zhoushuo.me/blog/)
`

function writeCss(prefix, code, fn) {
    let n = 0;
    let timer = setInterval(function () {
        n++;
        codePre.innerHTML = Prism.highlight(prefix + code.substring(0, n), Prism.languages.css)
        styleTag.innerHTML = prefix + code.substring(0, n)
        editor.scrollTop = 10000;
        if (n >= code.length) {
            clearInterval(timer);
            fn && fn.call()
        }
    }, 10);
}

function writeMarkdown(text, fn) {
    let n = 0;
    let content = document.querySelector('.content')
    let timer = setInterval(function () {
        n++;
        content.innerHTML = text.substring(0, n)
        paper.scrollTop = 10000;
        if (n >= text.length) {
            clearInterval(timer);
            fn && fn.call()
        }
    }, 30);
}

writeCss('', CssCode, () => {
    creatPaper(() => {
        writeCss(CssCode,CssCode2,() => {
            writeMarkdown(md,() => {
                writeCss(CssCode + CssCode2, CssCode3, () => {
                    document.querySelector('.content').innerHTML = marked(md);
                    writeCss(CssCode + CssCode2 + CssCode3, CssCode4 )
                })
            })
        })
    })
})

function creatPaper(fn){
    let paper = document.createElement('div');
    paper.id = 'paper';
    let content = document.createElement('pre');
    content.classList.add('content');
    paper.appendChild(content);
    document.body.appendChild(paper);
    fn && fn.call();
}
