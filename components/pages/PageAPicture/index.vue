<template>
  <div style="position: relative">
    <div class="box banner">
      <!-- Banner -->
      <div class="banner-msg">
        <p>广新纳网站致力于打造成建筑行信息交流的 超级航母，形成一站式服务平台。</p>
      </div>
    </div>
    <div class="nav box">
      <!-- 导航 -->
      <div class="nav-item">
        <img src="~static/img/pc/aPicture/建筑材料.png" alt="">
        <span>建筑材料</span>
      </div>
      <div class="nav-item">
        <img src="~static/img/pc/aPicture/招采信息.png" alt="">
        <span>招采信息</span>
      </div>
      <div class="nav-item">
        <img src="~static/img/pc/aPicture/建筑社区.png" alt="">
        <span>建筑社区</span>
      </div>
      <div class="nav-item">
        <img src="~static/img/pc/aPicture/需求信息.png" alt="">
        <span>需求信息</span>
      </div>
      <div class="nav-item">
        <img src="~static/img/pc/aPicture/供应信息.png" alt="">
        <span>供应信息</span>
      </div>
      <div class="nav-item">
        <img src="~static/img/pc/aPicture/找工作.png" alt="">
        <span>找工作</span>
      </div>
    </div>
    <div class="box sec introduce">
      <!-- 公司介绍、一张图 -->
      
      <div>        
        <h1>公司信息</h1>
        <p>广新纳网站致力于打造成建筑行业信息交流的超级航母，形成一站式服务平台。目前开设6大模块包括：
          <span>建筑材料，招采信息，建筑社区，需求信息，供应信息，找工作</span>
          。后期我们将继续完善网站功能，合理的利用互联网整合行业信息和资源，提供给建筑行业人员一个高效全面的行业交流平台。
        </p>
      </div>

      <div class="introduce-img"></div>
    </div>
  </div>
</template>

<script>
import headMixin from '~/assets/js/headMixin'

export default {
  mixins: [headMixin],
}
</script>

<style lang="scss" scoped>
.banner {
  height: 430px;
  background: url(~static/img/pc/aPicture/newBanner.jpg) no-repeat;
  /* 使用BFC规范，以解决子元素banner-msg带来的margin传递问题 */
  overflow: hidden;
  background-size: 100% 100%;
}
.banner-msg {
  width: 1200px;
  height: 430px;
  margin: 136px auto 0;
}
.banner-msg p {
  width: 560px;
  color: #ffffff;
  font-size: 30px;
  line-height: 65px;
}
.nav {
  position: absolute;
  top: 360px;
  left: 50%;
  height: 160px;
  width: 1200px;
  padding: 0 56px;
  transform: translatex(-50%);
  background: #ffffff;
  box-shadow: 0px 10px 20px 0px rgba(52, 131, 124, 0.1);
  border-radius: 6px;

  display: flex;
  justify-content: space-between;
  align-items: center;
}
.nav-item {
  display: flex;
  flex-direction: column;
  min-width: 60px;
}
.nav-item img{
  width: 60px;
  height: 60px;
}
.nav-item span {
  margin-top: 10px;
  text-align: center;
}
.nav-item::after {
  display: block;
  width: 27px;
  height: 4px;
  margin: 22px auto 0;
  background-color: #00A85F;
  content: '';
}
.nav-item:hover::after{
  margin-top: 20px;
}
.introduce {
  padding-top: 160px;
  background-color: #ffffff;
}
.introduce h1 {
  text-align: center;
}
.introduce p {
  margin: 0 auto;
  width: 900px;
  font-size: 18PX;
}
.introduce p span {
  color: #00A85F;

}
.introduce-img {
  width: 900px;
  height: 600px;
  margin: 30px auto 0;
  background: url(~static/img/pc/aPicture/导图.png) no-repeat;
  background-size: 100%;
}


.RootIsMobile {
  .banner {
    height: 300px;
    background: url(~static/img/pc/aPicture/mobileBanner.png) no-repeat;
    background-size: 100% 100%;
  }
  .banner-msg {
    display: none;
  }
  .nav {
    position: static;
    width: auto;
    height: 426px;
    transform: none;
    flex-wrap: wrap;
  }
  .nav-item {
    width: 200px;
  }
  .nav-item img {
    width: 77px;
    height: 77px;
    margin: 0 auto;
  }
  .introduce {
    padding-top: 0;
  }
  .introduce h1 {
    padding: 0 30px;
    text-align: left;
    font-size: 18PX
  }
  .introduce p {
    padding: 0 30px;
    width: auto;
    font-size: 14PX;
    line-height: 36px;
  }
  .introduce-img {
    width: 730px;
    height: 520px
  }
}
</style>
