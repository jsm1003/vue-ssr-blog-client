<template>
  <div class="resume">
    <div class="header">
      <div class="user">
        <div class="avatar">
          <img class="avatar-p" src="../../../assets/img/auth.jpg" alt="" />
          <!--图片引用这里还是不爽啊-->
        </div>
        <div class="info">
          <div class="authname">瞎看什么</div>
          <div class="sign">别再用肉眼看电影了，用别的眼睛看</div>
        </div>
      </div>
    </div>
    <div class="main">主体内容</div>
  </div>
</template>
<script>
  import api from '~src/api'
  export default {
    name: 'resume',
    async mounted() {
      var res = await api.get('/resume')
      console.log('>>', res)
    }
  }
</script>
<style scoped>
  .header {
    background: url('../../../assets/img/winter.jpg') no-repeat;
    background-size: cover;
    width: 1000px;
    height: 200px;
    position: relative;
    color: #ffffff;
    font-size: 18px;
    border-radius: 2px;
}
.header::after {
    display: block;
    background: url('../../../assets/img/snow.png');
    content: '';
    transform-origin:left top;
    transform: scale(1.5);
    width: calc(100%/1.5);
    height: calc(100%/1.5);
    border-radius: 2px;
    animation: snow 1.33s steps(40) 0s infinite;
}
.user {
    width: 100%;
    height: 59px;
    position: absolute;
    bottom: 0;
    z-index: 100;
}
.user::after {
    display: block;
    background:url('../../../assets/img/gradient-bg.png') repeat-x;
    content: '';
    width: 100%;
    height: 84px;
    position: absolute;
    bottom: 0;
    z-index: -2;
}
.avatar {
    border: 4px solid rgba(255,255,255, .6);
    border-radius: 50%;
    box-shadow: inset 0 0 10px rgba(0,0,0,.4);
    left: 22px;
    top: 0;
    position: absolute;
    width: 96px;
    height: 96px;
}
.avatar-p {
    background: #fff;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    position: relative;
    z-index: -1;
}
.info {
    margin-left: 144px;
    padding-bottom: 7px;
    /*border: 1px solid blue;*/
}
.authname {
    font-weight: 700;
    font-size: 18px;
    line-height: 1em;
    height: 18px;
    margin-bottom: 8px;
}
.sign {
    color: #d6dee4;
    font-size: 12px;
    line-height: 26px;
    height: 26px;
    width: 740px;
    font-weight: 400;
    /*这里的宽度*/
    text-overflow: ellipsis;
    font-family: 'Hiragino Sans GB','Microsoft YaHei',Arial,sans-serif;
}

@keyframes snow{
    0% {
        background-position: -0px 0px;
        }
    100% {
        background-position: -3600px 0px;
    }
}

</style>