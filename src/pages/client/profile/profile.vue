<template>
  <div class="profile">
    <h3>Profile</h3>
    <h2>用户个人信息</h2>
    <div id="preview"></div>
    <button @click="upFile">上传文件</button>
    <input id="file" @change.stop="handleFile" type="file" accept="image/png,image/jpeg" style="display: none;">
</div>
</template>
<script>
  if (typeof window !== 'undefined') {
    var fileElem = document.querySelector('#file')
    var preview = document.querySelector('#preview')
    //var img = document.querySelector('#img')
  }
  export default {
    name: 'profile',
    methods: {
      upFile() {
        fileElem.click()
      },
      handleFile() {
        if (typeof window !== 'undefined') {
          var reader = new FileReader()
          reader.onload = ((e) => {
            var data = e.target.result
            var img = new Image();
            img.onload = () => {
              var width = img.width
              var height = img.height
              console.log(width)//获取真实的宽高
              preview.appendChild(img)
            }
            img.src = data
          })
          reader.readAsDataURL(fileElem.files[0])
        }
      }
    }
  }
</script>
<style scoped>
   .profile {
     max-width: 1000px;
     width: 100%;
   }
</style>