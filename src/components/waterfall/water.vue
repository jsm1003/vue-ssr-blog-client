<template>
    <div class="item mcol">
        <div class="heading">{{ item.type }}</div>
        <ul class="detail">
            <li class="list" v-for="i in item.item">
                <div v-if="i.summary">
                    <div class="title">{{ i.summary}}</div>
                    <div class="list-item" v-for="description in i.description">{{ description}}</div>
                </div>
                <div class="list-item" v-else>{{i}}</div>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    mounted () {
        console.log(this.$el)
    }
}
</script>
<style>
    .mcol {
    max-width: 530px;
}
.mcol+.mcol {
    margin-left: 24px;
}
.item {
    /*margin-left: 20px;*/
    margin-top: 20px;
    /*上面的是临时的*/
    background: #ffffff;
    width: 400px;
    height: auto;
    padding: 24px;
    border-radius: 2px;
    box-shadow: 0 1px 4px 0 rgba(0,0,0,0.14);
}
.heading {
    color: rgba(0,0,0,0.87);
    font: 500 20px Roboto,RobotoDraft,Helvetica,Arial,sans-serif;
}
.detail {
    margin-top: 24px;
}
.list {
    margin-top: 16px;
}
.title {
    color: rgba(0,0,0,0.54);
    font: 500 14px Roboto,RobotoDraft,Helvetica,Arial,sans-serif;
    margin-bottom: 8px;
}
.list-item {
    color: #212121;
    font: 400 16px  Roboto,RobotoDraft,Helvetica,Arial,sans-serif;
    line-height: 1.5em;
    margin-top: 10px;
    padding-left: 28px;
}
.list-item::before {
    content: '★';
    /*暂时先用这个星星代替*/
    margin-left: -28px;
    width: 28px;
    display: inline-block;
}
</style>