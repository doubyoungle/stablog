import React, { Component } from 'react'
import logo from './stablog_logo_256x256.png'
import svg_logo_window from './static/windows.svg'
import svg_logo_mac from './static/mac.svg'
import { CSSTransition } from 'react-transition-group'
import axios from 'axios'
import './App.less'

export default class Base extends Component {
  state = {
    showThankList: false,
    config: {
      downloadUrl: 'https://github.com/YaoZeyuan/stablog#%E8%BD%AF%E4%BB%B6%E4%B8%8B%E8%BD%BD',
      releaseAt: '2019年10月22日',
      releaseNote: '稳部落1.1.0, 闪亮发布.',
      version: 1.1,
      detail: {
        windows: { version: 1.1, url: 'http://stablog.bookflaneur.cn/%E7%A8%B3%E9%83%A8%E8%90%BD%20Setup%201.1.0.exe' },
        mac: { version: 1.1, url: 'http://stablog.bookflaneur.cn/%E7%A8%B3%E9%83%A8%E8%90%BD-1.1.0.dmg' },
      },
    },
    thankList: [{ reason: '*明明捐助了25元', time: '2019-10-14 21:34' }],
  }

  showAlert() {
    alert('抱歉, 为规避法律风险, 已移除稳部落下载链接')
  }

  async componentDidMount() {
    let versionResponse = await axios.get('https://api.bookflaneur.cn/stablog/version')
    let thankListResponse = await axios.get('https://api.bookflaneur.cn/stablog/thank_you/list')
    let config = versionResponse.data
    let thankList = thankListResponse.data
    this.setState({
      config,
      thankList,
    })
  }

  toggleThankList = () => {
    this.setState({
      showThankList: !this.state.showThankList,
    })
  }

  render() {
    const { config, thankList, showThankList } = this.state
    let thankEleList = []
    let counter = 0
    for (let item of thankList) {
      let index = counter
      let itemEle = (
        <div key={index} className="thank-list-item">
          <div className="thank-list-item-time">{item.time}</div>
          <div className="thank-list-item-reason">{item.reason}</div>
        </div>
      )
      thankEleList.push(itemEle)
      counter++
    }
    return (
      <div className="Home">
        <div className="body">
          <div className="container">
            <div className="title">稳部落</div>
            <div className="slogan">专业备份导出微博记录</div>
            <div className="desc">
              <del>支持被封用户(需使用被封用户原账号登陆)</del>
            </div>
            <div className="desc">
              <del>一键导出指定用户的所有微博&文章</del>
            </div>
            <div className="desc">
              <del>最新版本：v{config.version}</del>
            </div>
            <div className="desc">为规避法律风险, 已移除稳部落下载链接</div>
            <div className="desc">
              如有规避方案, 烦请微博私信联系
              <a href="https://weibo.com/u/1718734760" target="_blank">
                @yaozeyuan93
              </a>
              , 不胜感激
            </div>
            <div className="logo">
              <img src={logo} />
            </div>
            <div className="download-container">
              <div className="download-tip">
                <del>下载</del>
              </div>
              <div className="action-line">
                <a
                  className="download-button"
                  target="_blank"
                  // href={config.detail.windows.url}
                  onClick={this.showAlert}
                >
                  <img className="download-button-icon" src={svg_logo_window} />
                  <del>Windows版</del>
                </a>
                <a
                  className="download-button"
                  target="_blank"
                  // href={config.detail.mac.url}
                  onClick={this.showAlert}
                >
                  <img className="download-button-icon" src={svg_logo_mac} />
                  <del>Mac版</del>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="footer">
          <div className="comment">
            <a className="tip" href="https://github.com/YaoZeyuan/stablog" target="_blank">
              使用指南
            </a>
            <p className="tip" onClick={this.toggleThankList}>
              致谢列表
            </p>
            <a className="tip" href="https://github.com/YaoZeyuan/stablog/issues" target="_blank">
              功能建议
            </a>
          </div>
          <CSSTransition in={this.state.showThankList} timeout={300} classNames="fade" unmountOnExit>
            <div className="thank-list">{thankEleList}</div>
          </CSSTransition>
        </div>
        <a href="https://github.com/YaoZeyuan/stablog" className="fork-me-on-github" target="_blank">
          <img
            width="149px"
            height="149px"
            src="https://github.blog/wp-content/uploads/2008/12/forkme_right_green_007200.png?resize=149%2C149"
            alt="Fork me on GitHub"
          />
        </a>
      </div>
    )
  }
}
