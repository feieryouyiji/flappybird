/**
 * Created by 冯飞林 on 2017/4/25.
 */
(function(w){
    /**
     *
     * @param ctx  :Context 上下文环境
     * @param img : Image   背景图片
     * @param speed  num  背景图片平移的速度
     * @constructor     Sky()
     */
    function Sky (ctx,img,speed) {
        //记录实例化的sky个数

        this.ctx =ctx ;
        this.img =img;
        this.speed = speed || 2;
        this.width =this.img.width ;
        this.height = this.img.height ;
        Sky.len++;
        this.x = this.width*(Sky.len-1);
        this.y = 0;

    }
    Sky.len = 0;
//给原型扩充方法
    Sky.prototype ={
        constructor :Sky,
        //绘制背景
        draw: function () {
            this.ctx.drawImage(this.img,this.x,this.y,800,600)
        },
        update: function () {
            this.x-=this.speed;
            if(this.x<= (-this.width)){
                this.x+= 2*this.width;
            }
        }

    }

    w.getSky = function(ctx,img,speed){
        return new Sky(ctx,img,speed);
    };



})(window)

