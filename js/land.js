/**
 * Created by 冯飞林 on 2017/4/25.
 */
(function (w) {
    /**
     *
     * @param ctx   绘制环境
     * @param img   加载图片
     * @param speed 速度
     * @constructor Land()
     */
    function Land (ctx,img,speed) {
        Land.len++;
        this.ctx = ctx;
        this.img = img;
        this.speed = speed ||2;
        this.x =(Land.len-1)*this.img.width;
        this.y =this.ctx.canvas.height - this.img.height;
    }
    Land.len = 0;
//    给原型加方法
    util.extend(Land.prototype,{
        draw: function () {
            this.ctx.drawImage(this.img,this.x,this.y)
        },
        update: function () {
            this.x-=this.speed;
            this.x = this.x<=-this.img.width?3*this.img.width:this.x;
        }
    })


    w.getLand = function (ctx, img, speed) {
        return new Land( ctx, img, speed );
    }


})(window)



