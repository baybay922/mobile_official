import React, { Component,Fragment } from 'react';
import './assets/App.css'
import './assets/en.css'
import zh from './locale/zh.json'
import en from './locale/en.json'
import Swiper from 'swiper/dist/js/swiper.js'
import 'swiper/dist/css/swiper.css'
import $ from 'jquery'
import {connect} from 'react-redux'
import Lazyload from 'react-lazyload'

class App extends Component {
  constructor(){
    super()
    this.state = {
      language:navigator.language,
      message:{},
      options:{
        //bounce:false
      }
    }
    this.changeImage = this.changeImage.bind(this)
  }
  componentWillMount(){
    let session = window.sessionStorage;
    let sessionVal = session.getItem('language');
    if(sessionVal){
      this.setState({
        language:sessionVal
      })
    }else{
      this.setState({
        language:navigator.language
      })
    }
    let that = this;
    setTimeout(()=>{
      if(that.state.language === 'zh-CN'){
        that.setState({
          message:zh
        })
        $('#root').removeClass('english');
        $('.progress span').removeClass('dl')
      }else{
        that.setState({
          message:en
        })
        $('#root').addClass('english');
      }
    },1000)


    if(this.state.language === "zh-CN"){
      this.setState({
        message:zh
      }) 
      $('#root').removeClass('english');      
    }else{
      this.setState({
        message:en
      })
      $('#root').addClass('english');
    }
  }
  getModule(ind){
    console.log(ind)
    let link = $('.link a');
    for(var i=0;i<link.length;i++){
      if(i == ind){
        $(link[i]).addClass('active')
      }else{
        $(link[i]).removeClass('active')
      }
    }
    $('.mark').removeClass('active')
    $('.aside').removeClass('show');
    $('#root').css('overflow','visible')
  }
  menuShow(e){
    $('.mark').addClass('active');
    $('.aside').addClass('show');
    $('#root').css('overflow','hidden')
  }
  getBack(){
    $('.mark').removeClass('active');
    $('.aside').removeClass('show');
    $('#root').css('overflow','visible')
  }
  //立即咨询连接小能
  getContract(){
    window.NTKF_PARAM = {
      siteid:"kf_10138",//企业ID，为固定值，【必填 】。–此id在开站完毕后，小能实施人员给贵公司发送的邮件中获取–
      settingid:"kf_10138_1517562477133",//接待组id(客服组id)【必填】–此id在开站完毕后，登陆贵公司的小能客户端，进入设置界面-配置管理-接待组中即可获取–
      uid:"",//用户Id，未登录可以为空，但是不能给null。–此参数来自贵公司传递给小能的参数值–
      uname:"",//用户名，未登录可以为空，但是不能给null，uname赋予的值显示到小能客户端。–此参数来自用户传递给小能的参数值–
      isvip:"0",//是否为vip用户，0代表非会员，1代表会员，取值显示到小能客户端上
      userlevel:"0",//站自定义会员级别，1-N，可根据选择判断，取值显示到小能客户端
      erpparam:"",//erpparam为erp功能的扩展字段，可选，购买erp功能后
      itemid:"",//商品ID，商品详情页面用于展示商品的调用参数。
      itemparam:"",//商品详情页面的拓展参数，一般用于区分不同设备的拓展参数
    }
    window.NTKF.im_openInPageChat();
    let session = window.sessionStorage;
    session.setItem('language',this.state.language);
  }
  changeImage(slides,index){
    let imgUrl="";
    let money = require('./images/money.png');
    let law = require('./images/law.png');
    let Resources = require('./images/Resources.png');
    let Series = require('./images/Series.png');
    let Industry = require('./images/Industry.png');
    if(index == 2 || index == 7){
        imgUrl = require('./images/moneyChoose.png');
        $('.swiper-advantage .swiper-slide-active img').attr('src',imgUrl);
        $('.swiper-advantage .swiper-slide img').eq(3).attr('src',law)
        $('.swiper-advantage .swiper-slide img').eq(4).attr('src',Resources)
        $('.swiper-advantage .swiper-slide img').eq(5).attr('src',Series)
        $('.swiper-advantage .swiper-slide img').eq(6).attr('src',Industry)
    }else if(index == 3){
      imgUrl = require('./images/lawChoose.png')
        $('.swiper-advantage .swiper-slide-active img').attr('src',imgUrl);
        $('.swiper-advantage .swiper-slide img').eq(2).attr('src',money)
        $('.swiper-advantage .swiper-slide img').eq(4).attr('src',Resources)
        $('.swiper-advantage .swiper-slide img').eq(5).attr('src',Series)
        $('.swiper-advantage .swiper-slide img').eq(6).attr('src',Industry)
    }else if(index == 4){
      imgUrl = require('./images/ResourcesChoose.png')
        $('.swiper-advantage .swiper-slide-active img').attr('src',imgUrl);
        $('.swiper-advantage .swiper-slide img').eq(2).attr('src',money)
        $('.swiper-advantage .swiper-slide img').eq(3).attr('src',law)
        $('.swiper-advantage .swiper-slide img').eq(5).attr('src',Series)
        $('.swiper-advantage .swiper-slide img').eq(6).attr('src',Industry)
    }else if(index == 5){
        imgUrl = require('./images/SeriesChoose.png')
        $('.swiper-advantage .swiper-slide-active img').attr('src',imgUrl);
        $('.swiper-advantage .swiper-slide img').eq(2).attr('src',money)
        $('.swiper-advantage .swiper-slide img').eq(3).attr('src',law)
        $('.swiper-advantage .swiper-slide img').eq(4).attr('src',Resources)
        $('.swiper-advantage .swiper-slide img').eq(6).attr('src',Industry)
    }else if(index == 1 || index == 6){
        imgUrl = require('./images/IndustryChoose.png')
        $('.swiper-advantage .swiper-slide-active img').attr('src',imgUrl);
        $('.swiper-advantage .swiper-slide img').eq(2).attr('src',money)
        $('.swiper-advantage .swiper-slide img').eq(3).attr('src',law)
        $('.swiper-advantage .swiper-slide img').eq(4).attr('src',Resources)
        $('.swiper-advantage .swiper-slide img').eq(5).attr('src',Series)
    }
  }
  //切换语言
  changeLanguage(){
    let {language} = this.state;
    
    if(language==="zh-CN"){
      this.setState({
        language:"en"
      },()=>{
        this.setState({
          message:en
        })
        $('#root').addClass('english');      
      })
      $('.progress span').css('display','block')
    }else{
      this.setState({
        language:"zh-CN"
      },()=>{
        this.setState({
          message:zh
        })
        $('#root').removeClass('english'); 
      })
      $('.progress span').css('display','none')
    }
  }
  componentDidMount(){
    new Swiper(this.refs.scroll,{
    slidesPerView: 'auto',
    direction: 'vertical',
    })

    let that = this;
    new Swiper(this.refs.swiper,{
      centeredSlides: true,
      slidesPerView: 2,
      initialSlide:0,
      loop:true,
      watchActiveIndex: true,
      pagination : '.swiper-pagination',
      onSlideChangeEnd:function(swiper){
        let index = swiper.activeIndex;
        let slides = $('.swiper-advantage .swiper-advantage .swiper-slide .inner');
        that.changeImage(slides,index)
        $(".swiper-advantage .swiper-slide-active").find(".inner").addClass("cuer_inner")
            .parent()
            .siblings('.swiper-slide').find(".inner").removeClass("cuer_inner")
      }
    })

    new Swiper(this.refs.hospital,{
      slidesPerView: 'auto',
      spaceBetween: 12,
      pagination:".swiper-pagination",
    })

    new Swiper(this.refs.partner,{
      pagination:".swiper-pagination"
    })
    $(".swiper-advantage .swiper-slide-active").find(".inner").addClass("cuer_inner")
  }
  render() {
    let {message} = this.state;
    return (
      <Fragment>
        <header className="header">
          <p onClick={this.menuShow.bind(this)}><span className="menuBtn"></span></p> 
          <h1>多加网</h1>
          <span className="language" onClick={this.changeLanguage.bind(this)}></span>
        </header>
        <section>
          
          <div className="banner">
            <Lazyload>
              <img src={require(`${message.banner}`)} alt="" />
            </Lazyload>
            
          </div>
          <div className="border-line"></div>
          <div className="service" id="service">
            <div className="title">
              <h2>
                <Lazyload><img src={require('./images/service.png')} alt=""/></Lazyload></h2>
              <p>{message.serviceTit}</p>
              <span></span>
            </div>
            <div className="service-cont">
              <dl>
                <dt>
                  <Lazyload><img src={require(`${message.serviceArea}`)} alt="" /></Lazyload>
                </dt>
                <dd>
                  <h3>
                    <i>{message.serviceAreaTit}</i>
                    <i>{message.serviceAreaP}</i>
                  </h3>
                  <span className="add"></span>
                  <p>{message.serviceAreaParam}</p>
                </dd>
              </dl>
              <dl>
                <dt>
                <Lazyload><img src={require(`${message.servicePerson}`)} alt="" /></Lazyload>
                </dt>
                <dd>
                  <h3>
                    <i>{message.servicePersonTit}</i>
                    <i>{message.servicePersonP}</i>
                  </h3>
                  <span className="add"></span>
                  <p>{message.servicePersonParam}</p>
                </dd>
              </dl>
              <dl>
                <dt>
                <Lazyload><img src={require(`${message.serviceSeries}`)} alt="" /></Lazyload>
                </dt>
                <dd>
                  <h3>
                    <i>{message.serviceSeriesTit}</i>
                    <i>{message.serviceSeriesP}</i>
                  </h3>
                  <span className="add"></span>
                  <p>{message.serviceSeriesParam}</p>
                </dd>
              </dl>
              <dl>
                <dt>
                <Lazyload><img src={require(`${message.serviceProcess}`)} alt="" /></Lazyload>
                </dt>
                <dd>
                  <h3>
                    <i>{message.serviceProcessTit}</i>
                    <i>{message.serviceProcessP}</i>
                  </h3>
                  <span className="add"></span>
                  <ul className="progress">
                    <li>
                      <b>{message.serviceProcessOne}</b>
                    </li>
                    <li>
                      <b>{message.serviceProcessTwo}</b>
                    </li>
                    <li>
                      <b>{message.serviceProcessThree}</b>
                    </li>
                    <li>
                      <b>{message.serviceProcessFour}</b>
                    </li>
                  </ul>
                </dd>
              </dl>
            </div>
          </div>
          <div className="border-line"></div>
          <div className="advantage" id="advantage">
            <div className="title">
              <h2><Lazyload><img src={require('./images/advantage.png')} alt=""/></Lazyload></h2>
              <p>{message.advantageTit}</p>
              <span></span>
            </div>
            <div className="swiper-advantage swiper-container" ref="swiper">
              <div className="swiper-wrapper">
                <div className="swiper-slide">
                  <div className="inner">
                    <img src={require('./images/money.png')} alt="" />
                    <p>
                      <span>{message.advantageMoneyT}</span>
                      <span>{message.advantageMoneyP}</span>  
                    </p>
                  </div>
                </div>
                <div className="swiper-slide">
                 <div className="inner">
                  <img src={require('./images/law.png')} alt="" />
                  <p>
                    <span>{message.advantageLawT}</span>
                    <span>{message.advantageLawP}</span>  
                  </p>
                 </div>
                </div>
                <div className="swiper-slide">
                  <div className="inner">
                    <img src={require('./images/Resources.png')} alt="" />
                    <p>
                      <span>{message.advantageResourcesT}</span>
                      <span>{message.advantageResourcesP}</span>  
                    </p>
                  </div>          
                </div>
                <div className="swiper-slide">
                  <div className="inner">
                    <img src={require('./images/Series.png')} alt="" />
                    <p>
                      <span>{message.advantageSeriesT}</span>
                      <span>{message.advantageSeriesP}</span>  
                    </p>
                  </div>    
                </div>
                <div className="swiper-slide">
                  <div className="inner">
                    <img src={require('./images/Industry.png')} alt="" />
                    <p>
                      <span>{message.advantageIndustryT}</span>
                      <span>{message.advantageIndustryP}</span>  
                    </p>
                  </div>     
                </div>
              </div>
                <div className="swiper-pagination"></div>
            </div>    
          </div>
          <div className="border-line"></div>
          <div className="customer" id="customer">
            <div className="title">
              <h2><Lazyload><img src={require('./images/customer.png')} alt=""/></Lazyload></h2>
              <p>{message.customerTit}</p>
              <span></span>
            </div>
            <div className="customer-cont">
              <dl>
                <dt>
                  <Lazyload><img src={require('./images/Toker.png')} alt=""/></Lazyload>
                  <span>{message.Toker}</span>
                </dt>
                <dd>{message.TokerP}</dd>
              </dl>
              <dl>
                <dt>
                  <Lazyload><img src={require('./images/Empowerment.png')} alt=""/></Lazyload>
                  <span>{message.Empowerment}</span>
                </dt>
                <dd>{message.EmpowermentP}</dd>
              </dl>
              <dl>
                <dt>
                  <Lazyload><img src={require('./images/income.jpg')} alt=""/></Lazyload>
                  <span>{message.income}</span>
                </dt>
                <dd>{message.incomeP}</dd>
              </dl>
              <dl>
                <dt>
                  <Lazyload><img src={require('./images/guarantee.png')} alt=""/></Lazyload>
                  <span>{message.guarantee}</span>
                </dt>
                <dd>{message.guaranteeP}</dd>
              </dl>
              <dl>
                <dt>
                  <Lazyload><img src={require('./images/throttle.png')} alt=""/></Lazyload>
                  <span>{message.throttle}</span>
                </dt>
                <dd>{message.throttleP}</dd>
              </dl>
              <dl>
                <dt>
                  <Lazyload><img src={require('./images/reputation.png')} alt=""/></Lazyload>
                  <span>{message.reputation}</span>
                </dt>
                <dd>{message.reputationP}</dd>
              </dl>
            </div>
          </div>
          <div className="border-line"></div>
          <div className="analysis" id="analysis">
            <div className="title">
              <h2>
                <Lazyload><img src={require('./images/analysis.png')} alt="" /></Lazyload>
              </h2>
              <p>{message.analysisTit}</p>
              <span></span>
            </div>
            <div className="revenue">
              <dl>
                <dd>{message.addBefore}</dd>
                <dt>
                  <Lazyload><img src={require('./images/addBefore.jpg')} alt="" /></Lazyload>
                </dt>
              </dl>
              <p></p>
              <dl>
                <dd>{message.adding}</dd>
                <dt>
                  <Lazyload><img src={require('./images/adding.jpg')} alt="" /></Lazyload>
                </dt>
              </dl>
            </div>
            <div className="daily-reward">
              <p>{message.dailyReward}</p>
            </div>
            <div className="test">
              <dl>
                <dd className="analysis-add">{message.dorderForm}</dd>
                  
                <dt><Lazyload><img src={require('./images/2.png')} alt="" /></Lazyload></dt>
              </dl>
              <dl>
                <dd className="analysis-add">{message.Invitation}</dd>
                  
                <dt><Lazyload><img src={require('./images/1.png')} alt="" /></Lazyload></dt>
              </dl>
              <dl>
                <dd className="analysis-add">{message.finish}</dd>
                  
                <dt><Lazyload><img src={require('./images/5.png')} alt="" /></Lazyload></dt>
              </dl>
              <dl>
                <dd className="analysis-add">{message.Reappearance}</dd>
                  
                <dt><Lazyload><img src={require('./images/5.png')} alt="" /></Lazyload></dt>
              </dl>
              <dl>
                <dd>{message.financing}</dd>
                  
                <dt><Lazyload><img src={require('./images/10.png')} alt="" /></Lazyload></dt>
              </dl>
            </div>
          </div>
          <div className="border-line"></div>
          <div className="hospital" id="hospital">
            <div className="title">
              <h2><Lazyload><img src={require('./images/hospital.png')} alt="" /></Lazyload></h2>
              <p>{message.hospital}</p>
              <span></span>
            </div>
            <div className="hospital-cont" ref="hospital">
              <div className="swiper-wrapper">
                <div className="swiper-slide">
                    <div className="hos-content">
                      <div className="hospital-title"></div>
                      <h3>{message.highPosition}</h3>
                      <p>{message.highPositionP}</p>
                    </div>                  
                </div>
                <div className="swiper-slide">
                  <div className="hos-content">
                    <div className="hospital-title"></div>
                    <h3>{message.TokerIncome}</h3>
                    <p>{message.TokerIncomeP}</p>
                  </div>
                </div>
                <div className="swiper-slide">
                  <div className="hos-content">
                    <div className="hospital-title"></div>
                    <h3>{message.financialService}</h3>
                    <p>{message.financialServiceP}</p> 
                  </div>
                </div>
                <div className="swiper-slide">
                  <div className="hos-content">
                    <div className="hospital-title"></div>
                    <h3>{message.academic}</h3>
                    <p>{message.academicP}</p>
                  </div>
                  
                </div>
                <div className="swiper-slide">
                  <div className="hos-content">
                    <div className="hospital-title"></div>
                    <h3>{message.experience}</h3>
                    <p>{message.experienceP}</p>
                  </div>
                  
                </div>
                <div className="swiper-slide">
                  <div className="hos-content">
                    <div className="hospital-title"></div>
                    <h3>{message.taxAvoidance}</h3>
                    <p>{message.taxAvoidanceP}</p>
                  </div> 
                </div>
              </div>
              <div className="swiper-pagination"></div>
            </div>
          </div>
          <div className="border-line"></div>
          <div className="partner" id="partner">
            <div className="title">
              <h2><Lazyload><img src={require('./images/partner.png')} alt=""/></Lazyload></h2>
              <p>{message.partnerTit}</p>
              <span></span>
            </div>
            <div className="partner-cont" ref="partner">
              <div className="swiper-wrapper">
                <ul className="swiper-slide">
                  <li><Lazyload><img src={require('./images/logo1.png')} alt=""/></Lazyload></li>
                  <li><Lazyload><img src={require('./images/logo2.png')} alt=""/></Lazyload></li>
                  <li><Lazyload><img src={require('./images/logo3.png')} alt=""/></Lazyload></li>
                  <li><Lazyload><img src={require('./images/logo4.png')} alt=""/></Lazyload></li>
                  <li><Lazyload><img src={require('./images/logo5.png')} alt=""/></Lazyload></li>
                  <li><Lazyload><img src={require('./images/logo6.png')} alt=""/></Lazyload></li>
                </ul>
                <ul className="swiper-slide">
                  <li><Lazyload><img src={require('./images/logo7.png')} alt=""/></Lazyload></li>
                  <li><Lazyload><img src={require('./images/logo8.png')} alt=""/></Lazyload></li>
                  <li><Lazyload><img src={require('./images/logo9.png')} alt=""/></Lazyload></li>
                  <li><Lazyload><img src={require('./images/logo10.png')} alt=""/></Lazyload></li>
                  <li><Lazyload><img src={require('./images/logo11.png')} alt=""/></Lazyload></li>
                  <li><Lazyload><img src={require('./images/logo12.png')} alt=""/></Lazyload></li>
                </ul>
                <ul className="swiper-slide">
                  <li><Lazyload><img src={require('./images/logo13.png')} alt=""/></Lazyload></li>
                  <li><Lazyload><img src={require('./images/logo14.png')} alt=""/></Lazyload></li>
                  <li><Lazyload><img src={require('./images/logo15.png')} alt=""/></Lazyload></li>
                  <li><Lazyload><img src={require('./images/logo16.png')} alt=""/></Lazyload></li>
                  <li><Lazyload><img src={require('./images/logo17.png')} alt=""/></Lazyload></li>
                  <li><Lazyload><img src={require('./images/logo18.png')} alt=""/></Lazyload></li>
                </ul>
              </div>
              <div className="swiper-pagination"></div>
            </div>
          </div>
          <div className="border-line"></div>
          <div className="join-us" id="joinUs">
            <div className="title">
              <h2><Lazyload><img src={require('./images/joinus.png')} alt="" /></Lazyload></h2>
              <p>{message.joinUsTit}</p>
              <span></span>
            </div>
            <div className="process">
              <dl>
                <dt><Lazyload><img src={require('./images/register.png')} alt=""/></Lazyload></dt>
                <dd>
                  <h3>{message.registerT}</h3>
                  <p>{message.registerP}</p>
                </dd>
              </dl>
              <dl>
                <dt><Lazyload><img src={require('./images/waiting.png')} alt=""/></Lazyload></dt>
                <dd>
                  <h3>{message.waitingT}</h3>
                  <p>{message.waitingP}</p>
                </dd>
              </dl>
              <dl>
                <dt><Lazyload><img src={require('./images/register.png')} alt=""/></Lazyload></dt>
                <dd>
                  <h3>{message.startT}</h3>
                  <p>{message.startP}</p>
                </dd>
              </dl>
              <button onClick={this.getContract.bind(this)}>{message.consultation}</button>
            </div>
          </div>

          <div className="QRcodeBox">
            <ul className="QRcode">
              <li>
                <div><Lazyload><img src={require('./images/channel.jpg')} alt="" /></Lazyload></div>
                <span>{message.channel}</span>
              </li>
              <li>
                <div><Lazyload><img src={require('./images/upStream.jpg')} alt="" /></Lazyload></div>
                <span>{message.upstream}</span>
              </li>
            </ul>
            
            <div className="telBtn">
              <a href="tel:4001116369">
                <span></span>
                <i>400 -111- 6369</i>
              </a>
            </div>
            <p className="tel">{message.tel}</p>
          </div>
          <div className="footer">
            <h2>{message.company}</h2>
            <p>{message.Copyright}</p>
          </div>
        </section>

       <div className="mark" onClick={this.getBack.bind(this)}></div>
       <div className="aside">
            <dl className="company-logo">
              <dt><Lazyload><img src={require('./images/logo.png')} alt="" /></Lazyload></dt>
              <dd>
                {/* <h2>{message.companyName}</h2> */}
                <p>{message.intent}</p>
              </dd>
            </dl>
            <div ref="scroll" className="scroll">
              <ul className="link swiper-wrapper">
                <li className="swiper-slide">
                  <a href="#service" onClick={this.getModule.bind(this,0)}>{message.menuService}</a>
                </li>
                <li className="swiper-slide">
                  <a href="#advantage" onClick={this.getModule.bind(this,1)}>{message.menuAdvantage}</a>
                </li>
                <li className="swiper-slide">
                  <a href="#customer" onClick={this.getModule.bind(this,2)}>{message.menuCustomer}</a>
                </li>
                <li className="swiper-slide">
                  <a href="#analysis" onClick={this.getModule.bind(this,3)}>{message.menuAnalysis}</a>
                </li>
                <li className="swiper-slide">
                  <a href="#hospital" onClick={this.getModule.bind(this,4)}>{message.menuHospital}</a>
                </li>
                <li className="swiper-slide">
                  <a href="#partner" onClick={this.getModule.bind(this,5)}>{message.menuPartner}</a> 
                </li>
                <li className="swiper-slide">
                  <a href="#joinUs" onClick={this.getModule.bind(this,6)} >{message.becomePartner}</a>
                </li>
                <li className="swiper-slide"></li>
              </ul>
            </div>
            <div className="returnBack" onClick={this.getBack.bind(this)}>
              <span></span>{message.back}
            </div>
          </div>       
      </Fragment>
    );
  }
}
const mapStateToProp = (state)=>{
  return {
    language:state.language
  }
}
export default connect(mapStateToProp)(App);
