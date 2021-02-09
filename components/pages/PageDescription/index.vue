<template>
  <div style="position: relative">
    <div class="box sec introduce">
      <div class="des" id="copyright">
        <h1>版权说明</h1>
        <p>
          <b>广新纳网站提供的所有网页内容、网页设计的所有内容（包括但不限于文字、图片、声音、录像、图表、标志、标识、广告、商标、商号、域名、软件、程序、版面设计、专栏目录与名称、内容分类标准及多媒体形式的新闻、信息等），均受我国相关法律及适用之国际公约中有关著作权、商标权、专利权及/或其他财产所有权法律的保护，为广新纳及/或相关权利人专属所有或持有。</b>
          <b>未经广新纳及/或相关权利人明确书面授权，任何人不得复制、转载、摘编、修改、链接、转帖广新纳的内容。</b>
          <b>获得合法授权的，应在授权范围内使用，必须为作者署名并注明来源：“广新纳”字样。</b>
          <b>违反上述声明者，本网将依法追究其相关法律责任。对于本站所有形式的原创内容，本站有结集出版的权利。</b>
          <b>广新纳对于用户所发布的内容所引发的著作权及其他权利争议、纠纷，不承担任何责任，由用户自行解决。</b>
          <b>广新纳不对用户的行为提供任何明示或默示的担保或保证。</b>
          <b>广新纳所转载、链接的内容，出于传递更多信息之目的，并不意味着赞同其观点或证实其内容的真实性。</b>
        </p>
      </div>
      <div class="des" id="disclaimer">
        <h1>免责声明</h1>
        <p>
          <b>本网站所提供的信息，只供参考之用。</b>
          <b>本网站及其雇员一概毋须以任何方式就任何信息传递或传送的失误、不准确或错误对用户或任何其他人士负任何直接或间接的责任。</b>
          <b>在法律允许的范围内，本网站在此声明，不承担用户或任何人士就使用或未能使用本网站所提供的信息或任何链接或项目所引致的任何直接、间接、附带、从属、特殊、惩罚性或惩戒性的损害赔偿（包括但不限于收益、预期利润的损失或失去的业务、未实现预期的节省）。本网站所提供的信息，若在任何司法管辖地区供任何人士使用或分发给任何人士时会违反该司法管辖地区的法律或条例的规定或会导致本网站或其第三方代理人受限于该司法管辖地区内的任何监管规定时，则该等信息不宜在该司法管辖地区供该等任何人士使用或分发给该等任何人士。用户须自行保证不会受限于任何限制或禁止用户使用或分发本网站所提供信息的当地的规定。</b>
          <b>本网站图片，文字之类版权申明，因为网站可以由注册用户自行上传图片或文字，本网站无法鉴别所上传图片或文字的知识版权，如果侵犯，请及时通知我们，本网站将在第一时间及时删除。凡以任何方式登陆本网站或直接、间接使用本网站资料者，视为自愿接受本网站声明的约束。</b>
        </p>
      </div>
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
.des {
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-shadow:$shadow;
  background-color: #ffffff;
  height: 500px;
  overflow: hidden;
  border-radius: $borderRadiusS;
}
.introduce {
  background-color: #ffffff;
  margin-bottom: 40px;
}
.introduce h1 {
  text-align: center;
}
.introduce p {
  margin: 0 auto;
  width: 900px;
  font-size: $fontSize;
  font-weight: 400;
  color:$fontColorXLight;
  line-height: 28px;
  text-align: justify;
  text-indent: 28px;
}
.introduce p b {
  font-size: $fontSize;
  font-weight: 400;
  color:$fontColorXLight;
  line-height: 28px;
}
.introduce p span {
  color: #00A85F;

}

.RootIsMobile {
  .des {
    height: auto;
    margin-bottom: 20px;
    padding: 20px 0;
  }
  .introduce {
    padding-top: 0;
  }
  .introduce h1 {
    padding: 0 30px;
    text-align: left;
    font-size: $fontSizeXL
  }
  .introduce p {
    padding: 0 30px;
    width: auto;
    line-height: 36px;
  }
}
</style>
